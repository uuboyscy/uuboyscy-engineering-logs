# Handle Requests and Responses in Flask

Once you have a Flask application up and running, the next step is to expose different kinds of interactions so teammates can supply parameters, send queries, or submit data. The examples below build progressively richer routes, all powered by Flask's built-in request handling.

## Capture path parameters

```python
from flask import Flask

app = Flask(__name__)

@app.route("/hello_flask")
def hello_flask():
    return "Hello Flask!"

@app.route("/hello_flask/Allen")
def hello_user_allen():
    return "Hello Allen !!!"
@app.route("/hello_flask/Ted")
def hello_user_ted():
    return "Hello Ted !!!"
@app.route("/hello_flask/Jack")
def hello_user_jack():
    return "Hello Jack !!!"


@app.route("/hello_flask/<username>")
def helloUser(username):
    return "Hello {} !!!!!!".format(username)

@app.route("/hello_flask/<username>/<age>")
def userInfo(username, age):
    return "Hello {}, you are {} years old!".format(username, age)

if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=5000)
```

Hard-coded routes such as `/hello_flask/Allen` are useful for some testing, while the dynamic segments (`<username>` and `<age>`) let you respond to any user at runtime. Flask converts the captured path segments into function arguments so you can personalize the response text or forward the values to your data processing code.

## Read query string parameters

```python
from flask import Flask, request

app = Flask(__name__)

@app.route("/hello_get", methods=["GET"])
def hello_get():
    username = request.args.get("username")
    userage = request.args.get("userage")
    result_html = """
    <html>
        <head>
            <title>Hello</title>
        </head>
        <body>
    """

    if username == None:
        result_html += """
        Who are you?
        """
    else:
        result_html += """
        Hello %s !
        """%(username)
        if userage != None:
            result_html += """
            You are %s years old.
            """%(userage)

    result_html += """
        </body>
    </html>
    """
    return result_html

if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=5000)
```

Here `request.args` provides access to the query string.

## Accept form submissions

```python
from flask import Flask, request

app = Flask(__name__)

@app.route("/hello_post", methods=["GET", "POST"])
def hello_post():
    result_html = """
    <html>
    <form action="/hello_post" method="POST">
        <label>What is your name?</label>
        <br>
        <input type="textbox" name="username">
        <button type="submit">Submit</button>
    </form>
    <div>
    %s
    </div>
    </html>
    """
    if request.method == "GET":
        return result_html%("")
    elif request.method == "POST":
        username = request.form.get("username")
        return result_html%("Hello %s"%(username))


if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=5000)
```

By combining `GET` and `POST` handlers in one view, you can render an input form and immediately process submissions without switching files. `request.form` gives access to submitted form data.
