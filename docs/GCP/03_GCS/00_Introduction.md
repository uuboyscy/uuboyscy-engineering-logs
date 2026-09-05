---
sidebar_position: 0
---

# Introduction to Google Cloud Storage

Google Cloud Storage (GCS) is Google Cloud's object storage service. Think of it as a large file storage space in the cloud, used to hold images, videos, CSV/JSON files, backups, and raw data for data pipelines.

In data engineering, GCS is commonly used as the **Bronze / Raw layer**: source data lands here unchanged, then gets handed off to BigQuery, Dataflow, or other processing tools for transformation.

## What Is Cloud Storage?

GCS has two core resources:

```text
Google Cloud Project
└── Bucket
    └── Object
```

### Bucket

A bucket is a container for storing objects. Bucket names share a single global namespace, so a name must be unique across the entire world, not just within your own project.

When you create a bucket, you need to decide on:

- Bucket name.
- Location.
- Default storage class.
- Access control.
- Protection and lifecycle policy.

### Object

An object is the actual stored file, made up of the data itself, a name, and metadata. Object names can contain `/`, so they can look like paths:

```text
landing/2026/06/sell.csv
```

But in a typical bucket, the `/` is just part of the object name: it doesn't represent a real folder the way a traditional file system does.

## GCS and Google Drive Are Different

| Item | Google Drive | Cloud Storage |
| --- | --- | --- |
| Primary use | Personal and team document collaboration | Object storage for applications and data pipelines |
| Access method | UI, Drive API | IAM, SDK, CLI, REST API |
| Data organization | Files and folders | Buckets and objects |
| Data handling | Mostly manual | Suited to automation and large volumes of data |
| Cost model | Based on Workspace plan | Based on storage, operations, network, and data retrieval |

GCS is designed for programs and cloud services to read and write data; you shouldn't design every workflow around it as if it were a regular user hard drive.

## GCS in a Data Pipeline

```text
API / Crawler / Application
            │
            ▼
GCS Bucket (Bronze / Raw)
            │
            ├── BigQuery External Table
            │
            └── Load / Transform Job
                         │
                         ▼
                 BigQuery Native Table
```

Keeping the original files has a benefit: when field definitions, KPIs, or transformation logic change, you can re-run the pipeline from the raw data instead of having to re-fetch it from the source system.

## What You Will Learn

1. Create a bucket with the correct location and access control.
2. Manage objects using the Console and `gcloud storage`.
3. Understand virtual folders, object metadata, and one-way sync.

## Prerequisites

Before you start, make sure you have:

- A Google Cloud project with billing enabled.
- The Google Cloud CLI installed.
- Run `gcloud auth login`.
- Basic familiarity with projects, IAM, and shell commands.

> Storage, operations, network transfer, and data retrieval in GCS can all incur charges. Use small files while practicing, and check and clean up your buckets when you're done.

## Further Reading

- [Cloud Storage overview](https://cloud.google.com/storage/docs/introduction)
- [Storage classes](https://cloud.google.com/storage/docs/storage-classes)
- [Cloud Storage pricing](https://cloud.google.com/storage/pricing)
