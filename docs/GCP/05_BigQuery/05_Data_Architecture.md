---
sidebar_position: 5
---

# BigQuery Data Architecture

資料工程不只是把檔案放進 BigQuery。真正重要的是：每一層資料負責什麼、誰可以使用、如何驗證，以及什麼時候可以被重建或刪除。

## Bronze, Silver, and Gold

一個常見的分層方式如下：

```text
Source systems
    │
    ▼
Bronze / Raw
    │  原始資料、保留來源格式
    ▼
Silver / Cleaned
    │  清理、標準化、去重、型別轉換
    ▼
Gold / Mart
       依業務問題聚合，供 BI、API 或 ML 使用
```

### Bronze: Raw Data

Bronze 層保留從 API、資料庫、爬蟲或事件系統收到的原始資料：

- 儘量保留來源欄位與原始值。
- 記錄 ingestion time、source、batch id 或檔案 URI。
- 放在 Cloud Storage 或 BigQuery external table 都可以。
- 不要在這一層直接覆蓋原始資料，否則出錯時無法重建。

### Silver: Cleaned Data

Silver 層是可以被其他資料任務穩定使用的標準資料：

- 統一欄位名稱與資料型別。
- 轉換日期與時區。
- 移除明顯錯誤、處理 Null 與重複資料。
- 建立穩定的 primary key 或 business key。
- 記錄資料品質檢查結果。

範例：把外部 CSV 清理成 Native table：

```sql
CREATE OR REPLACE TABLE `PROJECT_ID.TKR101.sales_silver` AS
SELECT
  TRIM(product_id) AS product_id,
  TRIM(product_name) AS product_name,
  NULLIF(TRIM(category), '') AS category,
  SAFE_CAST(price AS NUMERIC) AS price,
  CURRENT_TIMESTAMP() AS transformed_at
FROM `PROJECT_ID.TKR101.sales_external`
WHERE NULLIF(TRIM(product_id), '') IS NOT NULL;
```

### Gold: Business Data Mart

Gold 層應該直接回答業務問題，例如每日分類營收：

```sql
CREATE OR REPLACE TABLE `PROJECT_ID.TKR101.category_daily_sales` AS
SELECT
  CURRENT_DATE() AS snapshot_date,
  category,
  COUNT(*) AS product_count,
  SUM(price) AS total_price,
  AVG(price) AS average_price
FROM `PROJECT_ID.TKR101.sales_silver`
WHERE category IS NOT NULL
GROUP BY category;
```

Gold 層可能服務：

- BI dashboard。
- API 或產品功能。
- 行銷分群與 Customer Data Platform。
- BigQuery ML 的 feature table。
- 後續的 Reverse ETL。

## Data Contract

Data Contract 是資料提供者與使用者之間的約定。至少應說明：

| 項目 | 範例 |
| --- | --- |
| 欄位名稱 | `product_id` |
| 型別 | `STRING` |
| 必填規則 | 不可為 Null |
| 格式 | `P` 加上三位數字 |
| 數值範圍 | `price >= 0` |
| 更新頻率 | 每日 02:00 |
| 延遲定義 | T+1 06:00 前完成 |
| 變更方式 | 新增欄位需提前通知 |

沒有 Data Contract 時，上游很容易在不知情的情況下改欄位名稱、型別或 Null 規則，導致下游 query 與 dashboard 同時失效。

## Data Quality Checks

在 Silver 或 Gold 產出後，至少檢查：

```sql
-- 1. 必填欄位
SELECT COUNT(*) AS missing_product_id
FROM `PROJECT_ID.TKR101.sales_silver`
WHERE product_id IS NULL;

-- 2. 不應為負數
SELECT COUNT(*) AS invalid_price
FROM `PROJECT_ID.TKR101.sales_silver`
WHERE price < 0;

-- 3. 重複 business key
SELECT
  product_id,
  COUNT(*) AS row_count
FROM `PROJECT_ID.TKR101.sales_silver`
GROUP BY product_id
HAVING COUNT(*) > 1;
```

查詢結果若不符合門檻，資料管線應停止發佈 Gold table，並把錯誤送到監控或 quarantine table，而不是繼續產出看似正常的報表。

## BigQuery and Dataform

當 SQL 轉換增加後，可以使用 Dataform 管理：

- SQLX model 與相依關係。
- 測試與 assertions。
- Dataset 建立順序。
- 排程與版本控制。
- 文件與欄位描述。

一開始可以用 BigQuery Scheduled Query 或簡單 CLI 練習；當 SQL、表格與團隊協作變多，再導入 Dataform 或其他 orchestration tool。

## Reverse ETL

Reverse ETL 是把 BigQuery 中整理好的欄位、分群或預測結果同步回 operational system，例如 CRM、CDP 或行銷平台：

```text
Operational source
      │
      ▼
Bronze → Silver → Gold in BigQuery
                         │
                         ▼
                 Reverse ETL to CRM / CDP
```

同步前要先確認：

- Gold 欄位是否有清楚定義。
- 目的系統是否接受 Null、重複與延遲資料。
- 是否需要 upsert、soft delete 或版本欄位。
- 個人資料是否符合隱私與保留政策。
- 重跑任務是否會造成重複通知或重複扣款。

## A Practical Checklist

設計 BigQuery 資料管線時，可以用以下清單自我檢查：

- [ ] Dataset 與 Cloud Storage location 策略已決定。
- [ ] Bronze 原始資料可以追溯與重建。
- [ ] Silver 的欄位型別、Null、時區與去重規則已定義。
- [ ] Gold table 對應明確的業務問題。
- [ ] 每張正式 table 有 owner、更新頻率與欄位說明。
- [ ] Query 有 partition filter 或其他掃描量控制。
- [ ] Job 設定 maximum bytes billed 或等價的成本護欄。
- [ ] IAM 使用最小權限，沒有用公開 bucket 或公開 endpoint 解決問題。
- [ ] 失敗資料與模型無法解析的結果有 quarantine 流程。
- [ ] 重新執行不會重複寫入或重複觸發外部副作用。

## Next Step: BigQuery ML

完成 BigQuery 基礎後，可以接著學習：

- [Introduction to BigQuery ML](../06_BQML/01_bqml_introduction.md)
- [BQML Sample: Purchase Propensity](../06_BQML/02_bqml_sample.md)

BQML 延續本章的資料分層概念：先準備乾淨的 feature table，再建立模型、評估結果與執行預測。

## Further Reading

- [BigQuery data warehouse overview](https://cloud.google.com/bigquery/docs/introduction)
- [BigQuery best practices for performance](https://cloud.google.com/bigquery/docs/best-practices-performance-overview)
- [Dataform documentation](https://cloud.google.com/dataform/docs)
- [BigQuery ML overview](https://cloud.google.com/bigquery/docs/bqml-introduction)
