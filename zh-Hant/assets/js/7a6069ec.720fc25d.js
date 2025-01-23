"use strict";(self.webpackChunkuuboyscy_engineering_logs=self.webpackChunkuuboyscy_engineering_logs||[]).push([[1182],{99908:(e,n,r)=>{r.r(n),r.d(n,{assets:()=>a,contentTitle:()=>o,default:()=>h,frontMatter:()=>l,metadata:()=>t,toc:()=>d});const t=JSON.parse('{"id":"Python/Project Management/Virtual Environment/Poetry","title":"Poetry","description":"What is Poetry?","source":"@site/docs/Python/Project Management/Virtual Environment/Poetry.md","sourceDirName":"Python/Project Management/Virtual Environment","slug":"/Python/Project Management/Virtual Environment/Poetry","permalink":"/zh-Hant/docs/Python/Project Management/Virtual Environment/Poetry","draft":false,"unlisted":false,"tags":[],"version":"current","frontMatter":{},"sidebar":"tutorialSidebar","previous":{"title":"Pyenv","permalink":"/zh-Hant/docs/Python/Project Management/Python Version/pyenv"},"next":{"title":"Pyenv","permalink":"/zh-Hant/docs/Python/Project Management/Virtual Environment/pyenv"}}');var s=r(74848),i=r(28453);const l={},o="Poetry",a={},d=[{value:"<strong>What is Poetry?</strong>",id:"what-is-poetry",level:2},{value:"<strong>Why Use Poetry?</strong>",id:"why-use-poetry",level:2},{value:"<strong>Installing Poetry</strong>",id:"installing-poetry",level:2},{value:"<strong>1. Install Poetry</strong>",id:"1-install-poetry",level:3},{value:"<strong>Setting Up a New Project</strong>",id:"setting-up-a-new-project",level:2},{value:"<strong>1. Create a New Project</strong>",id:"1-create-a-new-project",level:3},{value:"<strong>2. Understand <code>pyproject.toml</code></strong>",id:"2-understand-pyprojecttoml",level:3},{value:"<strong>Adding Dependencies</strong>",id:"adding-dependencies",level:2},{value:"<strong>1. Add a Dependency</strong>",id:"1-add-a-dependency",level:3},{value:"<strong>2. Add Development Dependencies</strong>",id:"2-add-development-dependencies",level:3},{value:"<strong>Managing Virtual Environments</strong>",id:"managing-virtual-environments",level:2},{value:"<strong>1. Check the Virtual Environment</strong>",id:"1-check-the-virtual-environment",level:3},{value:"<strong>2. Activate the Virtual Environment</strong>",id:"2-activate-the-virtual-environment",level:3},{value:"<strong>Running Scripts</strong>",id:"running-scripts",level:2},{value:"<strong>Building and Publishing a Package</strong>",id:"building-and-publishing-a-package",level:2},{value:"<strong>1. Build the Package</strong>",id:"1-build-the-package",level:3},{value:"<strong>2. Publish to PyPI</strong>",id:"2-publish-to-pypi",level:3},{value:"<strong>Bonus Tips</strong>",id:"bonus-tips",level:2},{value:"<strong>1. Lock File</strong>",id:"1-lock-file",level:3},{value:"<strong>2. Upgrade Dependencies</strong>",id:"2-upgrade-dependencies",level:3},{value:"<strong>Conclusion</strong>",id:"conclusion",level:2},{value:"<strong>Reference</strong>",id:"reference",level:3}];function c(e){const n={a:"a",code:"code",h1:"h1",h2:"h2",h3:"h3",header:"header",hr:"hr",li:"li",p:"p",pre:"pre",strong:"strong",ul:"ul",...(0,i.R)(),...e.components};return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(n.header,{children:(0,s.jsx)(n.h1,{id:"poetry",children:"Poetry"})}),"\n",(0,s.jsx)(n.h2,{id:"what-is-poetry",children:(0,s.jsx)(n.strong,{children:"What is Poetry?"})}),"\n",(0,s.jsxs)(n.p,{children:[(0,s.jsx)(n.a,{href:"https://python-poetry.org/",children:"Poetry"})," is a modern Python package and dependency management tool that streamlines creating, building, and sharing Python projects. It helps:"]}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsx)(n.li,{children:"Manage dependencies."}),"\n",(0,s.jsx)(n.li,{children:"Handle virtual environments."}),"\n",(0,s.jsx)(n.li,{children:"Build and publish Python packages."}),"\n"]}),"\n",(0,s.jsxs)(n.p,{children:["Unlike traditional tools like ",(0,s.jsx)(n.code,{children:"pip"})," and ",(0,s.jsx)(n.code,{children:"virtualenv"}),", Poetry integrates dependency resolution and project management in a single tool."]}),"\n",(0,s.jsx)(n.hr,{}),"\n",(0,s.jsx)(n.h2,{id:"why-use-poetry",children:(0,s.jsx)(n.strong,{children:"Why Use Poetry?"})}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsxs)(n.li,{children:[(0,s.jsx)(n.strong,{children:"Dependency Resolution"}),": Automatically resolves dependencies to ensure package compatibility."]}),"\n",(0,s.jsxs)(n.li,{children:[(0,s.jsx)(n.strong,{children:"Simplified Configuration"}),": Uses a ",(0,s.jsx)(n.code,{children:"pyproject.toml"})," file for centralized configuration."]}),"\n",(0,s.jsxs)(n.li,{children:[(0,s.jsx)(n.strong,{children:"Built-in Virtual Environment Management"}),": Creates and manages virtual environments automatically."]}),"\n",(0,s.jsxs)(n.li,{children:[(0,s.jsx)(n.strong,{children:"Cross-Platform Support"}),": Works seamlessly across different operating systems."]}),"\n"]}),"\n",(0,s.jsx)(n.hr,{}),"\n",(0,s.jsx)(n.h2,{id:"installing-poetry",children:(0,s.jsx)(n.strong,{children:"Installing Poetry"})}),"\n",(0,s.jsx)(n.p,{children:"To get started, install Poetry on your system."}),"\n",(0,s.jsx)(n.h3,{id:"1-install-poetry",children:(0,s.jsx)(n.strong,{children:"1. Install Poetry"})}),"\n",(0,s.jsx)(n.p,{children:"Run the following command to install Poetry:"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-bash",children:"curl -sSL <https://install.python-poetry.org> | python3 -\n\n"})}),"\n",(0,s.jsx)(n.p,{children:"Alternatively, on macOS with Homebrew:"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-bash",children:"brew install poetry\n\n"})}),"\n",(0,s.jsx)(n.p,{children:"Verify the installation:"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-bash",children:"poetry --version\n\n"})}),"\n",(0,s.jsx)(n.hr,{}),"\n",(0,s.jsx)(n.h2,{id:"setting-up-a-new-project",children:(0,s.jsx)(n.strong,{children:"Setting Up a New Project"})}),"\n",(0,s.jsx)(n.p,{children:"Poetry simplifies creating and managing Python projects."}),"\n",(0,s.jsx)(n.h3,{id:"1-create-a-new-project",children:(0,s.jsx)(n.strong,{children:"1. Create a New Project"})}),"\n",(0,s.jsx)(n.p,{children:"Run:"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-bash",children:"poetry new my_project\n\n"})}),"\n",(0,s.jsx)(n.p,{children:"This creates a directory structure like:"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{children:"my_project/\n\u251c\u2500\u2500 my_project/\n\u2502   \u2514\u2500\u2500 __init__.py\n\u251c\u2500\u2500 tests/\n\u2502   \u2514\u2500\u2500 __init__.py\n\u251c\u2500\u2500 pyproject.toml\n\u2514\u2500\u2500 README.rst\n\n"})}),"\n",(0,s.jsx)(n.h3,{id:"2-understand-pyprojecttoml",children:(0,s.jsxs)(n.strong,{children:["2. Understand ",(0,s.jsx)(n.code,{children:"pyproject.toml"})]})}),"\n",(0,s.jsxs)(n.p,{children:["The ",(0,s.jsx)(n.code,{children:"pyproject.toml"})," file is the heart of a Poetry-managed project. It contains:"]}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsxs)(n.li,{children:[(0,s.jsx)(n.strong,{children:"Project Metadata"}),": Name, version, description, authors, etc."]}),"\n",(0,s.jsxs)(n.li,{children:[(0,s.jsx)(n.strong,{children:"Dependencies"}),": List of required packages."]}),"\n",(0,s.jsxs)(n.li,{children:[(0,s.jsx)(n.strong,{children:"Dev Dependencies"}),": Packages needed only for development."]}),"\n"]}),"\n",(0,s.jsx)(n.hr,{}),"\n",(0,s.jsx)(n.h2,{id:"adding-dependencies",children:(0,s.jsx)(n.strong,{children:"Adding Dependencies"})}),"\n",(0,s.jsx)(n.p,{children:"Poetry simplifies managing dependencies for your project."}),"\n",(0,s.jsx)(n.h3,{id:"1-add-a-dependency",children:(0,s.jsx)(n.strong,{children:"1. Add a Dependency"})}),"\n",(0,s.jsx)(n.p,{children:"To add a dependency, use:"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-bash",children:"poetry add requests\n\n"})}),"\n",(0,s.jsxs)(n.p,{children:["Poetry automatically resolves compatible versions and updates the ",(0,s.jsx)(n.code,{children:"pyproject.toml"})," file."]}),"\n",(0,s.jsx)(n.h3,{id:"2-add-development-dependencies",children:(0,s.jsx)(n.strong,{children:"2. Add Development Dependencies"})}),"\n",(0,s.jsx)(n.p,{children:"For development-specific dependencies, add them with:"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-bash",children:"poetry add pytest --group dev\n\n"})}),"\n",(0,s.jsx)(n.hr,{}),"\n",(0,s.jsx)(n.h2,{id:"managing-virtual-environments",children:(0,s.jsx)(n.strong,{children:"Managing Virtual Environments"})}),"\n",(0,s.jsx)(n.p,{children:"Poetry creates a virtual environment for your project automatically."}),"\n",(0,s.jsx)(n.h3,{id:"1-check-the-virtual-environment",children:(0,s.jsx)(n.strong,{children:"1. Check the Virtual Environment"})}),"\n",(0,s.jsx)(n.p,{children:"To check the virtual environment location:"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-bash",children:"poetry env info\n\n"})}),"\n",(0,s.jsx)(n.h3,{id:"2-activate-the-virtual-environment",children:(0,s.jsx)(n.strong,{children:"2. Activate the Virtual Environment"})}),"\n",(0,s.jsx)(n.p,{children:"Activate the virtual environment using:"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-bash",children:"poetry shell\n\n"})}),"\n",(0,s.jsx)(n.p,{children:"Exit the virtual environment with:"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-bash",children:"exit\n\n"})}),"\n",(0,s.jsx)(n.hr,{}),"\n",(0,s.jsx)(n.h2,{id:"running-scripts",children:(0,s.jsx)(n.strong,{children:"Running Scripts"})}),"\n",(0,s.jsx)(n.p,{children:"Poetry simplifies running scripts and commands within the virtual environment."}),"\n",(0,s.jsx)(n.p,{children:"For example, to run a Python script:"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-bash",children:"poetry run python script.py\n\n"})}),"\n",(0,s.jsx)(n.hr,{}),"\n",(0,s.jsx)(n.h2,{id:"building-and-publishing-a-package",children:(0,s.jsx)(n.strong,{children:"Building and Publishing a Package"})}),"\n",(0,s.jsx)(n.p,{children:"Poetry makes it easy to share your project."}),"\n",(0,s.jsx)(n.h3,{id:"1-build-the-package",children:(0,s.jsx)(n.strong,{children:"1. Build the Package"})}),"\n",(0,s.jsx)(n.p,{children:"Run:"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-bash",children:"poetry build\n\n"})}),"\n",(0,s.jsxs)(n.p,{children:["This generates distribution files in the ",(0,s.jsx)(n.code,{children:"dist/"})," directory."]}),"\n",(0,s.jsx)(n.h3,{id:"2-publish-to-pypi",children:(0,s.jsx)(n.strong,{children:"2. Publish to PyPI"})}),"\n",(0,s.jsxs)(n.p,{children:["To publish your package to ",(0,s.jsx)(n.a,{href:"https://pypi.org/",children:"PyPI"}),":"]}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-bash",children:"poetry publish --username <your-username> --password <your-password>\n\n"})}),"\n",(0,s.jsx)(n.hr,{}),"\n",(0,s.jsx)(n.h2,{id:"bonus-tips",children:(0,s.jsx)(n.strong,{children:"Bonus Tips"})}),"\n",(0,s.jsx)(n.h3,{id:"1-lock-file",children:(0,s.jsx)(n.strong,{children:"1. Lock File"})}),"\n",(0,s.jsxs)(n.p,{children:["Poetry creates a ",(0,s.jsx)(n.code,{children:"poetry.lock"})," file to lock dependency versions, ensuring reproducible builds."]}),"\n",(0,s.jsx)(n.h3,{id:"2-upgrade-dependencies",children:(0,s.jsx)(n.strong,{children:"2. Upgrade Dependencies"})}),"\n",(0,s.jsx)(n.p,{children:"To upgrade dependencies, use:"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-bash",children:"poetry update\n\n"})}),"\n",(0,s.jsx)(n.hr,{}),"\n",(0,s.jsx)(n.h2,{id:"conclusion",children:(0,s.jsx)(n.strong,{children:"Conclusion"})}),"\n",(0,s.jsx)(n.p,{children:"Poetry is a powerful tool that simplifies Python project and dependency management, making it especially beginner-friendly. By integrating dependency resolution, virtual environment management, and package publishing, Poetry helps you focus on building your Python projects rather than wrestling with package issues."}),"\n",(0,s.jsx)(n.hr,{}),"\n",(0,s.jsx)(n.h3,{id:"reference",children:(0,s.jsx)(n.strong,{children:"Reference"})}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsxs)(n.li,{children:["Official Documentation: ",(0,s.jsx)(n.a,{href:"https://python-poetry.org/docs/",children:"https://python-poetry.org/docs/"})]}),"\n",(0,s.jsxs)(n.li,{children:["GitHub Repository: ",(0,s.jsx)(n.a,{href:"https://github.com/python-poetry/poetry",children:"https://github.com/python-poetry/poetry"})]}),"\n"]})]})}function h(e={}){const{wrapper:n}={...(0,i.R)(),...e.components};return n?(0,s.jsx)(n,{...e,children:(0,s.jsx)(c,{...e})}):c(e)}},28453:(e,n,r)=>{r.d(n,{R:()=>l,x:()=>o});var t=r(96540);const s={},i=t.createContext(s);function l(e){const n=t.useContext(i);return t.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function o(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(s):e.components||s:l(e.components),t.createElement(i.Provider,{value:n},e.children)}}}]);