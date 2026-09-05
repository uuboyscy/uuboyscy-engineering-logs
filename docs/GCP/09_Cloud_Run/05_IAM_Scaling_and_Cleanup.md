---
sidebar_position: 5
---

# IAM, Scaling, and Cleanup

A successful Cloud Run deployment doesn't mean the design is secure. In production, the most common problems usually come from using an overly broad service account, a public endpoint, unbounded scaling, a missing timeout, or forgetting to delete test resources.

## Use a User-Managed Service Account

It's recommended that the Cloud Run runtime use a dedicated, user-managed service account:

```bash
gcloud iam service-accounts create cloud-run-runtime \
  --project=PROJECT_ID \
  --display-name="Cloud Run runtime identity"
```

Set a variable:

```bash
RUNTIME_SA=cloud-run-runtime@PROJECT_ID.iam.gserviceaccount.com
```

Specify it when deploying a Service:

```bash
gcloud run deploy cloud-run-demo \
  --image=IMAGE_URL \
  --region=asia-east1 \
  --service-account="$RUNTIME_SA"
```

Don't rely on an overly permissive default service account long-term in production. Using BigQuery as an example, the notebook covers:

- Read-only access: evaluate `roles/bigquery.dataViewer` and whatever permissions running queries requires.
- Write access: only grant the corresponding dataset-level data editor role when it's actually needed.
- Creating or managing jobs: separately evaluate `roles/bigquery.jobUser`.

Cloud Run's own deployment permissions and the runtime service account's data access permissions are two separate things: don't conflate them.

## Least Privilege Pattern

```text
Developer / CI/CD
  ├── Cloud Run deploy permissions
  └── iam.serviceAccountUser on runtime SA

Cloud Run runtime SA
  ├── Secret Manager accessor on selected secrets
  ├── BigQuery viewer/editor on selected datasets
  └── Cloud Storage viewer/creator on selected buckets
```

The application should only get the permissions it actually needs. Don't reach for Project Owner just to work around a runtime permission error.

## Configure Scaling

Common scaling settings:

| Setting | Effect |
| --- | --- |
| Minimum instances | Keeps a number of warm instances to reduce cold starts, at the cost of ongoing spend |
| Maximum instances | Caps resource usage and downstream pressure during traffic spikes |
| Concurrency | Number of requests a single instance handles at the same time |
| CPU/Memory | Affects processing capacity, startup time, and cost |

Update a Service's instance limits:

```bash
gcloud run services update cloud-run-demo \
  --region=asia-east1 \
  --min=0 \
  --max=10
```

The actual cap should take into account:

- The downstream Cloud SQL connection pool.
- BigQuery quota.
- External API rate limits.
- CPU/memory usage per request.
- Expected traffic and a cost ceiling.

## Timeout and Retry

Service and Job timeouts serve different purposes:

- Service timeout: prevents a single HTTP request from occupying resources for too long.
- Job task timeout: prevents a batch task from running forever.
- Retry: may cause the same request or task to run again.

Configure job retries:

```bash
gcloud run jobs update tkr101-batch-job \
  --region=asia-east1 \
  --max-retries=1 \
  --task-timeout=10m
```

If a job has external side effects, confirm idempotency before allowing retries. Payments, sending emails, writing to external systems, or triggering the next job can't just rely on "retry on failure."

## Logs and Monitoring

View service logs:

```bash
gcloud run services logs read cloud-run-demo \
  --region=asia-east1 \
  --limit=100
```

View job logs:

```bash
gcloud run jobs logs read tkr101-batch-job \
  --region=asia-east1 \
  --limit=100
```

At minimum, monitor:

- Request latency.
- Error rate.
- Instance count.
- CPU/memory usage.
- Job success/failure.
- Retry count.
- Downstream service errors.
- Cost and traffic anomalies.

Don't print API keys, passwords, access tokens, or full personal data into logs.

## Preview and Beta Features

A reminder from the notebook: when you encounter a Preview or Beta feature, read its limitations, billing, and terms of service before deciding whether to use it in production. Preview features may have quota, stability, API compatibility, or support limitations.

Don't assume "just for testing" means unlimited execution. You still need to set timeouts, maximum instances, job retries, and cost monitoring.

## Cleanup Checklist

After finishing your practice, first list your resources:

```bash
gcloud run services list --region=asia-east1
gcloud run jobs list --region=asia-east1
gcloud artifacts repositories list --location=asia-east1
gcloud functions list --gen2 --region=asia-east1
```

Delete the Service:

```bash
gcloud run services delete cloud-run-demo \
  --region=asia-east1
```

Delete the Job:

```bash
gcloud run jobs delete tkr101-batch-job \
  --region=asia-east1
```

Delete the function:

```bash
gcloud functions delete tkr101-hello \
  --gen2 \
  --region=asia-east1
```

Before deleting an Artifact Registry repository, confirm no other Service or Job still uses images in it:

```bash
gcloud artifacts repositories delete tkr101-repo \
  --location=asia-east1
```

The delete commands above are destructive. Before running them against production, confirm dependencies, backups, retention policy, and your review process.

## Production Checklist

- [ ] A user-managed runtime service account is in use.
- [ ] Least privilege is applied to GCS, BigQuery, and Secret Manager.
- [ ] A private service requires authentication by default.
- [ ] A public service has rate limiting, input validation, and abuse protection.
- [ ] The service has reasonable min/max instance settings.
- [ ] The job has timeout, retry, and parallelism settings.
- [ ] Batch work is idempotent.
- [ ] New images use a traceable tag and are rolled out gradually via revisions.
- [ ] Logs don't contain secrets or unnecessary sensitive data.
- [ ] Cost monitoring and alerting are configured.
- [ ] A cleanup strategy for images, revisions, Services, and Jobs is planned.

## Further Reading

- [Cloud Run service identity](https://cloud.google.com/run/docs/securing/service-identity)
- [Cloud Run autoscaling](https://cloud.google.com/run/docs/configuring/services/autoscaling)
- [Cloud Run jobs configuration](https://cloud.google.com/run/docs/configuring/jobs)
- [Cloud Run monitoring](https://cloud.google.com/run/docs/monitoring)
- [Cloud Run pricing](https://cloud.google.com/run/pricing)
