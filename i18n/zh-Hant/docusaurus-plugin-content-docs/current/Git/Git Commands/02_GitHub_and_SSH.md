---
sidebar_position: 2
title: "Module 2：認識 GitHub、建立 Repository 與 SSH Key"
description: 認識 Git 和 GitHub 的分工，建立遠端儲存庫並完成 SSH 連線。
---

# Module 2：認識 GitHub、建立 Repository 與 SSH Key

Git 可以單獨在你的電腦上運作；GitHub 則是保存 Git 儲存庫、進行程式碼審查與團隊合作的線上平台。

## Git 和 GitHub 不一樣

| Git | GitHub |
|---|---|
| 安裝在電腦上的版本控制工具 | 提供 Git 儲存庫託管的網站與服務 |
| 沒有網路也能 commit | push、pull 與線上協作需要網路 |
| 管理檔案版本與分支 | 提供 Pull Request、Issue、Actions 等功能 |

```mermaid
flowchart LR
    A["你的電腦<br/>Git 本地儲存庫"] <-->|"push / fetch / pull"| B["GitHub<br/>遠端儲存庫"]
    B <-->|"Pull Request / Review"| C["團隊成員"]
```

## Step 1：註冊 GitHub 帳號

1. 前往 [GitHub](https://github.com/)。
2. 選擇 **Sign up**。
3. 填寫 Email、密碼與使用者名稱。
4. 完成 Email 驗證。

建議同時開啟兩步驟驗證（2FA），避免帳號只靠一組密碼保護。

## Step 2：建立第一個 Repository

1. 登入後開啟 [New repository](https://github.com/new)。
2. Repository name 輸入 `git-practice-remote`。
3. 第一次練習可選擇 **Private**。
4. 開啟 **Add README**。
5. 選擇 **Create repository**。

Repository 建立後，先認識幾個常見區域：

| 區域 | 用途 |
|---|---|
| Code | 查看檔案、commit 與分支 |
| Issues | 記錄需求、問題與討論 |
| Pull requests | 提出、審查與合併修改 |
| Actions | 執行自動測試或部署流程 |
| Settings | 管理權限、分支規則與其他設定 |

> GitHub 介面會持續更新。如果按鈕位置與本文略有不同，找相同名稱的功能即可。

## Clone、Fork 和 Download ZIP 的差別

| 操作 | 會保留 Git 歷史嗎？ | 常見用途 |
|---|---:|---|
| Clone | 會 | 在本機持續開發與同步 |
| Fork | 會，並在自己的 GitHub 建立副本 | 參與沒有直接寫入權限的專案 |
| Download ZIP | 不會 | 只想取得目前檔案，不打算同步 |

## Step 3：建立 SSH Key

SSH Key 由一對金鑰組成：

- **私鑰**留在自己的電腦，絕對不能傳給別人。
- **公鑰**可以登錄到 GitHub。

先查看電腦中是否已有金鑰：

```bash
ls -al ~/.ssh
```

如果沒有 `id_ed25519` 與 `id_ed25519.pub`，建立新金鑰：

```bash
ssh-keygen -t ed25519 -C "you@example.com"
```

操作時：

1. `Enter file in which to save the key`：沒有舊金鑰時可直接按 Enter。
2. `Enter passphrase`：建議設定一組金鑰密碼。
3. 再輸入一次相同密碼。

:::warning 不要覆蓋舊金鑰

如果終端機提示指定檔案已存在，先回答 `n`，再參考 GitHub 官方說明建立自訂名稱的金鑰。

:::

## Step 4：把私鑰加入 ssh-agent

### macOS / Linux / Git Bash

```bash
eval "$(ssh-agent -s)"
ssh-add ~/.ssh/id_ed25519
```

macOS 若希望把密碼保存在鑰匙圈，可依 GitHub 官方說明使用：

```bash
ssh-add --apple-use-keychain ~/.ssh/id_ed25519
```

## Step 5：把公鑰加入 GitHub

先顯示公鑰：

```bash
cat ~/.ssh/id_ed25519.pub
```

複製從 `ssh-ed25519` 開始的**整行內容**，接著：

1. GitHub 右上角頭像 → **Settings**。
2. 選擇 **SSH and GPG keys**。
3. 選擇 **New SSH key**。
4. Title 填一個能辨認電腦的名稱，例如 `home-laptop`。
5. Key 貼上剛才的公鑰，完成新增。

## Step 6：測試 SSH 連線

```bash
ssh -T git@github.com
```

第一次連線可能詢問是否信任 GitHub 主機，確認畫面顯示的主機是 `github.com` 後輸入 `yes`。成功時會看到包含你 GitHub 使用者名稱的驗證成功訊息。

## Step 7：用 SSH Clone Repository

在 GitHub repository 頁面選擇 **Code → Local → SSH**，複製類似以下的網址：

```text
git@github.com:YOUR_ACCOUNT/git-practice-remote.git
```

回到終端機：

```bash
cd ..
git clone git@github.com:YOUR_ACCOUNT/git-practice-remote.git
cd git-practice-remote
git remote -v
git status
```

請把 `YOUR_ACCOUNT` 換成自己的 GitHub 使用者名稱。`git remote -v` 顯示的 `origin`，就是這個本地儲存庫預設連線的遠端位置。

## 安全檢查

- 可以分享：`id_ed25519.pub` 公鑰內容。
- 不可分享：`id_ed25519` 私鑰內容。
- 不要把密碼、API Key、`.env` 檔 commit 到 Git。
- 不確定 SSH 指令或主機指紋時，先停下來確認，不要直接接受。

## 延伸閱讀

- [GitHub：Repository 快速入門](https://docs.github.com/en/repositories/creating-and-managing-repositories/quickstart-for-repositories)
- [GitHub：建立 SSH Key 並加入 ssh-agent](https://docs.github.com/en/authentication/connecting-to-github-with-ssh/generating-a-new-ssh-key-and-adding-it-to-the-ssh-agent)
- [GitHub：測試 SSH 連線](https://docs.github.com/en/authentication/connecting-to-github-with-ssh/testing-your-ssh-connection)
