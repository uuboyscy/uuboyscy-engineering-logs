# Getting Started with Flask

Flask is a lightweight, extensible web framework that makes it simple to expose Python functionality over HTTP. Its flexible design lets you start with a single file application and then grow into a modular service.

Install Flask in your environment:

```bash
pip install flask
```

Build up your first web server in just a few lines of code:

```python
from flask import Flask

app = Flask(__name__)

@app.route('/')
def helloFlask():
    return 'Hello Flask!'

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
```

Save this snippet as `app.py`, run `flask --app app run --debug`, and Flask will serve the "Hello Flask!" message to any user who visits the root URL.
