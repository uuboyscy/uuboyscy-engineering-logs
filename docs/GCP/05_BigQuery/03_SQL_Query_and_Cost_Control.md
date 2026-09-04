---
sidebar_position: 3
---

# SQL Queries and Cost Control

BigQuery 使用 Google Standard SQL。除了 SQL 語法本身，BigQuery 初學者也要同時建立「這個查詢會讀多少資料」的習慣。

## Basic Query

```sql
SELECT
  product_id,
  product_name,
  price
FROM `PROJECT_ID.TKR101.sales`
WHERE category = 'Computer'
ORDER BY price DESC;
```

BigQuery table reference 通常使用三段式名稱：

```text
project_id.dataset_id.table_id
```

如果 Query editor 的預設 Project 已正確設定，有時可以省略 Project，但教學與正式 SQL 建議保留完整名稱，減少查錯資料表的機會。

## Select Only the Columns You Need

避免在正式查詢中無目的地使用 `SELECT *`：

```sql
-- 不建議：會讀取不需要的欄位
SELECT *
FROM `PROJECT_ID.TKR101.sales`;

-- 建議：只讀取需要的欄位
SELECT
  product_id,
  category,
  price
FROM `PROJECT_ID.TKR101.sales`;
```

`SELECT * EXCEPT` 適合欄位很多，但只想排除少數欄位的情況：

```sql
SELECT * EXCEPT(product_name)
FROM `PROJECT_ID.TKR101.sales`;
```

## Aggregation

```sql
SELECT
  category,
  COUNT(*) AS product_count,
  SUM(price) AS total_price,
  AVG(price) AS average_price
FROM `PROJECT_ID.TKR101.sales`
GROUP BY category
HAVING COUNT(*) >= 1
ORDER BY total_price DESC;
```

## Clean and Convert Values

實際資料常包含空字串、錯誤格式或 Null。`SAFE_CAST` 轉換失敗時會回傳 `NULL`，不會讓整個查詢直接失敗：

```sql
SELECT
  product_id,
  SAFE_CAST(price AS NUMERIC) AS price_numeric
FROM `PROJECT_ID.TKR101.sales_external`
WHERE product_id IS NOT NULL;
```

## Window Functions and `QUALIFY`

使用 window function 計算每個分類中最貴的商品：

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
FROM `PROJECT_ID.TKR101.sales`
QUALIFY category_rank = 1;
```

`QUALIFY` 可以直接過濾 window function 的結果，避免再包一層 subquery。

## Arrays and `UNNEST`

BigQuery 支援 nested 與 repeated fields。查詢 repeated field 時，常見做法是使用 `UNNEST`：

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

`UNNEST` 會把 array 展開成多列。使用前先確認資料粒度，否則 Join 或聚合時可能不小心重複計算。

## Estimate Query Cost Before Running

在 BigQuery Console 執行查詢前，先查看 Query editor 顯示的估計處理資料量。若查詢範圍太大，先縮小日期、欄位或資料表，再執行。

也可以用 `bq query` 做 dry run：

```bash
bq query \
  --use_legacy_sql=false \
  --dry_run \
  'SELECT category, COUNT(*) AS product_count
   FROM `PROJECT_ID.TKR101.sales`
   GROUP BY category'
```

## Set a Maximum Bytes Billed Limit

在 Console 的 Query settings 中設定 **Maximum bytes billed**。如果 BigQuery 預估會超過上限，查詢會失敗而不執行，適合用來保護練習或開發 Project。

CLI 範例：

```bash
bq query \
  --use_legacy_sql=false \
  --maximum_bytes_billed=100000000 \
  'SELECT COUNT(*)
   FROM `PROJECT_ID.TKR101.sales`'
```

上例的上限是 100,000,000 bytes。請依自己的工作負載與成本策略設定，不要把它當成查詢正確性的保證。

## Query Cost Rules to Remember

- On-demand pricing 會依查詢處理的資料量計費；實際價格請查看最新 pricing page。
- 每個被查詢的 table 有最低計費資料量；很小的 table 也不代表每次查詢都完全免費。
- `LIMIT` 不一定能降低掃描量；如果資料沒有適合的分區或欄位裁切，BigQuery 仍可能需要讀取大量資料。
- 只選需要的欄位，避免 `SELECT *`。
- 對 partitioned table 使用 partition filter，例如 `WHERE event_date >= ...`。
- 對 external table 使用明確的 URI、日期路徑與必要欄位。
- 先 dry run，再執行大型查詢。
- 對自動化 job 設定 `maximumBytesBilled`。
- 需要長期穩定成本時，再評估 reservation、slot 或其他計費模式。

> BigQuery 的最低計費量、免費額度與單價可能變動；課程不應把某個固定數字當成永久規則。請以 [BigQuery pricing](https://cloud.google.com/bigquery/pricing) 與 [cost best practices](https://cloud.google.com/bigquery/docs/best-practices-costs) 的最新內容為準。

## Inspect Query Jobs

BigQuery Console 的 Job information 可以查看處理資料量、執行時間與錯誤。也可以查詢近期 job：

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

將 `REGION_NAME` 替換成實際的 region。`INFORMATION_SCHEMA` 查詢本身也要使用正確的 region-qualified view。

## Further Reading

- [Query syntax reference](https://cloud.google.com/bigquery/docs/reference/standard-sql/query-syntax)
- [Estimate and control costs](https://cloud.google.com/bigquery/docs/best-practices-costs)
- [Optimize query computation](https://cloud.google.com/bigquery/docs/best-practices-performance-compute)
- [Writing query results](https://cloud.google.com/bigquery/docs/writing-results)
