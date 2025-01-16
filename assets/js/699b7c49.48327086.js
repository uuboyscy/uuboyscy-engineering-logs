"use strict";(self.webpackChunkuuboyscy_engineering_logs=self.webpackChunkuuboyscy_engineering_logs||[]).push([[8586],{90104:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>r,contentTitle:()=>c,default:()=>h,frontMatter:()=>i,metadata:()=>a,toc:()=>l});const a=JSON.parse('{"id":"Python/Pandas/Merge and Concat","title":"Merge and Concat","description":"Create files","source":"@site/docs/Python/Pandas/13_Merge and Concat.md","sourceDirName":"Python/Pandas","slug":"/Python/Pandas/Merge and Concat","permalink":"/docs/Python/Pandas/Merge and Concat","draft":false,"unlisted":false,"tags":[],"version":"current","sidebarPosition":13,"frontMatter":{},"sidebar":"tutorialSidebar","previous":{"title":"Typing","permalink":"/docs/Python/Pandas/Typing"},"next":{"title":"Melt","permalink":"/docs/Python/Pandas/Melt"}}');var d=t(74848),s=t(28453);const i={},c="Merge and Concat",r={},l=[{value:"Create files",id:"create-files",level:2},{value:"With the same PK name",id:"with-the-same-pk-name",level:2},{value:"With different PK name",id:"with-different-pk-name",level:2},{value:"If column name duplicated",id:"if-column-name-duplicated",level:2},{value:"Create DataFrame",id:"create-dataframe",level:2},{value:"Concat and reset index",id:"concat-and-reset-index",level:2}];function o(e){const n={code:"code",h1:"h1",h2:"h2",header:"header",img:"img",p:"p",pre:"pre",...(0,s.R)(),...e.components};return(0,d.jsxs)(d.Fragment,{children:[(0,d.jsx)(n.header,{children:(0,d.jsx)(n.h1,{id:"merge-and-concat",children:"Merge and Concat"})}),"\n",(0,d.jsx)(n.h1,{id:"preset",children:"Preset"}),"\n",(0,d.jsx)(n.h2,{id:"create-files",children:"Create files"}),"\n",(0,d.jsx)(n.p,{children:"staff.csv"}),"\n",(0,d.jsx)(n.pre,{children:(0,d.jsx)(n.code,{children:"ID,Name,DeptId,Age,Gender,Salary\n001,Mike,002,45,M,60000\n002,Judy,002,30,F,48000\n003,Allen,001,22,M,50000\n004,Tom,002,47,M,47000\n005,Jack,003,36,M,52000\n006,Abby,002,24,F,45000\n007,Trump,001,80,M,80000\n008,Marry,003,29,F,87000\n\n"})}),"\n",(0,d.jsx)(n.p,{children:"staff_detail.csv"}),"\n",(0,d.jsx)(n.pre,{children:(0,d.jsx)(n.code,{children:"ID,Level,UpdateDate\n001,A,2019-08-09\n001,S,2020-12-08\n002,A,2021-05-30\n003,A,2018-03-26\n003,S,2020-12-08\n004,A,2022-05-02\n005,A,2019-11-05\n005,S,2022-04-25\n006,A,2022-03-03\n007,A,2017-03-29\n007,S,2018-05-02\n007,M,2021-09-01\n008,A,2018-11-26\n008,S,2020-03-15\n008,M,2022-05-03\n\n"})}),"\n",(0,d.jsx)(n.p,{children:"staff_detail_different_col.csv"}),"\n",(0,d.jsx)(n.pre,{children:(0,d.jsx)(n.code,{children:"EmpNum,Level,UpdateDate\n001,A,2019-08-09\n001,S,2020-12-08\n002,A,2021-05-30\n003,A,2018-03-26\n003,S,2020-12-08\n004,A,2022-05-02\n005,A,2019-11-05\n005,S,2022-04-25\n006,A,2022-03-03\n007,A,2017-03-29\n007,S,2018-05-02\n007,M,2021-09-01\n008,A,2018-11-26\n008,S,2020-03-15\n008,M,2022-05-03\n\n"})}),"\n",(0,d.jsx)(n.p,{children:"staff_samecol.csv"}),"\n",(0,d.jsx)(n.pre,{children:(0,d.jsx)(n.code,{children:"ID,Name,DeptId,Age,Gender,Salary,UpdateDate\n001,Mike,002,45,M,60000,2020-12-08\n002,Judy,002,30,F,48000,2021-05-30\n003,Allen,001,22,M,50000,2020-12-08\n004,Tom,002,47,M,47000,2022-05-02\n005,Jack,003,36,M,52000,2022-04-25\n006,Abby,002,24,F,45000,2022-03-03\n007,Trump,001,80,M,80000,2021-09-01\n008,Marry,003,29,F,87000,2022-05-03\n\n"})}),"\n",(0,d.jsx)(n.h1,{id:"merge",children:"Merge"}),"\n",(0,d.jsx)(n.h2,{id:"with-the-same-pk-name",children:"With the same PK name"}),"\n",(0,d.jsx)(n.p,{children:(0,d.jsx)(n.img,{alt:"Untitled",src:t(90380).A+"",width:"1608",height:"1830"})}),"\n",(0,d.jsx)(n.p,{children:(0,d.jsx)(n.img,{alt:"Untitled",src:t(42557).A+"",width:"1592",height:"864"})}),"\n",(0,d.jsx)(n.h2,{id:"with-different-pk-name",children:"With different PK name"}),"\n",(0,d.jsx)(n.p,{children:(0,d.jsx)(n.img,{alt:"Untitled",src:t(1318).A+"",width:"1598",height:"1782"})}),"\n",(0,d.jsx)(n.p,{children:(0,d.jsx)(n.img,{alt:"Untitled",src:t(40335).A+"",width:"3006",height:"1354"})}),"\n",(0,d.jsx)(n.p,{children:"Got error if no columns specified."}),"\n",(0,d.jsx)(n.p,{children:(0,d.jsx)(n.img,{alt:"Untitled",src:t(97488).A+"",width:"1602",height:"944"})}),"\n",(0,d.jsx)(n.h2,{id:"if-column-name-duplicated",children:"If column name duplicated"}),"\n",(0,d.jsx)(n.p,{children:(0,d.jsx)(n.img,{alt:"Untitled",src:t(94393).A+"",width:"1604",height:"1788"})}),"\n",(0,d.jsx)(n.p,{children:(0,d.jsx)(n.img,{alt:"Untitled",src:t(46210).A+"",width:"1598",height:"860"})}),"\n",(0,d.jsx)(n.h1,{id:"concat",children:"Concat"}),"\n",(0,d.jsx)(n.h2,{id:"create-dataframe",children:"Create DataFrame"}),"\n",(0,d.jsx)(n.pre,{children:(0,d.jsx)(n.code,{className:"language-python",children:'import pandas as pd\n\ndf = pd.DataFrame(\n    data=[\n        ["Allen", 175, 22],\n        ["Ted", 180, 25]\n    ],\n    columns=["Name", "Height", "Age"]\n)\n\ndf_1 = pd.DataFrame(\n    data=[\n        ["Jake", 177, 28],\n        ["Mary", 170, 24]\n    ],\n    columns=["Name", "Height", "Age"]\n)\n'})}),"\n",(0,d.jsx)(n.h2,{id:"concat-and-reset-index",children:"Concat and reset index"}),"\n",(0,d.jsx)(n.p,{children:(0,d.jsx)(n.img,{alt:"Untitled",src:t(67339).A+"",width:"1600",height:"1254"})})]})}function h(e={}){const{wrapper:n}={...(0,s.R)(),...e.components};return n?(0,d.jsx)(n,{...e,children:(0,d.jsx)(o,{...e})}):o(e)}},42557:(e,n,t)=>{t.d(n,{A:()=>a});const a=t.p+"assets/images/Untitled 1-3026c66f28e4badda7e5c3d3d3d15c83.png"},1318:(e,n,t)=>{t.d(n,{A:()=>a});const a=t.p+"assets/images/Untitled 2-9425a3e161bfe27a71ac3351c86ffdec.png"},40335:(e,n,t)=>{t.d(n,{A:()=>a});const a=t.p+"assets/images/Untitled 3-cfb7d8022eb23d1b20d0a808174102c9.png"},97488:(e,n,t)=>{t.d(n,{A:()=>a});const a=t.p+"assets/images/Untitled 4-3fc7983ffb252e39e4608372d831b6a2.png"},94393:(e,n,t)=>{t.d(n,{A:()=>a});const a=t.p+"assets/images/Untitled 5-acf0bdd3aeb9e9f646058f4cd414f179.png"},46210:(e,n,t)=>{t.d(n,{A:()=>a});const a=t.p+"assets/images/Untitled 6-5f6cc9d7336c102ea1bb8d286504ebce.png"},67339:(e,n,t)=>{t.d(n,{A:()=>a});const a=t.p+"assets/images/Untitled 7-9590a16ff4a279c5bc88e166046c09d1.png"},90380:(e,n,t)=>{t.d(n,{A:()=>a});const a=t.p+"assets/images/Untitled-7097293c9b630cefd4a07f6d570a5861.png"},28453:(e,n,t)=>{t.d(n,{R:()=>i,x:()=>c});var a=t(96540);const d={},s=a.createContext(d);function i(e){const n=a.useContext(s);return a.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function c(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(d):e.components||d:i(e.components),a.createElement(s.Provider,{value:n},e.children)}}}]);