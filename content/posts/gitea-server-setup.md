---
{
  'title': 'Gitea 伺服器架設',
  'categoryId': 12,
  'categoryName': 'Git',
  'labels': [{ 'labelId': 29, 'labelName': 'Windows' }],
  'createDate': '2025-05-01T21:47:10.232Z',
  'references':
    [
      'https://dl.gitea.com/gitea/',
      'http://jdev.tw/blog/7125',
      'https://docs.gitea.com/administration/config-cheat-sheet',
      'https://github.com/go-gitea/gitea/blob/main/custom/conf/app.example.ini',
    ],
  'flag': 'Y',
}
---

## 步驟一：下載與安裝檔案

[Gitea | gitea](https://dl.gitea.com/gitea/)

![](/assets/images/gitea-server-setup/1.png)

下載對應環境的安裝檔

![](/assets/images/gitea-server-setup/2.png)

## 步驟二：建立存放資料夾

![](/assets/images/gitea-server-setup/3.png)

## 步驟三：啟動 Gitea 服務

![](/assets/images/gitea-server-setup/4.png)

![](/assets/images/gitea-server-setup/4.png)

## 步驟四：設定防火牆

![](/assets/images/gitea-server-setup/3.png)

![](/assets/images/gitea-server-setup/6.png)

![](/assets/images/gitea-server-setup/7.png)

![](/assets/images/gitea-server-setup/9.png)

![](/assets/images/gitea-server-setup/4.png)

![](/assets/images/gitea-server-setup/11.png)

![](/assets/images/gitea-server-setup/12.png)

![](/assets/images/gitea-server-setup/13.png)

## 步驟五：進入 Gitea 系統設定

針對 Gitea 做系統設定

![最後的安裝步驟](https://miro.medium.com/v2/resize:fit:875/0*VdgIrrZXAam-5bo3.png)

## 步驟六：配置 app.ini 細部設定

**官方設定的文件說明**

文件內涵蓋了 Gitea 的所有配置選項，並且會詳細說明每一個設定項目應該如何配置。

你可以查閱官方文檔來獲取更詳細的設置指南及使用示例

[Configuration Cheat Sheet | Gitea Documentation](https://docs.gitea.com/administration/config-cheat-sheet)

### **官方提供的範例檔案**

Gitea 官方提供了範例配置檔案，名為 `app.example.ini`，這是一個預設的配置範本，包含了常見的設定選項。你可以參照這個檔案來設置你的 Gitea 實例

[gitea/custom/conf/app.example.ini at main · go-gitea/gitea](https://github.com/go-gitea/gitea/blob/main/custom/conf/app.example.ini)

## 步驟七：倉庫遷移

少量的話可以使用 Gitea 本身的遷移外部儲存庫，本身有支援多種，但缺點只能針對單個倉庫一個一個處理

如果是針對一個組織全部搬移到新的倉庫，建議寫一個批次用指令做搬移

```plaintext
變數說明：
{token}
說明：此處應替換為你的 Git 訪問令牌（Access Token）。此令牌用來進行身份驗證，允許你訪問指定的倉庫。
{orgUrl}
說明：此處應替換為原GIT 倉庫的IP、DOMAIN + PORT
{orgUrl}
說明：此處應替換為新GIT 倉庫的IP、DOMAIN + PORT
{fullName}
說明：此處應替換為倉庫的完整名稱，通常為 {organization}/{repository} 的格式。這個名稱指向要克隆的特定 Git 倉庫。

第一步 對Clone下來的倉庫設定新origin
git clone --mirror http://{token}@{orgUrl}/{fullName}.git

第二步 Gitea建立對應名稱的倉庫，可以使用API或手動建立

第三步 進到對應倉庫的資料夾

第四步 設定新倉庫為新origin
git remote add new-origin http://{token}@{targetUrl}/{fullName}.git

第五步
git push --mirror new-origin
```

![](/assets/images/gitea-server-setup/9.png)

![](/assets/images/gitea-server-setup/15.png)
