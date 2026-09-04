---
sidebar_position: 1
---

# Create a Cloud Storage Bucket

這一篇會建立一個 GCS Bucket，並設定適合資料工程練習的 Region、Uniform bucket-level access 與 Public access prevention。

## Configuration Used in This Tutorial

以下名稱請替換成自己的值：

```text
PROJECT_ID  = your-project-id
BUCKET_NAME = tkr101-your-name-random-id
REGION      = asia-east1
```

Bucket name 必須全球唯一。可以在 `tkr101` 後面加上名字或隨機字串，降低命名衝突的機會。

## Step 1: Select a Project

登入 Google Cloud CLI 並選擇 Project：

```bash
gcloud auth login
gcloud projects list
gcloud config set project PROJECT_ID
gcloud config get-value project
```

確認輸出的 Project ID 是預期的練習 Project，再進行後續操作。

## Step 2: Create a Bucket in the Console

1. 開啟 Google Cloud Console。
2. 進入 **Cloud Storage** → **Buckets**。
3. 點選 **Create**。
4. 輸入全域唯一的 Bucket name。
5. Location type 選擇 **Region**。
6. Location 選擇 `asia-east1`（Taiwan）。
7. 依需求選擇 Default storage class；練習可使用 **Standard**。
8. Access control 選擇 **Uniform**，讓權限統一由 IAM 管理。
9. 確認 **Public access prevention** 保持啟用。
10. 點選 **Create**。

課程錄音中示範使用 Taiwan Region，主要是為了讓人在台灣操作時有較低的網路延遲。正式專案應依資料所在地、法規、服務相容性與成本一起決定 Location。

## Step 3: Create a Bucket with `gcloud`

```bash
gcloud storage buckets create gs://BUCKET_NAME \
  --project=PROJECT_ID \
  --location=asia-east1 \
  --uniform-bucket-level-access \
  --public-access-prevention
```

查看 Bucket 設定：

```bash
gcloud storage buckets describe gs://BUCKET_NAME
```

列出目前 Project 可看到的 Bucket：

```bash
gcloud storage ls
```

## Step 4: Understand Location Choices

常見 Location 類型如下：

| Location type | 說明 | 常見用途 |
| --- | --- | --- |
| Region | 單一區域 | 區域型資料管線、較低延遲 |
| Dual-region | 兩個區域 | 兼顧可用性與資料位置 |
| Multi-region | 一個大型地理區域 | 跨區域服務與較廣泛的存取 |

Location 建立後不能任意修改。若要換位置，通常要建立新的 Bucket，再搬移或重新產生 Object。

與 BigQuery 整合時，要確認 GCS Bucket 和 BigQuery Dataset 的 Location 相容。不同位置可能造成 load 或 external table 操作失敗，也可能產生資料傳輸費用。

## Step 5: Configure Labels

Labels 可以幫助分類與分析資源，例如：

```text
environment = learning
owner       = your-name
course      = tkr101
```

標籤命名規則與可用欄位需符合 Google Cloud 的限制。正式環境建議一開始就建立一致的命名與標籤策略。

## Bucket Creation Checklist

建立 Bucket 前確認：

- [ ] Project ID 正確。
- [ ] Bucket name 全球唯一。
- [ ] Location 符合資料治理與服務相容性要求。
- [ ] Storage class 符合取用頻率。
- [ ] 使用 Uniform bucket-level access。
- [ ] Public access prevention 保持啟用，除非有明確公開需求。
- [ ] 已設定 owner、environment 等 labels。
- [ ] 已經知道練習結束後如何清理資料。

## Common Problems

### `You already own this bucket`

Bucket name 已經存在於你的帳號或 Project 中。若只是重新執行指令，請改用 `describe` 檢查設定；若是命名衝突，請換一個全球唯一名稱。

### `The bucket you tried to create already exists`

這通常代表名稱被其他 Google Cloud 使用者占用。Bucket namespace 是全球共用的，換名稱即可。

### Location is not compatible

先確認資料來源、BigQuery Dataset、Cloud Run 或其他整合服務的 Location。不要等到查詢失敗後才開始改區域設計。

## Further Reading

- [Create a bucket](https://cloud.google.com/storage/docs/creating-buckets)
- [Bucket locations](https://cloud.google.com/storage/docs/locations)
- [Bucket naming guidelines](https://cloud.google.com/storage/docs/buckets#naming)
