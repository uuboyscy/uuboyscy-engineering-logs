---
sidebar_position: 4
---

# BigQuery Remote Function and Gemini

BigQuery isn't limited to running SQL — it can also call external services through a connection:

- **Remote Function**: Runs custom logic on Cloud Run functions or Cloud Run, called from SQL.
- **Remote Model**: Registers a Google Cloud model inside BigQuery, then processes data with functions like `ML.GENERATE_TEXT`.

These features are great for chaining data analysis and AI batch processing into a single query flow, but they also involve IAM, APIs, regions, model quotas, and extra costs. Test with a small dataset before scaling up.

## Remote Function Architecture

```text
BigQuery SQL
    │
    ▼
BigQuery Connection
    │  service account
    ▼
Cloud Run functions / Cloud Run HTTP endpoint
    │
    ▼
External logic or API
```

The basic flow for a Remote Function is:

1. Create an HTTP endpoint.
2. Create a `CLOUD_RESOURCE` connection.
3. Grant the connection's service account permission to call the endpoint.
4. Create the Remote Function in BigQuery.
5. Call it from SQL like any other function.

## Step 1: Prepare a Cloud Run Function

Below is a simplified Python HTTP function. A Remote Function request passes multiple sets of parameters in `calls`, and the response should be placed in `replies`.

```python
# main.py

def remote_add(request):
    body = request.get_json(silent=True) or {}
    calls = body.get('calls', [])

    replies = []
    for call in calls:
        x, y = call
        replies.append(x + y)

    return {'replies': replies}
```

Create `requirements.txt`:

```text
# requirements.txt
functions-framework==3.*
```

Deploy it to Cloud Run functions (2nd gen Cloud Functions):

```bash
gcloud functions deploy remote-add-function \
  --gen2 \
  --runtime=python313 \
  --region=asia-east1 \
  --source=. \
  --entry-point=remote_add \
  --trigger-http \
  --no-allow-unauthenticated
```

`--no-allow-unauthenticated` means the endpoint isn't public. Next, you need to grant the service account used by the BigQuery connection permission to call it.

> Runtime versions and available regions can change. Before deploying, check Cloud Run functions' latest documentation for available runtimes.

## Step 2: Create a BigQuery Connection

### Using the Console

1. Open BigQuery.
2. Click **+ Add**.
3. Select **Connections to external data sources**.
4. For the connection type, select **Cloud resource** or the equivalent **BigLake and remote functions** option shown in the UI.
5. Enter `model_connection` as the connection ID.
6. Choose a location compatible with the dataset and function, such as `asia-east1`.
7. Create the connection.
8. Open the connection's details and copy the service account it generates.

The exact console wording may vary between versions; functionally, what a Remote Function needs is a `CLOUD_RESOURCE` connection.

## Step 3: Grant the Minimum Required Access

Grant the connection's service account Invoker permission on the Cloud Run function. You can do this from the console's IAM page or the Cloud Run permissions page.

Conceptually, the IAM relationship looks like this:

```text
BigQuery Connection service account
        └── Cloud Run Invoker on remote-add-function
```

Don't make the function publicly accessible just to sidestep IAM. A production environment should also keep these separate:

- Permission to create and manage the connection.
- Permission to use the connection (`bigquery.connections.use`).
- Permission to create or update dataset routines.
- Invoker permission to call the Cloud Run function.

## Step 4: Create the BigQuery Remote Function

```sql
CREATE OR REPLACE FUNCTION `PROJECT_ID.TKR101.remote_add`(
  x INT64,
  y INT64
)
RETURNS INT64
REMOTE WITH CONNECTION `PROJECT_ID.asia-east1.model_connection`
OPTIONS (
  endpoint = 'https://FUNCTION_REGION-PROJECT_ID.cloudfunctions.net/remote-add-function'
);
```

Replace `endpoint` with the actual deployed HTTPS URL. Then test it:

```sql
SELECT
  value,
  `PROJECT_ID.TKR101.remote_add`(value, 2) AS value_plus_two
FROM UNNEST([20, 57, 78]) AS value;
```

If the query fails, check these first:

- Whether the connection's location is compatible with the function and dataset.
- Whether the endpoint is correct.
- Whether the connection's service account has Invoker permission.
- Whether the function actually returns a `replies` array.
- Whether the function can handle the multiple `calls` BigQuery sends in one request.

## Vertex AI Remote Model

BigQuery can also create a remote model, letting SQL call a generative model on Google Cloud. Model names and available regions change with service versions and regional support; the example below uses `gemini-2.5-flash`, which is common in the current official documentation.

```sql
CREATE OR REPLACE MODEL `PROJECT_ID.TKR101.gemini_flash`
REMOTE WITH CONNECTION `PROJECT_ID.asia-east1.model_connection`
OPTIONS (
  endpoint = 'gemini-2.5-flash'
);
```

Before creating it, confirm:

- The model is available in the location you selected.
- The BigQuery connection's service account has the permissions needed to use the model and Vertex AI.
- The project has the relevant APIs enabled.
- Your account and project have sufficient BigQuery, connection, and Vertex AI permissions.

## Generate Text from a BigQuery Table

Suppose you have a customer feedback table:

```text
PROJECT_ID.TKR101.feedback
├── feedback_id STRING
└── feedback_text STRING
```

You can build a prompt and then use `ML.GENERATE_TEXT`:

```sql
SELECT
  feedback_id,
  ml_generate_text_result,
  ml_generate_text_status
FROM ML.GENERATE_TEXT(
  MODEL `PROJECT_ID.TKR101.gemini_flash`,
  (
    SELECT
      feedback_id,
      CONCAT(
        '請將以下客戶回饋整理成一句繁體中文摘要：',
        feedback_text
      ) AS prompt
    FROM `PROJECT_ID.TKR101.feedback`
    WHERE feedback_text IS NOT NULL
    LIMIT 10
  ),
  STRUCT(
    0.2 AS temperature,
    100 AS max_output_tokens
  )
);
```

Add `LIMIT` first to test with a small batch, then design a full production batch process once you've confirmed the results and cost.

## Ask for Structured JSON Carefully

If you plan to split the results into multiple columns later, you can ask the model to output only JSON:

```sql
SELECT
  feedback_id,
  ml_generate_text_result,
  ml_generate_text_status
FROM ML.GENERATE_TEXT(
  MODEL `PROJECT_ID.TKR101.gemini_flash`,
  (
    SELECT
      feedback_id,
      CONCAT(
        '請分析以下回饋。只回傳純 JSON，不要 Markdown code fence。',
        '格式必須是 {"summary":"...","sentiment":"positive|neutral|negative"}。',
        '\n回饋：',
        feedback_text
      ) AS prompt
    FROM `PROJECT_ID.TKR101.feedback`
    WHERE feedback_text IS NOT NULL
    LIMIT 10
  ),
  STRUCT(0.2 AS temperature, 200 AS max_output_tokens)
);
```

Model output may still not match the expected format. A production pipeline should:

1. Check `ml_generate_text_status`.
2. Validate against the JSON schema.
3. Send results that fail to parse to a quarantine table.
4. Keep the original prompt, model version, and processing time for auditing and reruns.
5. Design a retry and batching strategy for quota errors.

## Cost and Safety Notes

- Remote Function calls can incur charges from Cloud Run functions, Cloud Run, or external APIs.
- `ML.GENERATE_TEXT` consumes the model service's quota and billing — don't run it directly against an entire large table.
- Test first with `LIMIT`, a small dataset, and a low output token count.
- Don't send sensitive data directly to an external model; confirm data governance, masking, retention, and access permissions first.
- The locations of the model, connection, dataset, and endpoint must all be confirmed compatible beforehand.
- Preview or beta features shouldn't be used in production without cost and failure handling in place.
- The older course examples in the notebook use Gemini 1.5 Flash; for real implementations, choose an endpoint based on the latest official documentation and model availability — don't just copy an outdated model name.

## Further Reading

- [Introduction to connections](https://cloud.google.com/bigquery/docs/connections-api-intro)
- [Work with remote functions](https://cloud.google.com/bigquery/docs/remote-functions)
- [Create remote models](https://cloud.google.com/bigquery/docs/reference/standard-sql/bigqueryml-syntax-create-remote-model)
- [The ML.GENERATE_TEXT function](https://cloud.google.com/bigquery/docs/reference/standard-sql/bigqueryml-syntax-generate-text)
