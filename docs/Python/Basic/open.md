---
sidebar_position: 1
title: open
---

# Usage

Open file and return a stream.  Raise OSError upon failure.

```python
open(file, mode='r', buffering=-1, encoding=None, errors=None, newline=None, closefd=True, opener=None)
```

Meaning of mode character

```
'r'       open for reading (default)
'w'       open for writing, truncating the file first
'x'       create a new file and open it for writing
'a'       open for writing, appending to the end of the file if it exists
'b'       binary mode
't'       text mode (default)
'+'       open a disk file for updating (reading and writing)
```

# Example

```python
# Open a text file and read the contents
with open('example.txt', 'r') as file:
    content = file.read()
    print(content)
    

```

```python
# To write to a file, opening it in write mode
with open('example_2.txt', 'w') as file:
    file.write('Hello, World!')

```

```python
# To append to the end of a file
with open('example_2.txt', 'a') as file:
    file.write('\nMore content.')

```