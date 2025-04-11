"use strict";(self.webpackChunkuuboyscy_engineering_logs=self.webpackChunkuuboyscy_engineering_logs||[]).push([[9846],{7888:(e,r,s)=>{s.r(r),s.d(r,{assets:()=>c,contentTitle:()=>l,default:()=>h,frontMatter:()=>a,metadata:()=>n,toc:()=>d});const n=JSON.parse('{"id":"Web Crawler/Web Crawler Intro","title":"Web Crawler Intro","description":"What is a Web Crawler?","source":"@site/docs/Web Crawler/01_Web Crawler Intro.md","sourceDirName":"Web Crawler","slug":"/Web Crawler/Web Crawler Intro","permalink":"/docs/Web Crawler/Web Crawler Intro","draft":false,"unlisted":false,"tags":[],"version":"current","sidebarPosition":1,"frontMatter":{},"sidebar":"tutorialSidebar","previous":{"title":"Web Crawler","permalink":"/docs/category/web-crawler"},"next":{"title":"HTML Basic","permalink":"/docs/Web Crawler/HTML Basic"}}');var i=s(74848),t=s(28453);const a={},l="Web Crawler Intro",c={},d=[{value:"What is a Web Crawler?",id:"what-is-a-web-crawler",level:2},{value:"Why Use a Web Crawler?",id:"why-use-a-web-crawler",level:2},{value:"How It Works: Simulating Browser Behavior",id:"how-it-works-simulating-browser-behavior",level:2},{value:"Static vs Dynamic Pages",id:"static-vs-dynamic-pages",level:2},{value:"Common Tools and Libraries",id:"common-tools-and-libraries",level:2},{value:"Example",id:"example",level:2}];function o(e){const r={code:"code",h1:"h1",h2:"h2",header:"header",hr:"hr",img:"img",li:"li",ol:"ol",p:"p",strong:"strong",table:"table",tbody:"tbody",td:"td",th:"th",thead:"thead",tr:"tr",ul:"ul",...(0,t.R)(),...e.components};return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(r.header,{children:(0,i.jsx)(r.h1,{id:"web-crawler-intro",children:"Web Crawler Intro"})}),"\n",(0,i.jsx)(r.h2,{id:"what-is-a-web-crawler",children:"What is a Web Crawler?"}),"\n",(0,i.jsxs)(r.p,{children:["A ",(0,i.jsx)(r.strong,{children:"Web Crawler"})," (also known as a Web Scraper or Spider) is a script or program that automatically navigates websites and extracts or uploads data according to predefined rules. It simulates browser behavior to perform actions like clicking links, downloading articles, or extracting specific information from web pages."]}),"\n",(0,i.jsx)(r.p,{children:"Crawlers help automate repetitive web tasks and are widely used in data engineering and analysis."}),"\n",(0,i.jsx)(r.p,{children:(0,i.jsx)(r.img,{alt:"Crawler Behavior",src:s(73554).A+"",width:"1734",height:"570"})}),"\n",(0,i.jsx)(r.hr,{}),"\n",(0,i.jsx)(r.h2,{id:"why-use-a-web-crawler",children:"Why Use a Web Crawler?"}),"\n",(0,i.jsx)(r.p,{children:"The internet contains vast amounts of data that's hard to collect manually. Web crawlers are essential for:"}),"\n",(0,i.jsxs)(r.ul,{children:["\n",(0,i.jsxs)(r.li,{children:[(0,i.jsx)(r.strong,{children:"Search engine indexing"})," (e.g., Google)"]}),"\n",(0,i.jsx)(r.li,{children:"Collecting article lists from news websites"}),"\n",(0,i.jsx)(r.li,{children:"Gathering job listings from HR platforms"}),"\n",(0,i.jsx)(r.li,{children:"Price comparison across e-commerce sites"}),"\n",(0,i.jsx)(r.li,{children:"Investment data analysis"}),"\n",(0,i.jsx)(r.li,{children:"Academic research and data collection"}),"\n"]}),"\n",(0,i.jsxs)(r.p,{children:["They are especially useful when extracting ",(0,i.jsx)(r.strong,{children:"large volumes of similarly structured web pages"}),"."]}),"\n",(0,i.jsx)(r.hr,{}),"\n",(0,i.jsx)(r.h2,{id:"how-it-works-simulating-browser-behavior",children:"How It Works: Simulating Browser Behavior"}),"\n",(0,i.jsxs)(r.p,{children:["When you visit a website using a browser, it sends an ",(0,i.jsx)(r.strong,{children:"HTTP request"})," to a remote server, which returns the ",(0,i.jsx)(r.strong,{children:"HTML source code"}),". A crawler mimics this process:"]}),"\n",(0,i.jsxs)(r.ol,{children:["\n",(0,i.jsx)(r.li,{children:"Sends an HTTP request (e.g., GET)"}),"\n",(0,i.jsx)(r.li,{children:"Receives a response (HTML/JSON/XML)"}),"\n",(0,i.jsx)(r.li,{children:"Parses the data structure"}),"\n",(0,i.jsx)(r.li,{children:"Extracts, cleans, and stores the necessary information"}),"\n"]}),"\n",(0,i.jsx)(r.hr,{}),"\n",(0,i.jsx)(r.h2,{id:"static-vs-dynamic-pages",children:"Static vs Dynamic Pages"}),"\n",(0,i.jsxs)(r.table,{children:[(0,i.jsx)(r.thead,{children:(0,i.jsxs)(r.tr,{children:[(0,i.jsx)(r.th,{children:"Type"}),(0,i.jsx)(r.th,{children:"Characteristics"}),(0,i.jsx)(r.th,{children:"Handling Method"})]})}),(0,i.jsxs)(r.tbody,{children:[(0,i.jsxs)(r.tr,{children:[(0,i.jsx)(r.td,{children:(0,i.jsx)(r.strong,{children:"Static Page"})}),(0,i.jsx)(r.td,{children:"Data is directly embedded in HTML source"}),(0,i.jsxs)(r.td,{children:["Use ",(0,i.jsx)(r.code,{children:"requests"})," + ",(0,i.jsx)(r.code,{children:"BeautifulSoup"})]})]}),(0,i.jsxs)(r.tr,{children:[(0,i.jsx)(r.td,{children:(0,i.jsx)(r.strong,{children:"Dynamic Page"})}),(0,i.jsx)(r.td,{children:"Data is generated by JavaScript on the page"}),(0,i.jsxs)(r.td,{children:["Use ",(0,i.jsx)(r.code,{children:"selenium"})," or ",(0,i.jsx)(r.code,{children:"Playwright"})," to simulate browser"]})]})]})]}),"\n",(0,i.jsx)(r.hr,{}),"\n",(0,i.jsx)(r.h2,{id:"common-tools-and-libraries",children:"Common Tools and Libraries"}),"\n",(0,i.jsxs)(r.table,{children:[(0,i.jsx)(r.thead,{children:(0,i.jsxs)(r.tr,{children:[(0,i.jsx)(r.th,{children:"Tool / Library"}),(0,i.jsx)(r.th,{children:"Purpose"})]})}),(0,i.jsxs)(r.tbody,{children:[(0,i.jsxs)(r.tr,{children:[(0,i.jsx)(r.td,{children:(0,i.jsx)(r.code,{children:"requests"})}),(0,i.jsx)(r.td,{children:"Sends HTTP requests"})]}),(0,i.jsxs)(r.tr,{children:[(0,i.jsx)(r.td,{children:(0,i.jsx)(r.code,{children:"BeautifulSoup"})}),(0,i.jsx)(r.td,{children:"Parses HTML content"})]}),(0,i.jsxs)(r.tr,{children:[(0,i.jsxs)(r.td,{children:[(0,i.jsx)(r.code,{children:"lxml"})," / ",(0,i.jsx)(r.code,{children:"html.parser"})]}),(0,i.jsx)(r.td,{children:"Parsing engines for HTML"})]}),(0,i.jsxs)(r.tr,{children:[(0,i.jsx)(r.td,{children:(0,i.jsx)(r.code,{children:"selenium"})}),(0,i.jsx)(r.td,{children:"Simulates browser interaction for dynamic pages"})]}),(0,i.jsxs)(r.tr,{children:[(0,i.jsx)(r.td,{children:(0,i.jsx)(r.code,{children:"pandas"})}),(0,i.jsx)(r.td,{children:"Organizes and stores structured data"})]}),(0,i.jsxs)(r.tr,{children:[(0,i.jsxs)(r.td,{children:[(0,i.jsx)(r.code,{children:"re"})," (Regex)"]}),(0,i.jsx)(r.td,{children:"Text processing and pattern extraction"})]})]})]}),"\n",(0,i.jsx)(r.hr,{}),"\n",(0,i.jsx)(r.h2,{id:"example",children:"Example"}),"\n",(0,i.jsx)(r.p,{children:(0,i.jsx)(r.img,{alt:"Crawler example",src:s(79156).A+"",width:"2478",height:"1100"})})]})}function h(e={}){const{wrapper:r}={...(0,t.R)(),...e.components};return r?(0,i.jsx)(r,{...e,children:(0,i.jsx)(o,{...e})}):o(e)}},73554:(e,r,s)=>{s.d(r,{A:()=>n});const n=s.p+"assets/images/crawler_behavior-5f1302d8609b0afa33ef06b2a749ad02.png"},79156:(e,r,s)=>{s.d(r,{A:()=>n});const n=s.p+"assets/images/crawler_example-6115d78056565ff1958618004a4a902c.png"},28453:(e,r,s)=>{s.d(r,{R:()=>a,x:()=>l});var n=s(96540);const i={},t=n.createContext(i);function a(e){const r=n.useContext(t);return n.useMemo((function(){return"function"==typeof e?e(r):{...r,...e}}),[r,e])}function l(e){let r;return r=e.disableParentContext?"function"==typeof e.components?e.components(i):e.components||i:a(e.components),n.createElement(t.Provider,{value:r},e.children)}}}]);