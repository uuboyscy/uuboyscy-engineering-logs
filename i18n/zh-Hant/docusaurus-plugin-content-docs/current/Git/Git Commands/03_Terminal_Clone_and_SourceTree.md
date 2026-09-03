---
sidebar_position: 3
title: "Module 3：終端機基礎、Clone 與 SourceTree"
description: 學會操作路徑與檔案，將遠端 repository clone 到本機，並選擇性使用 SourceTree。
---

# Module 3：終端機基礎、Clone 與 SourceTree

Git 指令會作用在「終端機目前所在的資料夾」。因此開始操作前，先確認路徑，能避免在錯誤的專案執行指令。

## 學完這篇，你可以

- 用終端機切換目錄、建立與查看檔案。
- 將 GitHub repository clone 到本機。
- 查看目前分支、遠端位置與最近版本。
- 把既有 repository 加入 SourceTree 圖形介面。

## 常用終端機指令

以下指令可在 macOS、Linux 與 Windows 的 Git Bash 使用：

| 指令 | 用途 | 範例 |
|---|---|---|
| `pwd` | 顯示目前所在路徑 | `pwd` |
| `ls` | 列出檔案 | `ls` |
| `ls -la` | 包含隱藏檔的詳細清單 | `ls -la` |
| `cd <path>` | 前往指定目錄 | `cd projects` |
| `cd ..` | 回到上一層目錄 | `cd ..` |
| `mkdir <name>` | 建立資料夾 | `mkdir practice` |
| `touch <file>` | 建立空檔案 | `touch notes.txt` |
| `mv <old> <new>` | 移動或重新命名 | `mv old.txt new.txt` |
| `rm <file>` | 刪除檔案 | `rm notes.txt` |
| `clear` | 清除終端機畫面 | `clear` |

:::danger 小心刪除指令

終端機的 `rm` 通常不會把檔案放進資源回收筒。初學時不要使用不熟悉的 `rm -r` 或 `rm -rf` 指令。

:::

## 路徑的三個符號

- `.`：目前目錄。
- `..`：上一層目錄。
- `~`：目前使用者的家目錄。

例如：

```bash
cd ~
mkdir git-projects
cd git-projects
pwd
```

## Step 1：再確認一次 Git 身分

```bash
git config --global user.name
git config --global user.email
```

若沒有輸出，回到 Module 1 完成設定。想知道某項設定來自哪個檔案，可使用：

```bash
git config --show-origin --get user.name
```

## Step 2：取得 Clone 網址

1. 開啟 Module 2 建立的 `git-practice-remote` repository。
2. 選擇 **Code → Local → SSH**。
3. 複製 `git@github.com:...` 網址。

如果 SSH 還沒設定完成，也可以選擇 HTTPS；但推送時需要使用 GitHub 支援的登入方式，不能把 GitHub 帳號密碼直接當成 Git 密碼。

## Step 3：Clone 到專案資料夾

```bash
cd ~/git-projects
git clone git@github.com:YOUR_ACCOUNT/git-practice-remote.git
cd git-practice-remote
```

`git clone` 會一次完成三件事：

1. 下載檔案。
2. 下載完整的 Git 歷史。
3. 建立名為 `origin` 的遠端連線。

## Step 4：檢查 Clone 結果

```bash
pwd
ls -la
git status
git branch --show-current
git remote -v
git log --oneline --decorate -5
```

你應該看到：

- 目前位於 `git-practice-remote` 資料夾。
- 目前分支是 `main`。
- `origin` 指向自己的 GitHub repository。
- `git status` 顯示工作目錄沒有未提交修改。

:::tip 先 status，再操作

養成執行 Git 指令前先看 `git status` 的習慣。它會告訴你目前分支、哪些檔案被修改，以及下一步可用的指令。

:::

## Step 5：做一個不改變版本的練習

```bash
echo "Terminal practice" > terminal-notes.txt
git status
ls -la
```

現在 `terminal-notes.txt` 是 untracked file。先不要 commit；下一篇會逐步完成一次正式版本。

不想保留這個練習檔時，可以刪除：

```bash
rm terminal-notes.txt
git status
```

## 選用：用 SourceTree 查看 Repository

SourceTree 是 Git 的圖形介面，不是使用 Git 的必要條件。建議先理解指令，再把它當作查看版本圖與差異的輔助工具。

1. 從 [SourceTree 官方網站](https://www.sourcetreeapp.com/) 下載並安裝。
2. 開啟 SourceTree，選擇新增本地 repository 的功能。
3. Browse / Destination Path 選擇剛才 clone 的 `git-practice-remote` 資料夾。
4. 完成加入後，確認能看到 `main` 與 commit 歷史。

不同作業系統與版本的按鈕文字可能略有差異，但核心概念相同：**讓 SourceTree 開啟一個已含 `.git` 的資料夾**。

## 常見問題

### `fatal: not a git repository`

目前不在 Git repository 裡。用 `pwd` 確認位置，再 `cd` 到正確的專案資料夾。

### `Permission denied (publickey)`

SSH 驗證未完成。回到 Module 2，依序確認金鑰、ssh-agent、GitHub 公鑰與 `ssh -T git@github.com`。

### `destination path ... already exists`

目標資料夾已存在。不要直接覆蓋；先用不同名稱 clone：

```bash
git clone <repository-url> git-practice-copy
```

## 指令小抄

| 指令 | 用途 |
|---|---|
| `git clone <url>` | 下載遠端 repository 與完整歷史 |
| `git branch --show-current` | 顯示目前分支 |
| `git remote -v` | 顯示遠端名稱與網址 |
| `git log --oneline -5` | 顯示最近 5 個 commit |
| `git status` | 顯示目前工作狀態 |
