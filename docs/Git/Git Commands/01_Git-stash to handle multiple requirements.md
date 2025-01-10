# Git-stash to handle multiple requirements

# Commands

```bash
# Create a stash
git stash -u

# Create a stash with message
git stash save -u "Stash message"

# List all stash
git stash list

# Show difference in a stash
git stash show <n>

# Extract a stash
git stash pop
```

# Preset

- Initiate a git directory

```bash
mkdir git_practice
cd git_practice
git init
touch README.md
git add README.md
git commit -m "First commit"
```

# How to use

While you are developing a new feature, you are assigned another requirement which is more emergent.

## Add some files in working directory

Just like the following example, you are developing on branch feature/some-feature.

```bash
git checkout -b feature/some-feature
echo "echo Something new" >> new_feature_1.sh
echo "echo Another one" >> new_feature_2.sh
git add new_feature_1.sh
git status
```

After operation above, you will get the output just like this:

```
On branch feature/new-feature

No commits yet

Changes to be committed:
  (use "git rm --cached <file>..." to unstage)
	new file:   new_feature_2.sh

Untracked files:
  (use "git add <file>..." to include in what will be committed)
	new_feature_1.sh
```

## Stash the working directory

Now you need to fix an emergent bug in the same repository, but the new feature, which is being developed by you, on branch feature/some-feature hasn’t been completed.

Just keep all these changes in a temporary space simply by git-stash.

```bash
git stash -u
```

You will see the following message after typing git-stash command above.

```
Saved working directory and index state WIP on some-feature: 841cf75 First commit
```

And then execute the following command to list all stashes.

```bash
git stash list
```

A stash list will be shown like this:

```
stash@{0}: WIP on some-feature: 841cf75 First commit
```

Additionally, you’ll find that none of new_feature-files is in working directory if you execute git-status command.

## Work on another branch

Now you can switch to another branch to fix the bug.

```bash
git checkout master
git checkout -b bugfix/some-bug
touch fix_bug.txt
git add .
git commit -m "Bugfix"
```

## Continue working on feature/some-feature

After the bug has been solved, switch back to branch feature/some-feature to finish your job.

```bash
git checkout feature/some-feature
git stash pop
```

With command git-stash-pop executed above, you can restore the status that you were working on. 

```
On branch feature/some-feature
Changes to be committed:
  (use "git restore --staged <file>..." to unstage)
	new file:   new_feature_1.sh

Untracked files:
  (use "git add <file>..." to include in what will be committed)
	new_feature_2.sh

Dropped refs/stash@{0} (59ddd5dbb9c38790230b770df3e5548cf145f37e)
```

Now keep finishing the job.

```bash
git add .
git commit -m "Update: new feature"
```

# Advanced use

## Stash with message

Try git-stash command with message.

```bash
touch test_stash_message
git stash save -u "Testing message for stash"
git stash list
```

Then you will see the stash message as shown following.

```
stash@{0}: On some-feature: Testing message for stash
```

## Multiple stashes

Also we can create more than one stash.

```bash
touch test_multiple_stash
git stash save -u "Another stash"
git stash list
```

Then you will see two rows of stash messages as shown following.

```
stash@{0}: On some-feature: Another stash
stash@{1}: On some-feature: Testing message for stash
```

## Restore specific stash

As messages shown above, if we need to restore the second row of stash, try git-stash-pop with stash number `n` in stash@{n}.

```bash
git stash pop 1
```

Then you will get the following message. The change with file test_stash_message has been restored.

```
Already up to date!
On branch feature/some-feature
Untracked files:
  (use "git add <file>..." to include in what will be committed)
	test_stash_message

nothing added to commit but untracked files present (use "git add" to track)
Dropped refs/stash@{1} (73f65df815a3f4ebf6f417f72ebf6d7ebfff65b8)
```

## Show difference in stash

If you don’t remember what you’ve done in specific stash, try git-stash-show.

Make some changes and stash it again.

```bash
echo "A new row" >> test_stash_message
echo "Another new row" >> test_stash_message
git add .
git stash save -u "Show difference"
git stash list
```

As we can see, the corresponding stash number shown below.

```
stash@{0}: On some-feature: Show difference
stash@{1}: On some-feature: Another stash
```

Use git-stash-show with stash number to see specific change status, or simply use git-stash-show to show all differences in stashes.

```bash
git stash show  # This shows all differences in each stash
git stash show 0
```

Differences will be shown.

```
test_stash_message | 2 ++
1 file changed, 2 insertions(+)
```