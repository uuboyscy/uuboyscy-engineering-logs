---
sidebar_position: 0
---

# Introduction to BigQuery

BigQuery is a serverless data warehouse provided by Google Cloud, built for analyzing large volumes of data with SQL. You don't need to provision a VM or manage a database server first; as soon as you have a table, you can start running queries.

This chapter walks through a simple data engineering flow: uploading data from Cloud Storage, querying it in BigQuery, and then extending into Remote Function and Gemini integration.

## What Is BigQuery?

BigQuery is designed mainly for analytical (OLAP) workloads, such as:

- Tallying daily sales volume and revenue.
- Analyzing user behavior and conversion rates.
- Building datasets for BI reports or machine learning.
- Querying external data stored in Cloud Storage.

BigQuery and Cloud SQL serve different purposes:

| Service | Best suited for | Typical query pattern |
| --- | --- | --- |
| Cloud SQL | Transactional application database (OLTP) | Single-row reads/writes, transactions, indexed lookups |
| BigQuery | Large-scale data analysis (OLAP) | Aggregation, joins, trend analysis, batch processing |

## BigQuery Resource Hierarchy

BigQuery's typical resource hierarchy looks like this:

```text
Google Cloud Project
└── Dataset
    ├── Native Table
    ├── External Table
    └── Model / View / Routine
```

### Project

A project is Google Cloud's resource and billing boundary. BigQuery jobs, datasets, and storage are all tied to the project's permissions and billing settings.

### Dataset

A dataset is a container for tables, views, models, and routines. When you create a dataset, you must decide on a location up front, such as `asia-east1`.

Data used together in the same query should generally live in compatible geographic locations. If the Cloud Storage bucket, BigQuery dataset, connection, and related models span different regions, queries may fail to connect, or you may incur extra data transfer costs.

### Table

BigQuery has two common types of tables:

- **Native table**: Data is loaded into BigQuery-managed storage, generally suited to repeated queries and production analysis.
- **External table**: Data stays in Cloud Storage, and BigQuery reads the files at query time; suited to quick exploration or raw data that hasn't been fully imported yet.

## Native Table and External Table

| Comparison | Native table | External table |
| --- | --- | --- |
| Data location | BigQuery managed storage | External source such as Cloud Storage |
| Query performance | Generally more stable | Depends on the external files and source |
| Loading data | Requires running a load job | No need to move data into BigQuery first |
| Best suited for | Silver, Gold, production reporting | Bronze, exploration, temporary data |

An external table doesn't copy files into BigQuery. It creates a query entry point defined by a schema and a URI, while the original files stay in Cloud Storage.

## A Simple Data Engineering Flow

This chapter uses the following flow as a hands-on exercise:

```text
Local CSV
   │
   ▼
Cloud Storage bucket (Bronze / Raw)
   │
   ├── External table: quick exploration
   │
   └── Load job
          │
          ▼
BigQuery native table (Silver)
          │
          ▼
View / aggregated table (Gold)
```

## What You Will Learn

1. Create a BigQuery dataset and a Cloud Storage bucket.
2. Load a CSV file into a native table.
3. Create CSV, JSON Lines, and Hive-partitioned external tables.
4. Use a BigQuery connection to call a Remote Function backed by Cloud Run functions.
5. Have SQL call Gemini through a remote model and `ML.GENERATE_TEXT`.
6. Use Bronze, Silver, and Gold to reason about the boundaries of responsibility in a data pipeline.

## Prerequisites

Before you start, make sure you have:

- A Google Cloud project with billing enabled.
- The Google Cloud CLI (`gcloud`) installed and authenticated.
- A basic understanding of SQL's `SELECT`, `WHERE`, and `GROUP BY`.
- Familiarity with the basic purpose of GCS, Cloud Run functions, and BQML.

> Working with real cloud services can incur charges. Set a budget alert on your project and delete any resources you no longer need once you're done practicing. A budget alert is a notification mechanism: it does not automatically stop services.

## Further Reading

- [BigQuery documentation](https://cloud.google.com/bigquery/docs)
- [BigQuery locations](https://cloud.google.com/bigquery/docs/locations)
- [BigQuery pricing](https://cloud.google.com/bigquery/pricing)
- [Introduction to BigQuery ML](../06_BQML/01_bqml_introduction.md)
