# BQML Sample: Purchase Propensity

In this sample, we will build a machine learning model to predict: **"Will this user make a purchase in the next 7 days?"**

## Step 1: Generate Mock Data
First, we use a Python script to generate sample e-commerce data (like `view_item` or `add_to_cart`). This creates a file called `ga4_mock_data.json`.
*(You would load this JSON file into a BigQuery table named `bqml_demo.analytics_events`.)*

<details>
<summary>Click here to view the Python Script</summary>

```python
import json
import random
import datetime
import uuid

# Configuration
NUM_USERS = 100
START_DATE = datetime.date(2023, 1, 1)
DAYS_TO_SIMULATE = 60
OUTPUT_FILE = "ga4_mock_data.json"

# Event Types
EVENTS = ["session_start", "page_view", "view_item", "add_to_cart", "begin_checkout", "purchase"]

# Items
ITEMS = [
    {"item_id": "SKU_1001", "item_name": "T-Shirt Basic", "price": 20.0, "category": "Apparel"},
    {"item_id": "SKU_1002", "item_name": "Jeans Slim", "price": 50.0, "category": "Apparel"},
    {"item_id": "SKU_2001", "item_name": "Running Shoes", "price": 80.0, "category": "Footwear"},
    {"item_id": "SKU_3001", "item_name": "Cap", "price": 15.0, "category": "Accessories"},
    {"item_id": "SKU_4001", "item_name": "Backpack", "price": 45.0, "category": "Accessories"},
]

def generate_user_data():
    """Generates a list of events for a set of users with varying behaviors."""
    
    all_events = []
    user_ids = [str(uuid.uuid4()) for _ in range(NUM_USERS)]
    
    # Assign personas
    heavy_buyers = user_ids[:int(NUM_USERS*0.1)]
    window_shoppers = user_ids[int(NUM_USERS*0.1):int(NUM_USERS*0.1)+int(NUM_USERS*0.3)]
    bouncers = user_ids[int(NUM_USERS*0.4):]

    for day_offset in range(DAYS_TO_SIMULATE):
        current_date = START_DATE + datetime.timedelta(days=day_offset)
        date_str = current_date.strftime("%Y%m%d")
        
        daily_active_users = []
        
        for uid in heavy_buyers:
            if random.random() < 0.3: daily_active_users.append((uid, "buyer"))
        for uid in window_shoppers:
            if random.random() < 0.1: daily_active_users.append((uid, "shopper"))
        for uid in bouncers:
            if random.random() < 0.02: daily_active_users.append((uid, "bouncer"))

        for uid, persona in daily_active_users:
            ga_session_id = int(datetime.datetime.now().timestamp()) + random.randint(1, 100000)
            base_timestamp_micros = int(datetime.datetime(
                current_date.year, current_date.month, current_date.day,
                random.randint(8, 22), random.randint(0, 59)
            ).timestamp() * 1000000)

            base_params = [
                {"key": "ga_session_id", "value": {"int_value": ga_session_id}},
                {"key": "page_title", "value": {"string_value": "Home Page"}}
            ]

            all_events.append({
                "event_date": date_str,
                "event_timestamp": base_timestamp_micros,
                "event_name": "session_start",
                "user_pseudo_id": uid,
                "event_params": base_params
            })
            base_timestamp_micros += random.randint(1000, 5000000) 

            num_views = 0
            if persona == "bouncer": num_views = random.randint(0, 1)
            elif persona == "shopper": num_views = random.randint(2, 5)
            elif persona == "buyer": num_views = random.randint(3, 8)

            for _ in range(num_views):
                item = random.choice(ITEMS)
                all_events.append({
                    "event_date": date_str,
                    "event_timestamp": base_timestamp_micros,
                    "event_name": "view_item",
                    "user_pseudo_id": uid,
                    "event_params": base_params + [
                         {"key": "item_id", "value": {"string_value": item["item_id"]}},
                         {"key": "price", "value": {"double_value": item["price"]}}
                    ]
                })
                base_timestamp_micros += random.randint(5000000, 30000000)

                atc_chance = 0.0
                if persona == "shopper": atc_chance = 0.2
                if persona == "buyer": atc_chance = 0.5
                
                if random.random() < atc_chance:
                    all_events.append({
                        "event_date": date_str,
                        "event_timestamp": base_timestamp_micros,
                        "event_name": "add_to_cart",
                        "user_pseudo_id": uid,
                        "event_params": base_params + [
                             {"key": "item_id", "value": {"string_value": item["item_id"]}},
                             {"key": "price", "value": {"double_value": item["price"]}}
                        ]
                    })
                    base_timestamp_micros += random.randint(2000000, 10000000)

            purchase_chance = 0.0
            if persona == "buyer": purchase_chance = 0.4
            
            if random.random() < purchase_chance:
                pkt_value = random.choice(ITEMS)["price"]
                all_events.append({
                    "event_date": date_str,
                    "event_timestamp": base_timestamp_micros,
                    "event_name": "purchase",
                    "user_pseudo_id": uid,
                    "event_params": base_params + [
                         {"key": "currency", "value": {"string_value": "USD"}},
                         {"key": "value", "value": {"double_value": pkt_value}}
                    ]
                })

    return all_events

def main():
    events = generate_user_data()
    events.sort(key=lambda x: x["event_timestamp"])
    with open(OUTPUT_FILE, "w") as f:
        for event in events:
            f.write(json.dumps(event) + "\n")
    print(f"Generated {len(events)} events in {OUTPUT_FILE}")

if __name__ == "__main__":
    main()
```
</details>

## Step 2: Feature Engineering (Prepare Data)
We need to convert the raw events into user behavior features. We look at their past 30 days of behavior to predict if they will buy later (this target outcome is called a `label`).

```sql
CREATE OR REPLACE TABLE bqml_demo.training_data AS

WITH 
  config AS (
    SELECT 
      DATE('2023-01-31') as training_end_date,  -- Data BEFORE this is used for features
      DATE('2023-02-07') as prediction_end_date -- Data AFTER this is used for labels
  ),

  features AS (
    SELECT
      user_pseudo_id,
      -- Recency: Days since the last event
      DATE_DIFF((SELECT training_end_date FROM config), MAX(PARSE_DATE('%Y%m%d', CAST(event_date AS STRING))), DAY) as recency,
      -- Frequency: Number of unique sessions
      COUNT(DISTINCT (SELECT value.int_value FROM UNNEST(event_params) WHERE key = 'ga_session_id')) as frequency,
      -- Product Views
      COUNTIF(event_name = 'view_item') as view_item_count,
      -- Cart Adds
      COUNTIF(event_name = 'add_to_cart') as add_to_cart_count,
      -- Item Value
      AVG((SELECT value.double_value FROM UNNEST(event_params) WHERE key = 'price')) as avg_price_viewed
    FROM `bqml_demo.analytics_events`
    WHERE PARSE_DATE('%Y%m%d', CAST(event_date AS STRING)) <= (SELECT training_end_date FROM config)
    GROUP BY user_pseudo_id
  ),

  labels AS (
    SELECT
      user_pseudo_id,
      1 as will_purchase  -- Flag as 1 if they made a purchase
    FROM `bqml_demo.analytics_events`
    WHERE PARSE_DATE('%Y%m%d', CAST(event_date AS STRING)) BETWEEN 
          DATE_ADD((SELECT training_end_date FROM config), INTERVAL 1 DAY) 
          AND (SELECT prediction_end_date FROM config)
      AND event_name = 'purchase'
    GROUP BY user_pseudo_id
  )

SELECT
  f.*,
  IFNULL(l.will_purchase, 0) as label
FROM features f
LEFT JOIN labels l USING(user_pseudo_id);
```

## Step 3: Train the Model
We train a **Logistic Regression** model. This is a common AI algorithm used to predict Yes/No outcomes. BigQuery will automatically handle the math in the background!

```sql
CREATE OR REPLACE MODEL `bqml_demo.purchase_propensity_model`
OPTIONS(
  model_type='LOGISTIC_REG',
  input_label_cols=['label'],
  enable_global_explain=TRUE
) AS
SELECT
  * EXCEPT(user_pseudo_id) -- User ID is just an identifier, not a predictive feature
FROM
  `bqml_demo.training_data`;
```

## Step 4: Evaluate and Predict

Once the model is ready, we can check how good it is and then start making predictions.

**1. Check Accuracy (Evaluate)**
```sql
SELECT *
FROM ML.EVALUATE(MODEL `bqml_demo.purchase_propensity_model`,
  (SELECT * FROM `bqml_demo.training_data`)
);
```

**2. Make Predictions**
This tells us the probability (from 0 to 1) that a specific user will buy something.
```sql
SELECT *
FROM ML.PREDICT(MODEL `bqml_demo.purchase_propensity_model`,
  (SELECT * FROM `bqml_demo.training_data`)
);
```

**3. Find Feature Importance**
See what drove the predictions. (e.g., adding to cart might be a strong sign of purchase).
```sql
SELECT
  processed_input,
  weight
FROM ML.WEIGHTS(MODEL `bqml_demo.purchase_propensity_model`)
ORDER BY ABS(weight) DESC;
```
