"use strict";(self.webpackChunkuuboyscy_engineering_logs=self.webpackChunkuuboyscy_engineering_logs||[]).push([[3460],{9757:(e,t,a)=>{a.r(t),a.d(t,{assets:()=>c,contentTitle:()=>r,default:()=>h,frontMatter:()=>i,metadata:()=>n,toc:()=>o});const n=JSON.parse('{"id":"Python/Pandas/Convert Text to DataFrame","title":"Convert Text to DataFrame","description":"- From text","source":"@site/docs/Python/Pandas/05_Convert Text to DataFrame.md","sourceDirName":"Python/Pandas","slug":"/Python/Pandas/Convert Text to DataFrame","permalink":"/docs/Python/Pandas/Convert Text to DataFrame","draft":false,"unlisted":false,"tags":[],"version":"current","sidebarPosition":5,"frontMatter":{},"sidebar":"tutorialSidebar","previous":{"title":"Copy DataFrame","permalink":"/docs/Python/Pandas/Copy DataFrame"},"next":{"title":"Load","permalink":"/docs/Python/Pandas/Load"}}');var s=a(74848),d=a(28453);const i={},r="Convert Text to DataFrame",c={},o=[{value:"Read text files",id:"read-text-files",level:2},{value:"Prepare columns",id:"prepare-columns",level:2},{value:"Extract data we need",id:"extract-data-we-need",level:2},{value:"Create DataFrame",id:"create-dataframe-1",level:2}];function l(e){const t={code:"code",h1:"h1",h2:"h2",header:"header",img:"img",li:"li",p:"p",pre:"pre",ul:"ul",...(0,d.R)(),...e.components};return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(t.header,{children:(0,s.jsx)(t.h1,{id:"convert-text-to-dataframe",children:"Convert Text to DataFrame"})}),"\n",(0,s.jsx)(t.h1,{id:"what-to-do",children:"What to do"}),"\n",(0,s.jsxs)(t.ul,{children:["\n",(0,s.jsxs)(t.li,{children:["\n",(0,s.jsx)(t.p,{children:"From text"}),"\n",(0,s.jsx)(t.p,{children:(0,s.jsx)(t.img,{alt:"Untitled",src:a(9755).A+"",width:"1914",height:"522"})}),"\n"]}),"\n",(0,s.jsxs)(t.li,{children:["\n",(0,s.jsx)(t.p,{children:"To DataFrame"}),"\n",(0,s.jsx)(t.p,{children:(0,s.jsx)(t.img,{alt:"Untitled",src:a(1602).A+"",width:"1972",height:"730"})}),"\n"]}),"\n"]}),"\n",(0,s.jsx)(t.h1,{id:"download-text-files",children:"Download text files"}),"\n",(0,s.jsx)(t.p,{children:"Copy following commands and paste on terminal in devcontainer"}),"\n",(0,s.jsx)(t.pre,{children:(0,s.jsx)(t.code,{className:"language-bash",children:"wget -O /tmp/course-datamining.zip https://github.com/uuboyscy/course-datamining/archive/refs/heads/master.zip\nunzip /tmp/course-datamining.zip -d /tmp/\ncp -r /tmp/course-datamining-master/module_06_Pandas_basis/res_gossiping ./\nrm -rf /tmp/course-datamining*\n"})}),"\n",(0,s.jsx)(t.h1,{id:"create-dataframe",children:"Create DataFrame"}),"\n",(0,s.jsx)(t.h2,{id:"read-text-files",children:"Read text files"}),"\n",(0,s.jsx)(t.p,{children:(0,s.jsx)(t.img,{alt:"Untitled",src:a(49785).A+"",width:"2102",height:"858"})}),"\n",(0,s.jsx)(t.h2,{id:"prepare-columns",children:"Prepare columns"}),"\n",(0,s.jsx)(t.p,{children:(0,s.jsx)(t.img,{alt:"Untitled",src:a(69232).A+"",width:"2104",height:"182"})}),"\n",(0,s.jsx)(t.h2,{id:"extract-data-we-need",children:"Extract data we need"}),"\n",(0,s.jsx)(t.p,{children:(0,s.jsx)(t.img,{alt:"Untitled",src:a(95727).A+"",width:"2096",height:"1032"})}),"\n",(0,s.jsx)(t.h2,{id:"create-dataframe-1",children:"Create DataFrame"}),"\n",(0,s.jsx)(t.p,{children:(0,s.jsx)(t.img,{alt:"Untitled",src:a(56710).A+"",width:"2100",height:"824"})}),"\n",(0,s.jsx)(t.h1,{id:"save-and-load-dataframe",children:"Save and load DataFrame"}),"\n",(0,s.jsx)(t.p,{children:(0,s.jsx)(t.img,{alt:"Untitled",src:a(97949).A+"",width:"2000",height:"1050"})})]})}function h(e={}){const{wrapper:t}={...(0,d.R)(),...e.components};return t?(0,s.jsx)(t,{...e,children:(0,s.jsx)(l,{...e})}):l(e)}},1602:(e,t,a)=>{a.d(t,{A:()=>n});const n=a.p+"assets/images/Untitled 1-3593cc50e165ca18be1615b590f1338f.png"},49785:(e,t,a)=>{a.d(t,{A:()=>n});const n=a.p+"assets/images/Untitled 2-28a028f7bd66f8745f942c09cc04997d.png"},69232:(e,t,a)=>{a.d(t,{A:()=>n});const n=a.p+"assets/images/Untitled 3-45c0d2626d7a77d7d2390a7ecc539e00.png"},95727:(e,t,a)=>{a.d(t,{A:()=>n});const n=a.p+"assets/images/Untitled 4-b2e06279c9e4ea6c63cd50d6dba62d56.png"},56710:(e,t,a)=>{a.d(t,{A:()=>n});const n=a.p+"assets/images/Untitled 5-32eae843eed93ceebd73596b6eb10c1f.png"},97949:(e,t,a)=>{a.d(t,{A:()=>n});const n=a.p+"assets/images/Untitled 6-08c9748acc0f7a170f1fb26063364a5c.png"},9755:(e,t,a)=>{a.d(t,{A:()=>n});const n=a.p+"assets/images/Untitled-076f17c725c1339216ae820d0e7796e8.png"},28453:(e,t,a)=>{a.d(t,{R:()=>i,x:()=>r});var n=a(96540);const s={},d=n.createContext(s);function i(e){const t=n.useContext(d);return n.useMemo((function(){return"function"==typeof e?e(t):{...t,...e}}),[t,e])}function r(e){let t;return t=e.disableParentContext?"function"==typeof e.components?e.components(s):e.components||s:i(e.components),n.createElement(d.Provider,{value:t},e.children)}}}]);