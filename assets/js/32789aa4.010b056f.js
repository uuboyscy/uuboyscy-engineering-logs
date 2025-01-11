"use strict";(self.webpackChunkuuboyscy_engineering_logs=self.webpackChunkuuboyscy_engineering_logs||[]).push([[9012],{1811:(e,n,i)=>{i.r(n),i.d(n,{assets:()=>d,contentTitle:()=>r,default:()=>h,frontMatter:()=>a,metadata:()=>s,toc:()=>l});const s=JSON.parse('{"id":"Docker/docker-tutorial/Quick Start 9a0d8944806141ddb7416de894c557b4","title":"Quick Start","description":"Install Docker","source":"@site/docs/Docker/docker-tutorial/Quick Start 9a0d8944806141ddb7416de894c557b4.md","sourceDirName":"Docker/docker-tutorial","slug":"/Docker/docker-tutorial/Quick Start 9a0d8944806141ddb7416de894c557b4","permalink":"/docs/Docker/docker-tutorial/Quick Start 9a0d8944806141ddb7416de894c557b4","draft":false,"unlisted":false,"tags":[],"version":"current","sidebarPosition":4,"frontMatter":{"sidebar_position":4},"sidebar":"tutorialSidebar","previous":{"title":"Virtual Machine (VM)","permalink":"/docs/Docker/docker-tutorial/Virtual Machine VM add5c8cba6f741d49842d7fee55de6de"},"next":{"title":"Linux Introduction","permalink":"/docs/Docker/docker-tutorial/Linux Introduction ca7bac636b8a47b4a9d907ca697290fd"}}');var t=i(4848),c=i(8453);const a={sidebar_position:4},r="Quick Start",d={},l=[{value:"Install Docker",id:"install-docker",level:2},{value:"Show version",id:"show-version",level:2},{value:"Check image",id:"check-image",level:2},{value:"Download image",id:"download-image",level:2},{value:"Manipulate container",id:"manipulate-container",level:2}];function o(e){const n={a:"a",code:"code",h1:"h1",h2:"h2",header:"header",img:"img",li:"li",p:"p",pre:"pre",ul:"ul",...(0,c.R)(),...e.components};return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(n.header,{children:(0,t.jsx)(n.h1,{id:"quick-start",children:"Quick Start"})}),"\n",(0,t.jsx)(n.h1,{id:"installation",children:"Installation"}),"\n",(0,t.jsx)(n.h2,{id:"install-docker",children:"Install Docker"}),"\n",(0,t.jsx)(n.p,{children:(0,t.jsx)(n.a,{href:"https://docs.docker.com/engine/install/",children:"https://docs.docker.com/engine/install/"})}),"\n",(0,t.jsx)(n.h2,{id:"show-version",children:"Show version"}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-bash",children:"docker --version\n"})}),"\n",(0,t.jsx)(n.p,{children:(0,t.jsx)(n.img,{alt:"Untitled",src:i(1437).A+"",width:"780",height:"108"})}),"\n",(0,t.jsx)(n.h2,{id:"check-image",children:"Check image"}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-bash",children:"docker images\n"})}),"\n",(0,t.jsx)(n.p,{children:(0,t.jsx)(n.img,{alt:"Untitled",src:i(2244).A+"",width:"2076",height:"212"})}),"\n",(0,t.jsx)(n.p,{children:"\u7b2c\u4e00\u6b21\u5b89\u88dd Docker \u53ea\u6703\u770b\u5230\u6700\u4e0a\u65b9  REPOSITORY    TAG    IMAGE ID    CREATED    SIZE  \u9019\u6392"}),"\n",(0,t.jsx)(n.h1,{id:"quick-start-1",children:"Quick start"}),"\n",(0,t.jsx)(n.h2,{id:"download-image",children:"Download image"}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsxs)(n.li,{children:["\n",(0,t.jsx)(n.p,{children:"DockerHub"}),"\n",(0,t.jsx)(n.p,{children:(0,t.jsx)(n.a,{href:"https://hub.docker.com/",children:"https://hub.docker.com"})}),"\n"]}),"\n",(0,t.jsxs)(n.li,{children:["\n",(0,t.jsx)(n.p,{children:"Search Python"}),"\n",(0,t.jsx)(n.p,{children:"Search 3.12-slim-bullseye"}),"\n",(0,t.jsx)(n.p,{children:(0,t.jsx)(n.img,{alt:"Untitled",src:i(6895).A+"",width:"3016",height:"1512"})}),"\n"]}),"\n",(0,t.jsxs)(n.li,{children:["\n",(0,t.jsx)(n.p,{children:"Download Docker image"}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-bash",children:"docker pull python:3.12-slim-bullseye\n"})}),"\n"]}),"\n",(0,t.jsxs)(n.li,{children:["\n",(0,t.jsx)(n.p,{children:"\u67e5\u770b Docker image"}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-bash",children:"docker images\n"})}),"\n",(0,t.jsx)(n.p,{children:(0,t.jsx)(n.img,{alt:"Untitled",src:i(566).A+"",width:"2070",height:"176"})}),"\n",(0,t.jsx)(n.p,{children:"A new python repository appears, and it has a tag 3.12-slim-bullseye"}),"\n"]}),"\n"]}),"\n",(0,t.jsx)(n.h2,{id:"manipulate-container",children:"Manipulate container"}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsxs)(n.li,{children:["\n",(0,t.jsx)(n.p,{children:"Check running container"}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-bash",children:"docker ps\n"})}),"\n",(0,t.jsx)(n.p,{children:(0,t.jsx)(n.img,{alt:"Untitled",src:i(6745).A+"",width:"2566",height:"142"})}),"\n",(0,t.jsx)(n.p,{children:"Before starting the container, you will only see the row at the top showing  CONTAINER ID   IMAGE    COMMAND    CREATED    STATUS    PORTS    NAMES"}),"\n"]}),"\n",(0,t.jsxs)(n.li,{children:["\n",(0,t.jsx)(n.p,{children:"Start a container"}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-bash",children:"docker run -it -d --name docker-tutorial python:3.12-slim-bullseye /bin/bash\n"})}),"\n",(0,t.jsx)(n.p,{children:(0,t.jsx)(n.img,{alt:"Untitled",src:i(5568).A+"",width:"1206",height:"110"})}),"\n"]}),"\n",(0,t.jsxs)(n.li,{children:["\n",(0,t.jsx)(n.p,{children:"Check running container again"}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-bash",children:"docker ps\n"})}),"\n",(0,t.jsx)(n.p,{children:(0,t.jsx)(n.img,{alt:"Untitled",src:i(3899).A+"",width:"2648",height:"170"})}),"\n"]}),"\n",(0,t.jsxs)(n.li,{children:["\n",(0,t.jsx)(n.p,{children:"Enter container"}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-bash",children:"docker exec -it docker-tutorial /bin/bash\n"})}),"\n",(0,t.jsx)(n.p,{children:(0,t.jsx)(n.img,{alt:"Untitled",src:i(6034).A+"",width:"776",height:"104"})}),"\n",(0,t.jsx)(n.p,{children:"Cursor in terminal changed."}),"\n"]}),"\n"]})]})}function h(e={}){const{wrapper:n}={...(0,c.R)(),...e.components};return n?(0,t.jsx)(n,{...e,children:(0,t.jsx)(o,{...e})}):o(e)}},2244:(e,n,i)=>{i.d(n,{A:()=>s});const s=i.p+"assets/images/Untitled 1-3adc878633873797374d17e32eea232a.png"},6895:(e,n,i)=>{i.d(n,{A:()=>s});const s=i.p+"assets/images/Untitled 2-352c6736adc5307248f1f1792910d2fa.png"},566:(e,n,i)=>{i.d(n,{A:()=>s});const s=i.p+"assets/images/Untitled 3-f09a32e3678c228c65a5b57f666c27ea.png"},6745:(e,n,i)=>{i.d(n,{A:()=>s});const s=i.p+"assets/images/Untitled 4-149fa06d1e311534fc3ab608432f442a.png"},5568:(e,n,i)=>{i.d(n,{A:()=>s});const s=i.p+"assets/images/Untitled 5-6d319f39b254606e0af02f01b06d936c.png"},3899:(e,n,i)=>{i.d(n,{A:()=>s});const s=i.p+"assets/images/Untitled 6-b7f5435d078295a5a6c3c970a9fb6c0c.png"},6034:(e,n,i)=>{i.d(n,{A:()=>s});const s=i.p+"assets/images/Untitled 7-95fea727800ef4cc909a9837434cf437.png"},1437:(e,n,i)=>{i.d(n,{A:()=>s});const s=i.p+"assets/images/Untitled-e925dc6c3b2587d6f328af5b07f78d03.png"},8453:(e,n,i)=>{i.d(n,{R:()=>a,x:()=>r});var s=i(6540);const t={},c=s.createContext(t);function a(e){const n=s.useContext(c);return s.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function r(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(t):e.components||t:a(e.components),s.createElement(c.Provider,{value:n},e.children)}}}]);