# Typing

# Create sample CSV

dtype_sample.csv

```
Name,Experience,Age,Department,DepartmentID,CreatedDatetime,CreatedDatetimeTZ,Remote,OnBoard,Intern
John Doe,10,35,Engineering,001,2023-04-05T14:30,2023-04-05T14:30+08:00,true,V,0
Jane Smith,,29,Marketing,002,2023-02-28T08:15,2023-02-28T08:15+08:00,false,X,0
Emily Davis,2,27,Product,003,2023-03-15T12:45,2023-03-15T12:45+08:00,True,V,0
Mark Evans,5,30,Sales,004,2023-01-13T09:00,2023-01-13T09:00+08:00,FALSE,V,1

```

# Deal with CSV file

## Try to read CSV

![Untitled](Typing%2016974c9459024a1ea68e7509dc61dcf0/Untitled.png)

## Define dtype

![Untitled](Typing%2016974c9459024a1ea68e7509dc61dcf0/Untitled%201.png)

![Untitled](Typing%2016974c9459024a1ea68e7509dc61dcf0/Untitled%202.png)

![Untitled](Typing%2016974c9459024a1ea68e7509dc61dcf0/Untitled%203.png)

![Untitled](Typing%2016974c9459024a1ea68e7509dc61dcf0/Untitled%204.png)

## np.where()

![Untitled](Typing%2016974c9459024a1ea68e7509dc61dcf0/Untitled%205.png)

![Untitled](Typing%2016974c9459024a1ea68e7509dc61dcf0/Untitled%206.png)

## pd.to_datetime()

![Untitled](Typing%2016974c9459024a1ea68e7509dc61dcf0/Untitled%207.png)

### Datetime format

```
2023-04-05T14:30
2023-04-05T14:30+08:00
2023-04-05 14:30:00
2023/04/05 14:30:00
```

# Try reading Excel

- Create an Excel file with datetime columns
- Read with pandas dtype
    
    ```python
    dtype = {
        "CreatedDatetime": "datetime64[ns]",
    }
    ```