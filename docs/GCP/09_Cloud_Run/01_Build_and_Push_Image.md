---
sidebar_position: 1
---

# Build and Push a Container Image

Cloud Run 可以直接部署 container image。常見的做法是：先在本地建立 Docker image，推送到 Artifact Registry，再讓 Cloud Run 以該 image 建立 Service 或 Job。

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

Artifact Registry 是 Google Cloud 的私有 artifact repository，可以儲存 Docker image 與其他套件格式。Cloud Run 部署時會從 registry 讀取 image。

## Step 1: Enable APIs

```bash
gcloud config set project PROJECT_ID

gcloud services enable \
  artifactregistry.googleapis.com \
  run.googleapis.com \
  cloudbuild.googleapis.com
```

確認目前 Project：

```bash
gcloud config get-value project
```

## Step 2: Prepare a Simple Web Application

建立 `app.py`：

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

建立 `requirements.txt`：

```text
Flask==3.*
gunicorn==23.*
```

建立 `Dockerfile`：

```dockerfile
FROM python:3.13-slim

WORKDIR /app

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY app.py .

ENV PYTHONUNBUFFERED=1
CMD exec gunicorn --bind :$PORT --workers 1 --threads 8 --timeout 0 app:app
```

`CMD` 使用 `$PORT`，讓同一個 image 可以配合 Cloud Run 的 port 設定。

## Step 3: Test the Image Locally

建立 image：

```bash
docker build -t cloud-run-demo:local .
```

在本地啟動：

```bash
docker run --rm \
  -e PORT=8080 \
  -p 8080:8080 \
  cloud-run-demo:local
```

另一個 terminal 測試：

```bash
curl http://localhost:8080/
```

預期會看到：

```json
{"message":"Hello from Cloud Run"}
```

如果本地 container 無法啟動，先修正 Docker 或 application 問題，再部署到 Cloud Run。不要把雲端部署當成本地除錯工具。

## Step 4: Create an Artifact Registry Repository

在 Console 中：

1. 開啟 **Artifact Registry**。
2. 點選 **Create repository**。
3. Name 輸入 `tkr101-repo`。
4. Format 選擇 **Docker**。
5. Location 選擇與 Cloud Run 相容的 Region，例如 `asia-east1`。
6. 點選 **Create**。

使用 CLI：

```bash
gcloud artifacts repositories create tkr101-repo \
  --repository-format=docker \
  --location=asia-east1 \
  --description="TKR101 Cloud Run images"
```

查看 repository：

```bash
gcloud artifacts repositories list \
  --location=asia-east1
```

## Step 5: Configure Docker Authentication

```bash
gcloud auth login
gcloud auth configure-docker asia-east1-docker.pkg.dev
```

這會把 Artifact Registry host 加入 Docker credential helper 設定。不要把長期服務帳號 JSON key 寫進 Docker config 或 repository。

## Step 6: Tag the Image

Artifact Registry Docker image URI 格式如下：

```text
LOCATION-docker.pkg.dev/PROJECT_ID/REPOSITORY/IMAGE:TAG
```

標記本地 image：

```bash
docker tag cloud-run-demo:local \
  asia-east1-docker.pkg.dev/PROJECT_ID/tkr101-repo/cloud-run-demo:v1
```

## Step 7: Push the Image

```bash
docker push \
  asia-east1-docker.pkg.dev/PROJECT_ID/tkr101-repo/cloud-run-demo:v1
```

確認 image：

```bash
gcloud artifacts docker images list \
  asia-east1-docker.pkg.dev/PROJECT_ID/tkr101-repo
```

## Apple Silicon Build Note

Apple Silicon Mac 預設可能建立 `arm64` image。Notebook 課程示範使用 `linux/amd64`，目的是確保 image 與目標 Cloud Run runtime、base image 及相依套件的架構相容。

可以使用 `buildx` 直接跨平台 build 並 push：

```bash
docker buildx build \
  --platform linux/amd64 \
  -t asia-east1-docker.pkg.dev/PROJECT_ID/tkr101-repo/cloud-run-demo:v1 \
  . \
  --push
```

不要只根據「本地 Docker build 成功」判斷雲端一定能執行。若使用原生套件、特殊 base image 或多架構 deployment，請先查看目前 Cloud Run 與該 image 的架構支援狀態。

## Image Checklist

- [ ] Application 監聽 `0.0.0.0`。
- [ ] 使用 `PORT` environment variable。
- [ ] Image 可以在本地啟動並通過 `curl`。
- [ ] Image URI 包含正確的 Project、repository、tag。
- [ ] Artifact Registry 與 Cloud Run location 設計相容。
- [ ] 沒有把 API key 或密碼寫進 image layer。
- [ ] Apple Silicon build 已確認目標架構。
- [ ] image tag 可以對應到可追蹤的版本或 commit。

## Further Reading

- [Artifact Registry Docker images](https://cloud.google.com/artifact-registry/docs/docker)
- [Push and pull images](https://cloud.google.com/artifact-registry/docs/docker/pushing-and-pulling)
- [Authenticate Docker](https://cloud.google.com/artifact-registry/docs/docker/authentication)
- [Deploy container images to Cloud Run](https://cloud.google.com/run/docs/deploying)
