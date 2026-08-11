# Introduction to BigQuery ML (BQML)

## What is BQML?
BigQuery Machine Learning (BQML) is a feature inside Google Cloud's BigQuery that lets you build and run machine learning models using **standard SQL queries**. 

## Why use BQML?
* **No need to move data:** You can train models directly where your data lives.
* **Easy to learn:** If you know SQL, you can do machine learning! No need to learn complex programming languages like Python or R.
* **Fast and scalable:** It uses BigQuery's powerful engine to process massive datasets quickly.

## The 4 Steps of BQML
Building a machine learning model usually follows these 4 simple steps:

1. **Prepare Data:** Clean and format your data into a table with features (behavior) and a label (what you want to predict).
2. **Create Model:** Use `CREATE MODEL` to train your model using your prepared data.
3. **Evaluate Model:** Use `ML.EVALUATE` to check how accurate your model is.
4. **Make Predictions:** Use `ML.PREDICT` to guess future outcomes on new data.
