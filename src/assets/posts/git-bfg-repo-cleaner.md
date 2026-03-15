---
{
  "title": "刪除 Git 儲存庫大型歷史檔案 - BFG Repo-Cleaner",
  "categoryId": 12,
  "categoryName": "Git",
  "labels": [
    {
      "labelId": 1,
      "labelName": "版本更新"
    }
  ],
  "createDate": "2025-07-10T23:23:18.424Z",
  "references": [
    "https://www.java.com/zh-tw/download/help/download_options.html",
    "https://rtyley.github.io/bfg-repo-cleaner/"
  ],
  "flag": "Y"
}
---
## 步驟一：安裝 Java

[Java 8, 11, 17, 21, 23 Download for Linux, Windows and macOS](https://www.azul.com/downloads/?package=jdk#zulu)

![](/assets/images/git-bfg-repo-cleaner/1.png)

安裝完成輸入java

![](/assets/images/git-bfg-repo-cleaner/1.png)

## 步驟二：下載 BFG Repo-Cleaner

[BFG Repo-Cleaner 由 rtyley](https://rtyley.github.io/bfg-repo-cleaner/)

![](/assets/images/git-bfg-repo-cleaner/3.png)

改名成bfg.jar方便執行

![](/assets/images/git-bfg-repo-cleaner/1.png)

## 步驟三：備份倉庫

![](/assets/images/git-bfg-repo-cleaner/3.png)

## 步驟四：開始清理

他預設會針對master分支做檔案保護，如果你的東西有在master上，他會保留

針對自身情況決定要不要使用**\--no-blob-protection 關閉防護模式**

bfg檔案放到與你git同層

![](/assets/images/git-bfg-repo-cleaner/6.png)

終端機打開

```shell
java -jar bfg.jar --strip-blobs-bigger-than 100M
```

![](/assets/images/git-bfg-repo-cleaner/7.png)

跑完輸入執行清掉 reflog 與不參照的物件

```shell
git reflog expire --expire=now --all && git gc --prune=now --aggressive
```

強制推送到遠端: 使用 `--force` 參數將更改推送到遠端倉庫，請注意**當時無協作同仁**正在修改，會影響到他們的異動

```shell
git push origin --force --all
```

遠端倉庫執行GC回收時，容量才會變小
