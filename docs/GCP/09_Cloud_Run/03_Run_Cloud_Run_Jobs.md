---
sidebar_position: 3
---

# Run Batch Work with Cloud Run Jobs

Cloud Run Job 適合執行「有開始、有結束」的 container workload，例如 ETL、資料匯入、備份、爬蟲與定期報表。

## Service vs. Job

| 項目 | Service | Job |
| --- | --- | --- |
| 觸發方式 | HTTP request、event | 手動、排程或 workflow |
| Container | 持續等待 request | 完成工作後 exit |
| Port | 需要監聽 `PORT` | 不需要，也不應啟動 Web server |
| 成功條件 | 回應 request | exit code `0` |
| 失敗處理 | request error、revision | task retry、execution failure |

如果你的程式本來是一次性 Python script，不要為了執行它而包成一直等待 request 的 Service；使用 Job 通常比較清楚。

## Step 1: Prepare a Job Container

建立 `job.py`：

```python
import os
import time


print("starting batch job")
print(f"batch_id={os.environ.get('BATCH_ID', 'local')}")

# 在這裡執行 ETL、備份或資料處理工作
for item in range(3):
    print(f"processing item {item}")
    time.sleep(1)

print("batch job completed")
```

Job container 不需要 Flask、Gunicorn 或 HTTP server。它應該在工作完成後自然結束。

Dockerfile 範例：

```dockerfile
FROM python:3.13-slim

WORKDIR /app
COPY job.py .

CMD ["python", "job.py"]
```

建立並推送 image 的流程，請參考 [Build and Push a Container Image](./Build_and_Push_Image)。

## Step 2: Deploy a Job with `gcloud`

```bash
gcloud run jobs deploy tkr101-batch-job \
  --image=asia-east1-docker.pkg.dev/PROJECT_ID/tkr101-repo/cloud-run-job:v1 \
  --region=asia-east1 \
  --tasks=1 \
  --max-retries=1 \
  --task-timeout=10m
```

設定 environment variable：

```bash
gcloud run jobs update tkr101-batch-job \
  --region=asia-east1 \
  --update-env-vars=BATCH_ID=demo-001
```

Job 的 task timeout 預設為 10 分鐘，可依需求調整；官方目前的最大值與 GPU 限制請以最新文件為準。

## Step 3: Execute the Job

執行並等待完成：

```bash
gcloud run jobs execute tkr101-batch-job \
  --region=asia-east1 \
  --wait
```

列出 Job executions：

```bash
gcloud run jobs executions list \
  --job=tkr101-batch-job \
  --region=asia-east1
```

查看 Job log：

```bash
gcloud run jobs logs read tkr101-batch-job \
  --region=asia-east1 \
  --limit=50
```

## Step 4: Configure in the Console

1. 開啟 **Cloud Run** → **Jobs**。
2. 點選 **Deploy container**。
3. 選擇 Artifact Registry image。
4. 設定 Job name 與 Region。
5. 在 container 設定 CPU、Memory 與 task timeout。
6. 設定 Number of tasks。
7. 設定 Number of retries per failed task。
8. 依 workload 設定 parallelism。
9. 點選 **Create**。
10. 在 Job 詳細頁點選 **Execute**。

## Tasks, Parallelism, and Retries

一個 Job execution 可以包含多個 tasks：

```text
Job execution
├── Task 0
├── Task 1
├── Task 2
└── Task 3
```

- **Tasks**：要執行幾個 task。
- **Parallelism**：同時執行幾個 task。
- **Max retries**：單一 task 失敗後最多重試次數。

如果每個 task 都會處理相同資料，盲目增加 tasks 可能產生重複寫入。程式需要使用 task index、partition key 或 idempotent write 設計。

## Exit Code and Idempotency

成功的 Job container 應回傳 `0`：

```bash
python job.py
printf 'exit code: %s\n' "$?"
```

如果部分工作完成後才失敗，Cloud Run retry 可能再次執行同一批資料。因此 ETL 應考慮：

- 使用 batch id 或 source file generation 去重。
- 寫入前先檢查是否已完成。
- 使用 staging table，再以 transaction 或 merge 發佈。
- 將外部副作用與資料處理分開。
- 記錄 execution name、task index 與輸入範圍。

## Schedule a Job

Cloud Run Job 本身負責執行，不等於排程器。可以使用 Cloud Scheduler、Workflows 或其他 orchestration tool 觸發 Job。

```text
Cloud Scheduler / Workflows
            │
            ▼
Cloud Run Jobs Execute API
            │
            ▼
Cloud Run Job execution
```

排程觸發器也需要自己的 IAM 權限，不要讓公開 HTTP endpoint 任意啟動高成本 Job。

## Cost and Timeout Notes

- Job 只在 task 執行時使用 CPU／Memory，但仍可能有 image、registry、network 或其他服務費用。
- Timeout 應足以完成工作，也要能阻止無窮迴圈。
- Retry 會重新消耗資源，且可能重複寫入或呼叫外部 API。
- 遇到 timeout 時，先檢查瓶頸與資料切分，不要只把 timeout 無限調大。

## Cleanup

列出 Job：

```bash
gcloud run jobs list --region=asia-east1
```

刪除練習用 Job：

```bash
gcloud run jobs delete tkr101-batch-job \
  --region=asia-east1
```

確認 image 不再使用後，再清理 Artifact Registry 中的 image 或 repository。

## Further Reading

- [Create jobs](https://cloud.google.com/run/docs/create-jobs)
- [Execute jobs](https://cloud.google.com/run/docs/execute/jobs)
- [Configure jobs](https://cloud.google.com/run/docs/configuring/jobs)
- [Cloud Run container runtime contract](https://cloud.google.com/run/docs/container-contract)
