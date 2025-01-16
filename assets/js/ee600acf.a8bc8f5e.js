"use strict";(self.webpackChunkuuboyscy_engineering_logs=self.webpackChunkuuboyscy_engineering_logs||[]).push([[2961],{85547:(n,e,s)=>{s.r(e),s.d(e,{assets:()=>d,contentTitle:()=>r,default:()=>h,frontMatter:()=>a,metadata:()=>o,toc:()=>c});const o=JSON.parse('{"id":"Python/Basic/json","title":"json","description":"- json.load(): Reads JSON data from a file object and converts it into a Python object.","source":"@site/docs/Python/Basic/json.md","sourceDirName":"Python/Basic","slug":"/Python/Basic/json","permalink":"/docs/Python/Basic/json","draft":false,"unlisted":false,"tags":[],"version":"current","sidebarPosition":3,"frontMatter":{"sidebar_position":3,"title":"json"},"sidebar":"tutorialSidebar","previous":{"title":"csv","permalink":"/docs/Python/Basic/csv"},"next":{"title":"Pandas Tutorial","permalink":"/docs/category/pandas-tutorial"}}');var t=s(74848),i=s(28453);const a={sidebar_position:3,title:"json"},r="Usage",d={},c=[{value:"<strong>json.loads()</strong>",id:"jsonloads",level:3},{value:"<strong>json.dump()</strong>",id:"jsondump",level:3},{value:"<strong>json.dumps()</strong>",id:"jsondumps",level:3}];function l(n){const e={code:"code",h1:"h1",h3:"h3",header:"header",li:"li",p:"p",pre:"pre",strong:"strong",ul:"ul",...(0,i.R)(),...n.components};return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(e.header,{children:(0,t.jsx)(e.h1,{id:"usage",children:"Usage"})}),"\n",(0,t.jsxs)(e.ul,{children:["\n",(0,t.jsxs)(e.li,{children:[(0,t.jsx)(e.strong,{children:(0,t.jsx)(e.code,{children:"json.load()"})}),": Reads JSON data from a file object and converts it into a Python object."]}),"\n",(0,t.jsxs)(e.li,{children:[(0,t.jsx)(e.strong,{children:(0,t.jsx)(e.code,{children:"json.loads()"})}),": Parses a JSON string, converting it into a Python object."]}),"\n",(0,t.jsxs)(e.li,{children:[(0,t.jsx)(e.strong,{children:(0,t.jsx)(e.code,{children:"json.dump()"})}),": Takes a Python object and converts it to a JSON string, writing it to a file."]}),"\n",(0,t.jsxs)(e.li,{children:[(0,t.jsx)(e.strong,{children:(0,t.jsx)(e.code,{children:"json.dumps()"})}),": Takes a Python object and converts it to a JSON formatted string."]}),"\n"]}),"\n",(0,t.jsx)(e.h1,{id:"example",children:"Example"}),"\n",(0,t.jsx)(e.p,{children:(0,t.jsx)(e.strong,{children:"json.load()"})}),"\n",(0,t.jsx)(e.p,{children:"This function is used to read JSON data from a file and convert it into a Python dictionary / list."}),"\n",(0,t.jsx)(e.pre,{children:(0,t.jsx)(e.code,{className:"language-python",children:"import json\n\n# Assume we have a file named example.json containing {\"name\": \"John\", \"age\": 30}\nwith open('example.json', 'r') as file:\n    data = json.load(file)\n\nprint(data)  # Output: {'name': 'John', 'age': 30}\n\n"})}),"\n",(0,t.jsx)(e.h3,{id:"jsonloads",children:(0,t.jsx)(e.strong,{children:"json.loads()"})}),"\n",(0,t.jsx)(e.p,{children:"This function parses a JSON string."}),"\n",(0,t.jsx)(e.pre,{children:(0,t.jsx)(e.code,{className:"language-python",children:"import json\n\njson_string = '{\"name\": \"John\", \"age\": 30}'\ndata = json.loads(json_string)\n\nprint(data)  # Output: {'name': 'John', 'age': 30}\n\n"})}),"\n",(0,t.jsx)(e.h3,{id:"jsondump",children:(0,t.jsx)(e.strong,{children:"json.dump()"})}),"\n",(0,t.jsx)(e.p,{children:"This function writes Python objects to a file as JSON formatted data."}),"\n",(0,t.jsx)(e.pre,{children:(0,t.jsx)(e.code,{className:"language-python",children:"import json\n\ndata = {'name': 'John', 'age': 30}\n\nwith open('output.json', 'w') as file:\n    json.dump(data, file)\n\n"})}),"\n",(0,t.jsxs)(e.p,{children:["This code will create (or overwrite) ",(0,t.jsx)(e.strong,{children:(0,t.jsx)(e.code,{children:"output.json"})})," with the following content:"]}),"\n",(0,t.jsx)(e.pre,{children:(0,t.jsx)(e.code,{className:"language-json",children:'{"name": "John", "age": 30}\n\n'})}),"\n",(0,t.jsx)(e.h3,{id:"jsondumps",children:(0,t.jsx)(e.strong,{children:"json.dumps()"})}),"\n",(0,t.jsx)(e.p,{children:"This function converts Python objects into JSON strings."}),"\n",(0,t.jsx)(e.pre,{children:(0,t.jsx)(e.code,{className:"language-python",children:"import json\n\ndata = {'name': 'John', 'age': 30}\njson_string = json.dumps(data)\n\nprint(json_string)  # Output: '{\"name\": \"John\", \"age\": 30}'\n\n"})})]})}function h(n={}){const{wrapper:e}={...(0,i.R)(),...n.components};return e?(0,t.jsx)(e,{...n,children:(0,t.jsx)(l,{...n})}):l(n)}},28453:(n,e,s)=>{s.d(e,{R:()=>a,x:()=>r});var o=s(96540);const t={},i=o.createContext(t);function a(n){const e=o.useContext(i);return o.useMemo((function(){return"function"==typeof n?n(e):{...e,...n}}),[e,n])}function r(n){let e;return e=n.disableParentContext?"function"==typeof n.components?n.components(t):n.components||t:a(n.components),o.createElement(i.Provider,{value:e},n.children)}}}]);