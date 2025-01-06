# Use Node.js base image for Docusaurus
FROM node:22-bullseye-slim

ENV TZ=Asia/Taipei

# Set the working directory inside the container
WORKDIR /workspace

# Install basic tools
RUN apt-get update && apt-get install -y git zsh curl && apt-get clean

RUN echo "Y" | sh -c "$(curl -fsSL https://raw.githubusercontent.com/ohmyzsh/ohmyzsh/master/tools/install.sh)"

RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone

RUN chsh -s $(which zsh)
