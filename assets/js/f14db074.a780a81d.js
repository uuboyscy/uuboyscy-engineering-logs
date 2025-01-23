"use strict";(self.webpackChunkuuboyscy_engineering_logs=self.webpackChunkuuboyscy_engineering_logs||[]).push([[8403],{1218:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>d,contentTitle:()=>c,default:()=>p,frontMatter:()=>o,metadata:()=>s,toc:()=>i});const s=JSON.parse('{"id":"Python/Pandas/Read SQL","title":"read_sql","description":"Untitled","source":"@site/docs/Python/Pandas/19_Read SQL.md","sourceDirName":"Python/Pandas","slug":"/Python/Pandas/Read SQL","permalink":"/docs/Python/Pandas/Read SQL","draft":false,"unlisted":false,"tags":[],"version":"current","sidebarPosition":19,"frontMatter":{},"sidebar":"tutorialSidebar","previous":{"title":"SQLAlchemy","permalink":"/docs/Python/Pandas/SQLAlchemy"},"next":{"title":"Pyenv","permalink":"/docs/Python/Project Management/Python Version/pyenv"}}');var r=t(74848),a=t(28453);const o={},c="read_sql",d={},i=[];function l(e){const n={code:"code",h1:"h1",header:"header",img:"img",p:"p",pre:"pre",...(0,a.R)(),...e.components};return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(n.header,{children:(0,r.jsx)(n.h1,{id:"read_sql",children:"read_sql"})}),"\n",(0,r.jsx)(n.h1,{id:"create-connection",children:"Create connection"}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-python",children:'from urllib.parse import quote_plus\n\nimport pandas as pd\nfrom sqlalchemy import create_engine\n\nusername = quote_plus("root")\npassword = quote_plus("your_password")\nserver = "127.0.0.1:3306"\ndb_name = "testdb"\n\nconn = create_engine(\n    f"mysql+pymysql://{username}:{password}@{server}/{db_name}",\n).connect()\n'})}),"\n",(0,r.jsx)(n.h1,{id:"load-dataframe-via-sql",children:"Load DataFrame via SQL"}),"\n",(0,r.jsx)(n.p,{children:(0,r.jsx)(n.img,{alt:"Untitled",src:t(88630).A+"",width:"1528",height:"878"})})]})}function p(e={}){const{wrapper:n}={...(0,a.R)(),...e.components};return n?(0,r.jsx)(n,{...e,children:(0,r.jsx)(l,{...e})}):l(e)}},88630:(e,n,t)=>{t.d(n,{A:()=>s});const s=t.p+"assets/images/Untitled-02c6bc025c7f29561227136c918ed9d5.png"},28453:(e,n,t)=>{t.d(n,{R:()=>o,x:()=>c});var s=t(96540);const r={},a=s.createContext(r);function o(e){const n=s.useContext(a);return s.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function c(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(r):e.components||r:o(e.components),s.createElement(a.Provider,{value:n},e.children)}}}]);