# Serve Static Files in Flask

Static files are assets that Flask sends to the browser without running Python code for each request. Common examples include CSS files, images, JavaScript files, fonts, and downloaded documents.

Flask uses a folder named `static` by default. A simple project can be organized like this:

```text
project/
|-- app.py
`-- static/
    |-- css/
    |   `-- mystyle.css
    `-- image/
        `-- googlelogo.png
```

## Configure the static folder

```python
from flask import Flask

app = Flask(__name__, static_url_path="/static", static_folder="./static")

@app.route("/hello_google")
def hello_google():
    outStr = """
    <link href="/static/css/mystyle.css" rel="stylesheet" type="text/css">
    <div>
        This is a book.
    </div>
    <div class="test">
        This is a book.
    </div>
    <div>
        <img src="/static/image/googlelogo.png">
    </div>
    """

    return outStr

if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=5000)
```

The `static_folder="./static"` setting tells Flask where the files are stored on disk. The `static_url_path="/static"` setting tells Flask which URL prefix should expose those files in the browser.

With this setup, a file saved at `static/css/mystyle.css` is available from `/static/css/mystyle.css`, and an image saved at `static/image/googlelogo.png` is available from `/static/image/googlelogo.png`.

## Add a CSS file

Create `static/css/mystyle.css`:

```css
.test {
    background-color: red;
}
```

The HTML returned from `/hello_google` includes two normal `div` blocks. Only the second one uses `class="test"`, so only that block receives the red background.

## Link images from the static folder

Place the image file under `static/image/googlelogo.png`, then reference it with an `img` tag:

```html
<img src="/static/image/googlelogo.png">
```

This works because Flask serves the `static` folder through the `/static` URL path. The browser requests the image separately after it receives the HTML response.

## Prefer `url_for` in templates

When the HTML is inside a template, use `url_for("static", filename="...")` instead of hard-coding `/static/...`:

```html
<link rel="stylesheet" href="{{ url_for('static', filename='css/mystyle.css') }}">
<img src="{{ url_for('static', filename='image/googlelogo.png') }}">
```

This keeps links correct if you later change the static URL prefix.
