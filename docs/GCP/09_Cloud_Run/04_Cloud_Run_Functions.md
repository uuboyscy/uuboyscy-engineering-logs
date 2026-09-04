---
sidebar_position: 4
---

# Cloud Run Functions

Cloud Run functions（Cloud Functions 第 2 代）適合部署單一事件 handler 或輕量 HTTP function。你提供 source code、runtime 與 entry point，Google 會協助建立 container 並部署成 Cloud Run service。

## When Should You Use a Function?

使用 Cloud Run functions 的情境：

- 只需要維護一個主要函數。
- 不想自行撰寫 Dockerfile。
- 需要簡單的 HTTP、Pub/Sub 或其他事件觸發器。
- 希望快速建立小型 webhook 或資料處理 handler。

如果需要完整控制 Docker image、啟動命令、sidecar、volume 或多個 endpoint，直接使用 Cloud Run Service 通常更合適。

## Step 1: Prepare a Python Function

建立 `main.py`：

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

建立 `requirements.txt`：

```text
functions-framework==3.*
```

`hello_http` 就是 entry point。函數程式碼不要把 API key、資料庫密碼或 token 寫在 source 中；敏感設定應使用 Secret Manager 或其他受控設定來源。

## Step 2: Deploy from the Console

1. 開啟 **Cloud Run** 或 **Cloud Functions**。
2. 點選 **Write a function** 或 **Create function**。
3. 選擇 Region，例如 `asia-east1`。
4. Runtime 選擇可用的 Python 版本，例如 `Python 3.13`。
5. Entry point 輸入 `hello_http`。
6. 選擇 HTTP trigger 或其他事件 trigger。
7. 設定 authentication。
8. 指定 runtime Service Account。
9. 點選 **Deploy**。

Notebook 特別提醒：Entry point 必須和 source code 中的主函數名稱一致，否則部署可能成功但觸發時無法找到 handler。

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

Runtime 名稱與可用版本會更新，正式部署前請查看最新 Cloud Run functions runtime 文件。

取得 function 資訊：

```bash
gcloud functions describe tkr101-hello \
  --gen2 \
  --region=asia-east1
```

## Step 4: Invoke the Function

需要 authentication 時，可以使用 identity token：

```bash
FUNCTION_URL=$(gcloud functions describe tkr101-hello \
  --gen2 \
  --region=asia-east1 \
  --format='value(serviceConfig.uri)')

curl -H "Authorization: Bearer $(gcloud auth print-identity-token)" \
  "$FUNCTION_URL?name=Allen"
```

預期回應：

```json
{"message":"Hello, Allen"}
```

## Function vs. Service

| 項目 | Cloud Run functions | Cloud Run Service |
| --- | --- | --- |
| 建立方式 | Source、runtime、entry point | Container image 或 source |
| Container 控制 | Google 自動 build | 開發者可完全控制 image |
| 適合 | 單一 handler、事件驅動 | API、網站、複雜應用程式 |
| Port | 由平台與 framework 管理 | 應用程式使用 `PORT` |
| 擴充方式 | 受 function model 約束 | 可設定更完整的 Cloud Run 功能 |

Function 最後仍會以 Cloud Run service 形式執行，因此要理解 revision、scaling、runtime identity 與 logging。

## BigQuery Remote Function Integration

Cloud Run functions 可以作為 BigQuery Remote Function 的 HTTP endpoint：

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

基本流程：

1. 部署需要 authentication 的 HTTP function。
2. 在 BigQuery 建立 Cloud resource connection。
3. 把 Connection service account 授予 function Invoker 權限。
4. 在 BigQuery 建立 Remote Function。
5. 在 SQL 中呼叫 Remote Function。

SQL 範例：

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

呼叫：

```sql
SELECT
  value,
  `PROJECT_ID.TKR101.remote_add`(value, 2) AS value_plus_two
FROM UNNEST([20, 57, 78]) AS value;
```

更新 function 的 Python 邏輯時，BigQuery function definition 通常不需要重建，但要重新測試 endpoint、IAM、request／response format 與錯誤處理。

## Security Notes

- 不要為了測試方便而長期開啟 unauthenticated access。
- Runtime identity 與部署者 identity 分開。
- Remote Function Connection service account 只授予必要的 Invoker 權限。
- 避免把 request body 中的 secret 寫入 log。
- 為外部呼叫設定 timeout、retry 與 rate limit。
- Function 回應應保持穩定的 schema，方便下游處理。

## Cleanup

```bash
gcloud functions delete tkr101-hello \
  --gen2 \
  --region=asia-east1
```

刪除前確認 BigQuery Remote Function、Scheduler 或其他服務沒有再呼叫它。

## Further Reading

- [Cloud Run functions overview](https://cloud.google.com/run/docs/functions/overview)
- [Compare Cloud Run functions](https://cloud.google.com/run/docs/functions/comparison)
- [Build functions into containers](https://cloud.google.com/run/docs/building/functions)
- [BigQuery remote functions](https://cloud.google.com/bigquery/docs/remote-functions)
