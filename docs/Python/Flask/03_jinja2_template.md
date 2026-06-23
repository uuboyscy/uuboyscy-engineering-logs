# Render HTML Templates with Jinja2

Returning long HTML strings from route functions works for small tests, but it quickly becomes hard to read and maintain. Flask uses Jinja2 templates so the Python route can focus on request handling while the HTML stays in separate files.

A simple template project can be organized like this:

```text
project/
|-- app.py
`-- templates/
    |-- hello_post.html
    `-- poker.html
```

## Render a template

```python
from flask import Flask, request, render_template

app = Flask(__name__, static_url_path="/static", static_folder="./static")

@app.route("/hello_post2", methods=["GET", "POST"])
def hello_post2():
    return render_template(
        "hello_post.html",
        username=request.form.get("username"),
        request_method=request.method,
    )

if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=5000)
```

`render_template("hello_post.html")` looks for `hello_post.html` inside the `templates` folder. Extra keyword arguments, such as `username` and `request_method`, become variables inside the template. The route can pass `request.method` and `request.form.get("username")` directly because the template decides when to display the submitted value.

## Use variables and conditionals

Create `templates/hello_post.html`:

```html
<html>
    <form action="/hello_post2" method="POST">
        <label>What is your name?</label>
        <br>
        <input type="textbox" name="username">
        <button type="submit">Submit</button>
    </form>

    {% if request_method == "POST" %}
    <div>
        Hello {{ username }} !
    </div>
    {% endif %}
</html>
```

Jinja uses `{{ ... }}` to print a value and `{% ... %}` to run template logic. In this example, the form is always displayed, but the greeting only appears after the route receives a `POST` request. The route does not need an `if` statement because it always renders the same template with the current request data.

## Pass JSON-style data to a template

Templates are useful when a route sends structured data to the page. This route passes a small JSON-style dictionary into `poker.html`.

```python
from flask import Flask, render_template

app = Flask(__name__)

@app.route("/poker")
def poker():
    poker_data = {
        "title": "Poker Hands",
        "players": [
            {
                "name": "Alice",
                "chips": 1200,
                "cards": ["Spade_A", "Heart_10"],
                "is_dealer": True,
            },
            {
                "name": "Bob",
                "chips": 950,
                "cards": ["Club_K", "Diamond_7"],
                "is_dealer": False,
            },
            {
                "name": "Carol",
                "chips": 1500,
                "cards": ["Heart_Q", "Club_3"],
                "is_dealer": False,
            },
        ],
    }

    return render_template(
        "poker.html",
        poker=poker_data,
    )

if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=5000)
```

The data is written as a Python dictionary because Flask passes Python objects into Jinja templates. Its structure is the same kind of object you would usually see in JSON: strings, numbers, booleans, lists, and nested objects.

Create `templates/poker.html`:

```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>poker</title>
</head>
<body>
    <h1>{{ poker.title }}</h1>

    {% for player in poker.players %}
    <section>
        <h2>
            {{ player.name }}
            {% if player.is_dealer %}
            <small>(Dealer)</small>
            {% endif %}
        </h2>
        <p>Chips: {{ player.chips }}</p>

        <table border="1">
            <tr>
                {% for card in player.cards %}
                <td width="100">
                    {{ card }}
                </td>
                {% endfor %}
            </tr>
        </table>
    </section>
    {% endfor %}
</body>
</html>
```

The outer loop walks through each player in `poker.players`, and the inner loop prints each card in `player.cards`. Dot syntax, such as `player.name`, reads values from each dictionary. This keeps the route simple: Python prepares the structured data, then Jinja decides how to display it.

If you already have JSON text from another source, convert it to a Python dictionary before passing it to the template:

```python
import json
from flask import Flask, render_template

app = Flask(__name__)

@app.route("/poker")
def poker():
    poker_json = """
    {
        "title": "Poker Hands",
        "players": [
            {
                "name": "Alice",
                "chips": 1200,
                "cards": ["Spade_A", "Heart_10"],
                "is_dealer": true
            },
            {
                "name": "Bob",
                "chips": 950,
                "cards": ["Club_K", "Diamond_7"],
                "is_dealer": false
            }
        ]
    }
    """
    poker_data = json.loads(poker_json)

    return render_template("poker.html", poker=poker_data)
```
