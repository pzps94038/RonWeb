---
{
  'title': 'Windows IIS 架設FTP 站台',
  'categoryId': 17,
  'categoryName': 'Windows',
  'labels': [{ 'labelId': 32, 'labelName': 'IIS' }],
  'createDate': '2025-04-24T19:15:45.989Z',
  'references':
    [
      'https://tech.gjlmotea.com/2021/03/windowsiiswin10iis-ftp-server-macos.html',
      'http://ftp.icpdas.com/pub/cd/xp-8000/document/faq/tc/network/w400201_how_to_set_up_ftp_server_tc.pdf',
    ],
  'flag': 'Y',
}
---

## 步驟一：啟動 Windows 的 IIS 及 FTP 功能

![](/assets/images/windows-iis-ftp-setup/1.png)

![](/assets/images/windows-iis-ftp-setup/1.png)

![](/assets/images/windows-iis-ftp-setup/2.png)

![](/assets/images/windows-iis-ftp-setup/2.png)

## 步驟二：IIS 新增 FTP 站台

![](/assets/images/windows-iis-ftp-setup/4.png)

![](/assets/images/windows-iis-ftp-setup/3.png)

## 步驟三：配置 FTP 設定

![](/assets/images/windows-iis-ftp-setup/4.png)

這邊可以根據個人需求設定 IP、PORT、SSL 憑證

![](/assets/images/windows-iis-ftp-setup/8.png)

配置授權

![](/assets/images/windows-iis-ftp-setup/5.png)

驗證差別

```plaintext
🔓 匿名驗證（Anonymous Authentication）
意思：不需要登入，用戶一連上就可以瀏覽網站或連接 FTP。
使用者帳號：實際上是使用 IIS 預設的帳號，例如 IUSR，來執行網站/FTP 的請求。
常見用途：
公開網站，像是首頁、形象網站。
FTP 用來給訪客下載公開資料。
```

```plaintext
🔐基本驗證（Basic Authentication）
意思：用戶必須輸入帳號密碼才能存取資源。
驗證方式：帳號密碼會以 Base64 編碼（不是加密） 傳輸，所以通常要搭配 SSL/TLS（HTTPS/FTPS） 使用，否則很容易被攔截。
用戶來源：本機使用者帳號、Active Directory 等。
常見用途：
內部網站或 FTP 伺服器，需要限制特定帳號使用。
客製化系統登入驗證。
```

允許存取

可以設定哪個 Windows 使用者可使用

## 步驟四：防火牆設定

![](/assets/images/windows-iis-ftp-setup/8.png)

設定同 FTP 的 PORT

![](/assets/images/windows-iis-ftp-setup/11.png)

![](/assets/images/windows-iis-ftp-setup/6.png)

![](/assets/images/windows-iis-ftp-setup/10.png)

![](/assets/images/windows-iis-ftp-setup/11.png)

## 步驟五：測試連線

```plaintext
ftp://IP或者DOMAIN NAME:PORT/
```

![](/assets/images/windows-iis-ftp-setup/15.png)

## 步驟六：設定限定使用者

![](/assets/images/windows-iis-ftp-setup/7.png)

![](/assets/images/windows-iis-ftp-setup/17.png)

![](/assets/images/windows-iis-ftp-setup/8.png)

![](/assets/images/windows-iis-ftp-setup/9.png)

![](/assets/images/windows-iis-ftp-setup/20.png)

![](/assets/images/windows-iis-ftp-setup/15.png)

![](/assets/images/windows-iis-ftp-setup/16.png)

![](/assets/images/windows-iis-ftp-setup/23.png)

![](/assets/images/windows-iis-ftp-setup/24.png)

![](/assets/images/windows-iis-ftp-setup/17.png)

![](/assets/images/windows-iis-ftp-setup/26.png)

輸入剛建立的 USER

![](/assets/images/windows-iis-ftp-setup/10.png)

重新連線 FTP 會需要輸入剛剛建立的使用者名稱及密碼

![](/assets/images/windows-iis-ftp-setup/28.png)

上傳成功

![](/assets/images/windows-iis-ftp-setup/19.png)

網址會變成

```plaintext
ftp://使用者名稱@IP或者DOMAIN NAME:PORT/
```
