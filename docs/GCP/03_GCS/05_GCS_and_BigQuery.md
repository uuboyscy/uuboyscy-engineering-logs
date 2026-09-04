---
sidebar_position: 5
---

# GCS and BigQuery Integration

GCS 常被用作資料管線的原始資料落地區，BigQuery 則負責分析與資料轉換。兩者可以透過 External Table 連接，也可以把檔案正式載入 BigQuery Native table。

## Two Integration Patterns

| Pattern | 資料位置 | 適合情境 |
| --- | --- | --- |
| External table | 檔案留在 GCS | 快速探索、Bronze、檔案仍持續增加 |
| Load to Native table | 資料進入 BigQuery storage | 反覆查詢、Silver／Gold、穩定分析 |

External table 建立的是查詢入口，不會把檔案複製進 BigQuery。原始檔案仍然受 GCS IAM、lifecycle 與 object 管理影響。

## Recommended Folder Prefixes

雖然 GCS 沒有傳統資料夾，仍然建議使用一致的 Object name prefix：

```text
landing/source=sales/ingest_date=2026-06-27/sell.csv
landing/source=sales/ingest_date=2026-06-28/sell.csv
processed/source=sales/ingest_date=2026-06-27/sell.parquet
archive/source=sales/ingest_date=2026-06-27/sell.csv
```

Prefix 可以幫助：

- 依來源與日期查找資料。
- 設定 lifecycle rule。
- 讓 BigQuery external table 限定 URI 範圍。
- 區分 raw、processed 與 archive 的責任。

不要把不相容的檔案混在同一個 external table wildcard 範圍內。

## Create a CSV External Table

假設 GCS 上有：

```text
gs://BUCKET_NAME/landing/sell.csv
```

在 BigQuery Query editor 使用 Standard SQL：

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

查詢 External Table：

```sql
SELECT
  category,
  COUNT(*) AS product_count,
  SUM(price) AS total_price
FROM `PROJECT_ID.TKR101.sales_external`
GROUP BY category
ORDER BY total_price DESC;
```

建立前確認：

- Bucket 與 Dataset Location 相容。
- URI 指向正確的檔案。
- CSV header 已處理。
- Schema 與資料內容一致。
- 沒有把錯誤格式或非資料檔案放入 wildcard 範圍。

## JSON Lines Instead of a JSON Array

BigQuery External Table 使用 JSON 時，常見格式是 newline-delimited JSON（JSONL／NDJSON）：

```json
{"product_id":"P001","category":"Stationery","price":120}
{"product_id":"P002","category":"Computer","price":890}
```

不要把整個 JSON array 直接當成 JSON Lines：

```json
[
  {"product_id":"P001","price":120},
  {"product_id":"P002","price":890}
]
```

建立 JSON Lines External Table：

```sql
CREATE OR REPLACE EXTERNAL TABLE `PROJECT_ID.TKR101.sales_json_external`
(
  product_id STRING,
  category STRING,
  price INT64
)
OPTIONS (
  format = 'NEWLINE_DELIMITED_JSON',
  uris = ['gs://BUCKET_NAME/landing/sell-*.jsonl']
);
```

## Hive Partitioned Files

每天的資料可以依照 partition key 放在 prefix 中：

```text
gs://BUCKET_NAME/daily/dt=2026-06-27/sell.csv
gs://BUCKET_NAME/daily/dt=2026-06-28/sell.csv
```

建立 Hive-partitioned External Table：

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

使用 partition filter：

```sql
SELECT
  dt,
  category,
  COUNT(*) AS product_count,
  SUM(price) AS total_price
FROM `PROJECT_ID.TKR101.daily_sales_external`
WHERE dt = DATE '2026-06-27'
GROUP BY dt, category;
```

`daily/` 底下的檔案必須遵守同一種 partition path 與資料格式。不要把 README、不同 Schema 的 CSV 或未完成上傳的檔案放入同一個 wildcard 範圍。

## Load Data into a Native Table

當資料已確認穩定，可以從 GCS load 到 Native table：

```bash
bq --location=asia-east1 load \
  --source_format=CSV \
  --skip_leading_rows=1 \
  PROJECT_ID:TKR101.sales \
  gs://BUCKET_NAME/landing/sell.csv \
  product_id:STRING,product_name:STRING,category:STRING,price:INT64
```

或使用 SQL 將 External Table 轉成清理後的 table：

```sql
CREATE OR REPLACE TABLE `PROJECT_ID.TKR101.sales_silver` AS
SELECT
  TRIM(product_id) AS product_id,
  TRIM(product_name) AS product_name,
  NULLIF(TRIM(category), '') AS category,
  SAFE_CAST(price AS INT64) AS price
FROM `PROJECT_ID.TKR101.sales_external`
WHERE product_id IS NOT NULL;
```

External Table 適合 Bronze 與探索；Native table 通常更適合需要反覆查詢的 Silver／Gold。

## Data Pipeline Example

```text
Crawler / API
    │
    ▼
gcloud storage cp / application upload
    │
    ▼
GCS landing/（Bronze）
    │
    ├── External Table：檢查原始資料
    │
    └── Load / SQL transform
              │
              ▼
BigQuery sales_silver（Silver）
              │
              ▼
BigQuery sales_mart（Gold）
```

每一層都應該有清楚的責任：原始資料保留、轉換規則、資料品質、owner、更新頻率與清理政策。

## Integration Troubleshooting

### BigQuery cannot read the files

檢查：

- BigQuery service identity 或使用者是否有 GCS object viewer 權限。
- URI 是否拼寫正確。
- Bucket 與 Dataset Location 是否相容。
- 檔案格式與 External Table `format` 是否一致。
- wildcard 是否匹配到不相容檔案。

### CSV columns are shifted

檢查 CSV 的 delimiter、quote、header 與 newline 設定。正式資料不要只依賴 Auto-detect，應在建立 External Table 或 load job 時指定 Schema。

### New files are not included

確認新的 Object name 是否符合 external table URI 或 wildcard。External Table 只會讀取 URI 所涵蓋的資料，不會自動搜尋整個 Bucket。

### Query is slow or expensive

External Table 每次查詢都可能需要讀取 GCS 上的檔案。只選需要欄位、使用狹窄 URI 與 partition filter；對反覆使用的資料考慮載入 Native table。

## Further Reading

- [Create Cloud Storage external tables](https://cloud.google.com/bigquery/docs/external-data-cloud-storage)
- [Load CSV data from Cloud Storage](https://cloud.google.com/bigquery/docs/loading-data-cloud-storage-csv)
- [Hive-partitioned external tables](https://cloud.google.com/bigquery/docs/hive-partitioned-queries)
- [BigQuery locations](https://cloud.google.com/bigquery/docs/locations)
