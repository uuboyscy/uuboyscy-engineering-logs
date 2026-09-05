---
sidebar_position: 2
---

# Object Operations and `gcloud storage`

GCS data operations can be done in the Cloud Console or with the Google Cloud CLI. The primary tool used in this course is `gcloud storage`; the legacy `gsutil` may still show up in older material or environments, but new work should prefer the `gcloud storage` command family.

## Bucket and Object Paths

A GCS URI has the following format:

```text
gs://BUCKET_NAME/OBJECT_NAME
```

For example:

```text
gs://tkr101-demo/landing/2026/06/sell.csv
```

- `tkr101-demo` is the bucket.
- `landing/2026/06/sell.csv` is the object name.
- `landing/` and `2026/06/` are name prefixes, not actual folders like in a traditional file system.

## Step 1: Create a Virtual Folder in the Console

1. Open Cloud Storage → **Buckets**.
2. Click the bucket name.
3. Click **Create folder**.
4. Enter `test_folder`.
5. Inside the folder, click **Upload files**.

This is convenient for humans to browse, but under the hood it still just creates an object with a prefix.

## Step 2: Upload a File

First create a test file locally:

```bash
printf 'hello gcs\n' > test.txt
```

Upload it to the bucket's root:

```bash
gcloud storage cp test.txt gs://BUCKET_NAME/
```

Upload it to a virtual folder:

```bash
gcloud storage cp test.txt gs://BUCKET_NAME/test_folder/
```

The command succeeds even if `test_folder` didn't exist before, because it's just a prefix in the object name.

## Step 3: List Buckets and Objects

List all buckets:

```bash
gcloud storage ls
```

List the objects in a bucket:

```bash
gcloud storage ls gs://BUCKET_NAME
```

List a specific prefix:

```bash
gcloud storage ls gs://BUCKET_NAME/test_folder/
```

List everything recursively:

```bash
gcloud storage ls --recursive gs://BUCKET_NAME
```

## Step 4: Download and Copy Objects

Download and rename:

```bash
gcloud storage cp \
  gs://BUCKET_NAME/test.txt \
  test2.txt
```

Copy between two GCS URIs:

```bash
gcloud storage cp \
  gs://SOURCE_BUCKET/source.txt \
  gs://DESTINATION_BUCKET/archive/source.txt
```

Recursively copy an entire local folder:

```bash
gcloud storage cp --recursive \
  ./data \
  gs://BUCKET_NAME/landing/data/
```

## Step 5: Move or Rename an Object

```bash
gcloud storage mv \
  gs://BUCKET_NAME/test.txt \
  gs://BUCKET_NAME/archive/test.txt
```

In a regular bucket, renaming an object is really a copy plus a delete under the hood. Before moving a large number of objects, evaluate operation costs, permissions, versioning, and how to recover from an interruption.

## Step 6: Inspect Object Metadata

```bash
gcloud storage objects describe \
  gs://BUCKET_NAME/test_folder/test.txt
```

You can use metadata to confirm:

- Object size.
- Content type.
- Creation time.
- Generation.
- Storage class.
- Hash or checksum.

When debugging a data pipeline, metadata is often more useful than just looking at the file name.

## Step 7: Synchronize with `rsync`

Sync a local folder to GCS:

```bash
gcloud storage rsync --recursive \
  ./data \
  gs://BUCKET_NAME/data/
```

It's a good idea to use a dry run first to see what would change:

```bash
gcloud storage rsync --recursive --dry-run \
  ./data \
  gs://BUCKET_NAME/data/
```

### `rsync` Is Directional

`gcloud storage rsync SOURCE DESTINATION` syncs from the source toward the destination. It is not a general-purpose two-way sync tool:

```text
Local directory  ───────────▶  GCS prefix
```

If someone manually adds a file in GCS first, and you then run a local → GCS `rsync`, don't expect that file to automatically download back to your local machine.

This one-directional behavior actually matches how most ETL works:

```text
Crawler / API → Local staging → GCS Bronze → BigQuery
```

If you really need to mount GCS as something resembling a local file system, look into Cloud Storage FUSE separately; but it has its own caching behavior, semantics, and performance limits, so it shouldn't be treated as a regular POSIX disk.

## Useful Commands

View command help:

```bash
gcloud storage --help
gcloud storage cp --help
gcloud storage rsync --help
```

Check a bucket's usage:

```bash
gcloud storage du --summarize gs://BUCKET_NAME
```

Delete a single object:

```bash
gcloud storage rm gs://BUCKET_NAME/test_folder/test.txt
```

Recursively delete a prefix:

```bash
gcloud storage rm --recursive gs://BUCKET_NAME/test_folder/
```

## Common Problems

### Local file not found

Check the current working directory and file path:

```bash
pwd
ls -l test.txt
```

### Permission denied

Check the currently logged-in account, project, and bucket IAM. Don't work around permission issues by simply making the bucket public.

### Accidentally overwrote an Object

Uploading an object with the same name may create a new generation or overwrite the current version, depending on the bucket's object versioning and related protection settings. Before uploading important data, confirm the object name, versioning strategy, and retention policy.

## Further Reading

- [gcloud storage](https://cloud.google.com/sdk/gcloud/reference/storage)
- [gcloud storage cp](https://cloud.google.com/sdk/gcloud/reference/storage/cp)
- [gcloud storage rsync](https://cloud.google.com/sdk/gcloud/reference/storage/rsync)
- [Object metadata](https://cloud.google.com/storage/docs/metadata)
