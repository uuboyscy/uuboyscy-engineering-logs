---
sidebar_position: 11
---

# Null Value

# Create sample DataFrame

- Create sample CSV file

    employees.csv

    ```
    employee_id,name,department,salary,email
    E001,Alice Chen,Engineering,95000,alice.chen@company.com
    E002,Bob Smith,Marketing,72000,
    E003,Carol White,,68000,carol.white@company.com
    E004,,,55000,
    E005,Eve Johnson,Sales,,eve.johnson@company.com
    E006,,,,
    ```

- Read CSV as DataFrame

    ```python
    import pandas as pd

    df = pd.read_csv("employees.csv")
    print(df)
    ```

    ```
      employee_id         name   department   salary                    email
    0        E001   Alice Chen  Engineering  95000.0   alice.chen@company.com
    1        E002    Bob Smith    Marketing  72000.0                      NaN
    2        E003  Carol White          NaN  68000.0  carol.white@company.com
    3        E004          NaN          NaN  55000.0                      NaN
    4        E005  Eve Johnson        Sales      NaN  eve.johnson@company.com
    5        E006          NaN          NaN      NaN                      NaN
    ```

- Create a DataFrame with None in Python

    ```python
    import pandas as pd

    data = {
        "employee_id": ["E001", "E002", "E003"],
        "name": ["Alice Chen", "Bob Smith", None],
        "department": ["Engineering", None, "HR"],
        "salary": [95000, 72000, None],
    }
    df_none = pd.DataFrame(data)
    print(df_none)
    ```

    ```
      employee_id        name   department   salary
    0        E001  Alice Chen  Engineering  95000.0
    1        E002   Bob Smith         None  72000.0
    2        E003        None           HR      NaN
    ```

- See what is different between these two DataFrames

    ```python
    print(df.dtypes)
    print()
    print(df_none.dtypes)
    ```

    ```
    # df (read from CSV) — empty cells become NaN
    employee_id     object
    name            object
    department      object
    salary         float64   # int becomes float because NaN is a float
    email           object
    dtype: object

    # df_none (created in Python) — None in numeric column also becomes NaN
    employee_id     object
    name            object
    department      object
    salary         float64   # same: int becomes float due to None -> NaN
    dtype: object
    ```

    > **Note:** In both cases, missing numeric values are stored as `NaN` (a float), which forces the column dtype to `float64`. Missing values in object (string) columns are stored as `NaN` when read from CSV, or may stay as `None` when created in Python.

- How to create NaN

    ```python
    import numpy as np
    import pandas as pd

    nan1 = float("nan")   # built-in Python
    nan2 = np.nan         # NumPy NaN
    nan3 = pd.NA          # pandas NA (newer, works with nullable dtypes)
    none = None           # Python None (treated as NaN in most pandas contexts)

    print(nan1, nan2, nan3, none)
    # nan  nan  <NA>  None
    ```

# Calculate on NaN

```python
import numpy as np

print(1 + np.nan)         # nan  — any arithmetic with NaN returns NaN
print(np.nan == np.nan)   # False — NaN is not equal to itself
print(np.nan > 0)         # False
print(np.nan < 0)         # False

# pandas aggregations skip NaN by default
import pandas as pd

s = pd.Series([95000, 72000, None, 68000, None])
print(s.sum())    # 235000.0  (NaN skipped)
print(s.mean())   # 78333.333...  (NaN skipped)
print(s.count())  # 3  (only non-NaN values counted)
```

```
nan
False
False
False
235000.0
78333.333333333336
3
```

# Why using NaN

Using `NaN` instead of a placeholder like `0` or `"unknown"` keeps calculations accurate and signals that the data is genuinely missing.

```python
import pandas as pd

# Bad practice: filling missing salary with 0
df_bad = pd.DataFrame({
    "name": ["Alice Chen", "Bob Smith", "Carol White"],
    "salary": [95000, 0, 68000],   # 0 means "missing", but distorts stats
})
print("Mean salary (with 0):", df_bad["salary"].mean())  # 54333.33 — wrong!

# Good practice: use NaN for missing salary
df_good = pd.DataFrame({
    "name": ["Alice Chen", "Bob Smith", "Carol White"],
    "salary": [95000, None, 68000],  # NaN for missing
})
print("Mean salary (with NaN):", df_good["salary"].mean())  # 81500.0 — correct
```

```
Mean salary (with 0): 54333.333333333336
Mean salary (with NaN): 81500.0
```

```python
# NaN allows pandas to distinguish "no data" from "zero"
# For example, counting actual responses in a survey
survey = pd.DataFrame({
    "employee_id": ["E001", "E002", "E003", "E004", "E005"],
    "satisfaction_score": [4, 5, None, 3, None],  # None = did not respond
})

print("Responses received:", survey["satisfaction_score"].count())   # 3
print("Average score:     ", survey["satisfaction_score"].mean())    # 4.0
```

```
Responses received: 3
Average score:      4.0
```

```python
# None in a numeric column becomes NaN; arithmetic still works
s = pd.Series([95000, None, 68000])
print(s + 5000)
```

```
0    100000.0
1         NaN
2     73000.0
dtype: float64
```

```python
# But might be incorrect
df = pd.DataFrame({
    "base_salary": [95000, 72000, None],
    "bonus":       [10000, None, 5000],
})
df["total_compensation"] = df["base_salary"] + df["bonus"]
print(df)
```

```
   base_salary   bonus  total_compensation
0      95000.0  10000.0            105000.0
1      72000.0      NaN                 NaN
2          NaN   5000.0                 NaN
```

# Deal with NaN

- Create sample DataFrame first

    ```python
    import pandas as pd

    data = {
        "employee_id": ["E001", "E002", "E003", "E004", "E005", "E006"],
        "name":        ["Alice Chen", "Bob Smith", "Carol White", None, "Eve Johnson", None],
        "department":  ["Engineering", "Marketing", None, None, "Sales", None],
        "salary":      [95000, 72000, 68000, 55000, None, None],
        "email":       [
            "alice.chen@company.com",
            None,
            "carol.white@company.com",
            None,
            "eve.johnson@company.com",
            None,
        ],
    }
    df = pd.DataFrame(data)
    print(df)
    ```

    ```
      employee_id         name   department   salary                    email
    0        E001   Alice Chen  Engineering  95000.0   alice.chen@company.com
    1        E002    Bob Smith    Marketing  72000.0                      NaN
    2        E003  Carol White          NaN  68000.0  carol.white@company.com
    3        E004         None         None  55000.0                     None
    4        E005  Eve Johnson        Sales      NaN  eve.johnson@company.com
    5        E006         None         None      NaN                     None
    ```

- Check if values are NaN

    ```python
    print(df.isnull())
    ```

    ```
       employee_id   name  department  salary  email
    0        False  False       False   False  False
    1        False  False       False   False   True
    2        False  False        True   False  False
    3        False   True        True   False   True
    4        False  False       False    True  False
    5        False   True        True    True   True
    ```

    ```python
    # Count missing values per column
    print(df.isnull().sum())
    ```

    ```
    employee_id    0
    name           2
    department     2
    salary         2
    email          3
    dtype: int64
    ```

- Check if values are not NaN

    ```python
    print(df.notnull())
    ```

    ```
       employee_id   name  department  salary  email
    0         True   True        True    True   True
    1         True   True        True    True  False
    2         True   True       False    True   True
    3         True  False       False    True  False
    4         True   True        True   False   True
    5         True  False       False   False  False
    ```

    ```python
    # Filter rows where salary is not NaN
    print(df[df["salary"].notnull()])
    ```

    ```
      employee_id         name   department   salary                    email
    0        E001   Alice Chen  Engineering  95000.0   alice.chen@company.com
    1        E002    Bob Smith    Marketing  72000.0                      NaN
    2        E003  Carol White          NaN  68000.0  carol.white@company.com
    3        E004         None         None  55000.0                     None
    ```

- Drop NaN

    ```python
    # Drop rows that have ANY NaN
    print(df.dropna())
    ```

    ```
      employee_id        name   department   salary                   email
    0        E001  Alice Chen  Engineering  95000.0  alice.chen@company.com
    ```

    ```python
    # Drop rows only if ALL values in the row are NaN
    print(df.dropna(how="all"))

    # Drop rows where specific columns have NaN
    print(df.dropna(subset=["name", "salary"]))
    ```

    ```
    # dropna(how="all") — keeps rows that have at least one non-NaN value
      employee_id         name   department   salary                    email
    0        E001   Alice Chen  Engineering  95000.0   alice.chen@company.com
    1        E002    Bob Smith    Marketing  72000.0                      NaN
    2        E003  Carol White          NaN  68000.0  carol.white@company.com
    3        E004         None         None  55000.0                     None
    4        E005  Eve Johnson        Sales      NaN  eve.johnson@company.com

    # dropna(subset=["name", "salary"]) — drops rows missing name OR salary
      employee_id         name   department   salary                    email
    0        E001   Alice Chen  Engineering  95000.0   alice.chen@company.com
    1        E002    Bob Smith    Marketing  72000.0                      NaN
    2        E003  Carol White          NaN  68000.0  carol.white@company.com
    3        E004         None         None  55000.0                     None
    ```

- Fill NaN

    ```python
    # Fill all NaN with a fixed value
    print(df.fillna("N/A"))
    ```

    ```
      employee_id         name   department   salary                    email
    0        E001   Alice Chen  Engineering  95000.0   alice.chen@company.com
    1        E002    Bob Smith    Marketing  72000.0                      N/A
    2        E003  Carol White          N/A  68000.0  carol.white@company.com
    3        E004          N/A          N/A  55000.0                      N/A
    4        E005  Eve Johnson        Sales      N/A  eve.johnson@company.com
    5        E006          N/A          N/A      N/A                      N/A
    ```

    ```python
    # Fill NaN per column with different values
    fill_values = {
        "name": "Unknown",
        "department": "Unassigned",
        "salary": df["salary"].median(),   # fill missing salary with median
        "email": "no-email@company.com",
    }
    print(df.fillna(fill_values))
    ```

    ```
      employee_id         name   department   salary                    email
    0        E001   Alice Chen  Engineering  95000.0   alice.chen@company.com
    1        E002    Bob Smith    Marketing  72000.0     no-email@company.com
    2        E003  Carol White   Unassigned  68000.0  carol.white@company.com
    3        E004      Unknown   Unassigned  55000.0     no-email@company.com
    4        E005  Eve Johnson        Sales  70000.0  eve.johnson@company.com
    5        E006      Unknown   Unassigned  70000.0     no-email@company.com
    ```