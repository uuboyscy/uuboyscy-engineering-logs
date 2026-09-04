---
sidebar_position: 5
---

# IAM, Scaling, and Cleanup

Cloud Run 的部署成功，不代表設計已經安全。Production 最常見的問題通常來自使用過大的 Service Account、公開 endpoint、無限制擴張、未設定 timeout，或測試資源忘記刪除。

## Use a User-Managed Service Account

Cloud Run runtime 建議使用專用的 user-managed Service Account：

```bash
gcloud iam service-accounts create cloud-run-runtime \
  --project=PROJECT_ID \
  --display-name="Cloud Run runtime identity"
```

設定變數：

```bash
RUNTIME_SA=cloud-run-runtime@PROJECT_ID.iam.gserviceaccount.com
```

部署 Service 時指定：

```bash
gcloud run deploy cloud-run-demo \
  --image=IMAGE_URL \
  --region=asia-east1 \
  --service-account="$RUNTIME_SA"
```

不要在 Production 長期使用權限過大的 default service account。Notebook 課程中以 BigQuery 為例：

- 只讀取資料：評估 `roles/bigquery.dataViewer` 與執行 query 所需權限。
- 需要寫入資料：才授予對應 Dataset 層級的 data editor 權限。
- 需要建立或管理 job：另外評估 `roles/bigquery.jobUser`。

Cloud Run 自己的 deployment 權限與 runtime Service Account 的資料存取權限是兩件事，不要混在一起。

## Least Privilege Pattern

```text
Developer / CI/CD
  ├── Cloud Run deploy permissions
  └── iam.serviceAccountUser on runtime SA

Cloud Run runtime SA
  ├── Secret Manager accessor on selected secrets
  ├── BigQuery viewer/editor on selected datasets
  └── Cloud Storage viewer/creator on selected buckets
```

應用程式只拿它真正需要的權限。不要用 Project Owner 來解決 runtime permission error。

## Configure Scaling

常見 scaling 設定：

| Setting | 作用 |
| --- | --- |
| Minimum instances | 保持一定數量的 warm instances，降低 cold start，但會增加成本 |
| Maximum instances | 限制流量異常時的資源與下游壓力 |
| Concurrency | 一個 instance 同時處理的 request 數量 |
| CPU／Memory | 影響處理能力、啟動時間與費用 |

更新 Service 的 instance 上限：

```bash
gcloud run services update cloud-run-demo \
  --region=asia-east1 \
  --min=0 \
  --max=10
```

實際上限應配合：

- 下游 Cloud SQL connection pool。
- BigQuery quota。
- 外部 API rate limit。
- 單一 request 的 CPU／Memory 使用量。
- 預期流量與成本上限。

## Timeout and Retry

Service 與 Job 的 timeout 目的不同：

- Service timeout：避免單一 HTTP request 長時間佔用資源。
- Job task timeout：避免 batch task 無窮執行。
- Retry：可能讓同一個 request 或 task 重新執行。

設定 Job retry：

```bash
gcloud run jobs update tkr101-batch-job \
  --region=asia-east1 \
  --max-retries=1 \
  --task-timeout=10m
```

如果工作具有外部副作用，retry 前要確認 idempotency。付款、寄信、寫入外部系統或觸發下一個 Job 都不能只靠「失敗就重試」。

## Logs and Monitoring

查看 Service logs：

```bash
gcloud run services logs read cloud-run-demo \
  --region=asia-east1 \
  --limit=100
```

查看 Job logs：

```bash
gcloud run jobs logs read tkr101-batch-job \
  --region=asia-east1 \
  --limit=100
```

監控時至少觀察：

- Request latency。
- Error rate。
- Instance count。
- CPU／Memory usage。
- Job success／failure。
- Retry 次數。
- 下游服務錯誤。
- 成本與流量異常。

不要在 log 中印出 API key、密碼、access token 或完整個人資料。

## Preview and Beta Features

Notebook 課程提醒：看到 Preview 或 Beta 功能時，先閱讀限制、計費與服務條款，再決定是否用在 Production。測試功能可能有 quota、穩定性、API 相容性或支援範圍限制。

不要以為「測試用」就可以無限制執行。仍然要設定 timeout、maximum instances、job retries 與成本監控。

## Cleanup Checklist

完成練習後，先列出資源：

```bash
gcloud run services list --region=asia-east1
gcloud run jobs list --region=asia-east1
gcloud artifacts repositories list --location=asia-east1
gcloud functions list --gen2 --region=asia-east1
```

刪除 Service：

```bash
gcloud run services delete cloud-run-demo \
  --region=asia-east1
```

刪除 Job：

```bash
gcloud run jobs delete tkr101-batch-job \
  --region=asia-east1
```

刪除 function：

```bash
gcloud functions delete tkr101-hello \
  --gen2 \
  --region=asia-east1
```

刪除 Artifact Registry repository 前，確認其中沒有其他 Service 或 Job 使用的 image：

```bash
gcloud artifacts repositories delete tkr101-repo \
  --location=asia-east1
```

上述 delete 指令具有破壞性。Production 操作前先確認依賴、備份、保留政策與審核流程。

## Production Checklist

- [ ] 使用 user-managed runtime Service Account。
- [ ] 對 GCS、BigQuery、Secret Manager 採最小權限。
- [ ] Private service 預設要求 authentication。
- [ ] Public service 有 rate limit、input validation 與 abuse protection。
- [ ] Service 設定了合理的 min/max instances。
- [ ] Job 設定 timeout、retry 與 parallelism。
- [ ] Batch 工作具備 idempotency。
- [ ] 新 image 使用可追蹤 tag，並透過 revision 漸進發布。
- [ ] Log 不含 secret 或不必要的敏感資料。
- [ ] 已設定成本監控與告警。
- [ ] 已規劃 image、revision、Service 與 Job 的清理策略。

## Further Reading

- [Cloud Run service identity](https://cloud.google.com/run/docs/securing/service-identity)
- [Cloud Run autoscaling](https://cloud.google.com/run/docs/configuring/services/autoscaling)
- [Cloud Run jobs configuration](https://cloud.google.com/run/docs/configuring/jobs)
- [Cloud Run monitoring](https://cloud.google.com/run/docs/monitoring)
- [Cloud Run pricing](https://cloud.google.com/run/pricing)
