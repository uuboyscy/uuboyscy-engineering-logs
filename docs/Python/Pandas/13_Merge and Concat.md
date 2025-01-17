# Merge and Concat

# Preset

## Create files

staff.csv

```
ID,Name,DeptId,Age,Gender,Salary
001,Mike,002,45,M,60000
002,Judy,002,30,F,48000
003,Allen,001,22,M,50000
004,Tom,002,47,M,47000
005,Jack,003,36,M,52000
006,Abby,002,24,F,45000
007,Trump,001,80,M,80000
008,Marry,003,29,F,87000

```

staff_detail.csv

```
ID,Level,UpdateDate
001,A,2019-08-09
001,S,2020-12-08
002,A,2021-05-30
003,A,2018-03-26
003,S,2020-12-08
004,A,2022-05-02
005,A,2019-11-05
005,S,2022-04-25
006,A,2022-03-03
007,A,2017-03-29
007,S,2018-05-02
007,M,2021-09-01
008,A,2018-11-26
008,S,2020-03-15
008,M,2022-05-03

```

staff_detail_different_col.csv

```
EmpNum,Level,UpdateDate
001,A,2019-08-09
001,S,2020-12-08
002,A,2021-05-30
003,A,2018-03-26
003,S,2020-12-08
004,A,2022-05-02
005,A,2019-11-05
005,S,2022-04-25
006,A,2022-03-03
007,A,2017-03-29
007,S,2018-05-02
007,M,2021-09-01
008,A,2018-11-26
008,S,2020-03-15
008,M,2022-05-03

```

staff_samecol.csv

```
ID,Name,DeptId,Age,Gender,Salary,UpdateDate
001,Mike,002,45,M,60000,2020-12-08
002,Judy,002,30,F,48000,2021-05-30
003,Allen,001,22,M,50000,2020-12-08
004,Tom,002,47,M,47000,2022-05-02
005,Jack,003,36,M,52000,2022-04-25
006,Abby,002,24,F,45000,2022-03-03
007,Trump,001,80,M,80000,2021-09-01
008,Marry,003,29,F,87000,2022-05-03

```

# Merge

## With the same PK name

![Untitled](Merge%20and%20Concat%202a2f350abe8146aca48377a452ccd509/Untitled.png)

![Untitled](Merge%20and%20Concat%202a2f350abe8146aca48377a452ccd509/Untitled%201.png)

## With different PK name

![Untitled](Merge%20and%20Concat%202a2f350abe8146aca48377a452ccd509/Untitled%202.png)

![Untitled](Merge%20and%20Concat%202a2f350abe8146aca48377a452ccd509/Untitled%203.png)

Got error if no columns specified.

![Untitled](Merge%20and%20Concat%202a2f350abe8146aca48377a452ccd509/Untitled%204.png)

## If column name duplicated

![Untitled](Merge%20and%20Concat%202a2f350abe8146aca48377a452ccd509/Untitled%205.png)

![Untitled](Merge%20and%20Concat%202a2f350abe8146aca48377a452ccd509/Untitled%206.png)

# Concat

## Create DataFrame

```python
import pandas as pd

df = pd.DataFrame(
    data=[
        ["Allen", 175, 22],
        ["Ted", 180, 25]
    ],
    columns=["Name", "Height", "Age"]
)

df_1 = pd.DataFrame(
    data=[
        ["Jake", 177, 28],
        ["Mary", 170, 24]
    ],
    columns=["Name", "Height", "Age"]
)
```

## Concat and reset index

![Untitled](Merge%20and%20Concat%202a2f350abe8146aca48377a452ccd509/Untitled%207.png)