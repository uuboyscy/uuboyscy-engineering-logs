---
sidebar_position: 0
---

# Introduction to Cloud Run

Cloud Run 是 Google Cloud 提供的全代管容器平台，可以執行 Web service、API、批次任務與事件處理程式。你只需要準備 container image 或 source code，不需要自行管理 VM、作業系統與 Kubernetes cluster。

本章會沿著一個資料工程常見的路徑，從 Docker image、Artifact Registry、Cloud Run Service 與 Job，一路延伸到 Cloud Run functions、IAM 與 BigQuery Remote Function。

## What Is Cloud Run?

Cloud Run 的核心概念是：

```text
Container image / source code
            │
            ▼
      Cloud Run revision
            │
            ├── Service：等待 HTTP request
            ├── Job：執行任務後結束
            └── Function：由 Google 封裝成 Service
```

Cloud Run 會依照請求或任務需求建立 container instance，並依照設定進行擴縮。服務閒置時可以縮減到零個 instance；是否產生費用則仍取決於計費模式與其他設定，不應把 scale-to-zero 當成所有費用都會消失的保證。

## Services, Jobs, and Functions

| 類型 | 執行方式 | 適合情境 | Container 行為 |
| --- | --- | --- | --- |
| Cloud Run Service | 接收 HTTP request | Flask API、網站、Webhook | 必須監聽 `PORT` |
| Cloud Run Job | 執行一次或排程任務 | ETL、備份、爬蟲、批次處理 | 完成後必須 exit |
| Cloud Run functions | 由 source code 建立函數 | 單一事件 handler、輕量 API | Google 自動 build 成 Service |

### Cloud Run Service

Service 是 request-driven 的服務。Cloud Run 會替它提供 HTTPS endpoint、revision 與自動擴縮。Web application 必須監聽 Cloud Run 注入的 `PORT` environment variable，預設通常是 `8080`。

### Cloud Run Job

Job 不負責接收 request，也不應啟動 Web server。Container 完成工作後要正常結束並回傳 exit code `0`；失敗時回傳非零 exit code。Cloud Run 會依照 task 與 retry 設定管理執行結果。

### Cloud Run functions

Cloud Run functions（Cloud Functions 第 2 代）讓你直接部署 Python、Node.js 等語言的函數。Google 會協助 build container 並部署成 Cloud Run service，開發者主要維護 entry point 與函數邏輯。

## Revision

每次更新 image、環境變數、CPU、Memory、port 或其他 Service 設定，都會產生新的 revision：

```text
Service: sales-api
├── sales-api-00001  10% traffic
└── sales-api-00002  90% traffic
```

Revision 讓你可以：

- 查看歷史設定。
- 執行新版本 smoke test。
- 逐步轉移流量。
- 發生問題時回滾到舊版本。

## Container Contract

Cloud Run container 應符合以下原則：

- Service 的 HTTP server 監聽 `0.0.0.0`，不要只監聽 `127.0.0.1`。
- 使用 Cloud Run 注入的 `PORT`，不要硬編碼只有本地可用的 port。
- Service 不要依賴本地磁碟保存永久資料。
- Job 完成後要 exit，不要永遠執行背景 server。
- 將設定與密碼交給 environment variable、Secret Manager 或其他受控設定來源。
- Log 寫到 stdout／stderr，讓 Cloud Logging 可以收集。

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

1. 建立 Docker image 與 Artifact Registry repository。
2. 將 container 部署成 Cloud Run Service。
3. 使用 Cloud Run Job 執行 ETL、備份或爬蟲。
4. 使用 Cloud Run functions 部署單一函數。
5. 設定 port、CPU、Memory、timeout、retry 與 autoscaling。
6. 使用專用 Service Account 實作最小權限。
7. 連接 Secret Manager、BigQuery Remote Function 與其他 GCP 服務。
8. 完成測試後安全清理資源。

## Prerequisites

開始前請準備：

- 一個已啟用 billing 的 Google Cloud Project。
- 已安裝 Google Cloud CLI。
- 已安裝 Docker Desktop 或其他 Docker runtime。
- 了解基本 Docker、Git 與 HTTP 概念。
- 已執行 `gcloud auth login`。

> Cloud Run、Artifact Registry、Cloud Build、網路傳輸與其他整合服務可能產生費用。練習時使用小型 image，完成後刪除不需要的 Service、Job、image 與 repository。

## Further Reading

- [Cloud Run documentation](https://cloud.google.com/run/docs)
- [Cloud Run container runtime contract](https://cloud.google.com/run/docs/container-contract)
- [Cloud Run pricing](https://cloud.google.com/run/pricing)
- [Cloud Run functions comparison](https://cloud.google.com/run/docs/functions/comparison)
