---
sidebar_position: 3
---

# Use Secrets in Cloud Run and Cloud Run Functions

Cloud Run 與 Cloud Run functions 可以把 Secret Manager 的版本提供給執行中的 container。常見方式有兩種：

- 以 environment variable 提供。
- 以 mounted file 提供。

兩種方式都需要 runtime Service Account 具有 Secret Manager Secret Accessor 權限。

## Architecture

```text
Secret Manager
    │
    │ secretAccessor
    ▼
Cloud Run runtime Service Account
    │
    ├── Environment variable
    └── Mounted file
          │
          ▼
      Application code
```

部署者的帳號只負責設定 deployment；執行中的 container 以 runtime Service Account 讀取 Secret。

## Step 1: Create a Runtime Service Account

```bash
gcloud iam service-accounts create app-runtime \
  --project=PROJECT_ID \
  --display-name="Application runtime identity"
```

設定變數：

```bash
RUNTIME_SERVICE_ACCOUNT=app-runtime@PROJECT_ID.iam.gserviceaccount.com
```

授予該身分讀取特定 Secret 的權限：

```bash
gcloud secrets add-iam-policy-binding DATABASE_PASSWORD \
  --project=PROJECT_ID \
  --member=serviceAccount:RUNTIME_SERVICE_ACCOUNT \
  --role=roles/secretmanager.secretAccessor
```

## Step 2: Reference a Secret as an Environment Variable

使用 `gcloud run deploy`：

```bash
gcloud run deploy SERVICE_NAME \
  --image=IMAGE_URL \
  --region=asia-east1 \
  --service-account=RUNTIME_SERVICE_ACCOUNT \
  --set-secrets=DB_PASSWORD=DATABASE_PASSWORD:1
```

格式如下：

```text
ENVIRONMENT_VARIABLE=SECRET_NAME:VERSION
```

應用程式可以從環境變數取得值：

```python
import os


database_password = os.environ["DB_PASSWORD"]
```

不要在啟動訊息、health check、exception 或 debug log 中印出 `database_password`。

## Step 3: Configure in the Console

1. 開啟 **Cloud Run**。
2. 建立新 Service 或選擇既有 Service。
3. 展開 **Container(s), Volumes, Networking, Security**。
4. 進入 **Variables and Secrets**。
5. 點選 **Reference a secret**。
6. 輸入環境變數名稱，例如 `DB_PASSWORD`。
7. 選擇 Secret `DATABASE_PASSWORD`。
8. 選擇要使用的 version。
9. 確認 Service identity 是預期的 runtime Service Account。
10. 點選 **Deploy**。

每次修改 secret reference 都會產生新的 Cloud Run revision。部署後要確認新 revision 真的使用預期版本。

## Mounted Secret File

有些程式需要讀取憑證、JSON 設定或多行內容。此時可以把 Secret mount 成檔案，而不是放在 environment variable：

```text
/mnt/secrets/database-password
```

Cloud Run Console 的流程：

1. 在服務設定中選擇 **Volumes**。
2. 建立 Secret volume。
3. 選擇 Secret 與 version。
4. 指定 mount path，例如 `/mnt/secrets`。
5. 回到 **Volume mounts**，將 volume mount 到 container。
6. 避免 mount path 覆蓋 container 原本需要的目錄。
7. Deploy 新 revision。

應用程式讀取檔案：

```python
from pathlib import Path


secret_file = Path("/mnt/secrets/database-password")
database_password = secret_file.read_text().strip()
```

不要把 secret mount 到 `/dev`、`/proc` 或 `/sys` 等受限制路徑，也不要讓 mount path 覆蓋應用程式原本需要的檔案。

## Cloud Run Functions

Cloud Run functions（舊稱 Cloud Functions 第 2 代）使用相同的 Cloud Run 執行模型。建立或更新 function 時，可以在 Console 的 secrets 設定中：

- 將 Secret version 暴露為 environment variable。
- 將 Secret version mount 成 file。
- 指定 function 使用的 runtime Service Account。

不要把 Secret Manager 的值寫入 function source code 或部署用的 `requirements.txt`。

## Pin a Version for Deployment

Production deployment 建議使用明確的 numeric version：

```bash
--set-secrets=DB_PASSWORD=DATABASE_PASSWORD:3
```

使用 `latest` 雖然方便，但當有人新增新版本後，下一次 instance 可能讀到未經完整測試的值。版本 pinning 讓設定可追蹤，也比較容易回滾：

```text
Revision A → DATABASE_PASSWORD:2
Revision B → DATABASE_PASSWORD:3
```

如果 version 3 有問題，可以把流量切回 Revision A，再調查新版本。

## Deployment Checklist

- [ ] Runtime Service Account 已建立。
- [ ] 只授予需要的 Secret Accessor 權限。
- [ ] Secret reference 使用明確版本。
- [ ] 沒有把 secret value 放入 Dockerfile、source 或 CI log。
- [ ] Environment variable 或 mount file 的名稱不會被錯誤記錄。
- [ ] 新 revision 已完成 smoke test。
- [ ] 已確認 Cloud Run region 與其他服務的設計相容。
- [ ] 已準備 secret rotation 與 rollback 流程。

## Troubleshooting

### Container cannot access the secret

依序檢查：

1. Cloud Run 使用的 Service Account 是否正確。
2. 該 Service Account 是否在「這個 Secret」上有 `secretAccessor`。
3. Secret version 是否為 `ENABLED`。
4. Secret Manager API 是否已啟用。
5. deployment 使用的 Project 與 Secret 所在 Project 是否正確。
6. environment variable 或 mounted path 是否拼寫一致。

### Secret works locally but fails in Cloud Run

本地端可能使用的是個人 ADC 或不同的 gcloud 帳號；Cloud Run 使用的是 runtime Service Account。不要因為本地可讀取，就假設 Cloud Run 自動擁有相同權限。

## Further Reading

- [Configure secrets for Cloud Run services](https://cloud.google.com/run/docs/configuring/services/secrets)
- [Configure secrets for Cloud Run functions](https://cloud.google.com/functions/docs/configuring/secrets)
- [Cloud Run service identity](https://cloud.google.com/run/docs/securing/service-identity)
