---
sidebar_position: 1
---

# Create a Dataset and Load Data

This tutorial creates a practice dataset, uploads a CSV file to Cloud Storage, and then loads it into a BigQuery native table. You can follow along using the Google Cloud console or the CLI.

## Configuration Used in This Tutorial

The following names are just examples; replace them with your own project and bucket names:

```text
PROJECT_ID  = your-project-id
REGION      = asia-east1
dataset_id  = tkr101
BUCKET_NAME = your-globally-unique-bucket-name
```

It's recommended to use the same region for the BigQuery dataset and the Cloud Storage bucket. Once a dataset is created, its location can't be changed directly; if you pick the wrong one, you'll usually need to recreate the dataset.

## Step 1: Select a Project

Use the project selector in the top-right corner of the Cloud console to choose your practice project, or set it from the terminal:

```bash
gcloud auth login
gcloud projects list
gcloud config set project PROJECT_ID
```

Confirm which project is currently active:

```bash
gcloud config get-value project
```

## Step 2: Enable APIs

If this is your first time using these services, enable the required APIs:

```bash
gcloud services enable \
  bigquery.googleapis.com \
  bigqueryconnection.googleapis.com \
  storage.googleapis.com
```

## Step 3: Create a Cloud Storage Bucket

### Using the Console

1. Open **Cloud Storage** → **Buckets**.
2. Click **Create**.
3. Enter a globally unique bucket name.
4. For the location type, select **Region**.
5. Set the location to `asia-east1`.
6. Configure data access permissions to fit your exercise; don't enable public access just for convenience.
7. Click **Create**.

### Using the CLI

```bash
gcloud storage buckets create gs://BUCKET_NAME \
  --location=asia-east1
```

List the buckets visible in the current project:

```bash
gcloud storage ls
```

## Step 4: Prepare a CSV File

Create a simple `sell.csv` file with a header row:

```csv
product_id,product_name,category,price
P001,Notebook,Stationery,120
P002,Keyboard,Computer,890
P003,Coffee,Food,80
P004,Monitor,Computer,4990
```

This example's schema is:

| Column | BigQuery type | Description |
| --- | --- | --- |
| `product_id` | `STRING` | Product ID |
| `product_name` | `STRING` | Product name |
| `category` | `STRING` | Product category |
| `price` | `INT64` | Product price |

## Step 5: Upload the CSV to GCS

```bash
gcloud storage cp sell.csv gs://BUCKET_NAME/landing/sell.csv
```

Confirm the file was uploaded:

```bash
gcloud storage ls gs://BUCKET_NAME/landing/
```

A "folder" in GCS is really just a prefix on the object name. `landing/` looks like a folder, but Cloud Storage is fundamentally still object storage.

## Step 6: Create a Dataset

### Using the Console

1. Open **BigQuery**.
2. In Explorer, find your current project and click **More** next to it.
3. Select **Create dataset**.
4. Enter `tkr101` as the dataset ID.
5. Set the data location to `asia-east1`.
6. Click **Create dataset**.

### Using the CLI

```bash
bq --location=asia-east1 mk \
  --dataset \
  PROJECT_ID:tkr101
```

## Step 7: Load a Native Table in the Console

1. Next to the `tkr101` dataset, click **More** → **Create table**.
2. For the source, select **Google Cloud Storage**.
3. Select `gs://BUCKET_NAME/landing/sell.csv`.
4. For the file format, select **CSV**.
5. For the destination, choose the `tkr101` dataset and enter `sales` as the table name.
6. Use **Native table** as the table type.
7. Don't rely solely on auto-detect for the schema; confirm the column types yourself:
   - `product_id`: `STRING`
   - `product_name`: `STRING`
   - `category`: `STRING`
   - `price`: `INT64`
8. Under Advanced options, set **Header rows to skip** to `1`.
9. Click **Create table**.

## Step 8: Load a Native Table with `bq`

You can also run the load job from the CLI:

```bash
bq --location=asia-east1 load \
  --source_format=CSV \
  --skip_leading_rows=1 \
  PROJECT_ID:tkr101.sales \
  gs://BUCKET_NAME/landing/sell.csv \
  product_id:STRING,product_name:STRING,category:STRING,price:INT64
```

List the tables in the dataset:

```bash
bq ls PROJECT_ID:tkr101
```

Check the schema:

```bash
bq show PROJECT_ID:tkr101.sales
```

## Step 9: Verify the Data

In the BigQuery query editor, run Standard SQL:

```sql
SELECT
  product_id,
  product_name,
  category,
  price
FROM `PROJECT_ID.tkr101.sales`
ORDER BY price DESC;
```

You can also check the row count and price statistics first:

```sql
SELECT
  category,
  COUNT(*) AS product_count,
  AVG(price) AS average_price,
  MAX(price) AS highest_price
FROM `PROJECT_ID.tkr101.sales`
GROUP BY category
ORDER BY product_count DESC;
```

## Common Problems

### Dataset and bucket location are different

Double-check the location of the dataset and the bucket. Loading data across locations can fail, or incur data transfer charges. Decide on a regional strategy up front when creating the dataset and bucket, and keep any later connections, Cloud Run functions, and models consistent with it.

### Header becomes a data row

If the first row of the CSV is a header, don't forget to set **Header rows to skip** in the console, or `--skip_leading_rows=1` on the CLI.

### Auto-detect chooses the wrong type

Small CSV files can easily trip up auto-detect, especially for ID columns, date columns, and columns that may contain nulls. For production data, it's best to specify the schema explicitly and verify the schema and data quality after loading.

### Permission denied

Confirm the account you're signed in with has the necessary BigQuery and Cloud Storage permissions. Don't just make the bucket public to work around an IAM issue.

## Cleanup

Once you're done practicing, check for and delete any datasets, tables, buckets, and other cloud resources you no longer need:

```bash
bq rm -r -f PROJECT_ID:tkr101
# After confirming the bucket has nothing worth keeping, run:
gcloud storage rm --recursive gs://BUCKET_NAME
```

## Further Reading

- [Create datasets](https://cloud.google.com/bigquery/docs/datasets)
- [Load CSV data from Cloud Storage](https://cloud.google.com/bigquery/docs/loading-data-cloud-storage-csv)
- [Cloud Storage bucket locations](https://cloud.google.com/storage/docs/locations)
