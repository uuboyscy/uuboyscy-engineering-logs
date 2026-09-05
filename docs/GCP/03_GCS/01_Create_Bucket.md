---
sidebar_position: 1
---

# Create a Cloud Storage Bucket

This tutorial creates a GCS bucket and configures a region, uniform bucket-level access, and public access prevention suited for data engineering practice.

## Configuration Used in This Tutorial

Replace the following values with your own:

```text
PROJECT_ID  = your-project-id
BUCKET_NAME = tkr101-your-name-random-id
REGION      = asia-east1
```

Bucket names must be globally unique. You can append your name or a random string after `tkr101` to reduce the chance of a naming collision.

## Step 1: Select a Project

Log in to the Google Cloud CLI and select a project:

```bash
gcloud auth login
gcloud projects list
gcloud config set project PROJECT_ID
gcloud config get-value project
```

Confirm that the project ID printed is the practice project you expect before continuing.

## Step 2: Create a Bucket in the Console

1. Open the Google Cloud Console.
2. Go to **Cloud Storage** → **Buckets**.
3. Click **Create**.
4. Enter a globally unique bucket name.
5. For location type, select **Region**.
6. For location, select `asia-east1` (Taiwan).
7. Choose a default storage class as needed; **Standard** works fine for practice.
8. For access control, select **Uniform** so permissions are managed entirely through IAM.
9. Make sure **Public access prevention** stays enabled.
10. Click **Create**.

The course recording demonstrates using the Taiwan region mainly to give lower network latency for people operating from Taiwan. For real projects, choose the location based on data residency, regulations, service compatibility, and cost together.

## Step 3: Create a Bucket with `gcloud`

```bash
gcloud storage buckets create gs://BUCKET_NAME \
  --project=PROJECT_ID \
  --location=asia-east1 \
  --uniform-bucket-level-access \
  --public-access-prevention
```

Check the bucket's settings:

```bash
gcloud storage buckets describe gs://BUCKET_NAME
```

List the buckets visible in the current project:

```bash
gcloud storage ls
```

## Step 4: Understand Location Choices

Common location types are:

| Location type | Description | Common use case |
| --- | --- | --- |
| Region | A single region | Regional data pipelines, lower latency |
| Dual-region | Two regions | Balances availability and data placement |
| Multi-region | One large geographic area | Cross-region services and broader access |

Location cannot be changed after a bucket is created. To move to a different location, you typically need to create a new bucket and move or regenerate the objects.

When integrating with BigQuery, make sure the GCS bucket's location is compatible with the BigQuery dataset's location. Mismatched locations can cause load or external table operations to fail, and may incur data transfer charges.

## Step 5: Configure Labels

Labels help you categorize and analyze resources, for example:

```text
environment = learning
owner       = your-name
course      = tkr101
```

Label naming rules and available fields must follow Google Cloud's constraints. For production environments, establish a consistent naming and labeling strategy from the start.

## Bucket Creation Checklist

Before creating a bucket, confirm:

- [ ] Project ID is correct.
- [ ] Bucket name is globally unique.
- [ ] Location meets data governance and service compatibility requirements.
- [ ] Storage class matches the expected access frequency.
- [ ] Uniform bucket-level access is used.
- [ ] Public access prevention stays enabled, unless there's an explicit need for public access.
- [ ] Labels such as owner and environment are set.
- [ ] You know how to clean up the data after the exercise.

## Common Problems

### `You already own this bucket`

The bucket name already exists under your account or project. If you're just re-running the command, use `describe` to check the settings instead; if it's a naming collision, pick a different globally unique name.

### `The bucket you tried to create already exists`

This usually means the name is already taken by another Google Cloud user. Since the bucket namespace is shared globally, just pick a different name.

### Location is not compatible

Check the location of your data sources, BigQuery dataset, Cloud Run, or other integrated services first. Don't wait until a query fails before revisiting your region design.

## Further Reading

- [Create a bucket](https://cloud.google.com/storage/docs/creating-buckets)
- [Bucket locations](https://cloud.google.com/storage/docs/locations)
- [Bucket naming guidelines](https://cloud.google.com/storage/docs/buckets#naming)
