"use strict";(self.webpackChunkuuboyscy_engineering_logs=self.webpackChunkuuboyscy_engineering_logs||[]).push([[90],{56238:(e,n,i)=>{i.r(n),i.d(n,{assets:()=>t,contentTitle:()=>c,default:()=>h,frontMatter:()=>o,metadata:()=>s,toc:()=>a});const s=JSON.parse('{"id":"Docker/docker-tutorial/Dockerfile cff36b25e8944652ba28f7e17a945b96","title":"Dockerfile","description":"What is a Dockerfile?","source":"@site/docs/Docker/docker-tutorial/Dockerfile cff36b25e8944652ba28f7e17a945b96.md","sourceDirName":"Docker/docker-tutorial","slug":"/Docker/docker-tutorial/Dockerfile cff36b25e8944652ba28f7e17a945b96","permalink":"/zh-Hant/docs/Docker/docker-tutorial/Dockerfile cff36b25e8944652ba28f7e17a945b96","draft":false,"unlisted":false,"tags":[],"version":"current","sidebarPosition":12,"frontMatter":{"sidebar_position":12},"sidebar":"tutorialSidebar","previous":{"title":"Modify container and create image","permalink":"/zh-Hant/docs/Docker/docker-tutorial/Modify container and create image e7914f6ae361484c97000cecab4e999b"},"next":{"title":"Docker compose","permalink":"/zh-Hant/docs/Docker/docker-tutorial/Docker compose f0ae267025e140ffb6d5ece8f412ec98"}}');var r=i(74848),l=i(28453);const o={sidebar_position:12},c="Dockerfile",t={},a=[{value:"<strong>What is a Dockerfile?</strong>",id:"what-is-a-dockerfile",level:2},{value:"<strong>Why Use a Dockerfile?</strong>",id:"why-use-a-dockerfile",level:2}];function d(e){const n={code:"code",h1:"h1",h2:"h2",header:"header",li:"li",ol:"ol",p:"p",pre:"pre",strong:"strong",ul:"ul",...(0,l.R)(),...e.components};return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(n.header,{children:(0,r.jsx)(n.h1,{id:"dockerfile",children:"Dockerfile"})}),"\n",(0,r.jsx)(n.h1,{id:"about-dockerfile",children:"About Dockerfile"}),"\n",(0,r.jsx)(n.h2,{id:"what-is-a-dockerfile",children:(0,r.jsx)(n.strong,{children:"What is a Dockerfile?"})}),"\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsx)(n.li,{children:"Just like a recipe. Docker follows it to create an environment where your application can run."}),"\n",(0,r.jsx)(n.li,{children:"Dockerfile is a text file that contains a series of instructions and commands used by Docker to automatically build a new image."}),"\n"]}),"\n",(0,r.jsx)(n.h2,{id:"why-use-a-dockerfile",children:(0,r.jsx)(n.strong,{children:"Why Use a Dockerfile?"})}),"\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsx)(n.li,{children:"Automation and Consistency: It automates the process of image creation, ensuring consistency and repeatability."}),"\n",(0,r.jsx)(n.li,{children:"Version Control: You can track changes to the Dockerfile over time, similar to how you manage code, allowing you to understand how your Docker image evolves."}),"\n",(0,r.jsx)(n.li,{children:"Customization: It allows you to create customized images based on your specific needs, starting from a base image and adding your own configurations, applications, and dependencies."}),"\n"]}),"\n",(0,r.jsx)(n.h1,{id:"components-of-dockerfile",children:"Components of Dockerfile"}),"\n",(0,r.jsxs)(n.ol,{children:["\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.strong,{children:"FROM"}),": Specifies the base image from which you are building. Every Dockerfile must start with a FROM instruction.","\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsxs)(n.li,{children:["Example: ",(0,r.jsx)(n.strong,{children:(0,r.jsx)(n.code,{children:"FROM ubuntu:20.04"})})]}),"\n"]}),"\n"]}),"\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.strong,{children:"WORKDIR"}),": Sets the working directory for any RUN, CMD, ENTRYPOINT, COPY, and ADD instructions that follow in the Dockerfile.","\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsxs)(n.li,{children:["Example: ",(0,r.jsx)(n.strong,{children:(0,r.jsx)(n.code,{children:"WORKDIR /app"})})]}),"\n"]}),"\n"]}),"\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.strong,{children:"COPY"}),": Copies new files or directories from the source on the host to the filesystem of the container at the specified path.","\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsxs)(n.li,{children:["Example: ",(0,r.jsx)(n.strong,{children:(0,r.jsx)(n.code,{children:"COPY . /app"})})]}),"\n"]}),"\n"]}),"\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.strong,{children:"RUN"}),": Executes any commands on top of the current image as a new layer and commits the results. Used to install software, packages, and doing setup tasks.","\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsxs)(n.li,{children:["Example: ",(0,r.jsx)(n.strong,{children:(0,r.jsx)(n.code,{children:"RUN apt-get update && apt-get install -y nginx"})})]}),"\n"]}),"\n"]}),"\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.strong,{children:"CMD"}),": Provides defaults for an executing container. There can only be one CMD instruction in a Dockerfile. If you list more than one CMD, then the last CMD will take effect.","\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsxs)(n.li,{children:["Example: ",(0,r.jsx)(n.strong,{children:(0,r.jsx)(n.code,{children:'CMD ["python", "./app.py"]'})})]}),"\n"]}),"\n"]}),"\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.strong,{children:"EXPOSE"}),": Informs Docker that the container listens on the specified network ports at runtime. Does not actually publish the port.","\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsxs)(n.li,{children:["Example: ",(0,r.jsx)(n.strong,{children:(0,r.jsx)(n.code,{children:"EXPOSE 80"})})]}),"\n"]}),"\n"]}),"\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.strong,{children:"ENV"}),": Sets the environment variable.","\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsxs)(n.li,{children:["Example: ",(0,r.jsx)(n.strong,{children:(0,r.jsx)(n.code,{children:"ENV FLASK_APP app.py"})})]}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,r.jsx)(n.h1,{id:"dockerfile-syntax",children:"Dockerfile syntax"}),"\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsxs)(n.li,{children:["\n",(0,r.jsxs)(n.p,{children:["Create a file named ",(0,r.jsx)(n.code,{children:"Dockerfile"})]}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-docker",children:"FROM python:3.11-slim-bullseye\n"})}),"\n"]}),"\n",(0,r.jsxs)(n.li,{children:["\n",(0,r.jsxs)(n.p,{children:["Create a file named ",(0,r.jsx)(n.code,{children:"flask.Dockerfile"})]}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-docker",children:'FROM --platform=linux/amd64 python:3.11-slim-bullseye\n\nWORKDIR /workspace\n\n# COPY src(your host device) destination(in container)\nCOPY . /workspace\n\nENV TZ=Asia/Taipei\nENV FLASK_APP=app.py\nENV FLASK_RUN_HOST=0.0.0.0\n\nEXPOSE 5000\n\nRUN apt-get update -y\nRUN apt-get install curl vim wget procps git -y\nRUN apt-get install -y zsh \\\n    && echo "Y" | sh -c "$(curl -fsSL https://raw.githubusercontent.com/ohmyzsh/ohmyzsh/master/tools/install.sh)"\n\nRUN pip install --upgrade pip\nRUN pip install flask\n\nCMD ["flask", "run"]\n'})}),"\n"]}),"\n",(0,r.jsxs)(n.li,{children:["\n",(0,r.jsx)(n.p,{children:"app.py"}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-python",children:'from flask import Flask\n\napp = Flask(__name__)\n\n@app.route("/")\ndef hello():\n    return "<h1>Hello!</h1>"\n\nif __name__ == "__main__":\n    app.run()\n'})}),"\n"]}),"\n"]}),"\n",(0,r.jsx)(n.h1,{id:"build-image-with-dockerfile",children:"Build image with Dockerfile"}),"\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsxs)(n.li,{children:["\n",(0,r.jsx)(n.p,{children:"Build image with Dockerfile"}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-docker",children:"# The command use Dockerfile as default\ndocker build -t my-python:0.0.1 .\n"})}),"\n"]}),"\n",(0,r.jsxs)(n.li,{children:["\n",(0,r.jsx)(n.p,{children:"Build image with named Dockerfile"}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-docker",children:"docker build -f flask.Dockerfile -t my-python:0.0.2 .\n"})}),"\n"]}),"\n",(0,r.jsxs)(n.li,{children:["\n",(0,r.jsx)(n.p,{children:"Tag the image as latest"}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-docker",children:"docker tag my-python:0.0.2 my-python:latest\n"})}),"\n"]}),"\n"]}),"\n",(0,r.jsx)(n.h1,{id:"push-docker-image-to-registry-dockerhub",children:"Push Docker image to Registry (DockerHub)"}),"\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsxs)(n.li,{children:["\n",(0,r.jsx)(n.p,{children:"Authenticate"}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-docker",children:"docker login -u <username>\n"})}),"\n"]}),"\n",(0,r.jsxs)(n.li,{children:["\n",(0,r.jsx)(n.p,{children:"Rename image"}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-docker",children:"docker tag my-python:latest <username>/my-python:latest\n"})}),"\n"]}),"\n",(0,r.jsxs)(n.li,{children:["\n",(0,r.jsx)(n.p,{children:"Push image"}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-docker",children:"docker push <username>/my-python:latest\n"})}),"\n"]}),"\n"]})]})}function h(e={}){const{wrapper:n}={...(0,l.R)(),...e.components};return n?(0,r.jsx)(n,{...e,children:(0,r.jsx)(d,{...e})}):d(e)}},28453:(e,n,i)=>{i.d(n,{R:()=>o,x:()=>c});var s=i(96540);const r={},l=s.createContext(r);function o(e){const n=s.useContext(l);return s.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function c(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(r):e.components||r:o(e.components),s.createElement(l.Provider,{value:n},e.children)}}}]);