---
sidebar_position: 2
---

# External Tables and Hive Partitioning

External table 讓 BigQuery 直接查詢 Cloud Storage 上的檔案，不必先把原始檔案載入 BigQuery managed storage。這很適合資料管線的 Bronze 層與第一次探索資料。

## When Should You Use an External Table?

External table 適合：

- 原始資料仍在整理，想先確認內容。
- 檔案會由爬蟲或 API 持續寫入 Cloud Storage。
- 希望保留原始檔案，避免一開始就複製資料。
- 需要查詢 CSV、JSON Lines、Parquet、Avro 或 ORC 等檔案。

Native table 通常更適合：

- 需要反覆查詢的 Silver、Gold 資料。
- 需要穩定的查詢效能與 BigQuery 原生分區。
- 需要透過 SQL 或 Dataform 管理轉換後的資料。

External table 的查詢效能可能低於 Native table。不要只因為少了一次 load job，就把所有正式報表都建立在外部檔案上。

## Step 1: Create a CSV External Table in the Console

1. 開啟 BigQuery，找到 Dataset `TKR101`。
2. 點選 Dataset 旁的 **More** → **Create table**。
3. Source 選擇 **Google Cloud Storage**。
4. 選取 `gs://BUCKET_NAME/landing/sell.csv`。
5. File format 選擇 **CSV**。
6. Table type 選擇 **External table**。
7. 手動建立 Schema：
   - `product_id STRING`
   - `product_name STRING`
   - `category STRING`
   - `price INT64`
8. 將 Header rows to skip 設為 `1`。
9. 點選 **Create table**。

建立後，Explorer 會標示這是一個 External table。可以先使用 Preview 確認欄位，但正式查詢仍應注意掃描量與檔案格式。

## Step 2: Create a CSV External Table with SQL

```sql
CREATE OR REPLACE EXTERNAL TABLE `PROJECT_ID.TKR101.sales_external`
(
  product_id STRING,
  product_name STRING,
  category STRING,
  price INT64
)
OPTIONS (
  format = 'CSV',
  uris = ['gs://BUCKET_NAME/landing/sell.csv'],
  skip_leading_rows = 1
);
```

查詢外部表：

```sql
SELECT
  category,
  COUNT(*) AS product_count,
  SUM(price) AS total_price
FROM `PROJECT_ID.TKR101.sales_external`
GROUP BY category
ORDER BY total_price DESC;
```

## Step 3: Use JSON Lines Correctly

BigQuery 查詢 JSON 檔案時，常見的格式是 newline-delimited JSON（JSONL 或 NDJSON）：每一行是一個獨立的 JSON object。

```json
{"product_id":"P001","product_name":"Notebook","category":"Stationery","price":120}
{"product_id":"P002","product_name":"Keyboard","category":"Computer","price":890}
```

不要把整個檔案存成一個 JSON array 再直接當作 JSON Lines 上傳：

```json
[
  {"product_id":"P001","price":120},
  {"product_id":"P002","price":890}
]
```

建立 JSON Lines external table：

```sql
CREATE OR REPLACE EXTERNAL TABLE `PROJECT_ID.TKR101.sales_json_external`
(
  product_id STRING,
  product_name STRING,
  category STRING,
  price INT64
)
OPTIONS (
  format = 'NEWLINE_DELIMITED_JSON',
  uris = ['gs://BUCKET_NAME/landing/sell-*.jsonl']
);
```

## Step 4: Organize Files for Hive Partitioning

如果資料每天落地，可以使用 partition key 放在 object path 中：

```text
gs://BUCKET_NAME/daily/dt=2026-06-27/sell.csv
gs://BUCKET_NAME/daily/dt=2026-06-28/sell.csv
gs://BUCKET_NAME/daily/dt=2026-06-29/sell.csv
```

`dt=...` 是 Hive partitioning 常見的路徑格式。路徑必須一致，否則 BigQuery 無法正確辨識 partition key。

## Step 5: Create a Hive-Partitioned External Table

```sql
CREATE OR REPLACE EXTERNAL TABLE `PROJECT_ID.TKR101.daily_sales_external`
(
  product_id STRING,
  product_name STRING,
  category STRING,
  price INT64
)
WITH PARTITION COLUMNS (
  dt DATE
)
OPTIONS (
  format = 'CSV',
  uris = ['gs://BUCKET_NAME/daily/*'],
  hive_partition_uri_prefix = 'gs://BUCKET_NAME/daily/',
  skip_leading_rows = 1
);
```

查詢特定日期：

```sql
SELECT
  dt,
  category,
  COUNT(*) AS product_count,
  SUM(price) AS total_price
FROM `PROJECT_ID.TKR101.daily_sales_external`
WHERE dt BETWEEN DATE '2026-06-27' AND DATE '2026-06-29'
GROUP BY dt, category
ORDER BY dt, total_price DESC;
```

查詢時要帶上 partition filter。這除了讓意圖更清楚，也能避免不必要地讀取所有日期的檔案。

## External Table Checklist

建立 external table 前，請逐項確認：

- Cloud Storage bucket 與 Dataset 的 Location 相容。
- URI 使用 `gs://`，且 wildcard 範圍沒有包含不相容格式的檔案。
- CSV 是否要跳過 header。
- Schema 是否手動指定，避免 Auto-detect 誤判。
- JSON 是否為一行一個 object。
- Hive path 是否使用一致的 `key=value` 格式。
- 正式查詢是否只讀取需要的欄位與日期範圍。
- 外部檔案是否會被移動或刪除；URI 改變會讓查詢失敗。

## External Table vs. Native Table Conversion

當資料確認穩定後，可以把查詢結果寫入 Native table：

```sql
CREATE OR REPLACE TABLE `PROJECT_ID.TKR101.sales_cleaned` AS
SELECT
  CAST(product_id AS STRING) AS product_id,
  product_name,
  category,
  SAFE_CAST(price AS INT64) AS price
FROM `PROJECT_ID.TKR101.sales_external`
WHERE product_id IS NOT NULL;
```

這是一個簡單的 Bronze → Silver 轉換。正式環境還應加入資料品質檢查、重複資料處理與載入紀錄。

## Further Reading

- [Create Cloud Storage external tables](https://cloud.google.com/bigquery/docs/external-data-cloud-storage)
- [Load CSV data from Cloud Storage](https://cloud.google.com/bigquery/docs/loading-data-cloud-storage-csv)
- [Hive partitioned external tables](https://cloud.google.com/bigquery/docs/hive-partitioned-queries)
