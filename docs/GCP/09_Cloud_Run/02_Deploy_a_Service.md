---
sidebar_position: 2
---

# Deploy a Cloud Run Service

A Cloud Run Service is a good fit for serving an HTTP API, website, webhook, or any other application that needs to wait for requests.

## Step 1: Deploy with the Console

1. Open **Cloud Run**.
2. On the Services page, click **Deploy container**.
3. Choose **Deploy one revision from an existing container image**.
4. Enter the Artifact Registry image, for example:

   ```text
   asia-east1-docker.pkg.dev/PROJECT_ID/tkr101-repo/cloud-run-demo:v1
   ```

5. Enter `cloud-run-demo` for the service name.
6. Choose `asia-east1` for the region.
7. Under **Container(s), Volumes, Networking, Security**, configure:
   - Container port: `8080`
   - Memory: choose based on the workload, e.g. `512Mi`
   - CPU: choose based on the workload, e.g. `1`
   - Minimum instances: `0` is fine for practice
   - Maximum instances: set a reasonable cap to avoid unbounded scaling during traffic spikes
8. Choose an authentication setting:
   - **Require authentication**: requires IAM authentication, suitable for internal APIs.
   - **Allow unauthenticated invocations**: a public endpoint — only use this once you've confirmed the data and API are safe to expose publicly.
9. Click **Create**.

## Step 2: Deploy with `gcloud`

Deploy first in a mode that requires authentication:

```bash
gcloud run deploy cloud-run-demo \
  --image=asia-east1-docker.pkg.dev/PROJECT_ID/tkr101-repo/cloud-run-demo:v1 \
  --region=asia-east1 \
  --port=8080 \
  --memory=512Mi \
  --cpu=1 \
  --min=0 \
  --max=10 \
  --no-allow-unauthenticated
```

After deployment, check the service:

```bash
gcloud run services describe cloud-run-demo \
  --region=asia-east1
```

Get the URL:

```bash
gcloud run services describe cloud-run-demo \
  --region=asia-east1 \
  --format='value(status.url)'
```

## Step 3: Allow Public Invocation Only When Needed

If this service is explicitly meant to be exposed to browsers or a webhook provider, you can deploy with:

```bash
gcloud run deploy cloud-run-demo \
  --image=IMAGE_URL \
  --region=asia-east1 \
  --allow-unauthenticated
```

Before making it public, confirm that:

- The endpoint doesn't return personal or sensitive data.
- The API has its own authentication, rate limiting, or abuse protection.
- The service can't be triggered into expensive work by arbitrary input.
- Logging and monitoring are already configured.

## Step 4: Test the Service

If authentication is required, use `gcloud` to obtain an identity token:

```bash
SERVICE_URL=$(gcloud run services describe cloud-run-demo \
  --region=asia-east1 \
  --format='value(status.url)')

curl -H "Authorization: Bearer $(gcloud auth print-identity-token)" \
  "$SERVICE_URL/"
```

If the service allows unauthenticated access:

```bash
curl "$SERVICE_URL/"
```

## Port and `PORT`

A Cloud Run Service injects the `PORT` environment variable. The application should use:

```python
import os

port = int(os.environ.get("PORT", "8080"))
```

Common mistakes:

- The application only listens on `127.0.0.1`.
- The Dockerfile hardcodes a port that differs from the Cloud Run configuration.
- Applying a Service's port settings to a Job; a Job doesn't need to listen on a port.
- The server starts too slowly, without a suitable startup probe or enough resources.

## CPU and Memory

CPU and memory should be sized based on the workload:

| Workload | Starting point |
| --- | --- |
| Simple HTTP API | Start small on CPU/memory, then observe metrics |
| Flask API with large packages | Increase memory and check cold start behavior |
| Selenium or browser workloads | Usually needs more CPU/memory, and load testing first |
| LLM/model serving | Re-evaluate based on the model, latency, and GPU/CPU support |

The notebook uses Selenium Grid as an example and recommends raising resources to around 2 CPUs and 2 GB of memory; that's a demonstration setting for that specific workload, not a default for every Service.

## Scale to Zero and Cold Start

A Cloud Run Service can scale down to zero instances when there is no traffic:

```text
With traffic: 1+ instances
Without traffic: 0 instances
New request: an instance is created, possibly with a cold start
```

Cold start time is affected by image size, dependencies, initialization work, and resource configuration. You can:

- Reduce image size.
- Avoid unnecessary remote calls during module import.
- Move initialization work into a reasonable startup flow.
- Set minimum instances for latency-sensitive services, though this incurs ongoing cost.

Don't blindly keep instances warm with a fixed ping; first confirm whether the latency improvement is worth the cost.

## Revisions and Traffic

View revisions:

```bash
gcloud run revisions list \
  --service=cloud-run-demo \
  --region=asia-east1
```

View service logs:

```bash
gcloud run services logs read cloud-run-demo \
  --region=asia-east1 \
  --limit=50
```

Before a new version goes live, deploy the revision, test its URL, and shift traffic gradually. Don't mark an untested image as the sole production version.

## Service Checklist

- [ ] The container image has been verified locally.
- [ ] The service uses the correct image tag.
- [ ] The application listens on `0.0.0.0:$PORT`.
- [ ] Authentication settings match the sensitivity of the data.
- [ ] CPU, memory, concurrency, and min/max instances have been evaluated.
- [ ] The new revision has been tested and can be rolled back.
- [ ] Logs and metrics are observable.
- [ ] The endpoint can't be driven into expensive work by arbitrary input.

## Further Reading

- [Deploying services](https://cloud.google.com/run/docs/deploying)
- [Configure containers](https://cloud.google.com/run/docs/configuring/services/containers)
- [Configure autoscaling](https://cloud.google.com/run/docs/configuring/services/autoscaling)
- [Cloud Run pricing](https://cloud.google.com/run/pricing)
