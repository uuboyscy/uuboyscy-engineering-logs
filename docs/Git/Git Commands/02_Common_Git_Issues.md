
# Common Git Issues

## Issue Reproduction and Solutions

### Accidentally Deleted an Unmerged Branch

```bash
# Work on feature/something-new
git checkout -b feature/something-new
echo 123 >> something-new.py
git add .
git commit -m "Update: add something-new.py"

# Switch to main and make changes
git checkout main
echo 123 >> README.md
git add .
git commit -m "Update: do something to README.md"

# Delete the feature/something-new branch
git branch -D feature/something-new
# >> Deleted branch feature/something-new (was bae6212).

# Solution:
git checkout bae6212
git branch feature/something-new
git checkout feature/something-new
```

---

### Committed Before Creating a New Branch

```bash
# Commit changes on main branch
git checkout main
echo 123 >> new-feature.py
git add .
git commit -m "fix new-feature.py"

# Solution:
git reset HEAD~
git checkout -b bugfix/something-new
git add .
git commit -m "fix something-new"
```

#### Alternative Solution:
```bash
# Use cherry-pick after reset
git reset HEAD~ --hard
git checkout -b feature/specific-fix
git cherry-pick <commit-sha1>
```

---

### Accidentally Ran `git reset HEAD~ --hard`

```bash
# Hard reset to the previous commit
git reset HEAD~ --hard

# Solution:
git reset HEAD@{1} --hard
```

---

### Keep Only Specific Commits in a Branch

```bash
git checkout main
git checkout -b feature/test
echo 123 >> extra1.txt
git add extra1.txt
git commit -m "Add extra1.txt"
echo 123 >> extra2.txt
git add extra2.txt
git commit -m "Add extra2.txt"
echo 123 >> extra3.txt
git add extra3.txt
git commit -m "Add extra3.txt"

# Solution:
git checkout main
git checkout -b feature/confirmed-test
git cherry-pick <commit-sha-for-extra2>
git branch -D feature/test
```

---

### Identify Author of Specific Lines of Code

```bash
git blame file_name
```

---

### Save Half-Completed Work Before Switching Tasks

```bash
git checkout main
git checkout -b feature/function1
echo "print(123)" >> function1.py
git stash save -u "developing function1"

git checkout feature/function2
echo "print(456)" >> function2.py
git stash save -u "developing function2"

# Retrieve stashed work
git checkout feature/function1
git stash pop 0
```

---

### Undo a Merge

```bash
git reset ORIG_HEAD --hard
```

---

### Undo a Rebase

```bash
git reset ORIG_HEAD --hard
```

---

### Fix Commit Message

```bash
git checkout main
echo 123 >> README.md
git add .
git commit -m "test"
git commit --amend -m "Corrected commit message"
```
