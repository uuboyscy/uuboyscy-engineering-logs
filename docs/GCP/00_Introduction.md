---
sidebar_position: 0
---

# Introduction to GCP

Google Cloud Platform (GCP) is a suite of cloud services provided by Google. Instead of buying and managing your own servers, you rent compute power, storage, and databases from Google's global infrastructure.

If you have used AWS before, GCP works the same way. Most services have a direct equivalent on both platforms.

## What Is Cloud Service?

A cloud service lets you run infrastructure on someone else's servers over the internet. Instead of setting up a physical machine, you provision resources through a web console or CLI in minutes.

For data engineers, cloud services matter because:

- You can spin up a database or VM without touching hardware.
- Storage and compute scale automatically with your workload.
- Managed services (like BigQuery or Cloud SQL) handle maintenance for you.

## What We Cover in This Section

These pages walk through the core GCP services a data engineer uses day to day. We will cover the following services:

- **Compute Engine**
- **Firewall**
- **GCS** (Google Cloud Storage)
- **Cloud SQL**
- **BigQuery** (including Remote Functions)
- **BQML**
- **AI Services** (e.g., Vertex AI, Agent Platform)
- **Artifact Registry**
- **Cloud Run** (Services, Jobs, Functions)
- **Secret Manager**

## Interacting with GCP: The gcloud CLI

While you can manage your infrastructure through the web browser (GCP Console), data engineers typically automate their workflows using command-line tools and scripts. 

Throughout these guides, you will frequently use the **Google Cloud CLI (`gcloud`)**. This is the primary tool for creating and managing Google Cloud resources directly from your terminal. Instead of clicking through menus, you can provision VMs, deploy containers, and manage permissions with simple, repeatable commands.

We will introduce the specific `gcloud` commands you need as we explore each service.
