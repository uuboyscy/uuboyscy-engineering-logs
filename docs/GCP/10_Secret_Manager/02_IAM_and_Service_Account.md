---
sidebar_position: 2
---

# IAM and Service Account Access

Secret Manager 的安全邊界主要由 IAM 控制。設計時要把「管理 Secret」與「讀取 Secret」分開，並把權限授予最低層級的資源。

## Secret Manager Roles

| Role | 適合用途 |
| --- | --- |
| `roles/secretmanager.secretAccessor` | 讀取 Secret version |
| `roles/secretmanager.secretVersionAdder` | 新增 Secret version |
| `roles/secretmanager.secretVersionManager` | 管理 Secret versions，例如 enable、disable、destroy |
| `roles/secretmanager.viewer` | 查看 metadata，不代表可以讀取 secret value |
| `roles/secretmanager.admin` | 管理 Secret 與版本，應限制給管理者 |

Production 不要因為「先讓它跑起來」就把 `roles/owner` 或 `roles/secretmanager.admin` 授予應用程式。

## Grant Access at the Secret Level

把讀取權限授予特定 Service Account：

```bash
gcloud secrets add-iam-policy-binding SECRET_ID \
  --project=PROJECT_ID \
  --member=serviceAccount:RUNTIME_SERVICE_ACCOUNT \
  --role=roles/secretmanager.secretAccessor
```

這比在整個 Project 授予所有 Secret 的存取權更符合最小權限原則。

查看單一 Secret 的 IAM policy：

```bash
gcloud secrets get-iam-policy SECRET_ID \
  --project=PROJECT_ID
```

## Separate Deployment and Runtime Identities

推薦的身分分工：

```text
CI/CD or administrator
  ├── secretVersionAdder：新增版本
  └── secretVersionManager：輪替與停用版本

Runtime Service Account
  └── secretAccessor：只讀取應用程式需要的 Secret
```

部署者可以更新 secret，但應用程式不需要 destroy 或 disable secret version。這樣即使執行環境被入侵，也能縮小可造成的影響。

## Grant Access in the Console

1. 開啟 **Secret Manager**。
2. 找到要授權的 Secret。
3. 點選 Secret 旁的 **Actions**。
4. 選擇 **Manage permissions**。
5. 點選 **Grant access**。
6. 在 New principals 輸入 Service Account email。
7. 只選擇 **Secret Manager Secret Accessor**。
8. 儲存設定。

若只需要讀取一個 Secret，優先在該 Secret 層級授權，不要直接在 Project 層級授予所有 Secrets 的 access。

## Check the Current Identity

執行 CLI 操作前，確認目前使用的帳號：

```bash
gcloud auth list
gcloud config get-value project
```

如果使用 Application Default Credentials：

```bash
gcloud auth application-default print-access-token
```

不要把 access token、服務帳號 JSON key 或 secret value 貼到 issue、聊天或 log。

## Compute Engine and Access Scopes

在 Compute Engine 中，存取 Secret Manager 需要同時考慮：

1. VM 使用的 Service Account 是否具有 Secret Manager IAM role。
2. VM 的 access scope 是否允許呼叫 Google Cloud APIs。

```text
VM access scope ───────▶ 限制 VM 可要求的 API 範圍
Service Account IAM ───▶ 決定對 Secret 資源的實際權限
```

`Allow full access to all Cloud APIs` 只解除 scope 層級的 API 限制，不會自動授予讀取 Secret 的 IAM 權限。Production 應使用專用 Service Account 與最小 role。

## Audit Logs

Secret Manager 的 `AccessSecretVersion` 屬於 Data Access audit log。建議在組織或 Folder 層級啟用並集中分析，回答以下問題：

- 哪個 principal 讀取過 Secret？
- 什麼時間讀取？
- 從哪個服務或 Project 發出？
- 是否出現異常頻率或不應出現的身分？

在 Logs Explorer 可以使用類似的 filter：

```text
protoPayload.methodName="google.cloud.secretmanager.v1.SecretManagerService.AccessSecretVersion"
```

Audit log 只能協助追蹤與調查，不能取代 IAM、網路邊界與 secret rotation。

## Least Privilege Checklist

- [ ] Runtime 使用專用 Service Account。
- [ ] Runtime 只拿 `roles/secretmanager.secretAccessor`。
- [ ] 權限盡量授予單一 Secret，而不是整個 Project。
- [ ] CI/CD、管理者與 runtime 使用不同身分。
- [ ] 不使用長期服務帳號 JSON key 作為主要認證方式。
- [ ] 啟用並檢查 Data Access audit logs。
- [ ] Production、staging、development 使用不同 Project 或至少不同 Secret。
- [ ] 定期移除離職者、舊服務與臨時測試帳號的權限。

## Further Reading

- [Access control with IAM](https://cloud.google.com/secret-manager/docs/access-control)
- [Secret Manager IAM roles](https://cloud.google.com/secret-manager/docs/access-control#secretmanager-roles)
- [Secret Manager audit logging](https://cloud.google.com/secret-manager/docs/audit-logging)
- [Google Cloud IAM best practices](https://cloud.google.com/iam/docs/using-iam-securely)
