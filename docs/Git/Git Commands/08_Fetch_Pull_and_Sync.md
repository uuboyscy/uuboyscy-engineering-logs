---
sidebar_position: 8
title: "Module 8: Fetch, Pull, and Remote Sync"
description: Learn the difference between fetch and pull, inspect remote updates before integrating them, and build a safe daily sync routine.
---

# Module 8: Fetch, Pull, and Remote Sync

When the version on GitHub is newer than the version on your computer, you can use `fetch` to retrieve information and then decide how to integrate it. You can also use `pull` to retrieve and integrate changes in one command.

## Understand Three Branch Names First

Suppose you are working on `main`:

- `main` is your local branch. You can commit directly to it on your computer.
- `origin/main` is your computer's record of the last known position of the remote `main` branch.
- `main` on GitHub is the actual branch stored on the remote server.

Git updates your local `origin/main` only after you run `git fetch origin`.

## Fetch vs. Pull

| Command | Downloads remote information | Immediately integrates it into the current branch | Best use |
|---|---:|---:|---|
| `git fetch` | Yes | No | Inspect changes before deciding what to do |
| `git pull` | Yes | Yes | Sync directly when you understand the difference |

Conceptually:

```text
git pull = git fetch + integration (merge, rebase, or fast-forward)
```

## A Beginner-Friendly Safe Flow: Fetch → Inspect → Merge

### Step 1: Check Your Current State

```bash
git status
git branch --show-current
```

Deal with unfinished work before syncing so that unrelated changes do not become mixed together.

### Step 2: Retrieve the Latest Remote Information

```bash
git fetch origin
```

This updates `origin/*` but does not immediately change your current working files.

### Step 3: Inspect the New Remote Commits

```bash
git log --oneline HEAD..origin/main
```

Inspect the file changes as well:

```bash
git diff HEAD..origin/main
```

If neither command prints anything, remote `main` usually has no changes that your current branch is missing.

### Step 4: Accept Only a Fast-Forward Update

```bash
git merge --ff-only origin/main
```

`--ff-only` updates the branch only when your local history has not diverged. If both your local branch and the remote branch have new commits, the command stops. This gives you time to understand the situation instead of creating an unexpected merge commit.

## A Shorter Pull Command

After you have configured an upstream branch, you can run:

```bash
git pull --ff-only
```

This is useful for routine updates to `main`. If Git cannot fast-forward, inspect the situation first:

```bash
git status
git log --oneline --graph --decorate --all -20
```

Then choose merge or rebase according to your team's workflow. Do not add `--force` simply because a command failed.

## Step-by-Step Exercise: Create a Remote Update on GitHub

This exercise shows that fetch does not immediately change your files.

1. Confirm that your local `main` is clean:

   ```bash
   git switch main
   git status
   ```

2. Open the repository's `README.md` on GitHub, add one line with the web editor, and commit it.
3. Return to your terminal and run:

   ```bash
   git fetch origin
   git status
   git log --oneline HEAD..origin/main
   ```

4. Git now knows about the remote commit, but your local README has not changed yet.
5. Integrate the update:

   ```bash
   git merge --ff-only origin/main
   ```

6. Open the README and confirm that it contains the line you added on GitHub.

## Two Ways to Update a Feature Branch

Suppose you are on `feature/search`, and `origin/main` has moved forward.

### Option A: Merge and Preserve the True Branching History

```bash
git fetch origin
git switch feature/search
git merge origin/main
```

This does not rewrite the feature branch's existing commits, so it is suitable for a shared branch.

### Option B: Rebase and Keep a Linear History

```bash
git fetch origin
git switch feature/search
git rebase origin/main
```

This is suitable for a feature branch that only you use. Rebase changes commit IDs, so follow your team's rules for shared branches.

## Remove Records of Deleted Remote Branches

After someone deletes a branch on GitHub, your computer may still show an old branch such as `origin/old-branch`. Clean up remote-tracking references with:

```bash
git fetch --prune origin
```

This removes only outdated remote-tracking references. It does not delete your local branches.

## Sync When You Have Unfinished Work

The clearest approach is to finish and commit one small unit of work first. If your changes are not ready to commit, temporarily store them in a stash:

```bash
git status
git stash push -u -m "WIP before sync"
git pull --ff-only
git stash pop
```

- `-u` includes untracked files in the stash.
- `stash pop` can still create conflicts when it reapplies your work. Resolve them like other conflicts.
- Use stash for short-term storage, not as a long-term backup.

View your stashes with:

```bash
git stash list
```

## A Daily Git Workflow

At the start of your work:

```bash
git switch main
git pull --ff-only
git switch -c feature/my-task
```

During development:

```bash
git status
git diff
git add <files>
git diff --staged
git commit -m "feat: describe the change"
```

Before pushing and opening a pull request:

```bash
git fetch origin
git rebase origin/main  # Only for a feature branch that you alone use
git push -u origin feature/my-task
```

After the pull request is merged:

```bash
git switch main
git pull --ff-only
git branch -d feature/my-task
git fetch --prune origin
```

## Common Problems

### `Your local changes would be overwritten`

Run `git status` and `git diff` first. Commit the changes, stash them, or restore them only after you are certain they are unnecessary. Do not delete changes just to make pull succeed.

### Local and Remote Both Have New Commits

This is called a diverged branch. Inspect both sides with a commit graph:

```bash
git log --oneline --graph --decorate --all -20
```

Teams often merge shared branches. You may rebase your own feature branch if that matches your team's workflow.

### Files Did Not Change After `git fetch`

This is expected. Fetch only updates remote-tracking information. Next, run `git merge origin/main`, `git rebase origin/main`, or use an appropriate pull strategy.

## Command Cheat Sheet

| Command | Purpose |
|---|---|
| `git fetch origin` | Retrieve remote information without changing current files |
| `git log HEAD..origin/main` | Show commits that exist remotely but not locally |
| `git merge --ff-only origin/main` | Integrate remote `main` only when a fast-forward is possible |
| `git pull --ff-only` | Retrieve and fast-forward the current branch |
| `git fetch --prune origin` | Remove records of deleted remote branches |
| `git stash push -u -m "..."` | Temporarily store unfinished changes |

## After You Finish This Series

You have now completed a full Git workflow: installation and configuration → GitHub and SSH → clone → add / commit / push → branch / merge → pull request → history editing → remote synchronization.

The most effective next exercise is to take a small personal project through the entire workflow. When a problem occurs, keep the output of `git status`, the commit graph, and the complete error message. Use them to identify which repository and branch contain the problem before taking action.

## Official Documentation

- [git fetch](https://git-scm.com/docs/git-fetch)
- [git pull](https://git-scm.com/docs/git-pull)
- [git stash](https://git-scm.com/docs/git-stash)
