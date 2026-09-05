---
sidebar_position: 0
---

# Introduction to BigQuery

BigQuery 是 Google Cloud 提供的無伺服器（serverless）資料倉儲，適合用 SQL 分析大量資料。你不需要先建立 VM 或管理資料庫主機，只要準備好資料表，就能直接執行查詢。

本章會沿著一個簡單的資料工程流程，從 Cloud Storage 上傳資料，到 BigQuery 查詢、成本控制，再延伸到 Remote Function 與 Gemini 整合。

## What Is BigQuery?

BigQuery 主要處理分析型工作負載（OLAP），例如：

- 統計每日銷售量與營收。
- 分析使用者行為與轉換率。
- 建立給 BI 報表或機器學習使用的資料集。
- 查詢儲存在 Cloud Storage 的外部資料。

BigQuery 和 Cloud SQL 的用途不同：

| 服務 | 適合的工作 | 常見查詢方式 |
| --- | --- | --- |
| Cloud SQL | 應用程式的交易資料庫（OLTP） | 單筆讀寫、交易、索引查詢 |
| BigQuery | 大量資料分析（OLAP） | 聚合、Join、趨勢分析、批次處理 |

## BigQuery Resource Hierarchy

BigQuery 常見的資源階層如下：

```text
Google Cloud Project
└── Dataset
    ├── Native Table
    ├── External Table
    └── Model / View / Routine
```

### Project

Project 是 Google Cloud 的資源與帳務邊界。BigQuery job、Dataset 和儲存空間都會與 Project 的權限及計費設定有關。

### Dataset

Dataset 是資料表、檢視表、模型與 Routine 的容器。建立 Dataset 時要先決定 Location，例如 `asia-east1`。

同一個查詢所使用的資料通常應放在相容的地理位置。Cloud Storage bucket、BigQuery Dataset、Connection 與相關模型若跨區域，可能無法連線，或產生額外的資料傳輸成本。

### Table

BigQuery 的資料表常見有兩種：

- **Native table**：資料載入 BigQuery 管理的儲存空間，通常適合反覆查詢與正式分析。
- **External table**：資料保留在 Cloud Storage，BigQuery 在查詢時讀取檔案，適合快速探索或尚未完成匯入的原始資料。

## Native Table and External Table

| 比較項目 | Native table | External table |
| --- | --- | --- |
| 資料位置 | BigQuery managed storage | Cloud Storage 等外部來源 |
| 查詢效能 | 通常較穩定 | 取決於外部檔案與來源 |
| 資料載入 | 需要執行 load job | 不必先搬入 BigQuery |
| 適合情境 | Silver、Gold、正式報表 | Bronze、探索、暫時性資料 |

External table 並不等於把檔案複製進 BigQuery。建立的是一個 Schema 與 URI 的查詢入口，原始檔案仍然留在 Cloud Storage。

## A Simple Data Engineering Flow

本章使用以下流程作為練習：

```text
Local CSV
   │
   ▼
Cloud Storage bucket（Bronze / Raw）
   │
   ├── External table：快速探索
   │
   └── Load job
          │
          ▼
BigQuery native table（Silver）
          │
          ▼
View / aggregated table（Gold）
```

## What You Will Learn

1. 建立 BigQuery Dataset 與 Cloud Storage bucket。
2. 載入 CSV 到 Native table。
3. 建立 CSV、JSON Lines 與 Hive partitioned External table。
4. 使用 Standard SQL 查詢並控制掃描量。
5. 使用 BigQuery Connection 呼叫 Cloud Run functions 的 Remote Function。
6. 透過 Remote Model 與 `ML.GENERATE_TEXT` 讓 SQL 呼叫 Gemini。
7. 用 Bronze、Silver、Gold 思考資料管線的責任邊界。

## Prerequisites

開始前請準備：

- 一個已啟用 billing 的 Google Cloud Project。
- 已安裝並登入 Google Cloud CLI（`gcloud`）。
- 對 SQL 的 `SELECT`、`WHERE`、`GROUP BY` 有基本認識。
- 了解 GCS、Cloud Run functions 與 BQML 的基本用途。

> 實際操作雲端服務可能產生費用。請在 Project 中設定 Budget Alert，並在練習結束後刪除不再需要的資源。Budget Alert 是通知機制，不會自動停止服務。

## Further Reading

- [BigQuery documentation](https://cloud.google.com/bigquery/docs)
- [BigQuery locations](https://cloud.google.com/bigquery/docs/locations)
- [BigQuery pricing](https://cloud.google.com/bigquery/pricing)
- [Introduction to BigQuery ML](/docs/GCP/BQML/bqml_introduction)
