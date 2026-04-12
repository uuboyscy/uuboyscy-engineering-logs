---
sidebar_position: 10
---

# Scrapy Pipeline

The Item Pipeline processes and saves data after the Spider yields it. Each item passes through the pipeline stages you define.

---

## Enable a Pipeline

In `settings.py`, uncomment and configure `ITEM_PIPELINES`:

```python
# Enable a pipeline (uncomment and set priority)
ITEM_PIPELINES = {
    "my_crawler.pipelines.MyCrawlerPipeline": 300,
}
```

The number (`300`) is the **priority** — lower numbers run first. Typical range is `1–1000`.

---

## Write a Pipeline Class

Edit `pipelines.py`:

```python
class MyCrawlerPipeline:
    def process_item(self, item, spider):
        # Process or save the item here
        return item
```

`process_item()` is called for every item yielded by the spider. You must return the item (or raise `DropItem` to discard it).

---

## Example: Save to CSV

```python
import csv

class CsvPipeline:
    def open_spider(self, spider):
        self.file = open("output.csv", "w", newline="", encoding="utf-8")
        self.writer = csv.DictWriter(self.file, fieldnames=["text", "author"])
        self.writer.writeheader()

    def close_spider(self, spider):
        self.file.close()

    def process_item(self, item, spider):
        self.writer.writerow(item)
        return item
```

Register it in `settings.py`:

```python
ITEM_PIPELINES = {
    "my_crawler.pipelines.CsvPipeline": 300,
}
```

---

## Multiple Pipelines

You can register multiple pipelines — each item passes through them **in priority order** (lower number first).

```python
ITEM_PIPELINES = {
    "my_crawler.pipelines.ValidatePipeline": 100,  # runs first
    "my_crawler.pipelines.CsvPipeline": 300,        # runs second
    "my_crawler.pipelines.DatabasePipeline": 500,   # runs last
}
```

Each pipeline class is independent. A common pattern:

| Priority | Pipeline | Purpose |
|---|---|---|
| 100 | `ValidatePipeline` | Clean or drop invalid items |
| 300 | `CsvPipeline` | Save to CSV file |
| 500 | `DatabasePipeline` | Save to database |

If a pipeline raises `DropItem`, the item stops and does not pass to the next pipeline.
