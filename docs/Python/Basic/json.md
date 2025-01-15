---
sidebar_position: 3
title: json
---

# Usage

- **`json.load()`**: Reads JSON data from a file object and converts it into a Python object.
- **`json.loads()`**: Parses a JSON string, converting it into a Python object.
- **`json.dump()`**: Takes a Python object and converts it to a JSON string, writing it to a file.
- **`json.dumps()`**: Takes a Python object and converts it to a JSON formatted string.

# Example

**json.load()**

This function is used to read JSON data from a file and convert it into a Python dictionary / list.

```python
import json

# Assume we have a file named example.json containing {"name": "John", "age": 30}
with open('example.json', 'r') as file:
    data = json.load(file)

print(data)  # Output: {'name': 'John', 'age': 30}

```

### **json.loads()**

This function parses a JSON string.

```python
import json

json_string = '{"name": "John", "age": 30}'
data = json.loads(json_string)

print(data)  # Output: {'name': 'John', 'age': 30}

```

### **json.dump()**

This function writes Python objects to a file as JSON formatted data.

```python
import json

data = {'name': 'John', 'age': 30}

with open('output.json', 'w') as file:
    json.dump(data, file)

```

This code will create (or overwrite) **`output.json`** with the following content:

```json
{"name": "John", "age": 30}

```

### **json.dumps()**

This function converts Python objects into JSON strings.

```python
import json

data = {'name': 'John', 'age': 30}
json_string = json.dumps(data)

print(json_string)  # Output: '{"name": "John", "age": 30}'

```
