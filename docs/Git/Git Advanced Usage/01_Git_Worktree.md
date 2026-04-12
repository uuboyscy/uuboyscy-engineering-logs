# Git Worktree

## What is Git Worktree?

Normally, when you use Git, you can only work on **one branch at a time** in your folder.

If you want to switch to another branch, you need to stop what you are doing, save your work (with `git stash`), and then switch.

**Git Worktree** solves this problem. It lets you check out **multiple branches at the same time**, each in its own separate folder. You can work on two branches side by side without switching.

---

## Why Use Git Worktree?

Here are some common situations where Git Worktree is helpful:

- You are working on a new feature, and your boss asks you to fix a bug **right now**.
- You want to **compare two branches** by looking at the files side by side.
- You want to **test a branch** without stopping your current work.

---

## How to Use Git Worktree

### Step 1: Check your current worktrees

```bash
git worktree list
```

This shows all active worktrees. At the start, you will only see one — your main working folder.

---

### Step 2: Add a new worktree

```bash
git worktree add ../my-feature-branch feature/my-feature
```

This creates a **new folder** called `my-feature-branch` next to your current project folder. It checks out the branch `feature/my-feature` there.

Now you have:
- Your original folder — still on the current branch
- A new folder `../my-feature-branch` — on the `feature/my-feature` branch

You can open both folders and work on them at the same time.

---

### Step 3: Create a new branch in a new worktree

If the branch does not exist yet, use `-b` to create it:

```bash
git worktree add -b hotfix/urgent-fix ../urgent-fix main
```

This creates a new branch `hotfix/urgent-fix` based on `main`, and checks it out in the folder `../urgent-fix`.

---

### Step 4: Remove a worktree when you are done

First, delete the folder:

```bash
rm -rf ../my-feature-branch
```

Then clean up the Git record:

```bash
git worktree prune
```

Or remove it directly:

```bash
git worktree remove ../my-feature-branch
```

---

## Full Example

```bash
# You are working on feature/new-dashboard
cd my-project
git checkout feature/new-dashboard

# Your boss asks you to fix a bug on main — right now!
# Use worktree to handle the fix without stopping your work
git worktree add -b hotfix/login-bug ../login-bugfix main

# Go to the new folder and fix the bug
cd ../login-bugfix
echo "fix login" >> login.py
git add .
git commit -m "fix: fix login bug"

# Go back to your original work
cd ../my-project
# Your feature/new-dashboard work is still here, untouched

# Clean up after the fix is merged
git worktree remove ../login-bugfix
```

---

## Summary

| Command | What it does |
|---|---|
| `git worktree list` | Show all active worktrees |
| `git worktree add <path> <branch>` | Check out a branch in a new folder |
| `git worktree add -b <new-branch> <path> <base>` | Create a new branch and check it out in a new folder |
| `git worktree remove <path>` | Remove a worktree |
| `git worktree prune` | Clean up deleted worktree records |

> **Tip:** All worktrees share the same Git history and remote. A commit in one worktree is visible in all others.
