---
sidebar_position: 0
---

# 認識 Google Cloud Storage

Google Cloud Storage（GCS）是 Google Cloud 的物件儲存服務。你可以把它想成雲端上的大型檔案儲存空間，用來保存圖片、影片、CSV、JSON、備份檔與資料管線的原始資料。

在資料工程中，GCS 很常被用作 **Bronze／Raw layer**：先把來源資料原封不動落地，再交給 BigQuery、Dataflow 或其他資料處理工具轉換。

## 什麼是 Cloud Storage？

GCS 的核心資源有兩個：

```text
Google Cloud Project
└── Bucket
    └── Object
```

### Bucket

Bucket 是儲存物件的容器。Bucket 名稱使用全球共用的 namespace，因此名稱必須全世界唯一，不只是自己的 Project 內唯一。

建立 Bucket 時需要決定：

- Bucket name。
- Location。
- Default storage class。
- Access control。
- Protection 與 lifecycle policy。

### Object

Object 是實際儲存的檔案，包含資料本體、名稱與 metadata。Object name 可以包含 `/`，因此看起來像路徑：

```text
landing/2026/06/sell.csv
```

但一般 Bucket 中的 `/` 只是 object name 的一部分，不代表傳統檔案系統的真正資料夾。

## GCS 與 Google Drive 的差異

| 項目 | Google Drive | Cloud Storage |
| --- | --- | --- |
| 主要用途 | 個人與團隊文件協作 | 應用程式與資料管線的物件儲存 |
| 存取方式 | 使用者介面、Drive API | IAM、SDK、CLI、REST API |
| 資料組織 | 檔案與資料夾 | Bucket 與 Object |
| 資料處理 | 人工操作較多 | 適合自動化與大量資料 |
| 成本模型 | 依 Workspace 方案 | 依儲存、操作、網路與資料取用計費 |

GCS 適合讓程式與雲端服務讀寫資料，不應把它當成一般使用者硬碟來設計所有工作流程。

## GCS 在資料管線中的角色

```text
API / Crawler / Application
            │
            ▼
GCS Bucket（Bronze / Raw）
            │
            ├── BigQuery External Table
            │
            └── Load / Transform Job
                         │
                         ▼
                 BigQuery Native Table
```

保留原始檔案的好處是：當欄位定義、KPI 或轉換邏輯改變時，可以從原始資料重新執行管線，而不用回頭向來源系統重新抓取。

## 你將學到什麼

1. 建立具有正確 Location 與存取控制的 Bucket。
2. 使用 Console 與 `gcloud storage` 管理 Object。
3. 理解虛擬資料夾、Object metadata 與單向同步。

## 事前準備

開始前請準備：

- 一個已啟用 billing 的 Google Cloud Project。
- 已安裝 Google Cloud CLI。
- 已執行 `gcloud auth login`。
- 對 Project、IAM 與基本 shell 指令有初步認識。

> GCS 的儲存、操作、網路傳輸與資料取用可能產生費用。練習時使用小檔案，完成後檢查並清理 Bucket。

## 延伸閱讀

- [Cloud Storage overview](https://cloud.google.com/storage/docs/introduction)
- [Storage classes](https://cloud.google.com/storage/docs/storage-classes)
- [Cloud Storage pricing](https://cloud.google.com/storage/pricing)
