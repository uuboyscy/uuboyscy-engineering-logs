---
sidebar_position: 4
---

# Model Training

Model training means letting the model learn patterns from the training table.

The training table contains:

- Features: input columns
- Label: answer column

For our example:

```text
features -> user behavior
label -> did the user purchase?
```

## Choose A Model Type

The purchase prediction problem is a classification problem because the label is a category:

```text
1 = purchase
0 = no purchase
```

A good beginner model for this case is logistic regression.

Logistic regression is often used for binary classification.

Binary classification means there are two possible answers.

## Prepare X And y

In scikit-learn, the common naming is:

- `X`: feature columns
- `y`: label column

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

Do not include `user_id` in `X`.

The model should learn from behavior, not from an identifier.

## Split Training And Test Data

We should not evaluate a model on the exact same rows used for training.

Use `train_test_split`.

```python
from sklearn.model_selection import train_test_split

X_train, X_test, y_train, y_test = train_test_split(
    X,
    y,
    test_size=0.2,
    random_state=42,
    stratify=y,
)
```

### Why stratify?

`stratify=y` tries to keep the label ratio similar in both training and test data.

This is useful for classification problems.

If the dataset is very small, `stratify=y` may fail because there are not enough examples in each class. For classroom practice, use enough sample rows so both classes have several examples.

## Build A scikit-learn Pipeline

A pipeline keeps preprocessing and model training together.

```python
from sklearn.impute import SimpleImputer
from sklearn.linear_model import LogisticRegression
from sklearn.pipeline import Pipeline
from sklearn.preprocessing import StandardScaler

model = Pipeline(steps=[
    ("imputer", SimpleImputer(strategy="median")),
    ("scaler", StandardScaler()),
    ("classifier", LogisticRegression(max_iter=1000)),
])
```

### SimpleImputer

`SimpleImputer` fills missing values.

For numeric features, `median` is a common beginner-friendly choice.

### StandardScaler

`StandardScaler` scales numeric features.

This helps models like logistic regression train more smoothly.

### LogisticRegression

`LogisticRegression` is the classification model.

It learns how each feature relates to the probability of purchase.

## Train The Model

```python
model.fit(X_train, y_train)
```

After this line, the model has learned from the training data.

## Make A Basic Prediction

Predict class labels.

```python
y_pred = model.predict(X_test)
```

Predict probabilities.

```python
y_proba = model.predict_proba(X_test)[:, 1]
```

For purchase prediction, probability is often more useful than only `0` or `1`.

Example:

```text
0.82 -> high purchase probability
0.13 -> low purchase probability
```

## Common Beginner Mistakes

### Training With The ID Column

Do not use `user_id` as a feature.

An id usually does not explain behavior. It may also make the model memorize users instead of learning general patterns.

### Training Before Checking The Label

Always check the label distribution first.

```python
training_data["label"].value_counts()
```

If there are no positive examples, the model cannot learn what a purchase user looks like.

### Evaluating On Training Data Only

If we only evaluate on training data, the result may look better than reality.

Keep test data separate so evaluation is more honest.

### Thinking A Trained Model Is Automatically Good

Training only creates a model.

Evaluation tells us whether the model is useful.

Do not stop after `model.fit()`.
