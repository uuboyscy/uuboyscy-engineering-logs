"use strict";(self.webpackChunkuuboyscy_engineering_logs=self.webpackChunkuuboyscy_engineering_logs||[]).push([[8495],{43013:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>c,contentTitle:()=>d,default:()=>o,frontMatter:()=>l,metadata:()=>s,toc:()=>r});const s=JSON.parse('{"id":"Python/Pandas/Null Value","title":"Null Value","description":"- Create sample CSV file","source":"@site/docs/Python/Pandas/11_Null Value.md","sourceDirName":"Python/Pandas","slug":"/Python/Pandas/Null Value","permalink":"/zh-Hant/docs/Python/Pandas/Null Value","draft":false,"unlisted":false,"tags":[],"version":"current","sidebarPosition":11,"frontMatter":{},"sidebar":"tutorialSidebar","previous":{"title":"\u8f49\u63db\u985e\u578b","permalink":"/zh-Hant/docs/Python/Pandas/Transformation"},"next":{"title":"Typing","permalink":"/zh-Hant/docs/Python/Pandas/Typing"}}');var i=t(74848),a=t(28453);const l={},d="Null Value",c={},r=[];function h(e){const n={code:"code",h1:"h1",header:"header",img:"img",li:"li",p:"p",pre:"pre",ul:"ul",...(0,a.R)(),...e.components};return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(n.header,{children:(0,i.jsx)(n.h1,{id:"null-value",children:"Null Value"})}),"\n",(0,i.jsx)(n.h1,{id:"create-sample-dataframe",children:"Create sample DataFrame"}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsxs)(n.li,{children:["\n",(0,i.jsx)(n.p,{children:"Create sample CSV file"}),"\n",(0,i.jsx)(n.p,{children:"data_with_nan.csv"}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{children:"col1,col2,col3\ntest1,13,\ntest2,44,aaa\ntest3,,\n,,\ntest5,,bbb\n,,\n"})}),"\n"]}),"\n",(0,i.jsxs)(n.li,{children:["\n",(0,i.jsx)(n.p,{children:"Read CSV as DataFrame"}),"\n",(0,i.jsx)(n.p,{children:(0,i.jsx)(n.img,{alt:"Untitled",src:t(51988).A+"",width:"1598",height:"986"})}),"\n"]}),"\n",(0,i.jsxs)(n.li,{children:["\n",(0,i.jsx)(n.p,{children:"Create a DataFrame with None in Python"}),"\n",(0,i.jsx)(n.p,{children:(0,i.jsx)(n.img,{alt:"Untitled",src:t(60485).A+"",width:"1602",height:"778"})}),"\n"]}),"\n",(0,i.jsxs)(n.li,{children:["\n",(0,i.jsx)(n.p,{children:"See what is different between these two DataFrame"}),"\n",(0,i.jsx)(n.p,{children:(0,i.jsx)(n.img,{alt:"Untitled",src:t(32654).A+"",width:"1604",height:"586"})}),"\n"]}),"\n",(0,i.jsxs)(n.li,{children:["\n",(0,i.jsx)(n.p,{children:"How to create NaN"}),"\n",(0,i.jsx)(n.p,{children:(0,i.jsx)(n.img,{alt:"Untitled",src:t(32151).A+"",width:"1600",height:"774"})}),"\n"]}),"\n"]}),"\n",(0,i.jsx)(n.h1,{id:"calculate-on-nan",children:"Calculate on NaN"}),"\n",(0,i.jsx)(n.p,{children:(0,i.jsx)(n.img,{alt:"Untitled",src:t(10008).A+"",width:"1598",height:"1000"})}),"\n",(0,i.jsx)(n.h1,{id:"why-using-nan",children:"Why using NaN"}),"\n",(0,i.jsx)(n.p,{children:(0,i.jsx)(n.img,{alt:"Untitled",src:t(47489).A+"",width:"1828",height:"746"})}),"\n",(0,i.jsx)(n.p,{children:(0,i.jsx)(n.img,{alt:"Untitled",src:t(90058).A+"",width:"1600",height:"512"})}),"\n",(0,i.jsx)(n.p,{children:(0,i.jsx)(n.img,{alt:"Untitled",src:t(21971).A+"",width:"2176",height:"1236"})}),"\n",(0,i.jsx)(n.p,{children:(0,i.jsx)(n.img,{alt:"Untitled",src:t(79700).A+"",width:"1596",height:"978"})}),"\n",(0,i.jsx)(n.h1,{id:"deal-with-nan",children:"Deal with NaN"}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsxs)(n.li,{children:["\n",(0,i.jsx)(n.p,{children:"Create sample DataFrame first"}),"\n",(0,i.jsx)(n.p,{children:(0,i.jsx)(n.img,{alt:"Untitled",src:t(829).A+"",width:"1596",height:"788"})}),"\n"]}),"\n",(0,i.jsxs)(n.li,{children:["\n",(0,i.jsx)(n.p,{children:"Check if values are NaN"}),"\n",(0,i.jsx)(n.p,{children:(0,i.jsx)(n.img,{alt:"Untitled",src:t(9185).A+"",width:"1606",height:"1564"})}),"\n"]}),"\n",(0,i.jsxs)(n.li,{children:["\n",(0,i.jsx)(n.p,{children:"Check if values are not NaN"}),"\n",(0,i.jsx)(n.p,{children:(0,i.jsx)(n.img,{alt:"Untitled",src:t(88056).A+"",width:"1598",height:"840"})}),"\n"]}),"\n",(0,i.jsxs)(n.li,{children:["\n",(0,i.jsx)(n.p,{children:"Drop NaN"}),"\n",(0,i.jsx)(n.p,{children:(0,i.jsx)(n.img,{alt:"Untitled",src:t(83667).A+"",width:"1598",height:"1154"})}),"\n",(0,i.jsx)(n.p,{children:(0,i.jsx)(n.img,{alt:"Untitled",src:t(68106).A+"",width:"1598",height:"760"})}),"\n"]}),"\n",(0,i.jsxs)(n.li,{children:["\n",(0,i.jsx)(n.p,{children:"Fill NaN"}),"\n",(0,i.jsx)(n.p,{children:(0,i.jsx)(n.img,{alt:"Untitled",src:t(38533).A+"",width:"1610",height:"1218"})}),"\n"]}),"\n"]})]})}function o(e={}){const{wrapper:n}={...(0,a.R)(),...e.components};return n?(0,i.jsx)(n,{...e,children:(0,i.jsx)(h,{...e})}):h(e)}},60485:(e,n,t)=>{t.d(n,{A:()=>s});const s=t.p+"assets/images/Untitled 1-6aec6aa290999e4146e960180fb6dfc5.png"},9185:(e,n,t)=>{t.d(n,{A:()=>s});const s=t.p+"assets/images/Untitled 10-208fb44b63a7e087347d9e249b5934b5.png"},88056:(e,n,t)=>{t.d(n,{A:()=>s});const s=t.p+"assets/images/Untitled 11-ca18247d4328d24c6fe159ad871ee61b.png"},83667:(e,n,t)=>{t.d(n,{A:()=>s});const s=t.p+"assets/images/Untitled 12-3dae7c2b40acf80b172671829afeb0d3.png"},68106:(e,n,t)=>{t.d(n,{A:()=>s});const s=t.p+"assets/images/Untitled 13-1e1f64334f6919a28c4e9882e3784da7.png"},38533:(e,n,t)=>{t.d(n,{A:()=>s});const s=t.p+"assets/images/Untitled 14-0bbc21e473646bb65a0b52a3383240c3.png"},32654:(e,n,t)=>{t.d(n,{A:()=>s});const s=t.p+"assets/images/Untitled 2-978657988d686f6c1e8896c84d1f2ebf.png"},32151:(e,n,t)=>{t.d(n,{A:()=>s});const s=t.p+"assets/images/Untitled 3-e245c3d1b402e90f56b6530abfe826d5.png"},10008:(e,n,t)=>{t.d(n,{A:()=>s});const s=t.p+"assets/images/Untitled 4-be83e9c52987de9e5b8341cc66934ec2.png"},47489:(e,n,t)=>{t.d(n,{A:()=>s});const s=t.p+"assets/images/Untitled 5-3cbbc4372e57c890b14e246ca4ced701.png"},90058:(e,n,t)=>{t.d(n,{A:()=>s});const s=t.p+"assets/images/Untitled 6-f696001a84534d9e77c5a9837c62bba2.png"},21971:(e,n,t)=>{t.d(n,{A:()=>s});const s=t.p+"assets/images/Untitled 7-e2f3e031b2eb3f54e5b861d40d21a9a0.png"},79700:(e,n,t)=>{t.d(n,{A:()=>s});const s=t.p+"assets/images/Untitled 8-6e942916186061dd0cc36543ecbc85fe.png"},829:(e,n,t)=>{t.d(n,{A:()=>s});const s=t.p+"assets/images/Untitled 9-3c72225bb22038ea7a7df2f7706c2177.png"},51988:(e,n,t)=>{t.d(n,{A:()=>s});const s=t.p+"assets/images/Untitled-6353200702efee85db385cb1116a1078.png"},28453:(e,n,t)=>{t.d(n,{R:()=>l,x:()=>d});var s=t(96540);const i={},a=s.createContext(i);function l(e){const n=s.useContext(a);return s.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function d(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(i):e.components||i:l(e.components),s.createElement(a.Provider,{value:n},e.children)}}}]);