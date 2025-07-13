---
sidebar_position: 2
---

# What is Docker

![Untitled](What%20is%20Docker/Untitled.png)

### About Docker

- Package the application (along with the operating system and environment) into an image, so it can be quickly launched as a container on different operating systems (with Docker installed) when needed, without worrying about environmental issues.
- Developed by Golang
- No Hypervisor

![Untitled](What%20is%20Docker/Untitled%201.png)

### Docker key word

- Image

    A lightweight, executable software package that includes code, runtime, libraries, and environment variables, etc., can be thought of as a blueprint for quickly creating multiple containers.

- Container

    Container is an instance created via image, running in an isolated environment, which includes code, runtime, libraries, and environment variables mentioned above. It is an independent operating system, different from the host machine, where the commands used may also differ from those on the host machine.

- Repository

    A place to store Docker images, where a repository can hold multiple images, using tags to differentiate different versions of the images.

- Registry

    A place that holds repositories. DockerHub is the default registry for Docker images. A registry can be public or private, and it's possible to set up a private (self-hosted) registry locally as needed.
