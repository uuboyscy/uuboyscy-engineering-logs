---
sidebar_position: 4
---

# Secret Versions, Rotation, and Cleanup

Secret rotation 不是單純把舊文字改掉。安全的輪替流程要同時處理：新增版本、部署新設定、驗證、停用舊版本、回滾與最後銷毀。

## Secret Version Lifecycle

```text
ENABLED → DISABLED → DESTROYED
   ▲          │
   └──────────┘
```

- **Enabled**：可以被授權的 workload 讀取。
- **Disabled**：暫停讀取，之後可以重新啟用。
- **Destroyed**：secret material 永久銷毀，不可復原。

先 disable、觀察與驗證，再 destroy，比直接永久銷毀安全。

## A Safe Rotation Workflow

```text
1. Create a new version
2. Deploy consumers to the new version
3. Run smoke tests and monitor
4. Disable the old version
5. Wait for the rollback window
6. Destroy the old version if appropriate
```

範例：目前 Production 使用 version 2，要輪替到 version 3。

```text
Current deployment ──▶ DATABASE_PASSWORD:2
New secret version ──▶ DATABASE_PASSWORD:3
New deployment      ──▶ DATABASE_PASSWORD:3
```

不要先 destroy version 2 再開始部署 version 3，否則出錯時沒有立即的回滾選項。

## Step 1: Add a New Version

使用標準輸入加入新版本：

```bash
printf '%s' 'new-demo-value-only' \
  | gcloud secrets versions add DATABASE_PASSWORD \
      --data-file=-
```

列出版本並確認狀態：

```bash
gcloud secrets versions list DATABASE_PASSWORD
```

記錄新版本編號，例如 `3`。不要只依賴 `latest` 來判斷版本是否正確。

## Step 2: Deploy the New Version

Cloud Run environment variable 範例：

```bash
gcloud run deploy SERVICE_NAME \
  --image=IMAGE_URL \
  --region=asia-east1 \
  --set-secrets=DB_PASSWORD=DATABASE_PASSWORD:3
```

執行 smoke test，確認：

- 應用程式能連線到依賴的服務。
- 新密碼或 token 確實可用。
- 舊版本仍可在必要時回滾。
- 沒有 secret value 出現在 log。

## Step 3: Disable the Old Version

確認所有 consumer 都已更新後，先停用舊版本：

```bash
gcloud secrets versions disable 2 \
  --secret=DATABASE_PASSWORD
```

停用是可逆的。若發現仍有舊服務需要 version 2，可以重新啟用：

```bash
gcloud secrets versions enable 2 \
  --secret=DATABASE_PASSWORD
```

## Step 4: Destroy Only After Verification

確認沒有 rollback、batch job、舊 revision 或其他 Project 仍使用 version 2 後，才考慮永久銷毀：

```bash
gcloud secrets versions destroy 2 \
  --secret=DATABASE_PASSWORD
```

Destroy 會讓 secret material 不可復原。Production 建議由兩人 review、ticket 或核准流程保護，不要在未確認 consumer 的情況下執行。

## `latest` vs. Numeric Version

| 使用方式 | 優點 | 風險 |
| --- | --- | --- |
| `latest` | 設定簡單、容易取得最新版本 | 新版本可能未測試就被 workload 使用 |
| Numeric version | 可追蹤、可回滾、適合 release | 輪替時需要更新 deployment |

教學或本地探索可以使用 `latest`；Production 建議使用 numeric version，並把版本更新納入既有 release process。

## Automated Rotation

可以使用排程或事件驅動流程自動輪替，例如：

```text
Cloud Scheduler / rotation trigger
             │
             ▼
Rotation worker
  ├── Create new credential at provider
  ├── Add new Secret version
  ├── Deploy or notify consumers
  ├── Verify health
  └── Disable old version
```

自動輪替前要先定義：

- 外部服務如何建立與撤銷 credential。
- 新版本如何驗證可用。
- 哪些 workload 必須先完成更新。
- 失敗時如何 rollback。
- 舊版本多久後 disable 與 destroy。
- rotation worker 自己需要哪些最小權限。

Secret Manager 新增版本不代表外部服務的 API key 已經輪替；兩邊都要完成更新。

## Temporary Secret Cleanup

Temporary environment 可以使用 labels 或 expiration policy 協助清理，但 Production Secret 不要設定不確定的 expiration，避免被自動永久刪除。

查看 Secret：

```bash
gcloud secrets describe SECRET_ID
```

刪除整個教學用 Secret：

```bash
gcloud secrets delete SECRET_ID
```

刪除前確認：

- 沒有 Cloud Run revision 使用它。
- 沒有 Cloud Run function、GKE workload 或 VM 依賴它。
- 沒有排程、batch job 或 CI pipeline 仍會讀取。
- Secret 不在 retention、audit 或合規要求中。

## Rotation Checklist

- [ ] 新版本先建立，再修改 consumer。
- [ ] 部署設定使用明確 numeric version。
- [ ] 新版本已完成 smoke test。
- [ ] 舊版本先 disable，不要直接 destroy。
- [ ] 已保留足夠的 rollback window。
- [ ] Audit logs 能追蹤版本存取。
- [ ] Rotation worker 使用最小權限。
- [ ] 舊版本與外部 provider credential 都已妥善撤銷。
- [ ] 沒有把 secret value 寫入 log、ticket 或 Git。

## Further Reading

- [Secret Manager best practices](https://cloud.google.com/secret-manager/docs/best-practices)
- [About rotation schedules](https://cloud.google.com/secret-manager/docs/rotation-recommendations)
- [Disable a secret version](https://cloud.google.com/secret-manager/docs/disable-secret-version)
- [Destroy a secret version](https://cloud.google.com/secret-manager/docs/destroy-secret-version)
- [Delay destruction of secret versions](https://cloud.google.com/secret-manager/docs/delay-destruction-of-secret-versions)
