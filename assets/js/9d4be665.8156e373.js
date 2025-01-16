"use strict";(self.webpackChunkuuboyscy_engineering_logs=self.webpackChunkuuboyscy_engineering_logs||[]).push([[7200],{19157:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>r,contentTitle:()=>c,default:()=>l,frontMatter:()=>s,metadata:()=>i,toc:()=>d});const i=JSON.parse('{"id":"Git/Git Commands/Common_Git_Issues","title":"Common Git Issues","description":"Issue Reproduction and Solutions","source":"@site/docs/Git/Git Commands/02_Common_Git_Issues.md","sourceDirName":"Git/Git Commands","slug":"/Git/Git Commands/Common_Git_Issues","permalink":"/docs/Git/Git Commands/Common_Git_Issues","draft":false,"unlisted":false,"tags":[],"version":"current","sidebarPosition":2,"frontMatter":{},"sidebar":"tutorialSidebar","previous":{"title":"Git Commands","permalink":"/docs/category/git-commands"},"next":{"title":"GitHub Action","permalink":"/docs/category/github-action"}}');var a=t(74848),o=t(28453);const s={},c="Common Git Issues",r={},d=[{value:"Issue Reproduction and Solutions",id:"issue-reproduction-and-solutions",level:2},{value:"Accidentally Deleted an Unmerged Branch",id:"accidentally-deleted-an-unmerged-branch",level:3},{value:"Committed Before Creating a New Branch",id:"committed-before-creating-a-new-branch",level:3},{value:"Alternative Solution:",id:"alternative-solution",level:4},{value:"Accidentally Ran <code>git reset HEAD~ --hard</code>",id:"accidentally-ran-git-reset-head---hard",level:3},{value:"Keep Only Specific Commits in a Branch",id:"keep-only-specific-commits-in-a-branch",level:3},{value:"Identify Author of Specific Lines of Code",id:"identify-author-of-specific-lines-of-code",level:3},{value:"Save Half-Completed Work Before Switching Tasks",id:"save-half-completed-work-before-switching-tasks",level:3},{value:"Undo a Merge",id:"undo-a-merge",level:3},{value:"Undo a Rebase",id:"undo-a-rebase",level:3},{value:"Fix Commit Message",id:"fix-commit-message",level:3}];function h(e){const n={code:"code",h1:"h1",h2:"h2",h3:"h3",h4:"h4",header:"header",hr:"hr",pre:"pre",...(0,o.R)(),...e.components};return(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)(n.header,{children:(0,a.jsx)(n.h1,{id:"common-git-issues",children:"Common Git Issues"})}),"\n",(0,a.jsx)(n.h2,{id:"issue-reproduction-and-solutions",children:"Issue Reproduction and Solutions"}),"\n",(0,a.jsx)(n.h3,{id:"accidentally-deleted-an-unmerged-branch",children:"Accidentally Deleted an Unmerged Branch"}),"\n",(0,a.jsx)(n.pre,{children:(0,a.jsx)(n.code,{className:"language-bash",children:'# Work on feature/something-new\ngit checkout -b feature/something-new\necho 123 >> something-new.py\ngit add .\ngit commit -m "Update: add something-new.py"\n\n# Switch to main and make changes\ngit checkout main\necho 123 >> README.md\ngit add .\ngit commit -m "Update: do something to README.md"\n\n# Delete the feature/something-new branch\ngit branch -D feature/something-new\n# >> Deleted branch feature/something-new (was bae6212).\n\n# Solution:\ngit checkout bae6212\ngit branch feature/something-new\ngit checkout feature/something-new\n'})}),"\n",(0,a.jsx)(n.hr,{}),"\n",(0,a.jsx)(n.h3,{id:"committed-before-creating-a-new-branch",children:"Committed Before Creating a New Branch"}),"\n",(0,a.jsx)(n.pre,{children:(0,a.jsx)(n.code,{className:"language-bash",children:'# Commit changes on main branch\ngit checkout main\necho 123 >> new-feature.py\ngit add .\ngit commit -m "fix new-feature.py"\n\n# Solution:\ngit reset HEAD~\ngit checkout -b bugfix/something-new\ngit add .\ngit commit -m "fix something-new"\n'})}),"\n",(0,a.jsx)(n.h4,{id:"alternative-solution",children:"Alternative Solution:"}),"\n",(0,a.jsx)(n.pre,{children:(0,a.jsx)(n.code,{className:"language-bash",children:"# Use cherry-pick after reset\ngit reset HEAD~ --hard\ngit checkout -b feature/specific-fix\ngit cherry-pick <commit-sha1>\n"})}),"\n",(0,a.jsx)(n.hr,{}),"\n",(0,a.jsxs)(n.h3,{id:"accidentally-ran-git-reset-head---hard",children:["Accidentally Ran ",(0,a.jsx)(n.code,{children:"git reset HEAD~ --hard"})]}),"\n",(0,a.jsx)(n.pre,{children:(0,a.jsx)(n.code,{className:"language-bash",children:"# Hard reset to the previous commit\ngit reset HEAD~ --hard\n\n# Solution:\ngit reset HEAD@{1} --hard\n"})}),"\n",(0,a.jsx)(n.hr,{}),"\n",(0,a.jsx)(n.h3,{id:"keep-only-specific-commits-in-a-branch",children:"Keep Only Specific Commits in a Branch"}),"\n",(0,a.jsx)(n.pre,{children:(0,a.jsx)(n.code,{className:"language-bash",children:'git checkout main\ngit checkout -b feature/test\necho 123 >> extra1.txt\ngit add extra1.txt\ngit commit -m "Add extra1.txt"\necho 123 >> extra2.txt\ngit add extra2.txt\ngit commit -m "Add extra2.txt"\necho 123 >> extra3.txt\ngit add extra3.txt\ngit commit -m "Add extra3.txt"\n\n# Solution:\ngit checkout main\ngit checkout -b feature/confirmed-test\ngit cherry-pick <commit-sha-for-extra2>\ngit branch -D feature/test\n'})}),"\n",(0,a.jsx)(n.hr,{}),"\n",(0,a.jsx)(n.h3,{id:"identify-author-of-specific-lines-of-code",children:"Identify Author of Specific Lines of Code"}),"\n",(0,a.jsx)(n.pre,{children:(0,a.jsx)(n.code,{className:"language-bash",children:"git blame file_name\n"})}),"\n",(0,a.jsx)(n.hr,{}),"\n",(0,a.jsx)(n.h3,{id:"save-half-completed-work-before-switching-tasks",children:"Save Half-Completed Work Before Switching Tasks"}),"\n",(0,a.jsx)(n.pre,{children:(0,a.jsx)(n.code,{className:"language-bash",children:'git checkout main\ngit checkout -b feature/function1\necho "print(123)" >> function1.py\ngit stash save -u "developing function1"\n\ngit checkout feature/function2\necho "print(456)" >> function2.py\ngit stash save -u "developing function2"\n\n# Retrieve stashed work\ngit checkout feature/function1\ngit stash pop 0\n'})}),"\n",(0,a.jsx)(n.hr,{}),"\n",(0,a.jsx)(n.h3,{id:"undo-a-merge",children:"Undo a Merge"}),"\n",(0,a.jsx)(n.pre,{children:(0,a.jsx)(n.code,{className:"language-bash",children:"git reset ORIG_HEAD --hard\n"})}),"\n",(0,a.jsx)(n.hr,{}),"\n",(0,a.jsx)(n.h3,{id:"undo-a-rebase",children:"Undo a Rebase"}),"\n",(0,a.jsx)(n.pre,{children:(0,a.jsx)(n.code,{className:"language-bash",children:"git reset ORIG_HEAD --hard\n"})}),"\n",(0,a.jsx)(n.hr,{}),"\n",(0,a.jsx)(n.h3,{id:"fix-commit-message",children:"Fix Commit Message"}),"\n",(0,a.jsx)(n.pre,{children:(0,a.jsx)(n.code,{className:"language-bash",children:'git checkout main\necho 123 >> README.md\ngit add .\ngit commit -m "test"\ngit commit --amend -m "Corrected commit message"\n'})})]})}function l(e={}){const{wrapper:n}={...(0,o.R)(),...e.components};return n?(0,a.jsx)(n,{...e,children:(0,a.jsx)(h,{...e})}):h(e)}},28453:(e,n,t)=>{t.d(n,{R:()=>s,x:()=>c});var i=t(96540);const a={},o=i.createContext(a);function s(e){const n=i.useContext(o);return i.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function c(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(a):e.components||a:s(e.components),i.createElement(o.Provider,{value:n},e.children)}}}]);