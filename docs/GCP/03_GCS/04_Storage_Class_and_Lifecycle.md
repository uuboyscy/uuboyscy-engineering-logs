---
sidebar_position: 4
---

# Storage Class and Lifecycle Management

GCS cost doesn't just depend on file size — it's also affected by storage class, data retrieval, number of operations, network transfer, and retention period. Storage class addresses "which access pattern the data normally lives under," while lifecycle management addresses "under what conditions data gets transitioned or deleted."

## Choose a Storage Class

| Storage class | Recommended for | Main trade-off |
| --- | --- | --- |
| Standard | Active data, online images, frequently queried data | Higher storage cost, but suited to frequent access |
| Nearline | Backups or long-tail content accessed roughly once a month | Higher retrieval cost, usually a 30-day minimum storage duration |
| Coldline | Backups or disaster-recovery data accessed roughly once a quarter | Even higher retrieval cost, usually a 90-day minimum storage duration |
| Archive | Compliance or historical data accessed less than once a year | High retrieval and operation costs, usually a 365-day minimum storage duration |

Actual pricing, minimum storage duration, and location support can change over time — check the latest pricing page before making a production decision.

## Set a Default Storage Class

You can set a default storage class when creating a bucket. You can also specify one when uploading an object:

```bash
gcloud storage cp test.txt gs://BUCKET_NAME/archive/ \
  --storage-class=ARCHIVE
```

The default storage class is a bucket-level default; an individual object might still end up in a different class due to a lifecycle rule or upload option. Check the object's metadata before relying on it.

## Autoclass

If you can't accurately predict how often different objects will be accessed, look into Autoclass, which lets Cloud Storage adjust the storage class based on access patterns.

Autoclass isn't a switch that guarantees the lowest cost. You still need to evaluate:

- Whether objects will be re-read frequently.
- Transition operation and retrieval fees.
- Minimum storage duration.
- Whether data governance allows the storage class to change automatically.

## Lifecycle Management

Lifecycle rules can act based on object age, prefix, storage class, or other conditions:

- Delete: removes objects that match the condition.
- SetStorageClass: transitions objects to a different storage class.
- Manages older or non-current versions.

### Example: Delete Temporary Files

Create a `lifecycle.json`:

```json
{
  "rule": [
    {
      "action": {
        "type": "Delete"
      },
      "condition": {
        "age": 30,
        "matchesPrefix": ["tmp/"]
      }
    }
  ]
}
```

Apply it to the bucket:

```bash
gcloud storage buckets update gs://BUCKET_NAME \
  --lifecycle-file=lifecycle.json
```

Check the lifecycle configuration:

```bash
gcloud storage buckets describe gs://BUCKET_NAME
```

### Example: Transition Old Objects

```json
{
  "rule": [
    {
      "action": {
        "type": "SetStorageClass",
        "storageClass": "COLDLINE"
      },
      "condition": {
        "age": 90,
        "matchesPrefix": ["raw/"]
      }
    }
  ]
}
```

Before applying this, confirm the data's actual access frequency and minimum storage duration, so data that was just transitioned isn't immediately accessed often, which would increase cost instead.

## Deletion Is a Data Governance Decision

Before deleting, answer:

- Is this data still within its retention period?
- Is there a legal hold, object hold, or audit requirement on it?
- Can it still be retrieved again from the source system?
- Does a BigQuery external table still point at this URI?
- Is object versioning enabled, meaning older versions are still retained?
- Does it need to be backed up first or handed off to an archive policy?

Recent versions of Cloud Storage may also use soft delete. A successful delete command doesn't necessarily mean the data is instantly and completely unrecoverable or that costs drop to zero right away — check the latest deletion and pricing documentation.

## Delete Objects and the Bucket

First list what would be deleted:

```bash
gcloud storage ls --recursive gs://BUCKET_NAME/tmp/
```

Once you've confirmed it's correct, delete the prefix:

```bash
gcloud storage rm --recursive gs://BUCKET_NAME/tmp/
```

A bucket must be empty before it can be deleted. Once you've confirmed there's no data in it that needs to be kept:

```bash
gcloud storage rm --recursive gs://BUCKET_NAME
```

> `--recursive` is destructive. Don't copy this command directly against a production bucket — use a dry run first, scope it to a specific prefix, and have the owner confirm the scope.

## Cost Control Checklist

- [ ] The choice among Standard, Nearline, Coldline, and Archive matches the access frequency.
- [ ] Minimum storage duration and retrieval fees have been evaluated.
- [ ] Temporary, raw, and backup data are managed under different prefixes or buckets.
- [ ] Lifecycle rules are set up to clean up temporary data.
- [ ] Object versioning, soft delete, and retention policy have been considered.
- [ ] Storage usage, operations, and network egress are reviewed regularly.
- [ ] You are not relying on a budget alert to automatically stop GCS usage; budget alerts are primarily notifications.

## Further Reading

- [Storage classes](https://cloud.google.com/storage/docs/storage-classes)
- [Object Lifecycle Management](https://cloud.google.com/storage/docs/lifecycle)
- [Control data lifecycles](https://cloud.google.com/storage/docs/control-data-lifecycles)
- [About object deletion](https://cloud.google.com/storage/docs/object-deletion-overview)
- [Cloud Storage pricing](https://cloud.google.com/storage/pricing)
