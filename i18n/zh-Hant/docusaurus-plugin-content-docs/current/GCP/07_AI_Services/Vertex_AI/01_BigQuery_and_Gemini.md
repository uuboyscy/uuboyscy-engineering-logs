---
sidebar_position: 1
---

# BigQuery ML 與 Gemini

此範例示範如何透過標準 SQL 在 BigQuery 中調用 Vertex AI Gemini 模型。

## 1. Create Connection

在 BigQuery 建立 `CLOUD_RESOURCE` 連線，並將 `Vertex AI User`（`roles/aiplatform.user`）角色授予該連線的服務帳號：

```bash
# 建立連線
bq mk --connection --location=us --project_id=<your_project> --connection_type=CLOUD_RESOURCE vertexai-demo-us

# 取得連線的服務帳號
CONNECTION_SA=$(bq show --format=json --connection <your_project>.us.vertexai-demo-us | jq -r '.cloudResource.serviceAccountId')

# 授予 Vertex AI User 權限
gcloud projects add-iam-policy-binding <your_project> \
  --member="serviceAccount:${CONNECTION_SA}" \
  --role="roles/aiplatform.user"
```

## 2. Create Dataset

```sql
CREATE SCHEMA IF NOT EXISTS `vertexai_demo`
OPTIONS (location = 'US');
```

## 3. Create Model from VertexAI

```sql
CREATE OR REPLACE MODEL `vertexai_demo.gemini_flash_model`
REMOTE WITH CONNECTION `<your_project>.us.vertexai-demo-us`
OPTIONS(ENDPOINT = 'gemini-2.5-flash-lite')
-- 或指定完整端點
-- OPTIONS(ENDPOINT = 'projects/<your_project>/locations/global/publishers/google/models/gemini-2.5-flash-lite')
;
```

## 4. Prepare Sample Data for Generative AI

```sql
CREATE OR REPLACE TABLE `vertexai_demo.customer_feedback` AS
SELECT 'The delivery was 3 days late, but the driver was very polite and the package was safe.' AS feedback_text
UNION ALL
SELECT 'This is the best purchase I have made this year! Simple, elegant, and cheap.' AS feedback_text
UNION ALL
SELECT 'I hate the new update. The buttons are too small and it crashes every time I try to save.' AS feedback_text;
```

## 5. Use AI

```sql
SELECT
  prompt AS original_feedback,
  ml_generate_text_llm_result AS ai_raw_response
FROM
  ML.GENERATE_TEXT(
    MODEL `vertexai_demo.gemini_flash_model`,
    (
      SELECT 
        CONCAT('Analyze this feedback. Return a summary, the sentiment, and the subject: ', feedback_text) AS prompt 
      FROM `vertexai_demo.customer_feedback`
    ),
    STRUCT(
      0.2 AS temperature,
      250 AS max_output_tokens,
      TRUE AS flatten_json_output
    )
  );
```
