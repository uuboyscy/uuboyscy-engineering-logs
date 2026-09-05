---
sidebar_position: 5
---

# GCS and BigQuery Integration

GCS is commonly used as the landing zone for raw data in a pipeline, while BigQuery handles analysis and transformation. The two can be connected through an external table, or files can be formally loaded into a BigQuery native table.

## Two Integration Patterns

| Pattern | Data location | Good fit for |
| --- | --- | --- |
| External table | Files stay in GCS | Quick exploration, Bronze, files that keep growing |
| Load to native table | Data moves into BigQuery storage | Repeated queries, Silver/Gold, stable analysis |

An external table creates a query entry point — it doesn't copy the files into BigQuery. The original files remain subject to GCS IAM, lifecycle rules, and object management.

## Recommended Folder Prefixes

Even though GCS has no traditional folders, it's still worth using consistent object name prefixes:

```text
landing/source=sales/ingest_date=2026-06-27/sell.csv
landing/source=sales/ingest_date=2026-06-28/sell.csv
processed/source=sales/ingest_date=2026-06-27/sell.parquet
archive/source=sales/ingest_date=2026-06-27/sell.csv
```

Prefixes help you:

- Find data by source and date.
- Set up lifecycle rules.
- Scope a BigQuery external table's URIs.
- Separate the responsibilities of raw, processed, and archive data.

Don't mix incompatible files within the same external table wildcard scope.

## Create a CSV External Table

Suppose you have the following on GCS:

```text
gs://BUCKET_NAME/landing/sell.csv
```

In the BigQuery query editor, using Standard SQL:

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

Before creating it, confirm:

- The bucket and dataset locations are compatible.
- The URI points to the correct file.
- The CSV header is handled correctly.
- The schema matches the actual data.
- No wrongly formatted or non-data files are included in the wildcard scope.

## JSON Lines Instead of a JSON Array

When a BigQuery external table uses JSON, the common format is newline-delimited JSON (JSONL/NDJSON):

```json
{"product_id":"P001","category":"Stationery","price":120}
{"product_id":"P002","category":"Computer","price":890}
```

Don't treat an entire JSON array as if it were JSON Lines:

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
  category STRING,
  price INT64
)
OPTIONS (
  format = 'NEWLINE_DELIMITED_JSON',
  uris = ['gs://BUCKET_NAME/landing/sell-*.jsonl']
);
```

## Hive Partitioned Files

Daily data can be organized under a prefix by partition key:

```text
gs://BUCKET_NAME/daily/dt=2026-06-27/sell.csv
gs://BUCKET_NAME/daily/dt=2026-06-28/sell.csv
```

Create a Hive-partitioned external table:

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

Using a partition filter:

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

Files under `daily/` must follow the same partition path structure and data format. Don't include README files, CSVs with a different schema, or partially uploaded files in the same wildcard scope.

## Load Data into a Native Table

Once the data is confirmed stable, you can load it from GCS into a native table:

```bash
bq --location=asia-east1 load \
  --source_format=CSV \
  --skip_leading_rows=1 \
  PROJECT_ID:TKR101.sales \
  gs://BUCKET_NAME/landing/sell.csv \
  product_id:STRING,product_name:STRING,category:STRING,price:INT64
```

Or use SQL to turn the external table into a cleaned-up table:

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

External tables are good for Bronze and exploration; native tables are usually a better fit for Silver/Gold that needs to be queried repeatedly.

## Data Pipeline Example

```text
Crawler / API
    │
    ▼
gcloud storage cp / application upload
    │
    ▼
GCS landing/ (Bronze)
    │
    ├── External table: inspect the raw data
    │
    └── Load / SQL transform
              │
              ▼
BigQuery sales_silver (Silver)
              │
              ▼
BigQuery sales_mart (Gold)
```

Each layer should have clear responsibilities: raw data retention, transformation rules, data quality, ownership, update frequency, and cleanup policy.

## Integration Troubleshooting

### BigQuery cannot read the files

Check:

- Whether the BigQuery service identity or user has GCS object viewer permission.
- Whether the URI is spelled correctly.
- Whether the bucket and dataset locations are compatible.
- Whether the file format matches the external table's `format`.
- Whether the wildcard is matching incompatible files.

### CSV columns are shifted

Check the CSV's delimiter, quoting, header, and newline settings. Don't rely on auto-detect alone for production data — specify the schema explicitly when creating the external table or load job.

### New files are not included

Confirm that the new object name matches the external table's URI or wildcard. An external table only reads data covered by its URI — it doesn't automatically search the entire bucket.

### Query is slow or expensive

An external table may need to read the files on GCS on every query. Select only the columns you need, use a narrow URI and partition filter, and consider loading frequently-used data into a native table instead.

## Further Reading

- [Create Cloud Storage external tables](https://cloud.google.com/bigquery/docs/external-data-cloud-storage)
- [Load CSV data from Cloud Storage](https://cloud.google.com/bigquery/docs/loading-data-cloud-storage-csv)
- [Hive-partitioned external tables](https://cloud.google.com/bigquery/docs/hive-partitioned-queries)
- [BigQuery locations](https://cloud.google.com/bigquery/docs/locations)
