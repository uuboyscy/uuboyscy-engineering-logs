---
sidebar_position: 0
---

# Introduction to Vertex AI

## What is Vertex AI?

Vertex AI is Google Cloud's fully managed AI platform. It brings together generative AI models (such as Gemini) and machine learning tools in one place.

## Why Use Vertex AI?

* **Foundation Models:** Access models like Gemini without managing any infrastructure.
* **SQL Integration:** Use BigQuery ML remote models to run generative AI directly on table data.
* **Enterprise Ready:** Built-in IAM access controls and enterprise data privacy.

## BigQuery ML + Vertex AI Workflow

You can call Vertex AI models directly using standard SQL queries:

```text
BigQuery (SQL) ──► Connection (IAM) ──► Vertex AI (Gemini) ──► Output
```

1. **Create Connection:** Set up a BigQuery `CLOUD_RESOURCE` connection.
2. **Grant IAM Role:** Assign `roles/aiplatform.user` to the connection service account.
3. **Create Remote Model:** Define a model in BigQuery pointing to a Gemini endpoint.
4. **Run Inference:** Use `ML.GENERATE_TEXT` to process data in SQL.
