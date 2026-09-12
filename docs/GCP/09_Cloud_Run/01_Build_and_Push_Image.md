---
sidebar_position: 1
---

# Build and Push a Container Image

Cloud Run can deploy a container image directly. A common workflow is to build a Docker image locally, push it to Artifact Registry, and then have Cloud Run create a Service or Job from that image.

## Architecture

```text
Dockerfile + source code
          │
          ▼
Local Docker image
          │ docker push
          ▼
Artifact Registry
          │
          ▼
Cloud Run Service / Job
```

Artifact Registry is Google Cloud's private artifact repository, which can store Docker images and other package formats. Cloud Run reads the image from the registry when it deploys.

## Step 1: Enable APIs

```bash
gcloud config set project PROJECT_ID

gcloud services enable \
  artifactregistry.googleapis.com \
  run.googleapis.com \
  cloudbuild.googleapis.com
```

Confirm the current project:

```bash
gcloud config get-value project
```

## Step 2: Prepare a Simple Web Application

Create `app.py`:

```python
import os

from flask import Flask

app = Flask(__name__)


@app.get("/")
def hello():
    return {"message": "Hello from Cloud Run"}


if __name__ == "__main__":
    port = int(os.environ.get("PORT", "8080"))
    app.run(host="0.0.0.0", port=port)
```

Create `requirements.txt`:

```text
Flask==3.*
gunicorn==23.*
```

Create `Dockerfile`:

```dockerfile
FROM python:3.13-slim

WORKDIR /app

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY app.py .

ENV PYTHONUNBUFFERED=1
CMD exec gunicorn --bind :$PORT --workers 1 --threads 8 --timeout 0 app:app
```

`CMD` uses `$PORT` so the same image can adapt to whatever port Cloud Run configures.

## Step 3: Test the Image Locally

Build the image:

```bash
docker build -t cloud-run-demo:local .
```

Run it locally:

```bash
docker run --rm \
  -e PORT=8080 \
  -p 8080:8080 \
  cloud-run-demo:local
```

Test it from another terminal:

```bash
curl http://localhost:8080/
```

You should see:

```json
{"message":"Hello from Cloud Run"}
```

If the container fails to start locally, fix the Docker or application issue first before deploying to Cloud Run. Don't treat the cloud deployment as a local debugging tool.

## Step 4: Create an Artifact Registry Repository

In the Console:

1. Open **Artifact Registry**.
2. Click **Create repository**.
3. Enter `tkr101-repo` for the name.
4. Choose **Docker** as the format.
5. Choose a region compatible with Cloud Run for the location, such as `asia-east1`.
6. Click **Create**.

Using the CLI:

```bash
gcloud artifacts repositories create tkr101-repo \
  --repository-format=docker \
  --location=asia-east1 \
  --description="TKR101 Cloud Run images"
```

View the repository:

```bash
gcloud artifacts repositories list \
  --location=asia-east1
```

## Step 5: Configure Docker Authentication

```bash
gcloud auth login
gcloud auth configure-docker asia-east1-docker.pkg.dev
```

This adds the Artifact Registry host to the Docker credential helper configuration. Don't write a long-lived service account JSON key into the Docker config or into the repository.

## Step 6: Tag the Image

The Artifact Registry Docker image URI has the following format:

```text
LOCATION-docker.pkg.dev/PROJECT_ID/REPOSITORY/IMAGE:TAG
```

Tag the local image:

```bash
docker tag cloud-run-demo:local \
  asia-east1-docker.pkg.dev/PROJECT_ID/tkr101-repo/cloud-run-demo:v1
```

## Step 7: Push the Image

```bash
docker push \
  asia-east1-docker.pkg.dev/PROJECT_ID/tkr101-repo/cloud-run-demo:v1
```

Confirm the image:

```bash
gcloud artifacts docker images list \
  asia-east1-docker.pkg.dev/PROJECT_ID/tkr101-repo
```

## Apple Silicon Build Note

On an Apple Silicon Mac, Docker may build an `arm64` image by default. The notebook course demonstrates building for `linux/amd64` to ensure the image is compatible with the target Cloud Run runtime, base image, and dependency architectures.

You can use `buildx` to build and push cross-platform in one step:

```bash
docker buildx build \
  --platform linux/amd64 \
  -t asia-east1-docker.pkg.dev/PROJECT_ID/tkr101-repo/cloud-run-demo:v1 \
  . \
  --push
```

Don't assume that a successful local Docker build guarantees it will run in the cloud. If you use native packages, a special base image, or multi-architecture deployments, check the current architecture support for Cloud Run and that image first.

## Image Checklist

- [ ] The application listens on `0.0.0.0`.
- [ ] The `PORT` environment variable is used.
- [ ] The image starts locally and passes a `curl` check.
- [ ] The image URI includes the correct project, repository, and tag.
- [ ] The Artifact Registry and Cloud Run locations are compatible.
- [ ] No API keys or secrets are baked into an image layer.
- [ ] The Apple Silicon build target architecture has been confirmed.
- [ ] The image tag maps to a traceable version or commit.

## Further Reading

- [Artifact Registry Docker images](https://cloud.google.com/artifact-registry/docs/docker)
- [Push and pull images](https://cloud.google.com/artifact-registry/docs/docker/pushing-and-pulling)
- [Authenticate Docker](https://cloud.google.com/artifact-registry/docs/docker/authentication)
- [Deploy container images to Cloud Run](https://cloud.google.com/run/docs/deploying)
