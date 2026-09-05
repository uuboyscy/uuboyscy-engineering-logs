---
sidebar_position: 2
---

# Deploy a Cloud Run Service

Cloud Run Service 適合提供 HTTP API、網站、Webhook 或其他需要等待 request 的應用程式。

## Step 1: Deploy with the Console

1. 開啟 **Cloud Run**。
2. 在 Services 頁面點選 **Deploy container**。
3. 選擇 **Deploy one revision from an existing container image**。
4. 輸入 Artifact Registry image，例如：

   ```text
   asia-east1-docker.pkg.dev/PROJECT_ID/tkr101-repo/cloud-run-demo:v1
   ```

5. Service name 輸入 `cloud-run-demo`。
6. Region 選擇 `asia-east1`。
7. 在 **Container(s), Volumes, Networking, Security** 設定：
   - Container port：`8080`
   - Memory：依 workload 選擇，例如 `512Mi`
   - CPU：依 workload 選擇，例如 `1`
   - Minimum instances：練習可使用 `0`
   - Maximum instances：設定合理上限，避免流量異常時無限制擴張
8. Authentication 選擇：
   - **Require authentication**：需要 IAM 驗證，適合內部 API。
   - **Allow unauthenticated invocations**：公開 endpoint，只有確認資料與 API 可公開時使用。
9. 點選 **Create**。

## Step 2: Deploy with `gcloud`

先用需要驗證的方式部署：

```bash
gcloud run deploy cloud-run-demo \
  --image=asia-east1-docker.pkg.dev/PROJECT_ID/tkr101-repo/cloud-run-demo:v1 \
  --region=asia-east1 \
  --port=8080 \
  --memory=512Mi \
  --cpu=1 \
  --min=0 \
  --max=10 \
  --no-allow-unauthenticated
```

部署完成後查看 Service：

```bash
gcloud run services describe cloud-run-demo \
  --region=asia-east1
```

取得 URL：

```bash
gcloud run services describe cloud-run-demo \
  --region=asia-east1 \
  --format='value(status.url)'
```

## Step 3: Allow Public Invocation Only When Needed

如果這是明確要公開給瀏覽器或 webhook provider 的服務，可以在部署時使用：

```bash
gcloud run deploy cloud-run-demo \
  --image=IMAGE_URL \
  --region=asia-east1 \
  --allow-unauthenticated
```

公開前確認：

- Endpoint 不會回傳個人資料或敏感資訊。
- API 有自己的 authentication、rate limit 或 abuse protection。
- 服務不會因為任意輸入而觸發高成本工作。
- 已經設定 logging 與監控。

## Step 4: Test the Service

需要 authentication 時，使用 gcloud 取得 identity token：

```bash
SERVICE_URL=$(gcloud run services describe cloud-run-demo \
  --region=asia-east1 \
  --format='value(status.url)')

curl -H "Authorization: Bearer $(gcloud auth print-identity-token)" \
  "$SERVICE_URL/"
```

若服務允許 unauthenticated：

```bash
curl "$SERVICE_URL/"
```

## Port and `PORT`

Cloud Run Service 會注入 `PORT` environment variable。Application 應使用：

```python
import os

port = int(os.environ.get("PORT", "8080"))
```

常見錯誤：

- Application 只監聽 `127.0.0.1`。
- Dockerfile 寫死和 Cloud Run 設定不同的 port。
- 把 Service 的 port 設定套用到 Job；Job 不需要監聽 port。
- Server 啟動太慢，沒有設定適合的 startup probe 或資源。

## CPU and Memory

CPU 與 Memory 要依 workload 決定：

| Workload | 起始思路 |
| --- | --- |
| 簡單 HTTP API | 先從小型 CPU／Memory 開始，再觀察 metrics |
| Flask API 搭配大型套件 | 增加 Memory，確認 cold start |
| Selenium 或 browser workload | 通常需要較多 CPU／Memory，並先做壓測 |
| LLM／模型服務 | 依模型、延遲與 GPU／CPU 支援重新評估 |

Notebook 中以 Selenium Grid 為例，建議提高到約 2 CPU 與 2 GB Memory；這是該 workload 的示範設定，不是所有 Service 的預設值。

## Scale to Zero and Cold Start

Cloud Run Service 可以在沒有 request 時縮減到 zero instance：

```text
有流量：1+ instances
無流量：0 instances
新 request：建立 instance，可能出現 cold start
```

Cold start 會受到 image 大小、依賴套件、初始化工作與資源設定影響。可以：

- 減少 image 大小。
- 避免在 module import 時做不必要的遠端操作。
- 將初始化工作移到合理的 startup flow。
- 對低延遲服務設定 minimum instances，但這會有持續執行成本。

不要用固定 ping 盲目保持 instance 喚醒；先確認 latency 與成本是否值得。

## Revisions and Traffic

查看 revisions：

```bash
gcloud run revisions list \
  --service=cloud-run-demo \
  --region=asia-east1
```

查看 service logs：

```bash
gcloud run services logs read cloud-run-demo \
  --region=asia-east1 \
  --limit=50
```

新版本上線前，先部署 revision、測試 URL，再逐步調整 traffic。不要把未測試的 image 直接標記為 production 唯一版本。

## Service Checklist

- [ ] Container image 已在本地驗證。
- [ ] Service 使用正確的 image tag。
- [ ] Application 監聽 `0.0.0.0:$PORT`。
- [ ] Authentication 設定符合資料敏感度。
- [ ] CPU、Memory、concurrency、min/max instances 已評估。
- [ ] 新 revision 已測試並可回滾。
- [ ] Logs 與 metrics 可以觀察。
- [ ] Endpoint 不會被任意輸入觸發高成本工作。

## Further Reading

- [Deploying services](https://cloud.google.com/run/docs/deploying)
- [Configure containers](https://cloud.google.com/run/docs/configuring/services/containers)
- [Configure autoscaling](https://cloud.google.com/run/docs/configuring/services/autoscaling)
- [Cloud Run pricing](https://cloud.google.com/run/pricing)
