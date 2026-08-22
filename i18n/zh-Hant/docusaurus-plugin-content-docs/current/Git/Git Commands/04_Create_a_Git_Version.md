---
sidebar_position: 4
title: "Module 4：建立版本、.gitignore 與 Push"
description: 逐步走完 status、diff、add、commit、log 與 push，並學會忽略不該進版控的檔案。
---

# Module 4：建立版本、.gitignore 與 Push

這一篇會完成最重要的 Git 日常循環：查看狀態、選擇修改、建立 commit，最後推送到 GitHub。

```mermaid
flowchart LR
    A["修改檔案"] --> B["git status / git diff"]
    B --> C["git add"]
    C --> D["git diff --staged"]
    D --> E["git commit"]
    E --> F["git push"]
```

## 開始前

進入 Module 2 clone 的 repository：

```bash
cd ~/git-projects/git-practice-remote
git status
```

請確認目前在 `main`，而且沒有不明的修改。若你的路徑不同，請換成實際位置。

## Step 1：修改檔案並查看狀態

在 `README.md` 最後加上一行：

```bash
echo "Learning Git step by step." >> README.md
git status
```

`modified: README.md` 表示工作目錄中的檔案和上一個 commit 不同。

查看實際改了哪些行：

```bash
git diff
```

在 diff 中：

- `+` 開頭代表新增的行。
- `-` 開頭代表移除的行。
- 它們是差異標記，不是檔案真正的內容。

## Step 2：把修改加入暫存區

```bash
git add README.md
git status
```

此時檔案會出現在 `Changes to be committed`。建立 commit 前，再檢查一次將要提交的內容：

```bash
git diff --staged
```

:::tip 為什麼不直接 `git add .`？

`git add .` 會加入目前目錄下的所有修改。初學時先指定檔名，比較不容易把測試檔、密碼或不相關修改一起放進 commit。

:::

### 如果加錯檔案

把檔案移出暫存區，但保留工作目錄中的修改：

```bash
git restore --staged README.md
```

確認後可再次執行 `git add README.md`。

## Step 3：建立 Commit

```bash
git commit -m "docs: add Git learning note"
```

好的 commit message 應簡短說明這一版「完成了什麼」。例如：

- `docs: update installation guide`
- `feat: add login form`
- `fix: handle empty username`

再次確認：

```bash
git status
git log --oneline --decorate -5
```

`working tree clean` 代表目前修改都已提交。

## Step 4：使用 `.gitignore`

有些檔案不應進入版本控制，例如：

- 密碼或金鑰檔：`.env`
- 套件安裝結果：`node_modules/`
- Python 快取：`__pycache__/`
- 作業系統產生的檔案：`.DS_Store`
- 建置輸出或大型暫存檔

建立 `.gitignore`：

```gitignore title=".gitignore"
.env
node_modules/
__pycache__/
*.pyc
.DS_Store
```

接著建立版本：

```bash
git add .gitignore
git diff --staged
git commit -m "chore: add ignore rules"
```

### 已被追蹤的檔案不會自動消失

如果檔案在加入 `.gitignore` 前已經 commit，需先停止追蹤，但保留本機檔案：

```bash
git rm --cached <file>
git commit -m "chore: stop tracking generated file"
```

若敏感資料已推送到遠端，只刪除目前檔案仍不夠；應立即撤銷或更換該密碼，並另外處理歷史紀錄。

## Step 5：查看舊版本，不修改歷史

先找一個 commit 編號：

```bash
git log --oneline
```

暫時查看某個舊版本：

```bash
git switch --detach <commit-id>
```

看完回到 `main`：

```bash
git switch main
```

`detached HEAD` 適合查看舊版本，不適合直接開始長期開發。要保留在舊版本上的新修改，應建立分支：

```bash
git switch -c experiment-from-old-version <commit-id>
```

## Step 6：Push 到 GitHub

```bash
git push -u origin main
```

- `origin`：遠端儲存庫的預設名稱。
- `main`：要推送的本地分支。
- `-u`：把本地 `main` 與 `origin/main` 設為追蹤關係；之後通常只需 `git push`。

推送成功後，重新整理 GitHub repository 頁面，應可看到 README、`.gitignore` 與最新 commit。

## 還原未提交的修改

若只想放棄某個檔案在工作目錄的修改：

```bash
git restore <file>
```

:::warning 這會丟棄內容

`git restore <file>` 會用上一個 commit 的版本覆蓋目前修改。先用 `git diff` 確認真的不要，再執行。

:::

## 每次 Commit 前的檢查清單

```bash
git status
git diff
git add <file>
git diff --staged
git commit -m "清楚描述這次修改"
git status
```

需要同步到 GitHub 時再執行：

```bash
git push
```

## 指令小抄

| 指令 | 用途 |
|---|---|
| `git diff` | 查看尚未暫存的差異 |
| `git add <file>` | 把指定修改放入暫存區 |
| `git diff --staged` | 查看下一個 commit 的內容 |
| `git commit -m "..."` | 建立本地版本 |
| `git log --oneline` | 簡潔顯示版本歷史 |
| `git push -u origin main` | 第一次推送並設定追蹤關係 |
| `git restore --staged <file>` | 取消暫存，保留檔案修改 |
| `git restore <file>` | 放棄尚未 commit 的檔案修改 |
