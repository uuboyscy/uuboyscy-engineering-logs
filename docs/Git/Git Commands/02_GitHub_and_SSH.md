---
sidebar_position: 2
title: "Module 2: GitHub, Repositories, and SSH Keys"
description: Learn how Git and GitHub work together, create a remote repository, and connect securely with SSH.
---

# Module 2: GitHub, Repositories, and SSH Keys

Git can work entirely on your computer. GitHub is an online platform for hosting Git repositories, reviewing code, and collaborating with a team.

## Git and GitHub are different

| Git | GitHub |
|---|---|
| A version control tool installed on your computer | A website and service that hosts Git repositories |
| Can create commits without an internet connection | Requires a network connection for push, pull, and online collaboration |
| Manages file versions and branches | Adds Pull Requests, Issues, Actions, and other collaboration features |

```mermaid
flowchart LR
    A["Your computer<br/>Local Git repository"] <-->|"push / fetch / pull"| B["GitHub<br/>Remote repository"]
    B <-->|"Pull Request / Review"| C["Team members"]
```

## Step 1: Register a GitHub account

Skip this step if you completed it in Module 1.

1. Go to [GitHub](https://github.com/).
2. Select **Sign up**.
3. Enter your email address, password, and username.
4. Complete email verification.

You should also enable two-factor authentication (2FA) so the account is protected by more than one password.

## Step 2: Create your first repository

1. Sign in and open [New repository](https://github.com/new).
2. Enter `git-practice-remote` for the repository name.
3. For your first exercise, you can choose **Private**.
4. Turn on **Add README**.
5. Select **Create repository**.

After the repository is created, become familiar with these common areas:

| Area | Purpose |
|---|---|
| Code | Browse files, commits, and branches |
| Issues | Track requirements, problems, and discussions |
| Pull requests | Propose, review, and merge changes |
| Actions | Run automated tests or deployment workflows |
| Settings | Manage permissions, branch rules, and repository settings |

> GitHub updates its interface regularly. If a button is in a different location, look for a feature with the same name.

## Clone, Fork, and Download ZIP

| Operation | Keeps Git history? | Common use |
|---|---:|---|
| Clone | Yes | Develop locally and synchronize changes over time |
| Fork | Yes, and creates a copy in your GitHub account | Contribute to a project where you do not have write access |
| Download ZIP | No | Get the current files without future synchronization |

## Step 3: Create an SSH key

An SSH key consists of a pair of keys:

- The **private key** stays on your computer and must never be shared.
- The **public key** can be registered with GitHub.

First, check whether your computer already has keys:

```bash
ls -al ~/.ssh
```

If you do not have `id_ed25519` and `id_ed25519.pub`, create a new key:

```bash
ssh-keygen -t ed25519 -C "you@example.com"
```

Respond to the prompts as follows:

1. `Enter file in which to save the key`: press Enter if you do not already have a key at the default location.
2. `Enter passphrase`: enter a secure passphrase for the key.
3. Enter the same passphrase again.

:::warning Do not overwrite an existing key

If the terminal says the target file already exists, answer `n`. Follow the official GitHub instructions to create a key with a custom name instead.

:::

## Step 4: Add the private key to ssh-agent

### macOS / Linux / Git Bash

```bash
eval "$(ssh-agent -s)"
ssh-add ~/.ssh/id_ed25519
```

On macOS, follow GitHub's official instructions to store the passphrase in Keychain:

```bash
ssh-add --apple-use-keychain ~/.ssh/id_ed25519
```

## Step 5: Add the public key to GitHub

Display your public key:

```bash
cat ~/.ssh/id_ed25519.pub
```

Copy the **entire line** that begins with `ssh-ed25519`, then:

1. On GitHub, select your profile picture → **Settings**.
2. Select **SSH and GPG keys**.
3. Select **New SSH key**.
4. Enter a recognizable title, such as `home-laptop`.
5. Paste the public key into the Key field and add it.

## Step 6: Test the SSH connection

```bash
ssh -T git@github.com
```

The first connection may ask whether you trust GitHub's host. Verify that the host shown is `github.com`, then enter `yes`. A successful response includes your GitHub username and a successful authentication message.

## Step 7: Clone the repository over SSH

On the GitHub repository page, select **Code → Local → SSH** and copy a URL similar to this:

```text
git@github.com:YOUR_ACCOUNT/git-practice-remote.git
```

Return to your terminal:

```bash
cd ..
git clone git@github.com:YOUR_ACCOUNT/git-practice-remote.git
cd git-practice-remote
git remote -v
git status
```

Replace `YOUR_ACCOUNT` with your GitHub username. The `origin` shown by `git remote -v` is the default remote linked to this local repository.

## Security checklist

- Safe to share: the contents of the `id_ed25519.pub` public key.
- Never share: the contents of the `id_ed25519` private key.
- Never commit passwords, API keys, or `.env` files to Git.
- If you are unsure about an SSH command or host fingerprint, stop and verify it before accepting anything.

## Further reading

- [GitHub: Quickstart for repositories](https://docs.github.com/en/repositories/creating-and-managing-repositories/quickstart-for-repositories)
- [GitHub: Generate an SSH key and add it to ssh-agent](https://docs.github.com/en/authentication/connecting-to-github-with-ssh/generating-a-new-ssh-key-and-adding-it-to-the-ssh-agent)
- [GitHub: Test your SSH connection](https://docs.github.com/en/authentication/connecting-to-github-with-ssh/testing-your-ssh-connection)
