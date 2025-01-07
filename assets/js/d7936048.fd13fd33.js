"use strict";(self.webpackChunkuuboyscy_engineering_logs=self.webpackChunkuuboyscy_engineering_logs||[]).push([[554],{4705:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>d,contentTitle:()=>r,default:()=>h,frontMatter:()=>c,metadata:()=>i,toc:()=>o});const i=JSON.parse('{"id":"Docker/docker-tutorial/Modify container and create image e7914f6ae361484c97000cecab4e999b","title":"Modify container and create image","description":"Start a container","source":"@site/docs/Docker/docker-tutorial/Modify container and create image e7914f6ae361484c97000cecab4e999b.md","sourceDirName":"Docker/docker-tutorial","slug":"/Docker/docker-tutorial/Modify container and create image e7914f6ae361484c97000cecab4e999b","permalink":"/docs/Docker/docker-tutorial/Modify container and create image e7914f6ae361484c97000cecab4e999b","draft":false,"unlisted":false,"tags":[],"version":"current","frontMatter":{},"sidebar":"tutorialSidebar","previous":{"title":"Linux Introduction","permalink":"/docs/Docker/docker-tutorial/Linux Introduction ca7bac636b8a47b4a9d907ca697290fd"},"next":{"title":"Quick Start","permalink":"/docs/Docker/docker-tutorial/Quick Start 9a0d8944806141ddb7416de894c557b4"}}');var s=t(4848),a=t(8453);const c={},r="Modify container and create image",d={},o=[{value:"Start a container",id:"start-a-container",level:2},{value:"Do something <strong>in container</strong>",id:"do-something-in-container",level:2},{value:"Commit",id:"commit",level:2},{value:"Try new image",id:"try-new-image",level:2},{value:"Login",id:"login",level:2},{value:"Push",id:"push",level:2}];function l(e){const n={a:"a",code:"code",h1:"h1",h2:"h2",header:"header",img:"img",li:"li",p:"p",pre:"pre",strong:"strong",ul:"ul",...(0,a.R)(),...e.components};return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(n.header,{children:(0,s.jsx)(n.h1,{id:"modify-container-and-create-image",children:"Modify container and create image"})}),"\n",(0,s.jsx)(n.h1,{id:"commit-a-new-image",children:"Commit a new image"}),"\n",(0,s.jsx)(n.h2,{id:"start-a-container",children:"Start a container"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-bash",children:"docker run -it -d --name custom-container python:3.11-slim-bullseye\n"})}),"\n",(0,s.jsxs)(n.h2,{id:"do-something-in-container",children:["Do something ",(0,s.jsx)(n.strong,{children:"in container"})]}),"\n",(0,s.jsx)(n.p,{children:"First get into container"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-bash",children:"docker exec -it custom-container /bin/bash\n"})}),"\n",(0,s.jsx)(n.p,{children:(0,s.jsx)(n.img,{alt:"Untitled",src:t(5299).A+"",width:"902",height:"122"})}),"\n",(0,s.jsx)(n.p,{children:"Then we will create an image with Vim pre-installed"}),"\n",(0,s.jsx)(n.p,{children:"Check if Vim is installed"}),"\n",(0,s.jsx)(n.p,{children:(0,s.jsx)(n.img,{alt:"Untitled",src:t(9498).A+"",width:"386",height:"68"})}),"\n",(0,s.jsx)(n.p,{children:"Install Vim"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-bash",children:"apt-get update\napt-get install vim -y\n"})}),"\n",(0,s.jsx)(n.p,{children:(0,s.jsx)(n.img,{alt:"Untitled",src:t(81).A+"",width:"1428",height:"872"})}),"\n",(0,s.jsx)(n.p,{children:"Vim is installed now"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-bash",children:"vi --version\n"})}),"\n",(0,s.jsx)(n.p,{children:(0,s.jsx)(n.img,{alt:"Untitled",src:t(8952).A+"",width:"1054",height:"596"})}),"\n",(0,s.jsx)(n.p,{children:"Press CTRL + D or type exit to Exit the container"}),"\n",(0,s.jsx)(n.p,{children:(0,s.jsx)(n.img,{alt:"Untitled",src:t(1591).A+"",width:"898",height:"144"})}),"\n",(0,s.jsx)(n.h2,{id:"commit",children:"Commit"}),"\n",(0,s.jsx)(n.p,{children:"How commit command works"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-bash",children:'Usage:  docker commit [OPTIONS] CONTAINER [REPOSITORY[:TAG]]\n\nCreate a new image from a container\'s changes\n\nAliases:\n  docker container commit, docker commit\n\nOptions:\n  -a, --author string    Author (e.g., "John Hannibal Smith <hannibal@a-team.com>")\n  -c, --change list      Apply Dockerfile instruction to the created image\n  -m, --message string   Commit message\n  -p, --pause            Pause container during commit (default true)\n'})}),"\n",(0,s.jsx)(n.p,{children:"Get container ID"}),"\n",(0,s.jsx)(n.p,{children:(0,s.jsx)(n.img,{alt:"Untitled",src:t(2366).A+"",width:"1556",height:"148"})}),"\n",(0,s.jsx)(n.p,{children:"Commit a new image"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-bash",children:"docker commit <your container id> custom-image:vim-installed\ndocker commit <your container id> custom-image:do-something\ndocker commit <your container id> custom-image:latest\n"})}),"\n",(0,s.jsx)(n.p,{children:(0,s.jsx)(n.img,{alt:"Untitled",src:t(6373).A+"",width:"1014",height:"104"})}),"\n",(0,s.jsx)(n.p,{children:(0,s.jsx)(n.img,{alt:"Untitled",src:t(3484).A+"",width:"2092",height:"276"})}),"\n",(0,s.jsx)(n.h2,{id:"try-new-image",children:"Try new image"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-bash",children:"docker run -it -d --name custom-container-2 custom-image:latest\ndocker exec -it custom-container-2 /bin/bash\nvi --version\n"})}),"\n",(0,s.jsx)(n.p,{children:(0,s.jsx)(n.img,{alt:"Untitled",src:t(9323).A+"",width:"1592",height:"412"})}),"\n",(0,s.jsx)(n.h1,{id:"publish-image",children:"Publish image"}),"\n",(0,s.jsx)(n.h2,{id:"login",children:"Login"}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsxs)(n.li,{children:["\n",(0,s.jsx)(n.p,{children:"Create token"}),"\n",(0,s.jsx)(n.p,{children:(0,s.jsx)(n.a,{href:"https://hub.docker.com/settings/security",children:"https://hub.docker.com/settings/security"})}),"\n",(0,s.jsx)(n.p,{children:(0,s.jsx)(n.img,{alt:"Untitled",src:t(8194).A+"",width:"3022",height:"1300"})}),"\n",(0,s.jsx)(n.p,{children:(0,s.jsx)(n.img,{alt:"Untitled",src:t(5248).A+"",width:"3022",height:"1444"})}),"\n"]}),"\n",(0,s.jsxs)(n.li,{children:["\n",(0,s.jsx)(n.p,{children:"Authenticate"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-bash",children:"docker login -u <your username>\n"})}),"\n"]}),"\n"]}),"\n",(0,s.jsx)(n.h2,{id:"push",children:"Push"}),"\n",(0,s.jsxs)(n.p,{children:["Now we have a custom image custom-image",":latest","."]}),"\n",(0,s.jsx)(n.p,{children:"Try push this image to DockerHub, got denied."}),"\n",(0,s.jsx)(n.p,{children:(0,s.jsx)(n.img,{alt:"Untitled",src:t(1497).A+"",width:"892",height:"336"})}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsxs)(n.li,{children:["\n",(0,s.jsx)(n.p,{children:"Tag image"}),"\n",(0,s.jsx)(n.p,{children:"Tag the image with your user name as prefix"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-bash",children:"# docker tag custom-image:latest <your username>/custom-image:latest\ndocker tag custom-image:latest uuboyscy/custom-image:latest\n"})}),"\n",(0,s.jsx)(n.p,{children:(0,s.jsx)(n.img,{alt:"Untitled",src:t(4914).A+"",width:"1984",height:"374"})}),"\n"]}),"\n",(0,s.jsxs)(n.li,{children:["\n",(0,s.jsx)(n.p,{children:"Push"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-bash",children:"# docker push <your username>/custom-image:latest\ndocker push uuboyscy/custom-image:latest\n"})}),"\n",(0,s.jsx)(n.p,{children:(0,s.jsx)(n.img,{alt:"Untitled",src:t(9067).A+"",width:"1316",height:"356"})}),"\n",(0,s.jsx)(n.p,{children:"Then find your first image on DockerHub"}),"\n",(0,s.jsx)(n.p,{children:(0,s.jsx)(n.img,{alt:"Untitled",src:t(9156).A+"",width:"3020",height:"872"})}),"\n"]}),"\n"]})]})}function h(e={}){const{wrapper:n}={...(0,a.R)(),...e.components};return n?(0,s.jsx)(n,{...e,children:(0,s.jsx)(l,{...e})}):l(e)}},9498:(e,n,t)=>{t.d(n,{A:()=>i});const i=t.p+"assets/images/Untitled 1-098f831c5187a115b45ad655d84c2b3e.png"},5248:(e,n,t)=>{t.d(n,{A:()=>i});const i=t.p+"assets/images/Untitled 10-13bd4cfc3439d27e59d63a5e9afb9369.png"},1497:(e,n,t)=>{t.d(n,{A:()=>i});const i=t.p+"assets/images/Untitled 11-780772f77dd90ce9c9b5846342bedb91.png"},4914:(e,n,t)=>{t.d(n,{A:()=>i});const i=t.p+"assets/images/Untitled 12-98510601b504d5decd09dd91498d98dc.png"},9067:(e,n,t)=>{t.d(n,{A:()=>i});const i=t.p+"assets/images/Untitled 13-16cbd5de82f12996de0dc10717287388.png"},9156:(e,n,t)=>{t.d(n,{A:()=>i});const i=t.p+"assets/images/Untitled 14-e7d4765783b27004f93e71e899fbe557.png"},81:(e,n,t)=>{t.d(n,{A:()=>i});const i=t.p+"assets/images/Untitled 2-1e3a817f01ef8b7b9f33f195924be36d.png"},8952:(e,n,t)=>{t.d(n,{A:()=>i});const i=t.p+"assets/images/Untitled 3-7b08526604b9b22e972499739f990e27.png"},1591:(e,n,t)=>{t.d(n,{A:()=>i});const i=t.p+"assets/images/Untitled 4-aa6b117016b0ab7ba8c6136fb75e468d.png"},2366:(e,n,t)=>{t.d(n,{A:()=>i});const i=t.p+"assets/images/Untitled 5-8a38d4866818764525ce5091c11440c6.png"},6373:(e,n,t)=>{t.d(n,{A:()=>i});const i=t.p+"assets/images/Untitled 6-5db6920d75685f36e35c4f6d4584ce9f.png"},3484:(e,n,t)=>{t.d(n,{A:()=>i});const i=t.p+"assets/images/Untitled 7-d41bfe571693bdc156ea9e8d145ae388.png"},9323:(e,n,t)=>{t.d(n,{A:()=>i});const i=t.p+"assets/images/Untitled 8-bcf49b5866a3de63f9ce6c741e1feb5a.png"},8194:(e,n,t)=>{t.d(n,{A:()=>i});const i=t.p+"assets/images/Untitled 9-c661f4631262e0292a6b131c73fa392a.png"},5299:(e,n,t)=>{t.d(n,{A:()=>i});const i=t.p+"assets/images/Untitled-8f3173c1fa4127f2b6ac17547b5d0358.png"},8453:(e,n,t)=>{t.d(n,{R:()=>c,x:()=>r});var i=t(6540);const s={},a=i.createContext(s);function c(e){const n=i.useContext(a);return i.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function r(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(s):e.components||s:c(e.components),i.createElement(a.Provider,{value:n},e.children)}}}]);