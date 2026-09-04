---
sidebar_position: 3
---

# IAM and Access Control

GCS 權限決定「誰可以對哪個 Bucket 或 Object 做什麼」。預設應該保持私有，使用 IAM 授予必要的最小權限；只有在有明確需求時才提供公開讀取。

## Uniform Bucket-Level Access

Uniform bucket-level access 會停用 Bucket 內 Object ACL 的使用，改由 IAM 統一管理權限。它能降低同一個 Bucket 同時維護 IAM 與 ACL 所造成的設定混亂。

建議新 Bucket 使用 Uniform bucket-level access：

```bash
gcloud storage buckets update gs://BUCKET_NAME \
  --uniform-bucket-level-access
```

確認設定：

```bash
gcloud storage buckets describe gs://BUCKET_NAME
```

在 Console 中：

1. 開啟 Cloud Storage → Bucket。
2. 進入 **Permissions**。
3. 找到 **Access control**。
4. 確認使用 **Uniform**。

Uniform bucket-level access 不能隨時無條件切換回 ACL 模式；正式環境啟用前先確認既有應用程式沒有依賴 Object ACL。

## Common IAM Roles

| Role | 適合用途 |
| --- | --- |
| `roles/storage.objectViewer` | 讀取 Object |
| `roles/storage.objectCreator` | 建立新 Object，不負責修改或刪除既有 Object |
| `roles/storage.objectUser` | 讀取、建立、更新與刪除 Object 的常見使用情境 |
| `roles/storage.objectAdmin` | 管理 Object，權限較大 |
| `roles/storage.admin` | 管理 Bucket 與 Object，應限制給管理者 |

實際可用權限還會受到 Project、Bucket、Managed Folder 與 IAM Conditions 影響。Production 不要習慣性授予 `roles/storage.admin`。

## Grant a User Read Access

授予特定使用者讀取 Bucket 內 Object 的權限：

```bash
gcloud storage buckets add-iam-policy-binding gs://BUCKET_NAME \
  --member=user:USER_EMAIL \
  --role=roles/storage.objectViewer
```

查看 Bucket IAM policy：

```bash
gcloud storage buckets get-iam-policy gs://BUCKET_NAME
```

## Grant a Service Account Access

如果 Cloud Run、VM、Cloud Functions 或其他程式需要讀取 GCS，應授予指定 Service Account，而不是把資料公開：

```bash
gcloud storage buckets add-iam-policy-binding gs://BUCKET_NAME \
  --member=serviceAccount:SERVICE_ACCOUNT_EMAIL \
  --role=roles/storage.objectViewer
```

如果程式只需要新增檔案，可以考慮：

```bash
gcloud storage buckets add-iam-policy-binding gs://BUCKET_NAME \
  --member=serviceAccount:SERVICE_ACCOUNT_EMAIL \
  --role=roles/storage.objectCreator
```

使用 `objectCreator` 可以避免程式任意修改或刪除既有檔案，但要確認你的 pipeline 是否需要 overwrite 或 retry。

## VM Access Scopes and IAM Are Different

課程中提到，VM 建立時的 Access scopes 會影響 VM 內的 API 操作。需要分清楚兩個層次：

```text
VM access scope  ──▶  限制 VM 可以向 Google APIs 要求的範圍
Service Account IAM ──▶  決定該身分實際被授予哪些資源權限
```

`Allow full access to all Cloud APIs` 只表示 scope 不限制 API 類別，不代表 Service Account 自動擁有所有 Bucket 權限。現代 GCP 設計應優先使用具體 Service Account 與最小 IAM role，再依服務需求設定 scope。

## Public Access Prevention

Public access prevention 可以阻止 `allUsers` 與 `allAuthenticatedUsers` 透過 IAM 或 ACL 取得資料：

```bash
gcloud storage buckets update gs://BUCKET_NAME \
  --public-access-prevention
```

對包含原始資料、使用者資料、交易資料或備份的 Bucket，建議保持啟用。

## When Is Public Access Appropriate?

商品圖片、公開文件或網站靜態資產可能需要公開讀取，但應使用專用 Bucket 或 CDN 架構，不要把含有 raw data 的 Bucket 一起公開。

若你真的要建立公開讀取 Bucket，必須先確認：

- 沒有個人資料、密鑰、內部 log 或未發布內容。
- 已取得資料 owner 與 security review 同意。
- 已知道怎麼撤銷公開權限。
- 有監控、稽核與內容清理流程。

公開讀取範例只適合在明確的測試情境使用：

```bash
# 僅在確認資料可公開時使用
gcloud storage buckets add-iam-policy-binding gs://PUBLIC_BUCKET \
  --member=allUsers \
  --role=roles/storage.objectViewer
```

如果 Public access prevention 正在 enforced，這個操作會被拒絕。不要為了讓指令成功而關閉安全控制。

## Access Control Checklist

- [ ] Bucket 預設不是公開的。
- [ ] 使用 Uniform bucket-level access。
- [ ] 使用 Service Account，而不是共用個人帳號金鑰。
- [ ] 依工作需求選擇 viewer、creator 或 user role。
- [ ] 不使用 `allUsers` 解決一般 permission error。
- [ ] 原始資料與公開資產放在不同 Bucket。
- [ ] 對敏感資料使用 IAM Conditions、稽核與資料分類。
- [ ] 定期檢查 IAM policy 與不再使用的成員。

## Further Reading

- [Cloud Storage access control overview](https://cloud.google.com/storage/docs/access-control)
- [Uniform bucket-level access](https://cloud.google.com/storage/docs/uniform-bucket-level-access)
- [Public access prevention](https://cloud.google.com/storage/docs/public-access-prevention)
- [IAM roles for Cloud Storage](https://cloud.google.com/storage/docs/access-control/iam-roles)
