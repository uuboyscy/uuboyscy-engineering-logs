---
sidebar_position: 1
---

# Create and Access a Secret

這一篇會使用 Console 與 `gcloud` 建立 Secret，加入第一個版本，再讀取指定的 Secret version。

## Configuration Used in This Tutorial

以下名稱是示範值：

```text
PROJECT_ID = your-project-id
SECRET_ID  = tkr101-demo-api-key
```

Secret ID 不應包含真實服務名稱以外的敏感內容。可以使用 labels 記錄環境與 owner，但不要把 secret value 放在 label 或 description。

## Step 1: Select a Project

```bash
gcloud auth login
gcloud projects list
gcloud config set project PROJECT_ID
gcloud config get-value project
```

確認目前使用的是練習用 Project：

```bash
gcloud projects describe PROJECT_ID
```

## Step 2: Enable the Secret Manager API

```bash
gcloud services enable secretmanager.googleapis.com
```

如果後續要由 Cloud Run 使用 Secret，還需要啟用 Cloud Run 相關 API；由 Cloud Console 部署時通常會提示啟用。

## Step 3: Create a Secret in the Console

1. 開啟 Google Cloud Console。
2. 搜尋並進入 **Secret Manager**。
3. 點選 **Create secret**。
4. Name 輸入 `tkr101-demo-api-key`。
5. 在 Secret value 輸入測試值，例如 `demo-value-only`。
6. Replication 依需求選擇 Automatic 或 User-managed。
7. 可加入 `environment=learning`、`owner=your-name` 等 labels。
8. 點選 **Create secret**。

測試值只用來驗證流程。完成練習後應刪除或清理這個 Secret。

## Step 4: Create a Secret with `gcloud`

建立 Secret metadata：

```bash
gcloud secrets create SECRET_ID \
  --project=PROJECT_ID \
  --replication-policy=automatic \
  --labels=environment=learning
```

`--replication-policy` 可以使用 `automatic` 或 `user-managed`。如果有資料位置限制，請依官方文件設定 user-managed replication locations。

查看 Secret metadata：

```bash
gcloud secrets describe SECRET_ID
```

列出 Project 中的 Secrets：

```bash
gcloud secrets list
```

## Step 5: Add the First Secret Version

### From Standard Input

不把值寫入檔案的示範方式：

```bash
printf '%s' 'demo-value-only' \
  | gcloud secrets versions add SECRET_ID \
      --data-file=-
```

### From a Local File

如果 secret 原本就是檔案，例如憑證或 JSON，可以使用：

```bash
gcloud secrets versions add SECRET_ID \
  --data-file=./temporary-secret.txt
```

使用暫存檔時要注意檔案權限與清理：

```bash
rm ./temporary-secret.txt
```

不要把含有真實 secret 的檔案加入 Git：

```bash
git status --short
```

## Step 6: List Secret Versions

```bash
gcloud secrets versions list SECRET_ID
```

輸出會包含版本編號與狀態，例如 `ENABLED`、`DISABLED` 或 `DESTROYED`。

## Step 7: Access a Secret Version

讀取指定版本：

```bash
gcloud secrets versions access 1 \
  --secret=SECRET_ID
```

讀取 `latest`：

```bash
gcloud secrets versions access latest \
  --secret=SECRET_ID
```

這些指令會把 plaintext 印到 terminal。只適合在使用示意值的練習中驗證；Production 不要把輸出寫入 shell history、CI log 或 application log。

## Step 8: Read a Secret in Python

安裝 Secret Manager client library：

```bash
pip install google-cloud-secret-manager
```

使用 Application Default Credentials 或執行環境的 Service Account：

```python
from google.cloud import secretmanager


def access_secret(project_id: str, secret_id: str, version: str = "1") -> str:
    client = secretmanager.SecretManagerServiceClient()
    name = f"projects/{project_id}/secrets/{secret_id}/versions/{version}"
    response = client.access_secret_version(request={"name": name})
    return response.payload.data.decode("UTF-8")
```

呼叫時不要印出回傳值：

```python
api_key = access_secret(
    project_id="your-project-id",
    secret_id="tkr101-demo-api-key",
    version="1",
)

# 將 api_key 傳給需要它的 client，不要 print(api_key)
```

## Console Access Flow

在 Console 中讀取版本：

1. 開啟 Secret Manager。
2. 點選 Secret 名稱。
3. 在 Versions 分頁找到要使用的版本。
4. 點選版本旁的 **Actions**。
5. 選擇 **View secret value**。

讀取 secret value 本身需要對該 Secret version 的存取權。能看到 Secret metadata 不代表一定能讀取 plaintext。

## Common Problems

### Secret Manager API is not enabled

執行：

```bash
gcloud services enable secretmanager.googleapis.com
```

如果沒有啟用 API 的權限，請請 Project 管理者協助，不要使用別人的金鑰繞過流程。

### Permission denied on access

建立 Secret 的人不一定是執行應用程式的身分。確認執行 `gcloud` 的帳號或 runtime Service Account 有 `secretmanager.versions.access` 權限。

### Version is disabled

Disabled version 不能被正常使用。先確認目前部署是否仍指向舊版本，再決定是否 enable 或更新應用程式設定。

## Cleanup

列出 Secret 確認名稱：

```bash
gcloud secrets list
```

刪除教學用 Secret 前，確認沒有其他服務使用它：

```bash
gcloud secrets delete SECRET_ID
```

刪除是破壞性操作。Production Secret 不應直接照抄 cleanup 指令。

## Further Reading

- [Create and access a secret](https://cloud.google.com/secret-manager/docs/creating-and-accessing-secrets)
- [Add a secret version](https://cloud.google.com/secret-manager/docs/add-secret-version)
- [Access a secret version](https://cloud.google.com/secret-manager/docs/access-secret-version)
- [gcloud secrets](https://cloud.google.com/sdk/gcloud/reference/secrets)
