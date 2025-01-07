# Docker compose

# What is docker compose

[https://docs.docker.com/compose/#:~:text=Docker Compose is a tool,efficient development and deployment experience](https://docs.docker.com/compose/#:~:text=Docker%20Compose%20is%20a%20tool,efficient%20development%20and%20deployment%20experience).

# Syntax

```yaml
services:
  web:
    build: .
    ports:
      - "8000:5000"
      - "8888:8888"
  redis:
    image: "redis:alpine"
```

# Manage multiple containers

[https://docs.docker.com/compose/gettingstarted/](https://docs.docker.com/compose/gettingstarted/)

# Quick start

docker-compose.yaml

```yaml
version: '3'
services:
  flask_web_server:
    build:
      context: .
      dockerfile: flask.Dockerfile
    container_name: flask_web_server
    restart: always
    ports:
      - "80:5000"
    volumes:
      - .:/app

  demo_ngrok:
    image: wernight/ngrok
    container_name: demo_ngrok
    depends_on:
      - flask_web_server
    restart: always
    ports:
      - "54088:4040"
    links:
      - flask_web_server:http
    command: ngrok http --authtoken=123 flask_web_server:5000

```

flask.Dockerfile

```docker
FROM --platform=linux/amd64 python:3.11-slim-bullseye

WORKDIR /workspace

COPY . /workspace

ENV TZ=Asia/Taipei
ENV FLASK_APP=app.py
ENV FLASK_RUN_HOST=0.0.0.0

EXPOSE 5000

RUN apt-get update -y
RUN apt-get install curl vim wget procps git -y
RUN apt-get install -y zsh \
    && echo "Y" | sh -c "$(curl -fsSL https://raw.githubusercontent.com/ohmyzsh/ohmyzsh/master/tools/install.sh)"

RUN pip install --upgrade pip
RUN pip install flask

CMD ["flask", "run"]

```

app.py

```python
from flask import Flask

app = Flask(__name__)

@app.route("/")
def hello():
    return "<h1>Hello!</h1>"

if __name__ == "__main__":
    app.run()

```