---
sidebar_position: 2
---

# External Tables and Hive Partitioning

An external table lets BigQuery query files on Cloud Storage directly, without first loading the raw files into BigQuery-managed storage. This is well suited to the Bronze layer of a data pipeline and to first-pass data exploration.

## When Should You Use an External Table?

External tables are a good fit when:

- The raw data is still being sorted out and you just want to check its contents.
- Files are continuously written to Cloud Storage by a crawler or an API.
- You want to keep the original files rather than copying data right away.
- You need to query CSV, JSON Lines, Parquet, Avro, or ORC files.

Native tables are usually a better fit when:

- You need repeated queries against Silver or Gold data.
- You need stable query performance and BigQuery's native partitioning.
- You need to manage transformed data through SQL or Dataform.

External table query performance can be lower than native tables. Don't build every production report on external files just to skip one load job.

## Step 1: Create a CSV External Table in the Console

1. Open BigQuery and find the `TKR101` dataset.
2. Click **More** → **Create table** next to the dataset.
3. For the source, select **Google Cloud Storage**.
4. Select `gs://BUCKET_NAME/landing/sell.csv`.
5. For the file format, select **CSV**.
6. For the table type, select **External table**.
7. Define the schema manually:
   - `product_id STRING`
   - `product_name STRING`
   - `category STRING`
   - `price INT64`
8. Set Header rows to skip to `1`.
9. Click **Create table**.

Once created, Explorer will mark it as an external table. You can use Preview to check the columns, but production queries should still pay attention to the amount of data scanned and the file format.

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

Query the external table:

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

When BigQuery queries JSON files, the common format is newline-delimited JSON (JSONL or NDJSON): each line is a separate JSON object.

```json
{"product_id":"P001","product_name":"Notebook","category":"Stationery","price":120}
{"product_id":"P002","product_name":"Keyboard","category":"Computer","price":890}
```

Don't save the whole file as a single JSON array and upload it as if it were JSON Lines:

```json
[
  {"product_id":"P001","price":120},
  {"product_id":"P002","price":890}
]
```

Create a JSON Lines external table:

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

If data lands daily, you can place a partition key in the object path:

```text
gs://BUCKET_NAME/daily/dt=2026-06-27/sell.csv
gs://BUCKET_NAME/daily/dt=2026-06-28/sell.csv
gs://BUCKET_NAME/daily/dt=2026-06-29/sell.csv
```

`dt=...` is the common path format for Hive partitioning. Paths must be consistent, or BigQuery won't be able to correctly recognize the partition key.

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

Query a specific date range:

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

Always include a partition filter in your queries. Besides making the intent clearer, it avoids unnecessarily reading files for every date.

## External Table Checklist

Before creating an external table, check each of the following:

- The Cloud Storage bucket and dataset locations are compatible.
- The URI uses `gs://`, and the wildcard range doesn't sweep in files of an incompatible format.
- Whether the CSV needs the header skipped.
- Whether the schema is specified manually, to avoid auto-detect getting it wrong.
- Whether the JSON has one object per line.
- Whether the Hive path uses a consistent `key=value` format.
- Whether production queries only read the columns and date range they actually need.
- Whether the external files might be moved or deleted; a changed URI will break queries.

## External Table vs. Native Table Conversion

Once the data is confirmed to be stable, you can write the query results into a native table:

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

This is a simple Bronze → Silver transformation. A production environment should also add data quality checks, deduplication, and load logging.

## Further Reading

- [Create Cloud Storage external tables](https://cloud.google.com/bigquery/docs/external-data-cloud-storage)
- [Load CSV data from Cloud Storage](https://cloud.google.com/bigquery/docs/loading-data-cloud-storage-csv)
- [Hive partitioned external tables](https://cloud.google.com/bigquery/docs/hive-partitioned-queries)
