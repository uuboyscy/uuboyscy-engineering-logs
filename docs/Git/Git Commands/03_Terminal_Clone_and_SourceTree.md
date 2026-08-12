---
sidebar_position: 3
title: "Module 3: Terminal Basics, Clone, and SourceTree"
description: Learn basic file and path commands, clone a remote repository, and optionally open it in SourceTree.
---

# Module 3: Terminal Basics, Clone, and SourceTree

Git commands operate on the folder where your terminal is currently located. Checking the path before you begin prevents you from running commands in the wrong project.

## What you will learn

- Navigate folders and create or inspect files from the terminal.
- Clone a GitHub repository to your computer.
- Check the current branch, remote URL, and recent versions.
- Add an existing repository to the SourceTree graphical interface.

## Common terminal commands

The following commands work on macOS, Linux, and Git Bash on Windows:

| Command | Purpose | Example |
|---|---|---|
| `pwd` | Show the current path | `pwd` |
| `ls` | List files | `ls` |
| `ls -la` | Show a detailed list, including hidden files | `ls -la` |
| `cd <path>` | Move to a directory | `cd projects` |
| `cd ..` | Move to the parent directory | `cd ..` |
| `mkdir <name>` | Create a directory | `mkdir practice` |
| `touch <file>` | Create an empty file | `touch notes.txt` |
| `mv <old> <new>` | Move or rename a file | `mv old.txt new.txt` |
| `rm <file>` | Delete a file | `rm notes.txt` |
| `clear` | Clear the terminal display | `clear` |

:::danger Be careful with delete commands

Files removed with `rm` usually do not go to the Recycle Bin or Trash. As a beginner, do not use unfamiliar `rm -r` or `rm -rf` commands.

:::

## Three path symbols

- `.`: the current directory.
- `..`: the parent directory.
- `~`: the current user's home directory.

For example:

```bash
cd ~
mkdir git-projects
cd git-projects
pwd
```

## Step 1: Verify your Git identity

```bash
git config --global user.name
git config --global user.email
```

If either command prints nothing, return to Module 1 and configure it. To see which file provides a setting, use:

```bash
git config --show-origin --get user.name
```

## Step 2: Get the clone URL

1. Open the `git-practice-remote` repository you created in Module 2.
2. Select **Code → Local → SSH**.
3. Copy the URL that begins with `git@github.com:`.

If SSH is not ready, you can select HTTPS instead. Pushing over HTTPS requires a GitHub-supported authentication method; you cannot use your GitHub account password directly as a Git password.

## Step 3: Clone into your project directory

```bash
cd ~/git-projects
git clone git@github.com:YOUR_ACCOUNT/git-practice-remote.git
cd git-practice-remote
```

`git clone` performs three tasks at once:

1. Downloads the files.
2. Downloads the complete Git history.
3. Creates a remote connection named `origin`.

## Step 4: Check the clone result

```bash
pwd
ls -la
git status
git branch --show-current
git remote -v
git log --oneline --decorate -5
```

You should see that:

- You are inside the `git-practice-remote` directory.
- The current branch is `main`.
- `origin` points to your GitHub repository.
- `git status` reports no uncommitted changes.

:::tip Check status before acting

Build the habit of running `git status` before other Git operations. It tells you the current branch, which files have changed, and often suggests the next command.

:::

## Step 5: Practice without creating a version

```bash
echo "Terminal practice" > terminal-notes.txt
git status
ls -la
```

`terminal-notes.txt` is now an untracked file. Do not commit it yet; the next module will guide you through a complete version-creation workflow.

If you do not want to keep the practice file, delete it:

```bash
rm terminal-notes.txt
git status
```

## Optional: Open the repository in SourceTree

SourceTree is a graphical interface for Git, but it is not required. Learn the commands first, then use SourceTree as a visual aid for commit graphs and file differences.

1. Download and install SourceTree from the [official SourceTree website](https://www.sourcetreeapp.com/).
2. Open SourceTree and choose the option to add a local repository.
3. For Browse or Destination Path, select the `git-practice-remote` folder you cloned.
4. Add it and confirm that you can see the `main` branch and commit history.

Button names vary slightly between operating systems and versions. The core idea is always the same: **open a folder that already contains a `.git` directory**.

## Common problems

### `fatal: not a git repository`

Your terminal is not inside a Git repository. Run `pwd`, then use `cd` to enter the correct project directory.

### `Permission denied (publickey)`

SSH authentication is incomplete. Return to Module 2 and check the key, ssh-agent, public key on GitHub, and `ssh -T git@github.com` in order.

### `destination path ... already exists`

The destination folder already exists. Do not overwrite it. Clone into a different directory name:

```bash
git clone <repository-url> git-practice-copy
```

## Command reference

| Command | Purpose |
|---|---|
| `git clone <url>` | Download a remote repository and its complete history |
| `git branch --show-current` | Show the current branch |
| `git remote -v` | Show remote names and URLs |
| `git log --oneline -5` | Show the five most recent commits |
| `git status` | Show the current working state |
