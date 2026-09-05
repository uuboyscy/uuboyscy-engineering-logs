---
sidebar_position: 3
---

# Run Batch Work with Cloud Run Jobs

A Cloud Run Job is a good fit for container workloads that "start and finish," such as ETL, data imports, backups, crawlers, and scheduled reports.

## Service vs. Job

| Aspect | Service | Job |
| --- | --- | --- |
| Trigger | HTTP request, event | Manual, scheduled, or via a workflow |
| Container | Waits for requests continuously | Exits once the work is done |
| Port | Must listen on `PORT` | Not needed, and shouldn't start a web server |
| Success condition | Responds to requests | Exit code `0` |
| Failure handling | Request errors, revisions | Task retries, execution failure |

If your program is essentially a one-off Python script, don't wrap it as a Service that waits for requests just to run it; using a Job is usually clearer.

## Step 1: Prepare a Job Container

Create `job.py`:

```python
import os
import time


print("starting batch job")
print(f"batch_id={os.environ.get('BATCH_ID', 'local')}")

# Do your ETL, backup, or data processing work here
for item in range(3):
    print(f"processing item {item}")
    time.sleep(1)

print("batch job completed")
```

A Job container doesn't need Flask, Gunicorn, or an HTTP server. It should exit naturally once the work is complete.

Example Dockerfile:

```dockerfile
FROM python:3.13-slim

WORKDIR /app
COPY job.py .

CMD ["python", "job.py"]
```

For the process of building and pushing the image, see [Build and Push a Container Image](./Build_and_Push_Image).

## Step 2: Deploy a Job with `gcloud`

```bash
gcloud run jobs deploy tkr101-batch-job \
  --image=asia-east1-docker.pkg.dev/PROJECT_ID/tkr101-repo/cloud-run-job:v1 \
  --region=asia-east1 \
  --tasks=1 \
  --max-retries=1 \
  --task-timeout=10m
```

Set an environment variable:

```bash
gcloud run jobs update tkr101-batch-job \
  --region=asia-east1 \
  --update-env-vars=BATCH_ID=demo-001
```

The default task timeout for a Job is 10 minutes, and it can be adjusted as needed; check the latest documentation for the current maximum values and GPU limits.

## Step 3: Execute the Job

Run it and wait for completion:

```bash
gcloud run jobs execute tkr101-batch-job \
  --region=asia-east1 \
  --wait
```

List job executions:

```bash
gcloud run jobs executions list \
  --job=tkr101-batch-job \
  --region=asia-east1
```

View job logs:

```bash
gcloud run jobs logs read tkr101-batch-job \
  --region=asia-east1 \
  --limit=50
```

## Step 4: Configure in the Console

1. Open **Cloud Run** → **Jobs**.
2. Click **Deploy container**.
3. Choose the Artifact Registry image.
4. Set the job name and region.
5. Configure CPU, memory, and task timeout on the container.
6. Set the number of tasks.
7. Set the number of retries per failed task.
8. Set parallelism based on the workload.
9. Click **Create**.
10. On the job detail page, click **Execute**.

## Tasks, Parallelism, and Retries

A single job execution can contain multiple tasks:

```text
Job execution
├── Task 0
├── Task 1
├── Task 2
└── Task 3
```

- **Tasks**: how many tasks to run.
- **Parallelism**: how many tasks run at the same time.
- **Max retries**: the maximum number of retries after a single task fails.

If every task processes the same data, blindly increasing the number of tasks can cause duplicate writes. The program needs to use a task index, partition key, or an idempotent write design.

## Exit Code and Idempotency

A successful job container should return `0`:

```bash
python job.py
printf 'exit code: %s\n' "$?"
```

If part of the work completes before a failure occurs, a Cloud Run retry may re-run the same batch of data. So your ETL should consider:

- Deduplicating by batch id or source file generation.
- Checking whether work has already completed before writing.
- Using a staging table, then publishing via a transaction or merge.
- Separating external side effects from data processing.
- Logging the execution name, task index, and input range.

## Schedule a Job

A Cloud Run Job itself only handles execution; it's not a scheduler. Use Cloud Scheduler, Workflows, or another orchestration tool to trigger the job.

```text
Cloud Scheduler / Workflows
            │
            ▼
Cloud Run Jobs Execute API
            │
            ▼
Cloud Run Job execution
```

A scheduled trigger also needs its own IAM permissions; don't let a public HTTP endpoint trigger an expensive job arbitrarily.

## Cost and Timeout Notes

- A Job only uses CPU/memory while a task is running, but there can still be charges for images, the registry, network, or other services.
- The timeout should be long enough to finish the work, while still preventing infinite loops.
- Retries consume resources again, and may duplicate writes or external API calls.
- When you hit a timeout, look at the bottleneck and data partitioning first, rather than just raising the timeout indefinitely.

## Cleanup

List jobs:

```bash
gcloud run jobs list --region=asia-east1
```

Delete the practice job:

```bash
gcloud run jobs delete tkr101-batch-job \
  --region=asia-east1
```

Once you've confirmed the image is no longer used, clean up the image or repository in Artifact Registry.

## Further Reading

- [Create jobs](https://cloud.google.com/run/docs/create-jobs)
- [Execute jobs](https://cloud.google.com/run/docs/execute/jobs)
- [Configure jobs](https://cloud.google.com/run/docs/configuring/jobs)
- [Cloud Run container runtime contract](https://cloud.google.com/run/docs/container-contract)
