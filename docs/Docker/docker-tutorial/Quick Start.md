---
sidebar_position: 4
---

# Quick Start

# Installation

## Install Docker

[https://docs.docker.com/engine/install/](https://docs.docker.com/engine/install/)

## Show version

```bash
docker --version
```

![Untitled](Quick%20Start/Untitled.png)

## Check image

```bash
docker images
```

![Untitled](Quick%20Start/Untitled%201.png)

第一次安裝 Docker 只會看到最上方  REPOSITORY    TAG    IMAGE ID    CREATED    SIZE  這排

# Quick start

## Download image

- DockerHub
    
    [https://hub.docker.com](https://hub.docker.com/)
    
- Search Python
    
    Search 3.12-slim-bullseye
    
    ![Untitled](Quick%20Start/Untitled%202.png)
    
- Download Docker image
    
    ```bash
    docker pull python:3.12-slim-bullseye
    ```
    
- 查看 Docker image
    
    ```bash
    docker images
    ```
    
    ![Untitled](Quick%20Start/Untitled%203.png)
    
    A new python repository appears, and it has a tag 3.12-slim-bullseye
    

## Manipulate container

- Check running container
    
    ```bash
    docker ps
    ```
    
    ![Untitled](Quick%20Start/Untitled%204.png)
    
    Before starting the container, you will only see the row at the top showing  CONTAINER ID   IMAGE    COMMAND    CREATED    STATUS    PORTS    NAMES  
    
- Start a container
    
    ```bash
    docker run -it -d --name docker-tutorial python:3.12-slim-bullseye /bin/bash
    ```
    
    ![Untitled](Quick%20Start/Untitled%205.png)
    
- Check running container again
    
    ```bash
    docker ps
    ```
    
    ![Untitled](Quick%20Start/Untitled%206.png)
    
- Enter container
    
    ```bash
    docker exec -it docker-tutorial /bin/bash
    ```
    
    ![Untitled](Quick%20Start/Untitled%207.png)
    
    Cursor in terminal changed.
