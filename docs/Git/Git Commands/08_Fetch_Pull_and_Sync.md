---
sidebar_position: 8
title: "Module 8：Fetch、Pull 與遠端同步"
description: 分辨 fetch 和 pull，先檢查再整合遠端更新，並建立一套安全的日常同步流程。
---

# Module 8：Fetch、Pull 與遠端同步

當 GitHub 上的版本比本機更新時，可以用 `fetch` 取得資訊，再決定如何整合；也可以用 `pull` 一次完成取得與整合。

## 先認識三種分支名稱

假設你正在 `main` 工作：

- `main`：本機可直接 commit 的本地分支。
- `origin/main`：本機記錄的「遠端 main 上次已知位置」。
- GitHub 上的 `main`：真正位於遠端伺服器的分支。

執行 `git fetch origin` 後，Git 才會更新本機的 `origin/main`。

## Fetch 和 Pull 的差別

| 指令 | 下載遠端資訊 | 立刻整合到目前分支 | 適合情境 |
|---|---:|---:|---|
| `git fetch` | 是 | 否 | 想先檢查再決定 |
| `git pull` | 是 | 是 | 已了解差異，想直接同步 |

概念上：

```text
git pull = git fetch + 整合（merge、rebase 或 fast-forward）
```

## 最容易理解的安全流程：Fetch → 檢查 → Merge

### Step 1：確認目前狀態

```bash
git status
git branch --show-current
```

先處理未 commit 的工作，避免同步時把多種修改混在一起。

### Step 2：取得遠端最新資訊

```bash
git fetch origin
```

這一步會更新 `origin/*`，但不會直接改動目前工作目錄。

### Step 3：查看遠端多了哪些 Commit

```bash
git log --oneline HEAD..origin/main
```

查看檔案差異：

```bash
git diff HEAD..origin/main
```

如果兩個指令沒有輸出，通常表示遠端 `main` 沒有比目前分支多出內容。

### Step 4：只接受 Fast-forward 更新

```bash
git merge --ff-only origin/main
```

`--ff-only` 只在本機沒有分岔時更新。若本機與遠端各自有新 commit，指令會停止，讓你先理解狀況，不會自動產生意外的 merge commit。

## Pull 的簡潔用法

已設定 upstream 後，可以使用：

```bash
git pull --ff-only
```

它適合日常更新 `main`。若無法 fast-forward，先查看：

```bash
git status
git log --oneline --graph --decorate --all -20
```

再依團隊流程選擇 merge 或 rebase，不要看到失敗就直接加 `--force`。

## Step-by-step 練習：從 GitHub 產生遠端更新

這個練習會讓你親眼看到 fetch 不會立即改檔案。

1. 確認本機 `main` 是乾淨的：

   ```bash
   git switch main
   git status
   ```

2. 到 GitHub 開啟 repository 的 `README.md`，用網頁編輯器新增一行並 commit。
3. 回到本機執行：

   ```bash
   git fetch origin
   git status
   git log --oneline HEAD..origin/main
   ```

4. 此時 Git 已知道遠端有新 commit，但本機 README 尚未更新。
5. 整合更新：

   ```bash
   git merge --ff-only origin/main
   ```

6. 打開 README，確認已看到 GitHub 上新增的內容。

## 更新功能分支的兩種方式

假設你在 `feature/search`，而 `origin/main` 已前進。

### 方式 A：Merge，保留真實分岔歷史

```bash
git fetch origin
git switch feature/search
git merge origin/main
```

優點是不用重寫功能分支既有 commit，適合共享分支。

### 方式 B：Rebase，讓歷史保持直線

```bash
git fetch origin
git switch feature/search
git rebase origin/main
```

適合只有自己使用的功能分支。Rebase 會改變 commit 編號；共享分支需遵守團隊規則。

## 清理已不存在的遠端分支紀錄

別人在 GitHub 刪除分支後，本機的 `origin/old-branch` 可能還看得到。可以執行：

```bash
git fetch --prune origin
```

這只清理本機的遠端追蹤紀錄，不會刪除你的本地分支。

## 尚未完成工作時需要同步

最清楚的做法是先完成一個小 commit。若修改還不能 commit，可暫存到 stash：

```bash
git status
git stash push -u -m "WIP before sync"
git pull --ff-only
git stash pop
```

- `-u` 會一併保存 untracked files。
- `stash pop` 重新套用時仍可能衝突，需像一般衝突一樣處理。
- Stash 適合短期暫放，不應當成長期備份。

查看 stash：

```bash
git stash list
```

## 一套日常工作流程

開始工作：

```bash
git switch main
git pull --ff-only
git switch -c feature/my-task
```

開發中：

```bash
git status
git diff
git add <files>
git diff --staged
git commit -m "feat: describe the change"
```

準備 Push / PR：

```bash
git fetch origin
git rebase origin/main  # 僅限自己使用的功能分支
git push -u origin feature/my-task
```

PR 合併後：

```bash
git switch main
git pull --ff-only
git branch -d feature/my-task
git fetch --prune origin
```

## 常見錯誤

### `Your local changes would be overwritten`

先執行 `git status` 與 `git diff`。選擇 commit、stash，或確定不需要後再還原；不要為了完成 pull 而隨意刪除修改。

### 本地和遠端各有 Commit

這叫 diverged。先用版本圖確認兩邊內容：

```bash
git log --oneline --graph --decorate --all -20
```

共享分支通常用 merge；自己的功能分支可依團隊規則 rebase。

### `git fetch` 後檔案沒有變

這是正常行為。Fetch 只更新遠端追蹤資訊；接著需 `git merge origin/main`、`git rebase origin/main`，或使用合適的 pull 策略。

## 指令小抄

| 指令 | 用途 |
|---|---|
| `git fetch origin` | 取得遠端最新資訊，不改目前檔案 |
| `git log HEAD..origin/main` | 查看遠端比本機多的 commit |
| `git merge --ff-only origin/main` | 僅在可快轉時整合遠端 main |
| `git pull --ff-only` | 取得並快轉更新目前分支 |
| `git fetch --prune origin` | 清理已刪除的遠端分支紀錄 |
| `git stash push -u -m "..."` | 暫存未完成修改 |

## 完成這個系列後

你已經走過一套完整流程：安裝與設定 → GitHub 與 SSH → clone → add / commit / push → branch / merge → Pull Request → 歷史調整 → 遠端同步。

接下來最有效的練習，是把一個小型個人專案完整走過這套流程。遇到問題時，先保留 `git status`、版本圖與錯誤訊息，再判斷是哪個位置、哪條分支出了問題。

## 官方文件

- [git fetch](https://git-scm.com/docs/git-fetch)
- [git pull](https://git-scm.com/docs/git-pull)
- [git stash](https://git-scm.com/docs/git-stash)
