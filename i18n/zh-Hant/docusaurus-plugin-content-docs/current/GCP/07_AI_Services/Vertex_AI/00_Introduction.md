---
sidebar_position: 0
---

# Vertex AI 簡介

## 什麼是 Vertex AI？

Vertex AI 是 Google Cloud 的全代管 AI 平台，將生成式 AI 模型（如 Gemini）與機器學習工具整合在同一套服務中。

## 為什麼使用 Vertex AI？

* **基礎模型：** 無須自行架設與管理基礎設施，即可直接調用 Gemini 等頂尖模型。
* **SQL 整合：** 透過 BigQuery ML 遠端模型，直接在資料庫內用 SQL 對表格資料執行生成式 AI。
* **企業級安全性：** 具備完善的 IAM 存取控制與資料隱私保護機制。

## BigQuery ML + Vertex AI 運作流程

直接在標準 SQL 查詢中調用 Vertex AI 模型：

```text
BigQuery (SQL) ──► Connection (IAM) ──► Vertex AI (Gemini) ──► 查詢結果
```

1. **建立連線：** 建立 BigQuery `CLOUD_RESOURCE` 連線。
2. **授予 IAM 角色：** 將 `roles/aiplatform.user` 角色賦予該連線的服務帳號。
3. **建立遠端模型：** 在 BigQuery 中建立指向 Gemini 端點的 Remote Model。
4. **執行推論：** 使用 `ML.GENERATE_TEXT` 直接在 SQL 中處理資料。
