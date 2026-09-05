---
sidebar_position: 3
---

# BigQuery Remote Function and Gemini

BigQuery 不只可以執行 SQL，也可以透過 Connection 呼叫外部服務：

- **Remote Function**：在 Cloud Run functions 或 Cloud Run 上執行自訂邏輯，再從 SQL 呼叫。
- **Remote Model**：在 BigQuery 中註冊 Google Cloud 的模型，再使用 `ML.GENERATE_TEXT` 等函數處理資料。

這類功能很適合把資料分析與 AI 批次處理串在同一個查詢流程中，但同時會涉及 IAM、API、區域、模型配額與額外費用。先用小資料集測試，再放大範圍。

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

Remote Function 的基本流程是：

1. 建立 HTTP endpoint。
2. 建立 `CLOUD_RESOURCE` Connection。
3. 把 Connection service account 授予呼叫 endpoint 的權限。
4. 在 BigQuery 建立 Remote Function。
5. 在 SQL 中像一般函數一樣呼叫它。

## Step 1: Prepare a Cloud Run Function

以下是一個簡化的 Python HTTP function。Remote Function request 會在 `calls` 中傳入多組參數，回應要放在 `replies` 中。

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

建立 `requirements.txt`：

```text
# requirements.txt
functions-framework==3.*
```

部署到 Cloud Run functions（Cloud Functions 第 2 代）：

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

`--no-allow-unauthenticated` 代表 endpoint 不公開。接下來要把 BigQuery Connection 使用的 service account 授予呼叫權限。

> Runtime 版本與可用區域可能變更。部署前請以 Cloud Run functions 的最新文件確認可用 runtime。

## Step 2: Create a BigQuery Connection

### Using the Console

1. 開啟 BigQuery。
2. 點選 **+ Add**。
3. 選擇 **Connections to external data sources**。
4. Connection type 選擇 **Cloud resource** 或畫面上對應的 **BigLake and remote functions** 選項。
5. Connection ID 輸入 `model_connection`。
6. Location 選擇與 Dataset、function 相容的 `asia-east1`。
7. 建立 Connection。
8. 開啟 Connection 詳細資料，複製它產生的 service account。

不同版本的 Console 文字可能略有不同；以用途來看，Remote Function 需要的是 `CLOUD_RESOURCE` connection。

## Step 3: Grant the Minimum Required Access

將 Connection service account 授予 Cloud Run function 的 Invoker 權限。可以在 Console 的 IAM 或 Cloud Run permissions 頁面完成。

概念上的 IAM 關係如下：

```text
BigQuery Connection service account
        └── Cloud Run Invoker on remote-add-function
```

不要把 function 改成公開存取來避開 IAM。Production 環境也應分開管理：

- 建立與管理 Connection 的權限。
- 使用 Connection 的 `bigquery.connections.use` 權限。
- 建立或更新 Dataset Routine 的權限。
- 呼叫 Cloud Run function 的 Invoker 權限。

## Step 4: Create the BigQuery Remote Function

```sql
CREATE OR REPLACE FUNCTION `PROJECT_ID.tkr101.remote_add`(
  x INT64,
  y INT64
)
RETURNS INT64
REMOTE WITH CONNECTION `PROJECT_ID.asia-east1.model_connection`
OPTIONS (
  endpoint = 'https://FUNCTION_REGION-PROJECT_ID.cloudfunctions.net/remote-add-function'
);
```

請把 `endpoint` 改成實際部署後的 HTTPS URL。接著測試：

```sql
SELECT
  value,
  `PROJECT_ID.tkr101.remote_add`(value, 2) AS value_plus_two
FROM UNNEST([20, 57, 78]) AS value;
```

如果查詢失敗，優先檢查：

- Connection location 是否與函數和 Dataset 相容。
- endpoint 是否正確。
- Connection service account 是否有 Invoker 權限。
- 函數是否真的回傳 `replies` 陣列。
- 函數是否能處理 BigQuery 一次送來的多筆 `calls`。

## Vertex AI Remote Model

BigQuery 也能建立 Remote Model，讓 SQL 呼叫 Google Cloud 上的生成式模型。模型名稱與可用區域會隨服務版本與地區支援狀態變動；以下使用目前官方文件常見的 `gemini-2.5-flash` 範例。

```sql
CREATE OR REPLACE MODEL `PROJECT_ID.tkr101.gemini_flash`
REMOTE WITH CONNECTION `PROJECT_ID.asia-east1.model_connection`
OPTIONS (
  endpoint = 'gemini-2.5-flash'
);
```

建立前請確認：

- 該模型在選定的 location 可用。
- BigQuery Connection service account 有使用模型與 Vertex AI 所需的權限。
- Project 已啟用相關 API。
- 你的帳號與 Project 有足夠的 BigQuery、Connection、Vertex AI 權限。

## Generate Text from a BigQuery Table

假設有一張客戶回饋表：

```text
PROJECT_ID.tkr101.feedback
├── feedback_id STRING
└── feedback_text STRING
```

可以建立 prompt，再使用 `ML.GENERATE_TEXT`：

```sql
SELECT
  feedback_id,
  ml_generate_text_result,
  ml_generate_text_status
FROM ML.GENERATE_TEXT(
  MODEL `PROJECT_ID.tkr101.gemini_flash`,
  (
    SELECT
      feedback_id,
      CONCAT(
        '請將以下客戶回饋整理成一句繁體中文摘要：',
        feedback_text
      ) AS prompt
    FROM `PROJECT_ID.tkr101.feedback`
    WHERE feedback_text IS NOT NULL
    LIMIT 10
  ),
  STRUCT(
    0.2 AS temperature,
    100 AS max_output_tokens
  )
);
```

先加上 `LIMIT` 做小批次測試，確認結果與費用後，再設計正式的批次處理流程。

## Ask for Structured JSON Carefully

如果後續要將結果拆成多個欄位，可以要求模型只輸出 JSON：

```sql
SELECT
  feedback_id,
  ml_generate_text_result,
  ml_generate_text_status
FROM ML.GENERATE_TEXT(
  MODEL `PROJECT_ID.tkr101.gemini_flash`,
  (
    SELECT
      feedback_id,
      CONCAT(
        '請分析以下回饋。只回傳純 JSON，不要 Markdown code fence。',
        '格式必須是 {"summary":"...","sentiment":"positive|neutral|negative"}。',
        '\n回饋：',
        feedback_text
      ) AS prompt
    FROM `PROJECT_ID.tkr101.feedback`
    WHERE feedback_text IS NOT NULL
    LIMIT 10
  ),
  STRUCT(0.2 AS temperature, 200 AS max_output_tokens)
);
```

模型輸出仍可能不符合格式。Production pipeline 應：

1. 檢查 `ml_generate_text_status`。
2. 驗證 JSON schema。
3. 將無法解析的結果送到 quarantine table。
4. 保留原始 prompt、模型版本與處理時間，方便稽核與重跑。
5. 針對配額錯誤設計 retry 與分批策略。

## Cost and Safety Notes

- Remote Function 可能觸發 Cloud Run functions、Cloud Run 或外部 API 的費用。
- `ML.GENERATE_TEXT` 會使用模型服務的配額與計費，不要對整張大表直接執行。
- 先使用 `LIMIT`、小資料集與低輸出 token 測試。
- 不要把含有敏感資訊的資料直接送往外部模型；先確認資料治理、遮罩、保留期限與存取權限。
- Model、Connection、Dataset 與 endpoint 的 Location 必須事先確認相容。
- Preview 或 Beta 功能不應在沒有成本與失敗處理的情況下直接用於 Production。
- Notebook 中的舊課程範例使用 Gemini 1.5 Flash；正式實作時請依最新官方文件與模型可用性選擇 endpoint，不要直接複製過時模型名稱。

## Further Reading

- [Introduction to connections](https://cloud.google.com/bigquery/docs/connections-api-intro)
- [Work with remote functions](https://cloud.google.com/bigquery/docs/remote-functions)
- [Create remote models](https://cloud.google.com/bigquery/docs/reference/standard-sql/bigqueryml-syntax-create-remote-model)
- [The ML.GENERATE_TEXT function](https://cloud.google.com/bigquery/docs/reference/standard-sql/bigqueryml-syntax-generate-text)
