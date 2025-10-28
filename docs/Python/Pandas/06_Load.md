# Load

# Create sample DataFrame

```python
import pandas as pd

columns = ["Name", "Age", "Height"]
data = [
		["Ted", 24, 177],
		["Judy", 27, 183],
]

df = pd.DataFrame(data=data, columns=columns)
```

![Untitled](Load/Untitled.png)

# Save as CSV

![Untitled](Load/Untitled%201.png)

# Save as JSON

- default
    
    ```python
    df.to_json('./test_pandas_default.json')
    ```
    
    ```json
    {"Name":{"0":"Ted","1":"Judy"},"Age":{"0":24,"1":27},"Height":{"0":177,"1":183}}
    ```
    

- columns
    
    ```python
    df.to_json('./test_pandas_columns.json', orient="columns")
    ```
    
    ```json
    {"Name":{"0":"Ted","1":"Judy"},"Age":{"0":24,"1":27},"Height":{"0":177,"1":183}}
    ```
    

- records
    
    ```python
    df.to_json('./test_pandas_records.json', orient="records")
    ```
    
    ```json
    [{"Name":"Ted","Age":24,"Height":177},{"Name":"Judy","Age":27,"Height":183}]
    ```
    

- index
    
    ```python
    df.to_json('./test_pandas_index.json', orient="index")
    ```
    
    ```json
    {"0":{"Name":"Ted","Age":24,"Height":177},"1":{"Name":"Judy","Age":27,"Height":183}}
    ```
    

- split
    
    ```python
    df.to_json('./test_pandas_split.json', orient="split")
    ```
    
    ```json
    {"columns":["Name","Age","Height"],"index":[0,1],"data":[["Ted",24,177],["Judy",27,183]]}
    ```
    

- table
    
    ```python
    df.to_json('./test_pandas_table.json', orient="table")
    ```
    
    ```json
    {"schema":{"fields":[{"name":"index","type":"integer"},{"name":"Name","type":"string"},{"name":"Age","type":"integer"},{"name":"Height","type":"integer"}],"primaryKey":["index"],"pandas_version":"1.4.0"},"data":[{"index":0,"Name":"Ted","Age":24,"Height":177},{"index":1,"Name":"Judy","Age":27,"Height":183}]}
    ```