---
sidebar_position: 3
---

# Feature Engineering

Feature engineering means converting raw data into useful input columns for a model.

Raw events are usually too detailed for basic model training.

For example:

```text
user_001 viewed item SKU_1001 at 2023-01-01 10:00
user_001 added item SKU_1001 to cart at 2023-01-01 10:01
user_001 purchased at 2023-02-03 20:00
```

The model does not need every event as a separate row.

For our example, we summarize events into one row per user.

## Feature Examples

| Feature | Meaning |
| --- | --- |
| `recency` | How many days since the user's last event |
| `frequency` | How many sessions the user had |
| `view_item_count` | How many product views the user had |
| `add_to_cart_count` | How many times the user added items to cart |
| `avg_price_viewed` | Average price of viewed products |

These features summarize user behavior.

## Label Example

The label is:

```text
will_purchase
```

The value is:

- `1`: the user has a `purchase` event
- `0`: the user does not have a `purchase` event

## Feature Table Shape

The final training table should look like this:

| user_id | recency | frequency | view_item_count | add_to_cart_count | avg_price_viewed | label |
| --- | ---: | ---: | ---: | ---: | ---: | ---: |
| user_001 | 1 | 5 | 12 | 3 | 42.5 | 1 |
| user_002 | 14 | 1 | 1 | 0 | 20.0 | 0 |

Each row has:

- One user id
- Several feature columns
- One label column

## Build Features With pandas

Assume we already created these DataFrames in the data preparation step:

```python
feature_events
```

This DataFrame comes from the flattened GA4 mock data.

For feature columns, remove `purchase` rows first.

The purchase event will be used as the label.

```python
behavior_events = feature_events[
    feature_events["event_name"] != "purchase"
].copy()
```

Before grouping, create helper columns.

```python
behavior_events = behavior_events.copy()

behavior_events["is_view_item"] = (
    behavior_events["event_name"] == "view_item"
).astype(int)

behavior_events["is_add_to_cart"] = (
    behavior_events["event_name"] == "add_to_cart"
).astype(int)

behavior_events["view_item_price"] = behavior_events["price"].where(
    behavior_events["event_name"] == "view_item"
)
```

Why create these columns?

- `is_view_item` makes product views easy to count
- `is_add_to_cart` makes cart events easy to count
- `view_item_price` makes sure we only average prices from product view events

Create user-level behavior features.

```python
import pandas as pd

reference_date = feature_events["event_date"].max()

features = (
    behavior_events
    .groupby("user_id")
    .agg(
        last_event_date=("event_date", "max"),
        frequency=("session_id", "nunique"),
        view_item_count=("is_view_item", "sum"),
        add_to_cart_count=("is_add_to_cart", "sum"),
        avg_price_viewed=("view_item_price", "mean"),
    )
    .reset_index()
)
```

Create a recency feature.

```python
features["recency"] = (
    reference_date - features["last_event_date"]
).dt.days
```

Remove helper columns that should not be used by the model.

```python
features = features.drop(columns=["last_event_date"])
```

## Build Labels With pandas

Find users who have a purchase event.

```python
purchase_users = (
    feature_events
    .loc[feature_events["event_name"] == "purchase", "user_id"]
    .drop_duplicates()
)
```

Create the label column.

```python
labels = pd.DataFrame({
    "user_id": purchase_users,
    "label": 1,
})
```

Join features and labels.

```python
training_data = features.merge(labels, on="user_id", how="left")
training_data["label"] = training_data["label"].fillna(0).astype(int)
```

## Handle Missing Feature Values

Some users may not have viewed any product, so `avg_price_viewed` may be missing.

For a beginner example, fill it with `0`.

```python
training_data["avg_price_viewed"] = training_data["avg_price_viewed"].fillna(0)
```

Later, we can use scikit-learn's `SimpleImputer` to handle missing values inside a model pipeline.

## Preview The Training Table

```python
training_data.head()
```

Check the label distribution.

```python
training_data["label"].value_counts()
```

If almost every row has the same label, the model may have difficulty learning useful patterns.

## Select Feature Columns

The model should use behavior columns, not the user id.

```python
feature_cols = [
    "recency",
    "frequency",
    "view_item_count",
    "add_to_cart_count",
    "avg_price_viewed",
]

X = training_data[feature_cols]
y = training_data["label"]
```

## Feature Engineering Rules

Good beginner rules:

- Use features that are available before prediction time
- Keep one row meaning consistent
- Avoid using ID columns as model features
- Create simple count, average, max, min, and date-difference features first
- Check null values before training
- Keep feature names easy to understand

Feature engineering is usually the most important part of a beginner machine learning project.
