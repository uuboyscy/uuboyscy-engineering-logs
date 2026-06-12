---
sidebar_position: 5
---

# Model Evaluation

Model evaluation means checking whether the trained model performs well enough.

Training answers:

```text
Can we build a model?
```

Evaluation answers:

```text
Can we trust this model?
```

## Generate Predictions

After training the scikit-learn model, generate predictions on the test data.

```python
y_pred = model.predict(X_test)
y_proba = model.predict_proba(X_test)[:, 1]
```

`y_pred` contains predicted classes:

```text
0 or 1
```

`y_proba` contains predicted probabilities:

```text
0.0 to 1.0
```

For business use, probability is often more useful than only `0` or `1`.

Example:

```text
user_001 -> 0.82 purchase probability
user_002 -> 0.13 purchase probability
```

## Evaluate With scikit-learn

Import common evaluation metrics.

```python
from sklearn.metrics import (
    accuracy_score,
    classification_report,
    confusion_matrix,
    f1_score,
    precision_score,
    recall_score,
    roc_auc_score,
)
```

Calculate metrics.

```python
accuracy = accuracy_score(y_test, y_pred)
precision = precision_score(y_test, y_pred, zero_division=0)
recall = recall_score(y_test, y_pred, zero_division=0)
f1 = f1_score(y_test, y_pred, zero_division=0)
roc_auc = roc_auc_score(y_test, y_proba)

print("accuracy:", accuracy)
print("precision:", precision)
print("recall:", recall)
print("f1:", f1)
print("roc_auc:", roc_auc)
```

For classification models, common metrics include:

- Accuracy
- Precision
- Recall
- F1 score
- ROC AUC

`roc_auc_score` needs both classes in the test data. If the test data only has `0` or only has `1`, use a larger dataset or adjust the train/test split.

## Accuracy

Accuracy means:

```text
correct predictions / all predictions
```

Accuracy is easy to understand, but it can be misleading.

Example:

```text
95% of users do not purchase
```

A model can predict `no purchase` for everyone and still get 95% accuracy.

That model is not useful for finding likely buyers.

## Precision

Precision answers:

> When the model predicts purchase, how often is it correct?

High precision means fewer false alarms.

This is useful when actions are expensive.

Example:

- Sending a sales call
- Giving a high-value coupon
- Calling a customer manually

## Recall

Recall answers:

> Among users who really purchased, how many did the model find?

High recall means fewer missed positive cases.

This is useful when missing a positive case is costly.

Example:

- Fraud detection
- Churn prevention
- Safety monitoring

## F1 Score

F1 score combines precision and recall.

It is useful when you want one number that balances both.

```text
high precision + high recall -> better F1 score
```

## ROC AUC

ROC AUC measures how well the model separates positive and negative examples.

A simple interpretation:

| ROC AUC | Meaning |
| ---: | --- |
| Around 0.5 | Similar to random guessing |
| 0.7 to 0.8 | Some useful signal |
| 0.8 to 0.9 | Strong signal |
| Above 0.9 | Very strong, but check for leakage |

If ROC AUC looks too good, check whether future information accidentally entered the features.

## Confusion Matrix

A confusion matrix shows prediction results by class.

```python
cm = confusion_matrix(y_test, y_pred)
print(cm)
```

It helps answer:

- How many purchase users did we catch?
- How many non-purchase users did we incorrectly mark as purchase?
- Is the model biased toward one class?

The result is usually read like this:

```text
[[true_negative, false_positive],
 [false_negative, true_positive]]
```

## Classification Report

`classification_report` prints precision, recall, and F1 score by class.

```python
print(classification_report(y_test, y_pred))
```

This is a useful quick summary for beginners.

## Inspect Feature Importance

For logistic regression, we can inspect model coefficients.

```python
import pandas as pd

classifier = model.named_steps["classifier"]

importance = pd.DataFrame({
    "feature": feature_cols,
    "coefficient": classifier.coef_[0],
})

importance["abs_coefficient"] = importance["coefficient"].abs()
importance = importance.sort_values("abs_coefficient", ascending=False)

importance
```

This helps students understand which features influenced the model.

For example:

- `add_to_cart_count` may have a positive coefficient
- `recency` may have a negative coefficient

This means users who added items to cart may be more likely to purchase, while users inactive for many days may be less likely to purchase.

## Evaluation Checklist

Before using a model result, check:

- Did we evaluate the model on test data?
- Is the label distribution reasonable?
- Are accuracy, precision, recall, F1 score, and ROC AUC understandable?
- Does the confusion matrix make sense?
- Are important features reasonable?
- Is there possible data leakage?
- Is the prediction useful for a real business action?

Evaluation is not only a technical step. It connects the model result back to the real business problem.
