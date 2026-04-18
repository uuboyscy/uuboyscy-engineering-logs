---
sidebar_position: 0
---

# Introduction to GCP

Google Cloud Platform (GCP) is a suite of cloud services provided by Google. Instead of buying and managing your own servers, you rent compute power, storage, and databases from Google's global infrastructure. You only pay for what you use.

If you have used AWS before, GCP works the same way. Most services have a direct equivalent on both platforms.

## What Is Cloud Service?

A cloud service lets you run infrastructure on someone else's servers over the internet. Instead of setting up a physical machine, you provision resources through a web console or CLI in minutes.

For data engineers, cloud services matter because:

- You can spin up a database or VM without touching hardware.
- Storage and compute scale automatically with your workload.
- Managed services (like BigQuery or Cloud SQL) handle maintenance for you.

## What We Cover in This Section

These pages walk through the core GCP services a data engineer uses day to day:

| Page | Services |
|------|----------|
| Core Infrastructure | Compute Engine (VM), Cloud SQL, Firewall, gcloud CLI |
| Cloud Storage & Secret Manager | GCS (object storage), Secret Manager |
| BigQuery | Data warehouse, partitioning, Python client |
| Machine Learning & AI | BigQuery ML, Vertex AI, Gemini integration |
| DevOps & Deployment | Artifact Registry, Cloud Run |

## Tools to Install Before You Start

### 1. Google Cloud CLI (gcloud)

The `gcloud` CLI is the main tool for managing GCP resources from your terminal. Install it first.

Follow the official install guide for your OS: https://cloud.google.com/sdk/docs/install

After installing, initialize and authenticate:

```bash
gcloud init
gcloud auth login
```

Set your default project, region, and zone to avoid repeating them in every command:

```bash
gcloud config set project YOUR_PROJECT_ID
gcloud config set compute/region asia-east1
gcloud config set compute/zone asia-east1-b
```

### 2. gsutil

`gsutil` comes bundled with the Google Cloud SDK. No separate install needed. You use it to interact with Cloud Storage buckets.

```bash
gsutil ls gs://my-bucket/
```

### 3. Python Libraries

Most GCP services have a Python client library. Install what you need as you go through each section:

```bash
pip install google-cloud-bigquery       # BigQuery
pip install google-cloud-storage        # Cloud Storage
pip install google-cloud-secret-manager # Secret Manager
pip install google-cloud-aiplatform     # Vertex AI
```

### 4. Docker

Cloud Run deploys containerized applications, so you need Docker installed locally to build images.

Download Docker Desktop from https://www.docker.com/products/docker-desktop/

```bash
docker --version  # verify install
```

---

Once your tools are ready, start with [Core Infrastructure](./01_Core_Infrastructure.md) to set up your first VM and database on GCP.
