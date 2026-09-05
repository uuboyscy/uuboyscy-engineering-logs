---
sidebar_position: 2
---

# Object 操作與 `gcloud storage`

GCS 的資料操作可以在 Cloud Console 完成，也可以使用 Google Cloud CLI。課程中使用的主要工具是 `gcloud storage`；舊有的 `gsutil` 仍可能出現在既有教材或環境中，但新操作優先使用 `gcloud storage` 指令家族。

## Bucket 與 Object 路徑

GCS URI 的格式如下：

```text
gs://BUCKET_NAME/OBJECT_NAME
```

例如：

```text
gs://tkr101-demo/landing/2026/06/sell.csv
```

- `tkr101-demo` 是 Bucket。
- `landing/2026/06/sell.csv` 是 Object name。
- `landing/` 和 `2026/06/` 是名稱前綴，不是傳統檔案系統的實體資料夾。

## 步驟 1：在 Console 建立虛擬資料夾

1. 開啟 Cloud Storage → **Buckets**。
2. 點選 Bucket name。
3. 點選 **Create folder**。
4. 輸入 `test_folder`。
5. 在資料夾內點選 **Upload files**。

這個操作方便人閱讀與瀏覽，但底層仍然是建立帶有 prefix 的 Object。

## 步驟 2：上傳檔案

先在本地建立一個測試檔案：

```bash
printf 'hello gcs\n' > test.txt
```

上傳到 Bucket 根目錄：

```bash
gcloud storage cp test.txt gs://BUCKET_NAME/
```

上傳到虛擬資料夾：

```bash
gcloud storage cp test.txt gs://BUCKET_NAME/test_folder/
```

即使 `test_folder` 原本不存在，指令仍可成功，因為它只是 Object name 的 prefix。

## 步驟 3：列出 Bucket 與 Object

列出所有 Bucket：

```bash
gcloud storage ls
```

列出某個 Bucket 的 Object：

```bash
gcloud storage ls gs://BUCKET_NAME
```

列出特定 prefix：

```bash
gcloud storage ls gs://BUCKET_NAME/test_folder/
```

遞迴列出所有內容：

```bash
gcloud storage ls --recursive gs://BUCKET_NAME
```

## 步驟 4：下載與複製 Object

下載並重新命名：

```bash
gcloud storage cp \
  gs://BUCKET_NAME/test.txt \
  test2.txt
```

在兩個 GCS URI 之間複製：

```bash
gcloud storage cp \
  gs://SOURCE_BUCKET/source.txt \
  gs://DESTINATION_BUCKET/archive/source.txt
```

遞迴複製整個本地資料夾：

```bash
gcloud storage cp --recursive \
  ./data \
  gs://BUCKET_NAME/landing/data/
```

## 步驟 5：搬移或重新命名 Object

```bash
gcloud storage mv \
  gs://BUCKET_NAME/test.txt \
  gs://BUCKET_NAME/archive/test.txt
```

在一般 Bucket 中，Object rename 實際上可能是 copy 加 delete。大量 Object 移動前，先評估操作費用、權限、版本控制與中斷恢復策略。

## 步驟 6：檢視 Object Metadata

```bash
gcloud storage objects describe \
  gs://BUCKET_NAME/test_folder/test.txt
```

可以從 metadata 確認：

- Object size。
- Content type。
- Creation time。
- Generation。
- Storage class。
- Hash 或 checksum。

資料管線排錯時，metadata 常比只看檔名更有用。

## 步驟 7：使用 `rsync` 同步

將本地資料夾同步到 GCS：

```bash
gcloud storage rsync --recursive \
  ./data \
  gs://BUCKET_NAME/data/
```

建議先使用 dry run 檢查會有哪些變更：

```bash
gcloud storage rsync --recursive --dry-run \
  ./data \
  gs://BUCKET_NAME/data/
```

### `rsync` 是有方向性的

`gcloud storage rsync SOURCE DESTINATION` 是由 Source 方向同步到 Destination。它不是一般意義的雙向同步工具：

```text
Local directory  ───────────▶  GCS prefix
```

如果有人先在 GCS 手動新增檔案，再從本地執行 local → GCS 的 `rsync`，不應期待檔案自動下載回本地。

這種單向行為反而符合大多數 ETL：

```text
Crawler / API → Local staging → GCS Bronze → BigQuery
```

如果真的需要把 GCS 掛載成類似本地檔案系統的介面，可以另外研究 Cloud Storage FUSE；但它有自己的快取、語意與效能限制，不應直接當成一般 POSIX 磁碟。

## 實用指令

查看指令說明：

```bash
gcloud storage --help
gcloud storage cp --help
gcloud storage rsync --help
```

查看 Bucket 使用量：

```bash
gcloud storage du --summarize gs://BUCKET_NAME
```

刪除單一 Object：

```bash
gcloud storage rm gs://BUCKET_NAME/test_folder/test.txt
```

遞迴刪除 prefix：

```bash
gcloud storage rm --recursive gs://BUCKET_NAME/test_folder/
```

## 常見問題

### 找不到本地檔案

確認目前工作目錄與檔案路徑：

```bash
pwd
ls -l test.txt
```

### 權限被拒

檢查目前登入帳號、Project 與 Bucket IAM。不要直接把 Bucket 設成公開來繞過權限問題。

### 不小心覆蓋了 Object

同名 Object 上傳可能建立新 generation 或覆蓋目前版本，行為取決於 Bucket 的 Object Versioning 與相關保護設定。重要資料上傳前，先確認 Object name、版本策略與 retention policy。

## 延伸閱讀

- [gcloud storage](https://cloud.google.com/sdk/gcloud/reference/storage)
- [gcloud storage cp](https://cloud.google.com/sdk/gcloud/reference/storage/cp)
- [gcloud storage rsync](https://cloud.google.com/sdk/gcloud/reference/storage/rsync)
- [Object metadata](https://cloud.google.com/storage/docs/metadata)
