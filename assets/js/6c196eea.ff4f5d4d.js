"use strict";(self.webpackChunkuuboyscy_engineering_logs=self.webpackChunkuuboyscy_engineering_logs||[]).push([[5797],{179:(e,n,o)=>{o.r(n),o.d(n,{assets:()=>i,contentTitle:()=>a,default:()=>p,frontMatter:()=>c,metadata:()=>r,toc:()=>l});const r=JSON.parse('{"id":"Docker/docker-tutorial/Docker compose f0ae267025e140ffb6d5ece8f412ec98","title":"Docker compose","description":"https~:text=Docker Compose is a tool,efficient development and deployment experience.","source":"@site/docs/Docker/docker-tutorial/Docker compose f0ae267025e140ffb6d5ece8f412ec98.md","sourceDirName":"Docker/docker-tutorial","slug":"/Docker/docker-tutorial/Docker compose f0ae267025e140ffb6d5ece8f412ec98","permalink":"/docs/Docker/docker-tutorial/Docker compose f0ae267025e140ffb6d5ece8f412ec98","draft":false,"unlisted":false,"tags":[],"version":"current","sidebarPosition":13,"frontMatter":{"sidebar_position":13},"sidebar":"tutorialSidebar","previous":{"title":"Dockerfile","permalink":"/docs/Docker/docker-tutorial/Dockerfile cff36b25e8944652ba28f7e17a945b96"},"next":{"title":"VSCode devcontainer","permalink":"/docs/Docker/docker-tutorial/VSCode devcontainer 856f526d5f35437795d6800f181415ea"}}');var t=o(4848),s=o(8453);const c={sidebar_position:13},a="Docker compose",i={},l=[];function d(e){const n={a:"a",code:"code",h1:"h1",header:"header",p:"p",pre:"pre",...(0,s.R)(),...e.components};return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(n.header,{children:(0,t.jsx)(n.h1,{id:"docker-compose",children:"Docker compose"})}),"\n",(0,t.jsx)(n.h1,{id:"what-is-docker-compose",children:"What is docker compose"}),"\n",(0,t.jsxs)(n.p,{children:[(0,t.jsxs)(n.a,{href:"https://docs.docker.com/compose/#:~:text=Docker%20Compose%20is%20a%20tool,efficient%20development%20and%20deployment%20experience",children:["https://docs.docker.com/compose/#:~",":text","=Docker Compose is a tool,efficient development and deployment experience"]}),"."]}),"\n",(0,t.jsx)(n.h1,{id:"syntax",children:"Syntax"}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-yaml",children:'services:\n  web:\n    build: .\n    ports:\n      - "8000:5000"\n      - "8888:8888"\n  redis:\n    image: "redis:alpine"\n'})}),"\n",(0,t.jsx)(n.h1,{id:"manage-multiple-containers",children:"Manage multiple containers"}),"\n",(0,t.jsx)(n.p,{children:(0,t.jsx)(n.a,{href:"https://docs.docker.com/compose/gettingstarted/",children:"https://docs.docker.com/compose/gettingstarted/"})}),"\n",(0,t.jsx)(n.h1,{id:"quick-start",children:"Quick start"}),"\n",(0,t.jsx)(n.p,{children:"docker-compose.yaml"}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-yaml",children:'version: \'3\'\nservices:\n  flask_web_server:\n    build:\n      context: .\n      dockerfile: flask.Dockerfile\n    container_name: flask_web_server\n    restart: always\n    ports:\n      - "80:5000"\n    volumes:\n      - .:/app\n\n  demo_ngrok:\n    image: wernight/ngrok\n    container_name: demo_ngrok\n    depends_on:\n      - flask_web_server\n    restart: always\n    ports:\n      - "54088:4040"\n    links:\n      - flask_web_server:http\n    command: ngrok http --authtoken=123 flask_web_server:5000\n\n'})}),"\n",(0,t.jsx)(n.p,{children:"flask.Dockerfile"}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-docker",children:'FROM --platform=linux/amd64 python:3.11-slim-bullseye\n\nWORKDIR /workspace\n\nCOPY . /workspace\n\nENV TZ=Asia/Taipei\nENV FLASK_APP=app.py\nENV FLASK_RUN_HOST=0.0.0.0\n\nEXPOSE 5000\n\nRUN apt-get update -y\nRUN apt-get install curl vim wget procps git -y\nRUN apt-get install -y zsh \\\n    && echo "Y" | sh -c "$(curl -fsSL https://raw.githubusercontent.com/ohmyzsh/ohmyzsh/master/tools/install.sh)"\n\nRUN pip install --upgrade pip\nRUN pip install flask\n\nCMD ["flask", "run"]\n\n'})}),"\n",(0,t.jsx)(n.p,{children:"app.py"}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-python",children:'from flask import Flask\n\napp = Flask(__name__)\n\n@app.route("/")\ndef hello():\n    return "<h1>Hello!</h1>"\n\nif __name__ == "__main__":\n    app.run()\n\n'})})]})}function p(e={}){const{wrapper:n}={...(0,s.R)(),...e.components};return n?(0,t.jsx)(n,{...e,children:(0,t.jsx)(d,{...e})}):d(e)}},8453:(e,n,o)=>{o.d(n,{R:()=>c,x:()=>a});var r=o(6540);const t={},s=r.createContext(t);function c(e){const n=r.useContext(s);return r.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function a(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(t):e.components||t:c(e.components),r.createElement(s.Provider,{value:n},e.children)}}}]);