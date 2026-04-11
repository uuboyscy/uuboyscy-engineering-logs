---
sidebar_position: 16
---

# Rolling Window

Rolling window lets you calculate statistics (like sum, mean, or std) over a sliding window of rows. It's useful for smoothing noisy data or computing moving averages.

## Basic Usage

```python
import pandas as pd

data = {
    "date": ["2023-01-01", "2023-01-02", "2023-01-03", "2023-01-04", "2023-01-05"],
    "sales": [100, 200, 150, 300, 250]
}

df = pd.DataFrame(data)

# 3-day rolling mean
df["rolling_mean"] = df["sales"].rolling(window=3).mean()
print(df)
```

```sql
SELECT
    date,
    sales,
    AVG(sales) OVER (
        ORDER BY date
        ROWS BETWEEN 2 PRECEDING AND CURRENT ROW
    ) AS rolling_mean
FROM df
```

Output:

```
         date  sales  rolling_mean
0  2023-01-01    100           NaN
1  2023-01-02    200           NaN
2  2023-01-03    150        150.00
3  2023-01-04    300        216.67
4  2023-01-05    250        233.33
```

The first two rows are `NaN` because there aren't enough rows to fill a window of 3.

## Common Aggregations

| Method | Description |
|---|---|
| `.rolling(n).mean()` | Moving average |
| `.rolling(n).sum()` | Rolling sum |
| `.rolling(n).std()` | Rolling standard deviation |
| `.rolling(n).min()` | Rolling minimum |
| `.rolling(n).max()` | Rolling maximum |

## Parameters

- **`window`**: Number of rows in each window (required)
- **`min_periods`**: Minimum number of non-null rows required to compute a result. Defaults to `window`. Set it lower to avoid leading `NaN`s.
- **`center`**: If `True`, the window is centered on the current row instead of looking backward.

```python
# Avoid NaN at the start by setting min_periods=1
df["rolling_mean"] = df["sales"].rolling(window=3, min_periods=1).mean()
```

```sql
-- SQL window functions include partial windows by default (same as min_periods=1)
SELECT
    date,
    sales,
    AVG(sales) OVER (
        ORDER BY date
        ROWS BETWEEN 2 PRECEDING AND CURRENT ROW
    ) AS rolling_mean
FROM df
```

## Rolling with GroupBy

When your data has multiple groups (e.g., multiple products), use `groupby` first.

```python
data = {
    "date": ["2023-01-01", "2023-01-02", "2023-01-03", "2023-01-01", "2023-01-02", "2023-01-03"],
    "product": ["Apple", "Apple", "Apple", "Banana", "Banana", "Banana"],
    "sales": [100, 200, 150, 300, 250, 400]
}

df = pd.DataFrame(data)

df["rolling_mean"] = (
    df.groupby("product")["sales"]
    .transform(lambda x: x.rolling(window=2).mean())
)
print(df)
```

```sql
SELECT
    date,
    product,
    sales,
    AVG(sales) OVER (
        PARTITION BY product
        ORDER BY date
        ROWS BETWEEN 1 PRECEDING AND CURRENT ROW
    ) AS rolling_mean
FROM df
```

Output:

```
         date product  sales  rolling_mean
0  2023-01-01   Apple    100           NaN
1  2023-01-02   Apple    200        150.0
2  2023-01-03   Apple    150        175.0
3  2023-01-01  Banana    300           NaN
4  2023-01-02  Banana    250        275.0
5  2023-01-03  Banana    400        325.0
```

Each group's rolling window is calculated independently.

## Real-World Use Case

In data pipelines, rolling windows are commonly used to detect anomalies. For example, if today's sales are much higher than the 7-day rolling average, it might be a data quality issue — or just a really good day.

```python
df["rolling_avg_7d"] = df["sales"].rolling(window=7, min_periods=1).mean()
df["is_spike"] = df["sales"] > df["rolling_avg_7d"] * 1.5
```

```sql
SELECT
    date,
    sales,
    AVG(sales) OVER (
        ORDER BY date
        ROWS BETWEEN 6 PRECEDING AND CURRENT ROW
    ) AS rolling_avg_7d,
    CASE
        WHEN sales > AVG(sales) OVER (
            ORDER BY date
            ROWS BETWEEN 6 PRECEDING AND CURRENT ROW
        ) * 1.5 THEN TRUE
        ELSE FALSE
    END AS is_spike
FROM df
```
