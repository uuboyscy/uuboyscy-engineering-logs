---
sidebar_position: 11
---

# Modify container and create image

# Commit a new image

## Start a container

```bash
docker run -it -d --name custom-container python:3.11-slim-bullseye
```

## Do something **in container**

First get into container

```bash
docker exec -it custom-container /bin/bash
```

![Untitled](Modify%20container%20and%20create%20image/Untitled.png)

Then we will create an image with Vim pre-installed

Check if Vim is installed

![Untitled](Modify%20container%20and%20create%20image/Untitled%201.png)

Install Vim

```bash
apt-get update
apt-get install vim -y
```

![Untitled](Modify%20container%20and%20create%20image/Untitled%202.png)

Vim is installed now

```bash
vi --version
```

![Untitled](Modify%20container%20and%20create%20image/Untitled%203.png)

Press CTRL + D or type exit to Exit the container

![Untitled](Modify%20container%20and%20create%20image/Untitled%204.png)

## Commit

How commit command works

```bash
Usage:  docker commit [OPTIONS] CONTAINER [REPOSITORY[:TAG]]

Create a new image from a container's changes

Aliases:
  docker container commit, docker commit

Options:
  -a, --author string    Author (e.g., "John Hannibal Smith <hannibal@a-team.com>")
  -c, --change list      Apply Dockerfile instruction to the created image
  -m, --message string   Commit message
  -p, --pause            Pause container during commit (default true)
```

Get container ID

![Untitled](Modify%20container%20and%20create%20image/Untitled%205.png)

Commit a new image

```bash
docker commit <your container id> custom-image:vim-installed
docker commit <your container id> custom-image:do-something
docker commit <your container id> custom-image:latest
```

![Untitled](Modify%20container%20and%20create%20image/Untitled%206.png)

![Untitled](Modify%20container%20and%20create%20image/Untitled%207.png)

## Try new image

```bash
docker run -it -d --name custom-container-2 custom-image:latest
docker exec -it custom-container-2 /bin/bash
vi --version
```

![Untitled](Modify%20container%20and%20create%20image/Untitled%208.png)

# Publish image

## Login

- Create token
    
    [https://hub.docker.com/settings/security](https://hub.docker.com/settings/security)
    
    ![Untitled](Modify%20container%20and%20create%20image/Untitled%209.png)
    
    ![Untitled](Modify%20container%20and%20create%20image/Untitled%2010.png)
    
- Authenticate
    
    ```bash
    docker login -u <your username>
    ```
    

## Push

Now we have a custom image custom-image:latest.

Try push this image to DockerHub, got denied.

![Untitled](Modify%20container%20and%20create%20image/Untitled%2011.png)

- Tag image
    
    Tag the image with your user name as prefix
    
    ```bash
    # docker tag custom-image:latest <your username>/custom-image:latest
    docker tag custom-image:latest uuboyscy/custom-image:latest
    ```
    
    ![Untitled](Modify%20container%20and%20create%20image/Untitled%2012.png)
    
- Push
    
    ```bash
    # docker push <your username>/custom-image:latest
    docker push uuboyscy/custom-image:latest
    ```
    
    ![Untitled](Modify%20container%20and%20create%20image/Untitled%2013.png)
    
    Then find your first image on DockerHub
    
    ![Untitled](Modify%20container%20and%20create%20image/Untitled%2014.png)
