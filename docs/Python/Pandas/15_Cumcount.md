# groupby.cumcount (partition by row)

```python
data = {
    "date": ["2023-04-01", "2023-04-01", "2023-04-01", "2023-04-02", "2023-04-02", "2023-04-03", "2023-04-03"],
    "product": ["Apple", "Banana", "Apple", "Banana", "Banana", "Apple", "Banana"],
    "sales": [100, 200, 150, 100, 150, 200, 180]
}

df = pd.DataFrame(data)
```

![Untitled](Cumcount%202df65a95241246279ad8e52078f99aac/Untitled.png)

![Untitled](Cumcount%202df65a95241246279ad8e52078f99aac/Untitled%201.png)

- Question:
    
    Show the highest price of each product on each date. All fields should be kept in the result table.