"use strict";(self.webpackChunkuuboyscy_engineering_logs=self.webpackChunkuuboyscy_engineering_logs||[]).push([[1243],{27746:(n,e,s)=>{s.r(e),s.d(e,{assets:()=>d,contentTitle:()=>t,default:()=>c,frontMatter:()=>o,metadata:()=>i,toc:()=>a});const i=JSON.parse('{"id":"Python/Project Management/Python Version/pyenv","title":"Pyenv","description":"1. Introduction to Pyenv","source":"@site/docs/Python/Project Management/Python Version/pyenv.md","sourceDirName":"Python/Project Management/Python Version","slug":"/Python/Project Management/Python Version/pyenv","permalink":"/docs/Python/Project Management/Python Version/pyenv","draft":false,"unlisted":false,"tags":[],"version":"current","frontMatter":{},"sidebar":"tutorialSidebar","previous":{"title":"read_sql","permalink":"/docs/Python/Pandas/Read SQL"},"next":{"title":"Poetry","permalink":"/docs/Python/Project Management/Virtual Environment/Poetry"}}');var l=s(74848),r=s(28453);const o={},t="Pyenv",d={},a=[{value:"<strong>1. Introduction to Pyenv</strong>",id:"1-introduction-to-pyenv",level:2},{value:"<strong>What is Pyenv?</strong>",id:"what-is-pyenv",level:3},{value:"<strong>Why use Pyenv?</strong>",id:"why-use-pyenv",level:3},{value:"<strong>Benefits of Using Pyenv</strong>",id:"benefits-of-using-pyenv",level:3},{value:"<strong>2. Installing Pyenv</strong>",id:"2-installing-pyenv",level:2},{value:"<strong>System Requirements</strong>",id:"system-requirements",level:3},{value:"<strong>Installation Steps</strong>",id:"installation-steps",level:3},{value:"<strong>macOS</strong>",id:"macos",level:4},{value:"<strong>Linux</strong>",id:"linux",level:4},{value:"<strong>Windows (Using WSL)</strong>",id:"windows-using-wsl",level:4},{value:"<strong>Common Post-Installation Steps</strong>",id:"common-post-installation-steps",level:4},{value:"<strong>3. Setting Up Pyenv</strong>",id:"3-setting-up-pyenv",level:2},{value:"<strong>Verifying the Installation</strong>",id:"verifying-the-installation",level:3},{value:"<strong>Updating Pyenv</strong>",id:"updating-pyenv",level:3},{value:"<strong>4. Basic Commands in Pyenv</strong>",id:"4-basic-commands-in-pyenv",level:2},{value:"<strong>Installing a Python Version</strong>",id:"installing-a-python-version",level:3},{value:"<strong>Listing Installed Python Versions</strong>",id:"listing-installed-python-versions",level:3},{value:"<strong>Switching Between Python Versions</strong>",id:"switching-between-python-versions",level:3},{value:"<strong>Uninstalling a Python Version</strong>",id:"uninstalling-a-python-version",level:3},{value:"<strong>5. Global, Local, and Shell Python Versions</strong>",id:"5-global-local-and-shell-python-versions",level:2},{value:"<strong>Global Version</strong>",id:"global-version",level:3},{value:"<strong>Local Version</strong>",id:"local-version",level:3},{value:"<strong>Shell Version</strong>",id:"shell-version",level:3},{value:"<strong>6. Advanced Pyenv Features</strong>",id:"6-advanced-pyenv-features",level:2},{value:"<strong>Using Plugins</strong>",id:"using-plugins",level:3},{value:"<strong>Managing Python Builds</strong>",id:"managing-python-builds",level:3},{value:"<strong>Using Environment Variables</strong>",id:"using-environment-variables",level:3},{value:"<strong>7. Integrating Pyenv with Other Tools</strong>",id:"7-integrating-pyenv-with-other-tools",level:2},{value:"<strong>Pyenv with IDEs</strong>",id:"pyenv-with-ides",level:3},{value:"<strong>Using Pyenv with pipenv or poetry</strong>",id:"using-pyenv-with-pipenv-or-poetry",level:3},{value:"<strong>Pyenv and Docker</strong>",id:"pyenv-and-docker",level:3},{value:"<strong>8. Troubleshooting and FAQs</strong>",id:"8-troubleshooting-and-faqs",level:2},{value:"<strong>Common Errors and Solutions</strong>",id:"common-errors-and-solutions",level:3},{value:"<strong>How to Uninstall Pyenv</strong>",id:"how-to-uninstall-pyenv",level:3},{value:"<strong>9. Additional Resources</strong>",id:"9-additional-resources",level:2}];function h(n){const e={a:"a",code:"code",h1:"h1",h2:"h2",h3:"h3",h4:"h4",header:"header",hr:"hr",li:"li",ol:"ol",p:"p",pre:"pre",strong:"strong",ul:"ul",...(0,r.R)(),...n.components};return(0,l.jsxs)(l.Fragment,{children:[(0,l.jsx)(e.header,{children:(0,l.jsx)(e.h1,{id:"pyenv",children:"Pyenv"})}),"\n",(0,l.jsx)(e.h2,{id:"1-introduction-to-pyenv",children:(0,l.jsx)(e.strong,{children:"1. Introduction to Pyenv"})}),"\n",(0,l.jsx)(e.h3,{id:"what-is-pyenv",children:(0,l.jsx)(e.strong,{children:"What is Pyenv?"})}),"\n",(0,l.jsx)(e.p,{children:"Pyenv is a tool that allows you to easily install and manage multiple versions of Python on your system. Developers don't need to rely on the system-installed Python, instead it enables developers to work with different Python versions for various projects."}),"\n",(0,l.jsx)(e.h3,{id:"why-use-pyenv",children:(0,l.jsx)(e.strong,{children:"Why use Pyenv?"})}),"\n",(0,l.jsxs)(e.ul,{children:["\n",(0,l.jsx)(e.li,{children:"Simplifies managing multiple Python versions."}),"\n",(0,l.jsx)(e.li,{children:"Avoids conflicts between projects requiring different Python versions."}),"\n",(0,l.jsx)(e.li,{children:"Enables developers to experiment with beta or legacy Python versions safely."}),"\n"]}),"\n",(0,l.jsx)(e.h3,{id:"benefits-of-using-pyenv",children:(0,l.jsx)(e.strong,{children:"Benefits of Using Pyenv"})}),"\n",(0,l.jsxs)(e.ul,{children:["\n",(0,l.jsx)(e.li,{children:"Easily switch between Python versions."}),"\n",(0,l.jsx)(e.li,{children:"Install and manage Python versions without administrative privileges."}),"\n",(0,l.jsxs)(e.li,{children:["Seamlessly integrate with tools like ",(0,l.jsx)(e.code,{children:"virtualenv"}),",\xa0",(0,l.jsx)(e.code,{children:"pipenv"}),", and ",(0,l.jsx)(e.code,{children:"poetry"}),"\xa0."]}),"\n"]}),"\n",(0,l.jsx)(e.hr,{}),"\n",(0,l.jsx)(e.h2,{id:"2-installing-pyenv",children:(0,l.jsx)(e.strong,{children:"2. Installing Pyenv"})}),"\n",(0,l.jsx)(e.h3,{id:"system-requirements",children:(0,l.jsx)(e.strong,{children:"System Requirements"})}),"\n",(0,l.jsxs)(e.ul,{children:["\n",(0,l.jsx)(e.li,{children:"macOS, Linux, or Windows with WSL."}),"\n",(0,l.jsx)(e.li,{children:"Basic knowledge of using a terminal."}),"\n"]}),"\n",(0,l.jsx)(e.h3,{id:"installation-steps",children:(0,l.jsx)(e.strong,{children:"Installation Steps"})}),"\n",(0,l.jsx)(e.h4,{id:"macos",children:(0,l.jsx)(e.strong,{children:"macOS"})}),"\n",(0,l.jsxs)(e.ol,{children:["\n",(0,l.jsxs)(e.li,{children:["Install Pyenv using Homebrew:","\n",(0,l.jsx)(e.pre,{children:(0,l.jsx)(e.code,{className:"language-bash",children:"brew install pyenv\n"})}),"\n"]}),"\n"]}),"\n",(0,l.jsx)(e.h4,{id:"linux",children:(0,l.jsx)(e.strong,{children:"Linux"})}),"\n",(0,l.jsxs)(e.ol,{children:["\n",(0,l.jsxs)(e.li,{children:["Install dependencies:","\n",(0,l.jsx)(e.pre,{children:(0,l.jsx)(e.code,{className:"language-bash",children:"sudo apt update && sudo apt install -y build-essential curl libssl-dev zlib1g-dev libbz2-dev libreadline-dev libsqlite3-dev wget llvm libncurses5-dev libncursesw5-dev xz-utils tk-dev libffi-dev liblzma-dev python-openssl git\n"})}),"\n"]}),"\n",(0,l.jsxs)(e.li,{children:["Install Pyenv:","\n",(0,l.jsx)(e.pre,{children:(0,l.jsx)(e.code,{className:"language-bash",children:"curl https://pyenv.run | bash\n"})}),"\n"]}),"\n"]}),"\n",(0,l.jsx)(e.h4,{id:"windows-using-wsl",children:(0,l.jsx)(e.strong,{children:"Windows (Using WSL)"})}),"\n",(0,l.jsxs)(e.ol,{children:["\n",(0,l.jsx)(e.li,{children:"Install WSL and a Linux distribution (e.g., Ubuntu)."}),"\n",(0,l.jsx)(e.li,{children:"Follow the Linux installation steps above."}),"\n"]}),"\n",(0,l.jsx)(e.h4,{id:"common-post-installation-steps",children:(0,l.jsx)(e.strong,{children:"Common Post-Installation Steps"})}),"\n",(0,l.jsxs)(e.ol,{children:["\n",(0,l.jsxs)(e.li,{children:["Add Pyenv to your shell configuration file (e.g., ",(0,l.jsx)(e.code,{children:".bashrc"}),", ",(0,l.jsx)(e.code,{children:".zshrc"}),"):","\n",(0,l.jsx)(e.pre,{children:(0,l.jsx)(e.code,{className:"language-bash",children:'export PYENV_ROOT="$HOME/.pyenv"\nexport PATH="$PYENV_ROOT/bin:$PATH"\neval "$(pyenv init --path)"\n'})}),"\n"]}),"\n",(0,l.jsxs)(e.li,{children:["Restart your shell:","\n",(0,l.jsx)(e.pre,{children:(0,l.jsx)(e.code,{className:"language-bash",children:"exec $SHELL\n"})}),"\n"]}),"\n",(0,l.jsxs)(e.li,{children:["Verify installation:","\n",(0,l.jsx)(e.pre,{children:(0,l.jsx)(e.code,{className:"language-bash",children:"pyenv --version\n"})}),"\n"]}),"\n"]}),"\n",(0,l.jsx)(e.hr,{}),"\n",(0,l.jsx)(e.h2,{id:"3-setting-up-pyenv",children:(0,l.jsx)(e.strong,{children:"3. Setting Up Pyenv"})}),"\n",(0,l.jsx)(e.h3,{id:"verifying-the-installation",children:(0,l.jsx)(e.strong,{children:"Verifying the Installation"})}),"\n",(0,l.jsx)(e.p,{children:"Run the following command to ensure Pyenv is installed correctly:"}),"\n",(0,l.jsx)(e.pre,{children:(0,l.jsx)(e.code,{className:"language-bash",children:"pyenv --version\n"})}),"\n",(0,l.jsx)(e.h3,{id:"updating-pyenv",children:(0,l.jsx)(e.strong,{children:"Updating Pyenv"})}),"\n",(0,l.jsx)(e.p,{children:"To update Pyenv to the latest version:"}),"\n",(0,l.jsx)(e.pre,{children:(0,l.jsx)(e.code,{className:"language-bash",children:"pyenv update\n"})}),"\n",(0,l.jsx)(e.hr,{}),"\n",(0,l.jsx)(e.h2,{id:"4-basic-commands-in-pyenv",children:(0,l.jsx)(e.strong,{children:"4. Basic Commands in Pyenv"})}),"\n",(0,l.jsx)(e.h3,{id:"installing-a-python-version",children:(0,l.jsx)(e.strong,{children:"Installing a Python Version"})}),"\n",(0,l.jsx)(e.pre,{children:(0,l.jsx)(e.code,{className:"language-bash",children:"pyenv install 3.11.5\n"})}),"\n",(0,l.jsx)(e.h3,{id:"listing-installed-python-versions",children:(0,l.jsx)(e.strong,{children:"Listing Installed Python Versions"})}),"\n",(0,l.jsx)(e.pre,{children:(0,l.jsx)(e.code,{className:"language-bash",children:"pyenv versions\n"})}),"\n",(0,l.jsx)(e.h3,{id:"switching-between-python-versions",children:(0,l.jsx)(e.strong,{children:"Switching Between Python Versions"})}),"\n",(0,l.jsx)(e.pre,{children:(0,l.jsx)(e.code,{className:"language-bash",children:"pyenv global 3.11.5\n"})}),"\n",(0,l.jsx)(e.h3,{id:"uninstalling-a-python-version",children:(0,l.jsx)(e.strong,{children:"Uninstalling a Python Version"})}),"\n",(0,l.jsx)(e.pre,{children:(0,l.jsx)(e.code,{className:"language-bash",children:"pyenv uninstall 3.11.5\n"})}),"\n",(0,l.jsx)(e.hr,{}),"\n",(0,l.jsx)(e.h2,{id:"5-global-local-and-shell-python-versions",children:(0,l.jsx)(e.strong,{children:"5. Global, Local, and Shell Python Versions"})}),"\n",(0,l.jsx)(e.h3,{id:"global-version",children:(0,l.jsx)(e.strong,{children:"Global Version"})}),"\n",(0,l.jsx)(e.p,{children:"The global version is the default Python version used system-wide:"}),"\n",(0,l.jsx)(e.pre,{children:(0,l.jsx)(e.code,{className:"language-bash",children:"pyenv global 3.11.5\n"})}),"\n",(0,l.jsx)(e.h3,{id:"local-version",children:(0,l.jsx)(e.strong,{children:"Local Version"})}),"\n",(0,l.jsx)(e.p,{children:"Set a specific Python version for a project:"}),"\n",(0,l.jsx)(e.pre,{children:(0,l.jsx)(e.code,{className:"language-bash",children:"pyenv local 3.9.13\n"})}),"\n",(0,l.jsx)(e.h3,{id:"shell-version",children:(0,l.jsx)(e.strong,{children:"Shell Version"})}),"\n",(0,l.jsx)(e.p,{children:"Override the Python version temporarily in the current shell session:"}),"\n",(0,l.jsx)(e.pre,{children:(0,l.jsx)(e.code,{className:"language-bash",children:"pyenv shell 3.8.10\n"})}),"\n",(0,l.jsx)(e.hr,{}),"\n",(0,l.jsx)(e.h2,{id:"6-advanced-pyenv-features",children:(0,l.jsx)(e.strong,{children:"6. Advanced Pyenv Features"})}),"\n",(0,l.jsx)(e.h3,{id:"using-plugins",children:(0,l.jsx)(e.strong,{children:"Using Plugins"})}),"\n",(0,l.jsxs)(e.p,{children:["Extend Pyenv functionality with plugins like ",(0,l.jsx)(e.code,{children:"pyenv-which-ext"}),"."]}),"\n",(0,l.jsx)(e.h3,{id:"managing-python-builds",children:(0,l.jsx)(e.strong,{children:"Managing Python Builds"})}),"\n",(0,l.jsx)(e.pre,{children:(0,l.jsx)(e.code,{className:"language-bash",children:'PYTHON_CONFIGURE_OPTS="--enable-shared" pyenv install 3.9.13\n'})}),"\n",(0,l.jsx)(e.h3,{id:"using-environment-variables",children:(0,l.jsx)(e.strong,{children:"Using Environment Variables"})}),"\n",(0,l.jsx)(e.p,{children:"Temporarily set a Python version:"}),"\n",(0,l.jsx)(e.pre,{children:(0,l.jsx)(e.code,{className:"language-bash",children:"PYENV_VERSION=3.10.6 python\n"})}),"\n",(0,l.jsx)(e.hr,{}),"\n",(0,l.jsx)(e.h2,{id:"7-integrating-pyenv-with-other-tools",children:(0,l.jsx)(e.strong,{children:"7. Integrating Pyenv with Other Tools"})}),"\n",(0,l.jsx)(e.h3,{id:"pyenv-with-ides",children:(0,l.jsx)(e.strong,{children:"Pyenv with IDEs"})}),"\n",(0,l.jsxs)(e.ul,{children:["\n",(0,l.jsx)(e.li,{children:"Configure your IDE (e.g., VSCode, PyCharm) to use a Pyenv-managed Python version."}),"\n"]}),"\n",(0,l.jsx)(e.h3,{id:"using-pyenv-with-pipenv-or-poetry",children:(0,l.jsx)(e.strong,{children:"Using Pyenv with pipenv or poetry"})}),"\n",(0,l.jsxs)(e.ul,{children:["\n",(0,l.jsxs)(e.li,{children:["Use Pyenv-installed Python versions with ",(0,l.jsx)(e.code,{children:"pipenv"})," or ",(0,l.jsx)(e.code,{children:"poetry"}),"."]}),"\n"]}),"\n",(0,l.jsx)(e.h3,{id:"pyenv-and-docker",children:(0,l.jsx)(e.strong,{children:"Pyenv and Docker"})}),"\n",(0,l.jsxs)(e.ul,{children:["\n",(0,l.jsx)(e.li,{children:"Avoid using Pyenv inside Docker containers; use official Python Docker images instead."}),"\n"]}),"\n",(0,l.jsx)(e.hr,{}),"\n",(0,l.jsx)(e.h2,{id:"8-troubleshooting-and-faqs",children:(0,l.jsx)(e.strong,{children:"8. Troubleshooting and FAQs"})}),"\n",(0,l.jsx)(e.h3,{id:"common-errors-and-solutions",children:(0,l.jsx)(e.strong,{children:"Common Errors and Solutions"})}),"\n",(0,l.jsxs)(e.ul,{children:["\n",(0,l.jsxs)(e.li,{children:[(0,l.jsx)(e.strong,{children:"Permission Denied:"})," Ensure you\u2019ve installed Pyenv without ",(0,l.jsx)(e.code,{children:"sudo"}),"."]}),"\n",(0,l.jsxs)(e.li,{children:[(0,l.jsx)(e.strong,{children:"Command Not Found:"})," Add Pyenv to your PATH correctly."]}),"\n"]}),"\n",(0,l.jsx)(e.h3,{id:"how-to-uninstall-pyenv",children:(0,l.jsx)(e.strong,{children:"How to Uninstall Pyenv"})}),"\n",(0,l.jsxs)(e.ol,{children:["\n",(0,l.jsxs)(e.li,{children:["Remove Pyenv files:","\n",(0,l.jsx)(e.pre,{children:(0,l.jsx)(e.code,{className:"language-bash",children:"rm -rf ~/.pyenv\n"})}),"\n"]}),"\n",(0,l.jsx)(e.li,{children:"Remove references in your shell configuration file."}),"\n"]}),"\n",(0,l.jsx)(e.hr,{}),"\n",(0,l.jsx)(e.h2,{id:"9-additional-resources",children:(0,l.jsx)(e.strong,{children:"9. Additional Resources"})}),"\n",(0,l.jsxs)(e.ul,{children:["\n",(0,l.jsx)(e.li,{children:(0,l.jsx)(e.a,{href:"https://github.com/pyenv/pyenv",children:"Pyenv GitHub Repository"})}),"\n",(0,l.jsx)(e.li,{children:(0,l.jsx)(e.a,{href:"https://github.com/pyenv/pyenv/issues",children:"Community Forums"})}),"\n"]})]})}function c(n={}){const{wrapper:e}={...(0,r.R)(),...n.components};return e?(0,l.jsx)(e,{...n,children:(0,l.jsx)(h,{...n})}):h(n)}},28453:(n,e,s)=>{s.d(e,{R:()=>o,x:()=>t});var i=s(96540);const l={},r=i.createContext(l);function o(n){const e=i.useContext(r);return i.useMemo((function(){return"function"==typeof n?n(e):{...e,...n}}),[e,n])}function t(n){let e;return e=n.disableParentContext?"function"==typeof n.components?n.components(l):n.components||l:o(n.components),i.createElement(r.Provider,{value:e},n.children)}}}]);