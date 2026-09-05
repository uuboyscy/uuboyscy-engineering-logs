---
sidebar_position: 4
---

# Cloud Run Functions

Cloud Run functions (2nd gen Cloud Functions) is a good fit for deploying a single event handler or a lightweight HTTP function. You provide the source code, runtime, and entry point, and Google helps build the container and deploy it as a Cloud Run service.

## When Should You Use a Function?

Consider Cloud Run functions when:

- You only need to maintain one main function.
- You don't want to write your own Dockerfile.
- You need a simple HTTP, Pub/Sub, or other event trigger.
- You want to quickly build a small webhook or data-processing handler.

If you need full control over the Docker image, startup command, sidecars, volumes, or multiple endpoints, using a Cloud Run Service directly is usually a better fit.

## Step 1: Prepare a Python Function

Create `main.py`:

```python
import functions_framework


@functions_framework.http
def hello_http(request):
    name = request.args.get("name")

    if not name and request.is_json:
        body = request.get_json(silent=True) or {}
        name = body.get("name")

    return {"message": f"Hello, {name or 'World'}"}
```

Create `requirements.txt`:

```text
functions-framework==3.*
```

`hello_http` is the entry point. Don't put API keys, database passwords, or tokens in the function's source code; sensitive configuration should come from Secret Manager or another managed configuration source.

## Step 2: Deploy from the Console

1. Open **Cloud Run** or **Cloud Functions**.
2. Click **Write a function** or **Create function**.
3. Choose a region, for example `asia-east1`.
4. Choose an available Python runtime version, for example `Python 3.13`.
5. Enter `hello_http` as the entry point.
6. Choose an HTTP trigger or another event trigger.
7. Configure authentication.
8. Specify the runtime service account.
9. Click **Deploy**.

A note from the notebook: the entry point must match the name of the main function in the source code exactly, otherwise deployment may succeed but the handler won't be found when triggered.

## Step 3: Deploy with `gcloud`

```bash
gcloud functions deploy tkr101-hello \
  --gen2 \
  --runtime=python313 \
  --region=asia-east1 \
  --source=. \
  --entry-point=hello_http \
  --trigger-http \
  --no-allow-unauthenticated
```

Runtime names and available versions change over time, so check the latest Cloud Run functions runtime documentation before deploying to production.

Get the function's details:

```bash
gcloud functions describe tkr101-hello \
  --gen2 \
  --region=asia-east1
```

## Step 4: Invoke the Function

If authentication is required, you can use an identity token:

```bash
FUNCTION_URL=$(gcloud functions describe tkr101-hello \
  --gen2 \
  --region=asia-east1 \
  --format='value(serviceConfig.uri)')

curl -H "Authorization: Bearer $(gcloud auth print-identity-token)" \
  "$FUNCTION_URL?name=Allen"
```

Expected response:

```json
{"message":"Hello, Allen"}
```

## Function vs. Service

| Aspect | Cloud Run functions | Cloud Run Service |
| --- | --- | --- |
| Creation | Source, runtime, entry point | Container image or source |
| Container control | Google builds it automatically | Developer has full control over the image |
| Good fit | Single handler, event-driven | APIs, websites, complex applications |
| Port | Managed by the platform and framework | The application uses `PORT` |
| Extensibility | Constrained by the function model | Full range of Cloud Run features available |

A function ultimately still runs as a Cloud Run service, so you still need to understand revisions, scaling, runtime identity, and logging.

## BigQuery Remote Function Integration

Cloud Run functions can act as the HTTP endpoint for a BigQuery Remote Function:

```text
BigQuery SQL
     │
     ▼
BigQuery Connection
     │
     ▼
Cloud Run function
     │
     ▼
Python custom logic
```

The basic flow:

1. Deploy an HTTP function that requires authentication.
2. Create a Cloud resource connection in BigQuery.
3. Grant the connection's service account the Invoker role on the function.
4. Create a Remote Function in BigQuery.
5. Call the Remote Function from SQL.

Example SQL:

```sql
CREATE OR REPLACE FUNCTION `PROJECT_ID.TKR101.remote_add`(
  x INT64,
  y INT64
)
RETURNS INT64
REMOTE WITH CONNECTION `PROJECT_ID.asia-east1.model_connection`
OPTIONS (
  endpoint = 'https://FUNCTION_URL'
);
```

Call it:

```sql
SELECT
  value,
  `PROJECT_ID.TKR101.remote_add`(value, 2) AS value_plus_two
FROM UNNEST([20, 57, 78]) AS value;
```

When you update the function's Python logic, the BigQuery function definition usually doesn't need to be rebuilt, but you should still retest the endpoint, IAM, request/response format, and error handling.

## Security Notes

- Don't leave unauthenticated access enabled long-term just for testing convenience.
- Keep the runtime identity separate from the deployer's identity.
- Grant the Remote Function connection's service account only the Invoker role it needs.
- Avoid logging secrets contained in the request body.
- Set timeouts, retries, and rate limits for external calls.
- Keep the function's response schema stable so downstream consumers can rely on it.

## Cleanup

```bash
gcloud functions delete tkr101-hello \
  --gen2 \
  --region=asia-east1
```

Before deleting, confirm that no BigQuery Remote Function, Scheduler, or other service still calls it.

## Further Reading

- [Cloud Run functions overview](https://cloud.google.com/run/docs/functions/overview)
- [Compare Cloud Run functions](https://cloud.google.com/run/docs/functions/comparison)
- [Build functions into containers](https://cloud.google.com/run/docs/building/functions)
- [BigQuery remote functions](https://cloud.google.com/bigquery/docs/remote-functions)
