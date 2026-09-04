---
sidebar_position: 4
---

# Storage Class and Lifecycle Management

GCS 的成本不只取決於檔案大小，也與 Storage Class、資料取用、操作次數、網路傳輸與保存時間有關。Storage Class 解決的是「資料平常放在哪種取用模式」，Lifecycle Management 解決的是「資料在什麼條件下轉換或刪除」。

## Choose a Storage Class

| Storage class | 建議使用情境 | 主要取捨 |
| --- | --- | --- |
| Standard | 活躍資料、線上圖片、經常查詢的資料 | 儲存成本較高，但適合頻繁取用 |
| Nearline | 每月取用一次左右的備份或長尾內容 | 取用成本較高，通常有 30 天最低儲存期間 |
| Coldline | 每季取用一次左右的備份或災難復原資料 | 取用成本更高，通常有 90 天最低儲存期間 |
| Archive | 每年取用一次以下的合規或歷史資料 | 取用與操作成本較高，通常有 365 天最低儲存期間 |

實際價格、最低儲存期間與 Location 支援狀態會變動，正式決策前請查看最新 pricing page。

## Set a Default Storage Class

建立 Bucket 時可以設定 default storage class。也可以在上傳 Object 時指定：

```bash
gcloud storage cp test.txt gs://BUCKET_NAME/archive/ \
  --storage-class=ARCHIVE
```

Default storage class 是 Bucket 層級的預設值；Object 也可能因為 lifecycle rule 或上傳選項使用不同的 class。使用前先檢查 object metadata。

## Autoclass

如果無法準確預測不同 Object 的取用頻率，可以研究 Autoclass，讓 Cloud Storage 依照存取行為調整 Storage Class。

Autoclass 不是「一定最便宜」的開關。仍要評估：

- Object 是否會頻繁被重新讀取。
- 轉換操作與取用費用。
- 最低儲存期間。
- 資料治理是否允許自動變更 class。

## Lifecycle Management

Lifecycle rule 可以依照 Object age、prefix、storage class 或其他條件執行：

- Delete：刪除符合條件的 Object。
- SetStorageClass：將 Object 轉成另一種 Storage Class。
- 管理舊版本或非 current version。

### Example: Delete Temporary Files

建立 `lifecycle.json`：

```json
{
  "rule": [
    {
      "action": {
        "type": "Delete"
      },
      "condition": {
        "age": 30,
        "matchesPrefix": ["tmp/"]
      }
    }
  ]
}
```

套用到 Bucket：

```bash
gcloud storage buckets update gs://BUCKET_NAME \
  --lifecycle-file=lifecycle.json
```

查看 lifecycle 設定：

```bash
gcloud storage buckets describe gs://BUCKET_NAME
```

### Example: Transition Old Objects

```json
{
  "rule": [
    {
      "action": {
        "type": "SetStorageClass",
        "storageClass": "COLDLINE"
      },
      "condition": {
        "age": 90,
        "matchesPrefix": ["raw/"]
      }
    }
  ]
}
```

套用前要先確認資料的實際取用頻率與最低儲存期間，避免資料剛轉換就被頻繁取用，反而增加成本。

## Deletion Is a Data Governance Decision

刪除前先回答：

- 這份資料是否仍在 retention period 內？
- 是否有 legal hold、object hold 或 audit 要求？
- 是否還能從來源系統重新取得？
- BigQuery external table 是否仍指向這個 URI？
- 是否開啟 Object Versioning，導致舊版本仍然保存？
- 是否需要先備份或交給 archive policy？

近年的 Cloud Storage 也可能使用 soft delete。刪除指令成功不代表資料立刻完全不可復原或費用立即歸零；請查看最新的 deletion 與 pricing 文件。

## Delete Objects and the Bucket

先列出會刪除的內容：

```bash
gcloud storage ls --recursive gs://BUCKET_NAME/tmp/
```

確認無誤後刪除 prefix：

```bash
gcloud storage rm --recursive gs://BUCKET_NAME/tmp/
```

Bucket 必須是空的才可以刪除。確認 Bucket 內沒有需要保留的資料後：

```bash
gcloud storage rm --recursive gs://BUCKET_NAME
```

> `--recursive` 具有破壞性。Production Bucket 不要直接複製這段指令；先使用 dry run、限制 prefix，並由 owner 確認範圍。

## Cost Control Checklist

- [ ] Standard、Nearline、Coldline、Archive 的選擇符合取用頻率。
- [ ] 已評估最低儲存期間與資料取用費用。
- [ ] Temporary、raw、backup 使用不同 prefix 或 Bucket 管理。
- [ ] 已設定 lifecycle rule 清理暫存資料。
- [ ] 已考慮 Object Versioning、soft delete 與 retention policy。
- [ ] 定期檢查 storage usage、operations 與 network egress。
- [ ] 沒有依賴 Budget Alert 自動停止 GCS；Budget Alert 主要是通知。

## Further Reading

- [Storage classes](https://cloud.google.com/storage/docs/storage-classes)
- [Object Lifecycle Management](https://cloud.google.com/storage/docs/lifecycle)
- [Control data lifecycles](https://cloud.google.com/storage/docs/control-data-lifecycles)
- [About object deletion](https://cloud.google.com/storage/docs/object-deletion-overview)
- [Cloud Storage pricing](https://cloud.google.com/storage/pricing)
