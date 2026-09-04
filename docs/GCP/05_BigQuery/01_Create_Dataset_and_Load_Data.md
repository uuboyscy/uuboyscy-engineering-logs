---
sidebar_position: 1
---

# Create a Dataset and Load Data

這一篇會建立一個練習用 Dataset，將 CSV 上傳到 Cloud Storage，再載入 BigQuery Native table。操作可以使用 Google Cloud Console，也可以使用 CLI。

## Configuration Used in This Tutorial

以下名稱只是範例，請替換成自己的 Project 與 bucket 名稱：

```text
PROJECT_ID  = your-project-id
REGION      = asia-east1
DATASET_ID  = TKR101
BUCKET_NAME = your-globally-unique-bucket-name
```

BigQuery Dataset 與 Cloud Storage bucket 建議使用相同的 Region。Dataset 建立後不能直接修改 Location；如果位置選錯，通常需要重新建立 Dataset。

## Step 1: Select a Project

在 Cloud Console 右上角的 Project selector 選擇練習用 Project，或在終端機設定：

```bash
gcloud auth login
gcloud projects list
gcloud config set project PROJECT_ID
```

確認目前使用的 Project：

```bash
gcloud config get-value project
```

## Step 2: Enable APIs

第一次使用相關服務時，可以啟用必要的 API：

```bash
gcloud services enable \
  bigquery.googleapis.com \
  bigqueryconnection.googleapis.com \
  storage.googleapis.com
```

## Step 3: Create a Cloud Storage Bucket

### Using the Console

1. 開啟 **Cloud Storage** → **Buckets**。
2. 點選 **Create**。
3. 輸入全域唯一的 bucket name。
4. Location type 選擇 **Region**。
5. Location 選擇 `asia-east1`。
6. 依練習需求設定資料存取權限；不要為了方便而開啟公開存取。
7. 點選 **Create**。

### Using the CLI

```bash
gcloud storage buckets create gs://BUCKET_NAME \
  --location=asia-east1
```

列出目前 Project 可以看到的 bucket：

```bash
gcloud storage ls
```

## Step 4: Prepare a CSV File

建立一個簡單的 `sell.csv`，第一列是欄位名稱：

```csv
product_id,product_name,category,price
P001,Notebook,Stationery,120
P002,Keyboard,Computer,890
P003,Coffee,Food,80
P004,Monitor,Computer,4990
```

這個範例的 Schema 是：

| 欄位 | BigQuery type | 說明 |
| --- | --- | --- |
| `product_id` | `STRING` | 商品編號 |
| `product_name` | `STRING` | 商品名稱 |
| `category` | `STRING` | 商品分類 |
| `price` | `INT64` | 商品價格 |

## Step 5: Upload the CSV to GCS

```bash
gcloud storage cp sell.csv gs://BUCKET_NAME/landing/sell.csv
```

確認檔案已上傳：

```bash
gcloud storage ls gs://BUCKET_NAME/landing/
```

GCS 的資料夾只是 object name 的前綴。`landing/` 看起來像資料夾，但 Cloud Storage 本質上仍是 object storage。

## Step 6: Create a Dataset

### Using the Console

1. 開啟 **BigQuery**。
2. 在 Explorer 找到目前的 Project，點選旁邊的 **More**。
3. 選擇 **Create dataset**。
4. Dataset ID 輸入 `TKR101`。
5. Data location 選擇 `asia-east1`。
6. 點選 **Create dataset**。

### Using the CLI

```bash
bq --location=asia-east1 mk \
  --dataset \
  PROJECT_ID:TKR101
```

## Step 7: Load a Native Table in the Console

1. 在 Dataset `TKR101` 旁點選 **More** → **Create table**。
2. Source 選擇 **Google Cloud Storage**。
3. 選取 `gs://BUCKET_NAME/landing/sell.csv`。
4. File format 選擇 **CSV**。
5. Destination 選擇 Dataset `TKR101`，Table 輸入 `sales`。
6. Table type 使用 **Native table**。
7. Schema 不要只依賴 Auto-detect，請確認欄位型別：
   - `product_id`: `STRING`
   - `product_name`: `STRING`
   - `category`: `STRING`
   - `price`: `INT64`
8. 在 Advanced options 將 **Header rows to skip** 設為 `1`。
9. 點選 **Create table**。

## Step 8: Load a Native Table with `bq`

也可以使用 CLI 執行 load job：

```bash
bq --location=asia-east1 load \
  --source_format=CSV \
  --skip_leading_rows=1 \
  PROJECT_ID:TKR101.sales \
  gs://BUCKET_NAME/landing/sell.csv \
  product_id:STRING,product_name:STRING,category:STRING,price:INT64
```

查看 Dataset 中的資料表：

```bash
bq ls PROJECT_ID:TKR101
```

查看 Schema：

```bash
bq show PROJECT_ID:TKR101.sales
```

## Step 9: Verify the Data

在 BigQuery Query editor 使用 Standard SQL：

```sql
SELECT
  product_id,
  product_name,
  category,
  price
FROM `PROJECT_ID.TKR101.sales`
ORDER BY price DESC;
```

也可以先檢查資料筆數與價格統計：

```sql
SELECT
  category,
  COUNT(*) AS product_count,
  AVG(price) AS average_price,
  MAX(price) AS highest_price
FROM `PROJECT_ID.TKR101.sales`
GROUP BY category
ORDER BY product_count DESC;
```

## Common Problems

### Dataset and bucket location are different

先確認 Dataset 與 bucket 的 Location。跨位置載入可能失敗，也可能產生資料傳輸費用。建立 Dataset 與 bucket 時，先決定一套區域策略，再讓後續的 Connection、Cloud Run functions 與模型遵循同一策略。

### Header becomes a data row

如果 CSV 第一列是欄位名稱，Console 的 **Header rows to skip** 或 CLI 的 `--skip_leading_rows=1` 不可遺漏。

### Auto-detect chooses the wrong type

小型 CSV 很容易讓 Auto-detect 誤判型別，尤其是編號欄位、日期欄位與可能包含空值的欄位。正式資料建議明確指定 Schema，並在 load 後檢查 Schema 與資料品質。

### Permission denied

確認目前登入的帳號具有 BigQuery 與 Cloud Storage 的必要權限。不要直接把 bucket 設成公開來繞過 IAM 問題。

## Cleanup

完成練習後，依序檢查並刪除不需要的 Dataset、Table、bucket 與其他雲端資源：

```bash
bq rm -r -f PROJECT_ID:TKR101
# 確認 bucket 內沒有需要保留的資料後，再執行：
gcloud storage rm --recursive gs://BUCKET_NAME
```

## Further Reading

- [Create datasets](https://cloud.google.com/bigquery/docs/datasets)
- [Load CSV data from Cloud Storage](https://cloud.google.com/bigquery/docs/loading-data-cloud-storage-csv)
- [Cloud Storage bucket locations](https://cloud.google.com/storage/docs/locations)
