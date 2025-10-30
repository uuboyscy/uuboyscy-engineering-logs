# PyMySQL

# Preset

## Install package

```bash
pip install pymysql
```

## PyMySQL

| **變述及函數** | **用途** |
| --- | --- |
| conn = pymysql.connect(…) | 與資料庫建立連線，conn為資料庫連線物件 |
| cursor = conn.cursor() | 建立資料庫游標物件cursor |
| cursor.execute(s) | 執行SQL指令s |
| cursor.executemany(s, [(…), (…), …]) | 批量執行SQL指令 |
| cursor.fetchone() | 獲取下一筆查詢結果 |
| cursor.fetchmany(n) | 獲取n筆查詢結果 |
| cursor.fetchall() | 獲取所有查詢結果 |
| cursor.close() | 關閉游標 |
| conn.close() | 關閉連線 |

![Untitled](PyMySQL/Untitled.png)

# Sample code

## Connect to DB

[basic_python_course/part15_dbConnection/00_connectToDB.ipynb at master · uuboyscy/basic_python_course](https://github.com/uuboyscy/basic_python_course/blob/master/part15_dbConnection/00_connectToDB.ipynb)

## Execute SQL

### INSERT

[basic_python_course/part15_dbConnection/01_executeSQL_INSERT.ipynb at master · uuboyscy/basic_python_course](https://github.com/uuboyscy/basic_python_course/blob/master/part15_dbConnection/01_executeSQL_INSERT.ipynb)

### SELECT

[basic_python_course/part15_dbConnection/02_executeSQL_SELECT.ipynb at master · uuboyscy/basic_python_course](https://github.com/uuboyscy/basic_python_course/blob/master/part15_dbConnection/02_executeSQL_SELECT.ipynb)

### UPDATE

[basic_python_course/part15_dbConnection/03_executeSQL_UPDATE.ipynb at master · uuboyscy/basic_python_course](https://github.com/uuboyscy/basic_python_course/blob/master/part15_dbConnection/03_executeSQL_UPDATE.ipynb)

### DELETE

[basic_python_course/part15_dbConnection/04_executeSQL_DELETE.ipynb at master · uuboyscy/basic_python_course](https://github.com/uuboyscy/basic_python_course/blob/master/part15_dbConnection/04_executeSQL_DELETE.ipynb)

### execute_many()

[basic_python_course/part15_dbConnection/05_executeSQLSimpleExample.ipynb at master · uuboyscy/basic_python_course](https://github.com/uuboyscy/basic_python_course/blob/master/part15_dbConnection/05_executeSQLSimpleExample.ipynb)

## Try … catch

[basic_python_course/part15_dbConnection/06_executeSQLSimpleExampleWithTryExcept.ipynb at master · uuboyscy/basic_python_course](https://github.com/uuboyscy/basic_python_course/blob/master/part15_dbConnection/06_executeSQLSimpleExampleWithTryExcept.ipynb)