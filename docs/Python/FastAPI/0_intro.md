---
sidebar_position: 1
---

# Getting Started with FastAPI

**FastAPI** is a modern Python web framework for building APIs quickly. It is great for data services because it gives you input validation, type hints, and automatic API docs out of the box.

## Why FastAPI is useful

If you already use Flask, FastAPI feels familiar, but it helps you move faster for API work.

- **Type hints first**: Request and response data are validated automatically.
- **Built-in docs**: Swagger UI (`/docs`) and ReDoc (`/redoc`) are generated for you.
- **High performance**: Built on ASGI with Starlette and Pydantic.
- **Clear API contracts**: Teams can see schema changes early.

## Install and run your first app

Install FastAPI and Uvicorn:

```bash
pip install fastapi uvicorn
```

Create `main.py`:

```python
from fastapi import FastAPI

app = FastAPI()


@app.get("/")
def hello_fastapi():
    return {"message": "Hello FastAPI!"}
```

Run the server:

```bash
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

Then open:

- `http://localhost:8000/` for your API response
- `http://localhost:8000/docs` for interactive Swagger UI
- `http://localhost:8000/redoc` for ReDoc

## Typical real-world flow

In a data team project, you can expose ETL status or model results through API endpoints. Frontend apps and internal tools can consume the same API contract without guessing field names.

```mermaid
graph LR
    A[Python service] --> B[FastAPI endpoint]
    B --> C[Auto validation]
    C --> D[JSON response]
    D --> E[Frontend / Internal tool]
```
