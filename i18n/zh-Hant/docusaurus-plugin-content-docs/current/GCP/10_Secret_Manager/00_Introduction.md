---
sidebar_position: 0
---

# Introduction to Secret Manager

Secret Manager 是 Google Cloud 用來儲存與管理敏感資訊的服務，例如 API key、資料庫密碼、憑證與 OAuth token。

應用程式需要密碼時，不應把密碼直接寫在 source code、`.env`、Docker image 或 Git repository。較安全的做法是把 secret 放在 Secret Manager，再由具有明確權限的 Service Account 在執行時讀取。

## Why Not Put Secrets in Code?

以下做法都容易造成資料外洩：

```python
# 不要這樣做
DATABASE_PASSWORD = "real-password"
API_KEY = "real-api-key"
```

常見風險包括：

- Git history 會永久保留曾經提交過的內容。
- Docker image layer 可能保留 secret。
- Log、錯誤訊息或 notebook output 可能意外印出 secret。
- 共用 `.env` 或服務帳號金鑰很難追蹤誰曾經使用。
- 更換密碼時需要重新修改、測試與部署程式碼。

Secret Manager 把敏感資料與程式碼分開，並提供 IAM、版本、稽核與輪替能力。

## Resource Model

```text
Google Cloud Project
└── Secret
    ├── Secret metadata
    ├── Version 1
    ├── Version 2
    └── Version 3
```

### Secret

Secret 是資源本身，包含名稱、labels、replication、IAM policy 與其他 metadata。Secret metadata 不應放入 secret value。

### Secret Version

真正的敏感內容存在 Secret version。每次新增值，都會建立一個新的版本；既有版本不會被原地修改。

版本可以：

- Access：讀取內容。
- Disable：暫停使用，但可恢復。
- Enable：重新啟用。
- Destroy：永久銷毀 secret material，不可復原。

### `latest` and Numeric Version

Secret Manager 可以使用：

```text
latest
1
2
3
```

`latest` 方便測試，但 Production 通常建議在部署設定中 pin 到明確的數字版本，讓每次部署使用的設定可追蹤、可回滾。

## Secret Manager and Environment Variables

Environment variable 不是 Secret Manager。Environment variable 只是應用程式取得設定的一種方式。

```text
Secret Manager
      │
      ├── Cloud Run environment variable
      ├── Cloud Run mounted file
      └── Application client library
```

Secret Manager 負責保存、授權與版本；Cloud Run 或應用程式負責在執行時取得值。

## Replication

建立 Secret 時要選擇 replication policy：

- **Automatic replication**：由 Google 管理資料複寫位置，設定簡單。
- **User-managed replication**：指定允許的 replication locations，適合有資料駐留、法規或治理要求的環境。

Replication policy 和應用程式的部署區域是不同概念。設計時要同時考慮資料治理、可用性、延遲與成本。

## Security Capabilities

Secret Manager 提供：

- 以 IAM 控制單一 secret 的存取權。
- Secret version 的新增、停用、啟用與銷毀。
- Cloud Audit Logs 追蹤誰存取了哪個版本。
- Labels 與 annotations 管理環境、owner 與用途。
- Automatic 或 user-managed replication。
- 與 Cloud Run、Cloud Run functions、GKE、Compute Engine 等服務整合。

Secret Manager 不是完整的 application configuration system。非敏感設定仍可使用一般設定檔、環境變數或 Runtime Config 類型的工具，不需要全部放進 Secret Manager。

## Recommended Architecture

```text
Developer / CI/CD
      │  create or add version
      ▼
Secret Manager
      │  IAM: secretAccessor
      ▼
Runtime Service Account
      │
      ▼
Cloud Run / Cloud Run functions / GKE / VM
```

部署者需要建立版本的權限，執行中的服務只需要讀取權限。這兩種身分應該分開。

## What You Will Learn

1. 建立 Secret 與第一個 Secret version。
2. 使用 Console、`gcloud` 與 Python client library 讀取 secret。
3. 使用最小權限授予 User 與 Service Account。
4. 將 Secret 注入 Cloud Run 或 Cloud Run functions。
5. 設計版本輪替、回滾、停用與清理流程。
6. 透過 Audit Logs 與環境隔離降低風險。

## Prerequisites

開始前請準備：

- 一個已啟用 billing 的 Google Cloud Project。
- 已安裝 Google Cloud CLI。
- 已執行 `gcloud auth login`。
- 了解 Project、IAM 與 Service Account 的基本概念。

> 本教學的所有 secret value 都使用示意內容。請不要把真實 API key、密碼或憑證貼到教學文件、聊天紀錄或 Git repository。

## Further Reading

- [Secret Manager overview](https://cloud.google.com/secret-manager/docs/overview)
- [Secret Manager pricing](https://cloud.google.com/secret-manager/pricing)
- [Secret Manager best practices](https://cloud.google.com/secret-manager/docs/best-practices)
