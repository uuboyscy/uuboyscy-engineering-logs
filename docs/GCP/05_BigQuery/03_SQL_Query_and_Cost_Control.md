---
sidebar_position: 3
---

# SQL Queries and Cost Control

BigQuery uses Google Standard SQL. Beyond the SQL syntax itself, beginners also need to build the habit of asking "how much data will this query read?"

## Basic Query

```sql
SELECT
  product_id,
  product_name,
  price
FROM `PROJECT_ID.tkr101.sales`
WHERE category = 'Computer'
ORDER BY price DESC;
```

A BigQuery table reference typically uses a three-part name:

```text
project_id.dataset_id.table_id
```

If the query editor's default project is set correctly, you can sometimes omit the project, but for tutorials and production SQL it's best to keep the full name; doing so reduces the chance of querying the wrong table.

## Select Only the Columns You Need

Avoid using `SELECT *` aimlessly in production queries:

```sql
-- Not recommended: reads columns you don't need
SELECT *
FROM `PROJECT_ID.tkr101.sales`;

-- Recommended: only read the columns you need
SELECT
  product_id,
  category,
  price
FROM `PROJECT_ID.tkr101.sales`;
```

`SELECT * EXCEPT` is useful when there are many columns but you only want to exclude a few:

```sql
SELECT * EXCEPT(product_name)
FROM `PROJECT_ID.tkr101.sales`;
```

## Aggregation

```sql
SELECT
  category,
  COUNT(*) AS product_count,
  SUM(price) AS total_price,
  AVG(price) AS average_price
FROM `PROJECT_ID.tkr101.sales`
GROUP BY category
HAVING COUNT(*) >= 1
ORDER BY total_price DESC;
```

## Clean and Convert Values

Real-world data often contains empty strings, malformed values, or nulls. `SAFE_CAST` returns `NULL` on a failed conversion instead of failing the whole query:

```sql
SELECT
  product_id,
  SAFE_CAST(price AS NUMERIC) AS price_numeric
FROM `PROJECT_ID.tkr101.sales_external`
WHERE product_id IS NOT NULL;
```

## Window Functions and `QUALIFY`

Use a window function to find the most expensive product in each category:

```sql
SELECT
  product_id,
  product_name,
  category,
  price,
  ROW_NUMBER() OVER (
    PARTITION BY category
    ORDER BY price DESC
  ) AS category_rank
FROM `PROJECT_ID.tkr101.sales`
QUALIFY category_rank = 1;
```

`QUALIFY` lets you filter window function results directly, avoiding the need for an extra wrapping subquery.

## Arrays and `UNNEST`

BigQuery supports nested and repeated fields. The common way to query a repeated field is with `UNNEST`:

```sql
WITH orders AS (
  SELECT
    'O001' AS order_id,
    [
      STRUCT('P001' AS product_id, 2 AS quantity),
      STRUCT('P002' AS product_id, 1 AS quantity)
    ] AS items
)
SELECT
  order_id,
  item.product_id,
  item.quantity
FROM orders
CROSS JOIN UNNEST(items) AS item;
```

`UNNEST` expands an array into multiple rows. Check the data granularity before using it, or you may accidentally double-count values during a join or aggregation.

## Estimate Query Cost Before Running

Before running a query in the BigQuery console, check the estimated amount of data the query editor shows it will process. If the scope is too large, narrow the date range, columns, or tables before running it.

You can also do a dry run with `bq query`:

```bash
bq query \
  --use_legacy_sql=false \
  --dry_run \
  'SELECT category, COUNT(*) AS product_count
   FROM `PROJECT_ID.tkr101.sales`
   GROUP BY category'
```

## Set a Maximum Bytes Billed Limit

Set **Maximum bytes billed** in the console's query settings. If BigQuery estimates the query will exceed this limit, it fails before running, which is useful for protecting practice or development projects.

CLI example:

```bash
bq query \
  --use_legacy_sql=false \
  --maximum_bytes_billed=100000000 \
  'SELECT COUNT(*)
   FROM `PROJECT_ID.tkr101.sales`'
```

The limit in the example above is 100,000,000 bytes. Set it based on your own workload and cost strategy; don't treat it as a guarantee of query correctness.

## Query Cost Rules to Remember

- On-demand pricing bills based on the amount of data a query processes; check the latest pricing page for actual rates.
- Every table you query has a minimum billed data amount; a very small table doesn't mean every query against it is completely free.
- `LIMIT` doesn't necessarily reduce the amount scanned; if the data has no suitable partitioning or column pruning, BigQuery may still need to read a large amount of data.
- Select only the columns you need; avoid `SELECT *`.
- Use a partition filter on partitioned tables, e.g. `WHERE event_date >= ...`.
- Use explicit URIs, date paths, and only the necessary columns for external tables.
- Do a dry run before running large queries.
- Set `maximumBytesBilled` for automated jobs.
- Evaluate reservations, slots, or other pricing models when you need long-term, stable costs.

> BigQuery's minimum billed amount, free tier, and unit prices can change; a course shouldn't treat any fixed number as a permanent rule. Refer to the latest [BigQuery pricing](https://cloud.google.com/bigquery/pricing) and [cost best practices](https://cloud.google.com/bigquery/docs/best-practices-costs) pages for current details.

## Inspect Query Jobs

The BigQuery console's Job information panel shows the amount of data processed, run time, and any errors. You can also query recent jobs directly:

```sql
SELECT
  creation_time,
  user_email,
  job_type,
  statement_type,
  total_bytes_processed,
  total_bytes_billed
FROM `region-REGION_NAME`.INFORMATION_SCHEMA.JOBS_BY_PROJECT
WHERE creation_time >= TIMESTAMP_SUB(CURRENT_TIMESTAMP(), INTERVAL 1 DAY)
ORDER BY creation_time DESC;
```

Replace `REGION_NAME` with the actual region. The `INFORMATION_SCHEMA` query itself also needs to use the correct region-qualified view.

## Further Reading

- [Query syntax reference](https://cloud.google.com/bigquery/docs/reference/standard-sql/query-syntax)
- [Estimate and control costs](https://cloud.google.com/bigquery/docs/best-practices-costs)
- [Optimize query computation](https://cloud.google.com/bigquery/docs/best-practices-performance-compute)
- [Writing query results](https://cloud.google.com/bigquery/docs/writing-results)
