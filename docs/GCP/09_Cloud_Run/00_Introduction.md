---
sidebar_position: 0
---

# Introduction to Cloud Run

Cloud Run is a fully managed container platform from Google Cloud that can run web services, APIs, batch jobs, and event-driven programs. You only need to provide a container image or source code — there is no need to manage VMs, operating systems, or a Kubernetes cluster yourself.

This chapter follows a path that is common in data engineering, moving from Docker images, Artifact Registry, and Cloud Run Services and Jobs, all the way to Cloud Run functions, IAM, and BigQuery Remote Functions.

## What Is Cloud Run?

The core concept of Cloud Run is:

```text
Container image / source code
            │
            ▼
      Cloud Run revision
            │
            ├── Service: waits for HTTP requests
            ├── Job: runs a task, then exits
            └── Function: wrapped by Google into a Service
```

Cloud Run creates container instances based on request or task demand, and scales them according to configuration. A service can scale down to zero instances when idle; whether that actually eliminates cost still depends on the billing mode and other settings, so scale-to-zero should not be treated as a guarantee that all costs disappear.

## Services, Jobs, and Functions

| Type | Execution model | Good fit | Container behavior |
| --- | --- | --- | --- |
| Cloud Run Service | Receives HTTP requests | Flask APIs, websites, webhooks | Must listen on `PORT` |
| Cloud Run Job | Runs once or on a schedule | ETL, backups, crawlers, batch processing | Must exit when finished |
| Cloud Run functions | Function created from source code | Single event handlers, lightweight APIs | Google automatically builds it into a Service |

### Cloud Run Service

A Service is request-driven. Cloud Run provisions an HTTPS endpoint, revisions, and automatic scaling for it. The web application must listen on the `PORT` environment variable injected by Cloud Run, which is usually `8080` by default.

### Cloud Run Job

A Job does not receive requests and should not start a web server. Once the container finishes its work, it must exit normally and return exit code `0`; on failure it should return a non-zero exit code. Cloud Run manages the execution result according to the task and retry configuration.

### Cloud Run functions

Cloud Run functions (2nd gen Cloud Functions) let you deploy a function written in Python, Node.js, or another supported language directly. Google helps build the container and deploys it as a Cloud Run service, so you mainly maintain the entry point and the function logic.

## Revision

Every time you update the image, environment variables, CPU, memory, port, or other Service settings, a new revision is created:

```text
Service: sales-api
├── sales-api-00001  10% traffic
└── sales-api-00002  90% traffic
```

Revisions let you:

- Review historical configurations.
- Run smoke tests against a new version.
- Shift traffic gradually.
- Roll back to a previous version if something goes wrong.

## Container Contract

A Cloud Run container should follow these principles:

- The Service's HTTP server listens on `0.0.0.0`, not only `127.0.0.1`.
- Use the `PORT` value injected by Cloud Run, instead of hardcoding a port that only works locally.
- The Service must not depend on local disk for persistent data.
- A Job must exit once it finishes; it should not run a background server forever.
- Hand configuration and secrets off to environment variables, Secret Manager, or another managed configuration source.
- Write logs to stdout/stderr so Cloud Logging can collect them.

## Typical Data Engineering Architecture

```text
Crawler / API / Scheduler
          │
          ▼
Cloud Run Job ───────▶ GCS Bronze
          │                  │
          │                  ▼
          └──────────────▶ BigQuery

Client / Frontend ───▶ Cloud Run Service
                             │
                             ▼
                      Cloud SQL / BigQuery / APIs
```

## What You Will Learn

1. Build a Docker image and create an Artifact Registry repository.
2. Deploy a container as a Cloud Run Service.
3. Use a Cloud Run Job to run ETL, backup, or crawler workloads.
4. Deploy a single function with Cloud Run functions.
5. Configure port, CPU, memory, timeout, retries, and autoscaling.
6. Practice least privilege with a dedicated service account.
7. Connect to Secret Manager, BigQuery Remote Functions, and other GCP services.
8. Safely clean up resources once you are done testing.

## Prerequisites

Before you start, make sure you have:

- A Google Cloud project with billing enabled.
- The Google Cloud CLI installed.
- Docker Desktop or another Docker runtime installed.
- A basic understanding of Docker, Git, and HTTP concepts.
- Run `gcloud auth login`.

> Cloud Run, Artifact Registry, Cloud Build, network egress, and other integrated services may incur charges. Use small images while practicing, and delete any Services, Jobs, images, and repositories you no longer need once you're done.

## Further Reading

- [Cloud Run documentation](https://cloud.google.com/run/docs)
- [Cloud Run container runtime contract](https://cloud.google.com/run/docs/container-contract)
- [Cloud Run pricing](https://cloud.google.com/run/pricing)
- [Cloud Run functions comparison](https://cloud.google.com/run/docs/functions/comparison)
