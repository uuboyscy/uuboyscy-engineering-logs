---
sidebar_position: 2
title: csv
---

# Usage

```python
csv_reader = reader(iterable [, dialect='excel'] [optional keyword args])
for row in csv_reader:
    process(row
```

```
The "iterable" argument can be any object that returns a line
of input for each iteration, such as a file object or a list.  The
optional "dialect" parameter is discussed below.  The function
also accepts optional keyword arguments which override settings
provided by the dialect.

The returned object is an iterator.  Each iteration returns a row
of the CSV file (which can span multiple input lines).

```

# Example

example.csv

```
"001","Allen",22,175
"002","Jack",25,180

```

```python
import csv

# Open and read a CSV file
with open("example.csv", "r") as f:
    csv_reader = csv.reader(f)
    for row in csv_reader:
        print(row)

```

```python
import csv

# Append data to CSV file
with open("example.csv", "a") as f:
    csv_writer = csv.writer(f, quoting=csv.QUOTE_NONNUMERIC)
    csv_writer.writerow(["003", "Ted", 23, 170])
```

```python
"001","Allen",22,175
"002","Jack",25,180
"003","Ted",23,170

```