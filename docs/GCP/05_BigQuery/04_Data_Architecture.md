---
sidebar_position: 4
---

# BigQuery Data Architecture

Data engineering is more than just loading files into BigQuery. What really matters is: what each layer of data is responsible for, who can use it, how it's validated, and when it can be rebuilt or deleted.

## Bronze, Silver, and Gold

A common layering approach looks like this:

```text
Source systems
    │
    ▼
Bronze / Raw
    │  Raw data, kept in its source format
    ▼
Silver / Cleaned
    │  Cleaned, standardized, deduplicated, type-converted
    ▼
Gold / Mart
       Aggregated around business questions, used by BI, APIs, or ML
```

### Bronze: Raw Data

The Bronze layer keeps the raw data received from APIs, databases, crawlers, or event systems:

- Preserve source columns and original values as much as possible.
- Record ingestion time, source, batch ID, or file URI.
- Can live in Cloud Storage or a BigQuery external table.
- Don't overwrite raw data directly at this layer, or you won't be able to rebuild it if something goes wrong.

### Silver: Cleaned Data

The Silver layer is standardized data that other data tasks can rely on consistently:

- Unify column names and data types.
- Convert dates and time zones.
- Remove obvious errors, and handle nulls and duplicates.
- Establish a stable primary key or business key.
- Record the results of data quality checks.

Example: cleaning an external CSV into a native table:

```sql
CREATE OR REPLACE TABLE `PROJECT_ID.tkr101.sales_silver` AS
SELECT
  TRIM(product_id) AS product_id,
  TRIM(product_name) AS product_name,
  NULLIF(TRIM(category), '') AS category,
  SAFE_CAST(price AS NUMERIC) AS price,
  CURRENT_TIMESTAMP() AS transformed_at
FROM `PROJECT_ID.tkr101.sales_external`
WHERE NULLIF(TRIM(product_id), '') IS NOT NULL;
```

### Gold: Business Data Mart

The Gold layer should directly answer business questions, such as daily revenue by category:

```sql
CREATE OR REPLACE TABLE `PROJECT_ID.tkr101.category_daily_sales` AS
SELECT
  CURRENT_DATE() AS snapshot_date,
  category,
  COUNT(*) AS product_count,
  SUM(price) AS total_price,
  AVG(price) AS average_price
FROM `PROJECT_ID.tkr101.sales_silver`
WHERE category IS NOT NULL
GROUP BY category;
```

The Gold layer might serve:

- BI dashboards.
- APIs or product features.
- Marketing segmentation and a Customer Data Platform.
- Feature tables for BigQuery ML.
- Downstream Reverse ETL.

## Data Contract

A data contract is an agreement between the data provider and its consumers. At minimum, it should specify:

| Item | Example |
| --- | --- |
| Column name | `product_id` |
| Type | `STRING` |
| Required rule | Must not be null |
| Format | `P` followed by three digits |
| Value range | `price >= 0` |
| Update frequency | Daily at 02:00 |
| Freshness SLA | Completed by T+1 06:00 |
| Change process | New columns require advance notice |

Without a data contract, an upstream team can easily rename a column, change its type, or alter null rules without warning, breaking downstream queries and dashboards at the same time.

## Data Quality Checks

After producing Silver or Gold data, check at least the following:

```sql
-- 1. Required field
SELECT COUNT(*) AS missing_product_id
FROM `PROJECT_ID.tkr101.sales_silver`
WHERE product_id IS NULL;

-- 2. Must not be negative
SELECT COUNT(*) AS invalid_price
FROM `PROJECT_ID.tkr101.sales_silver`
WHERE price < 0;

-- 3. Duplicate business key
SELECT
  product_id,
  COUNT(*) AS row_count
FROM `PROJECT_ID.tkr101.sales_silver`
GROUP BY product_id
HAVING COUNT(*) > 1;
```

If the query results don't meet the threshold, the pipeline should stop publishing the Gold table and route the error to monitoring or a quarantine table, instead of continuing to produce a report that looks fine but isn't.

## BigQuery and Dataform

As SQL transformations grow, you can manage them with Dataform:

- SQLX models and their dependencies.
- Tests and assertions.
- Dataset creation order.
- Scheduling and version control.
- Documentation and column descriptions.

You can start with BigQuery scheduled queries or a simple CLI setup; adopt Dataform or another orchestration tool once the SQL, tables, and team collaboration grow beyond that.

## Reverse ETL

Reverse ETL syncs cleaned-up columns, segments, or prediction results from BigQuery back to an operational system, such as a CRM, CDP, or marketing platform:

```text
Operational source
      │
      ▼
Bronze → Silver → Gold in BigQuery
                         │
                         ▼
                 Reverse ETL to CRM / CDP
```

Before syncing, confirm:

- Whether the Gold columns are clearly defined.
- Whether the destination system accepts nulls, duplicates, and delayed data.
- Whether you need upsert, soft delete, or a version column.
- Whether personal data complies with privacy and retention policies.
- Whether rerunning the job would cause duplicate notifications or duplicate charges.

## A Practical Checklist

When designing a BigQuery data pipeline, use the following checklist to review your own work:

- [ ] The dataset and Cloud Storage location strategy is decided.
- [ ] Bronze raw data can be traced back and rebuilt.
- [ ] Silver's column types, null handling, time zones, and dedup rules are defined.
- [ ] Gold tables map to clear business questions.
- [ ] Every production table has an owner, an update frequency, and column descriptions.
- [ ] Queries have partition filters or other scan controls.
- [ ] Jobs set a maximum bytes billed limit or an equivalent cost guardrail.
- [ ] IAM follows least privilege, without using a public bucket or public endpoint as a workaround.
- [ ] There's a quarantine process for failed data and results the model can't parse.
- [ ] Reruns don't cause duplicate writes or duplicate external side effects.

## Next Step: BigQuery ML

Once you've covered the BigQuery basics, continue with:

- [Introduction to BigQuery ML](../06_BQML/01_bqml_introduction.md)
- [BQML Sample: Purchase Propensity](../06_BQML/02_bqml_sample.md)

BQML builds on this chapter's data layering concepts: prepare a clean feature table first, then build a model, evaluate the results, and run predictions.

## Further Reading

- [BigQuery data warehouse overview](https://cloud.google.com/bigquery/docs/introduction)
- [BigQuery best practices for performance](https://cloud.google.com/bigquery/docs/best-practices-performance-overview)
- [Dataform documentation](https://cloud.google.com/dataform/docs)
- [BigQuery ML overview](https://cloud.google.com/bigquery/docs/bqml-introduction)
