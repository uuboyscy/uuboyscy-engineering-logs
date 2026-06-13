# Render HTML Templates with Jinja2

Returning long HTML strings from route functions works for small tests, but it quickly becomes hard to read and maintain. Flask uses Jinja2 templates so the Python route can focus on request handling while the HTML stays in separate files.

A simple template project can be organized like this:

```text
project/
|-- app.py
|-- poker.py
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
    if request.method == "GET":
        return render_template("hello_post.html")
    elif request.method == "POST":
        username = request.form.get("username")
        return render_template(
            "hello_post.html",
            username=username,
            request_method="post",
        )

if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=5000)
```

`render_template("hello_post.html")` looks for `hello_post.html` inside the `templates` folder. Extra keyword arguments, such as `username` and `request_method`, become variables inside the template.

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

    {% if request_method == "post" %}
    <div>
        Hello {{ username }} !
    </div>
    {% endif %}
</html>
```

Jinja uses `{{ ... }}` to print a value and `{% ... %}` to run template logic. In this example, the form is always displayed, but the greeting only appears after the route receives a `POST` request and passes `request_method="post"` into the template.

## Add the poker helper program

The poker route uses a separate Python file to generate the card data. Create `poker.py` beside `app.py`:

```python
import random

def poker(player):
    PLAYER = player
    player_cards = {"Player_%s" % (i + 1): list() for i in range(0, PLAYER)}

    # Generate 52 poker cards
    style_list = ["Spade", "Heart", "Diamond", "Club"]
    poker_list = ["%s_%s" % (style_list[int(i % 4)], int(i / 4) + 1) for i in range(0, 52)]

    # Shuffling
    random_poker_list = []
    while len(poker_list) > 0:
        choice = random.randint(0, len(poker_list) - 1)
        random_poker_list.append(poker_list[choice])
        del poker_list[choice]

    # Distributing
    for n, c in enumerate(random_poker_list):
        player_cards["Player_%s" % (n % PLAYER + 1)].append(c)

    return player_cards

if __name__ == "__main__":
    player_cards = poker(5)

    # Order and print
    for i in player_cards:
        player_cards[i].sort(key=lambda x: x.split("_")[0])
        print(i)
        print(player_cards[i])
        print()
```

This file can run by itself for testing, and it can also be imported by the Flask app.

## Render repeated data with loops

Templates are useful when a route sends structured data to the page. This route accepts the number of players, calls the helper program, and passes the result into `poker.html`.

```python
from flask import Flask, request, render_template
import poker as poker_game

app = Flask(__name__)

@app.route("/poker", methods=["GET", "POST"])
def poker():
    request_method = request.method
    cards = dict()
    if request_method == "POST":
        players = int(request.form.get("players"))
        cards = poker_game.poker(players)
    return render_template(
        "poker.html",
        request_method=request_method,
        cards=cards,
    )

if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=5000)
```

`import poker as poker_game` keeps the module alias readable. The route name is also `poker`, so the alias makes it clear when the code is calling the helper module instead of the Flask view function.

Create `templates/poker.html`:

```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>poker</title>
</head>
<body>
    <h1>How many players?</h1>
    <form action="/poker" method="post">
        <input type="textbox" name="players">
        <button type="submit">Submit</button>
    </form>

    <br>

    {% if request_method == "POST" %}
    <div>
        {% for player in cards %}
        <div>
            {{ player }}
            <br>
            <table border="1">
                <tr>
                    {% for card in cards[player] %}
                    <td width="100">
                        {{ card }}
                    </td>
                    {% endfor %}
                </tr>
            </table>
        </div>
        <br>
        {% endfor %}
    </div>
    {% endif %}
</body>
</html>
```

The outer loop walks through each player in `cards`, and the inner loop prints each card for that player. This keeps the route simple: Python prepares the data, then Jinja decides how to display it.
