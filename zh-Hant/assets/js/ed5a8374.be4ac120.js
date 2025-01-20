"use strict";(self.webpackChunkuuboyscy_engineering_logs=self.webpackChunkuuboyscy_engineering_logs||[]).push([[4232],{51326:(e,n,s)=>{s.r(n),s.d(n,{assets:()=>o,contentTitle:()=>l,default:()=>x,frontMatter:()=>d,metadata:()=>r,toc:()=>t});const r=JSON.parse('{"id":"Docker/docker-tutorial/Common Commands 6354621f62cf44d98261afd5e92bca64","title":"Common Commands","description":"Basic Commands:","source":"@site/docs/Docker/docker-tutorial/Common Commands 6354621f62cf44d98261afd5e92bca64.md","sourceDirName":"Docker/docker-tutorial","slug":"/Docker/docker-tutorial/Common Commands 6354621f62cf44d98261afd5e92bca64","permalink":"/zh-Hant/docs/Docker/docker-tutorial/Common Commands 6354621f62cf44d98261afd5e92bca64","draft":false,"unlisted":false,"tags":[],"version":"current","sidebarPosition":6,"frontMatter":{"sidebar_position":6},"sidebar":"tutorialSidebar","previous":{"title":"Linux Introduction","permalink":"/zh-Hant/docs/Docker/docker-tutorial/Linux Introduction ca7bac636b8a47b4a9d907ca697290fd"},"next":{"title":"Edit Text File (vim)","permalink":"/zh-Hant/docs/Docker/docker-tutorial/Edit Text File using vim cb7cfd612fc546329f12eb0205f074c2"}}');var i=s(74848),c=s(28453);const d={sidebar_position:6},l="Common Commands",o={},t=[{value:"<strong>Basic Commands:</strong>",id:"basic-commands",level:2},{value:"<strong>Advanced Commands:</strong>",id:"advanced-commands",level:2}];function h(e){const n={code:"code",h1:"h1",h2:"h2",header:"header",li:"li",strong:"strong",ul:"ul",...(0,c.R)(),...e.components};return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(n.header,{children:(0,i.jsx)(n.h1,{id:"common-commands",children:"Common Commands"})}),"\n",(0,i.jsx)(n.h1,{id:"command-introduction",children:(0,i.jsx)(n.strong,{children:"Command Introduction"})}),"\n",(0,i.jsx)(n.h2,{id:"basic-commands",children:(0,i.jsx)(n.strong,{children:"Basic Commands:"})}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.strong,{children:(0,i.jsx)(n.code,{children:"pwd"})}),": Display the current working directory."]}),"\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.strong,{children:(0,i.jsx)(n.code,{children:"touch"})}),": Create a file.","\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsxs)(n.li,{children:["Example: ",(0,i.jsx)(n.strong,{children:(0,i.jsx)(n.code,{children:"touch file.txt"})})," creates a file named ",(0,i.jsx)(n.strong,{children:(0,i.jsx)(n.code,{children:"file.txt"})})," in the current directory."]}),"\n"]}),"\n"]}),"\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.strong,{children:(0,i.jsx)(n.code,{children:"mkdir"})}),", ",(0,i.jsx)(n.strong,{children:(0,i.jsx)(n.code,{children:"rmdir"})}),": Create, remove directories.","\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.strong,{children:(0,i.jsx)(n.code,{children:"mkdir newdir"})}),": Creates a new directory named ",(0,i.jsx)(n.strong,{children:(0,i.jsx)(n.code,{children:"newdir"})}),"."]}),"\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.strong,{children:(0,i.jsx)(n.code,{children:"rmdir emptydir"})}),": Deletes an empty directory named ",(0,i.jsx)(n.strong,{children:(0,i.jsx)(n.code,{children:"emptydir"})}),"."]}),"\n"]}),"\n"]}),"\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.strong,{children:(0,i.jsx)(n.code,{children:"ls"})}),": List the contents of the current directory.","\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsxs)(n.li,{children:["Example: ",(0,i.jsx)(n.strong,{children:(0,i.jsx)(n.code,{children:"ls -l"})})," lists all files and directories (excluding hidden files) in the current directory in long format, including permissions, owner, group, modification time, etc."]}),"\n",(0,i.jsxs)(n.li,{children:["Example: ",(0,i.jsx)(n.strong,{children:(0,i.jsx)(n.code,{children:"ls -a"})})," lists all files, including hidden files (files starting with ",(0,i.jsx)(n.strong,{children:(0,i.jsx)(n.code,{children:"."})}),")."]}),"\n",(0,i.jsx)(n.li,{children:"ls -lhrtai"}),"\n",(0,i.jsx)(n.li,{children:"ls -l -h -r -t -a"}),"\n"]}),"\n"]}),"\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.strong,{children:(0,i.jsx)(n.code,{children:"cd"})}),": Change directory, enter a specified directory.","\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsxs)(n.li,{children:["Example: ",(0,i.jsx)(n.strong,{children:(0,i.jsx)(n.code,{children:"cd ./newdir"})})," changes from the current directory to ",(0,i.jsx)(n.strong,{children:(0,i.jsx)(n.code,{children:"newdir"})})," directory."]}),"\n",(0,i.jsxs)(n.li,{children:["Example: ",(0,i.jsx)(n.strong,{children:(0,i.jsx)(n.code,{children:"cd .."})})," goes back to the parent directory."]}),"\n"]}),"\n"]}),"\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.strong,{children:(0,i.jsx)(n.code,{children:"cat"})}),", ",(0,i.jsx)(n.strong,{children:(0,i.jsx)(n.code,{children:"more"})}),", ",(0,i.jsxs)(n.strong,{children:[(0,i.jsx)(n.code,{children:"less"}),", ",(0,i.jsx)(n.code,{children:"head"})]}),", ",(0,i.jsx)(n.strong,{children:(0,i.jsx)(n.code,{children:"tail"})}),": View file contents.","\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsxs)(n.li,{children:["Example: ",(0,i.jsx)(n.strong,{children:(0,i.jsx)(n.code,{children:"cat file.txt"})})," displays the entire content of ",(0,i.jsx)(n.strong,{children:(0,i.jsx)(n.code,{children:"file.txt"})}),"."]}),"\n",(0,i.jsxs)(n.li,{children:["Example: ",(0,i.jsx)(n.strong,{children:(0,i.jsx)(n.code,{children:"head -n 5 file.txt"})})," displays the first 5 lines of ",(0,i.jsx)(n.strong,{children:(0,i.jsx)(n.code,{children:"file.txt"})}),"."]}),"\n",(0,i.jsxs)(n.li,{children:["Example: ",(0,i.jsx)(n.strong,{children:(0,i.jsx)(n.code,{children:"less file.txt"})})," displays the file ",(0,i.jsx)(n.strong,{children:(0,i.jsx)(n.code,{children:"file.txt"})})," in a paginated manner, allowing for scrolling up and down."]}),"\n",(0,i.jsxs)(n.li,{children:["Example: ",(0,i.jsx)(n.strong,{children:(0,i.jsx)(n.code,{children:"tail -n 3 file.txt"})})," displays the last 3 lines of ",(0,i.jsx)(n.strong,{children:(0,i.jsx)(n.code,{children:"file.txt"})}),"."]}),"\n"]}),"\n"]}),"\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.strong,{children:(0,i.jsx)(n.code,{children:"cp"})}),", ",(0,i.jsx)(n.strong,{children:(0,i.jsx)(n.code,{children:"mv"})}),", ",(0,i.jsx)(n.strong,{children:(0,i.jsx)(n.code,{children:"rm"})}),": Copy, move, delete files.","\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsxs)(n.li,{children:["Example: ",(0,i.jsx)(n.strong,{children:(0,i.jsx)(n.code,{children:"cp source.txt destination.txt"})})," copies ",(0,i.jsx)(n.strong,{children:(0,i.jsx)(n.code,{children:"source.txt"})})," to ",(0,i.jsx)(n.strong,{children:(0,i.jsx)(n.code,{children:"destination.txt"})}),"."]}),"\n",(0,i.jsxs)(n.li,{children:["Example: ",(0,i.jsx)(n.strong,{children:(0,i.jsx)(n.code,{children:"mv oldname.txt newname.txt"})})," renames ",(0,i.jsx)(n.strong,{children:(0,i.jsx)(n.code,{children:"oldname.txt"})})," to ",(0,i.jsx)(n.strong,{children:(0,i.jsx)(n.code,{children:"newname.txt"})}),"."]}),"\n",(0,i.jsxs)(n.li,{children:["Example: ",(0,i.jsx)(n.strong,{children:(0,i.jsx)(n.code,{children:"rm file.txt"})})," deletes the file ",(0,i.jsx)(n.strong,{children:(0,i.jsx)(n.code,{children:"file.txt"})}),"."]}),"\n"]}),"\n"]}),"\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.strong,{children:(0,i.jsx)(n.code,{children:"chmod"})}),", ",(0,i.jsx)(n.strong,{children:(0,i.jsx)(n.code,{children:"chown"})}),": Modify file permissions.","\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.strong,{children:(0,i.jsx)(n.code,{children:"chmod 755 script.sh"})})," sets the permissions of ",(0,i.jsx)(n.strong,{children:(0,i.jsx)(n.code,{children:"script.sh"})})," to read, write, and execute for the owner, and read and execute for the group and others."]}),"\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.strong,{children:(0,i.jsx)(n.code,{children:"chown user:group file.txt"})})," changes the owner of ",(0,i.jsx)(n.strong,{children:(0,i.jsx)(n.code,{children:"file.txt"})})," to ",(0,i.jsx)(n.strong,{children:(0,i.jsx)(n.code,{children:"user"})})," and the group to ",(0,i.jsx)(n.strong,{children:(0,i.jsx)(n.code,{children:"group"})}),"."]}),"\n",(0,i.jsxs)(n.li,{children:["chown allenshi",":allenshi"," test.txt"]}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,i.jsx)(n.h2,{id:"advanced-commands",children:(0,i.jsx)(n.strong,{children:"Advanced Commands:"})}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.strong,{children:(0,i.jsx)(n.code,{children:"grep"})}),": Text search.","\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.strong,{children:(0,i.jsx)(n.code,{children:'grep "error" logfile.log'})}),' searches for lines containing "error" in ',(0,i.jsx)(n.strong,{children:(0,i.jsx)(n.code,{children:"logfile.log"})}),"."]}),"\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.code,{children:"ls -lhrt | grep -i error"})," ignore upper and lower case"]}),"\n"]}),"\n"]}),"\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.strong,{children:(0,i.jsx)(n.code,{children:"tar"})}),": File compression.","\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsx)(n.li,{children:"tar -zcvf usr.tgz usr/"}),"\n",(0,i.jsx)(n.li,{children:"tar -zxvf usr.tgz"}),"\n",(0,i.jsx)(n.li,{children:".tar.zg"}),"\n"]}),"\n"]}),"\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.code,{children:"apt-get install"})," : Install package on Debian, Ubuntu","\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsx)(n.li,{children:"apt-get install curl: Install curl"}),"\n"]}),"\n"]}),"\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.strong,{children:(0,i.jsx)(n.code,{children:"wget"})}),", ",(0,i.jsx)(n.strong,{children:(0,i.jsx)(n.code,{children:"curl"})}),": Download files or make requests to web servers."]}),"\n"]})]})}function x(e={}){const{wrapper:n}={...(0,c.R)(),...e.components};return n?(0,i.jsx)(n,{...e,children:(0,i.jsx)(h,{...e})}):h(e)}},28453:(e,n,s)=>{s.d(n,{R:()=>d,x:()=>l});var r=s(96540);const i={},c=r.createContext(i);function d(e){const n=r.useContext(c);return r.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function l(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(i):e.components||i:d(e.components),r.createElement(c.Provider,{value:n},e.children)}}}]);