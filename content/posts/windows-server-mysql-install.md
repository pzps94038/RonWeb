---
{
  'title': 'Windows Server 安裝 MySQL',
  'categoryId': 14,
  'categoryName': '資料庫',
  'labels': [{ 'labelId': 3, 'labelName': 'MySQL' }],
  'createDate': '2025-09-03T19:34:30.128Z',
  'references':
    ['https://dev.mysql.com/downloads/mysql/', 'https://aka.ms/vs/17/release/vc_redist.x64.exe'],
  'flag': 'Y',
}
---

## 步驟一：下載 MySQL

進到官方下載，安裝最新版本

[MySQL :: Download MySQL Community Server](https://dev.mysql.com/downloads/mysql/)

![](/assets/images/windows-server-mysql-install/1.png)

## 步驟二：下載 Visual Studio 2019 x64 Redistributable

![](/assets/images/windows-server-mysql-install/2.png)

[最新支援的 Visual C++ 可轉散發套件下載 | Microsoft Learn](https://learn.microsoft.com/zh-tw/cpp/windows/latest-supported-vc-redist?view=msvc-170)  
![](/assets/images/windows-server-mysql-install/3.png)



## 步驟三：安裝流程

![](/assets/images/windows-server-mysql-install/3.png)

![](/assets/images/windows-server-mysql-install/4.png)  
個人選**Typical**  
![](/assets/images/windows-server-mysql-install/5.png)  
**Typical（典型安裝）**

安裝最常用的程式功能。

推薦給大多數一般使用者。

會自動選擇主要元件，安裝路徑也自動設定。



**Custom（自訂安裝）**

讓你自己選擇要安裝哪些元件、安裝路徑、資料目錄等細節。

推薦給有經驗的進階使用者。



**Complete（完整安裝）**

安裝所有可用的程式功能和元件。

會占用最多的磁碟空間。

![](/assets/images/windows-server-mysql-install/2.png)  
![](/assets/images/windows-server-mysql-install/3.png)

## 步驟四：配置設定

![](/assets/images/windows-server-mysql-install/4.png)  
![](/assets/images/windows-server-mysql-install/9.png)  
根據自身條件設定環境類型及使用 PORT  
![](/assets/images/windows-server-mysql-install/10.png)  
![](/assets/images/windows-server-mysql-install/5.png)  
![](/assets/images/windows-server-mysql-install/13.png)

![](/assets/images/windows-server-mysql-install/14.png)  
![](/assets/images/windows-server-mysql-install/15.png)  
![](/assets/images/windows-server-mysql-install/12.png)  
![](/assets/images/windows-server-mysql-install/6.png)  
![](/assets/images/windows-server-mysql-install/18.png)  
![](/assets/images/windows-server-mysql-install/14.png)

## 步驟五：建立新 User 配置可連線 IP

$PORT = 根據上面安裝 PORT 設定  
進到安裝資料夾

![](/assets/images/windows-server-mysql-install/7.png)

```plaintext
mysql -h localhost -P $PORT -u root -p
```

% = 萬用 IP

```plaintext
create user '使用者'@'指定IP' identified by 'root@Root密碼';
```

變更密碼

```plaintext
alter user '使用者'@'指定IP' IDENTIFIED BY '密碼';
```

設定權限

```plaintext
GRANT ALL PRIVILEGES ON * . * TO '使用者'@'指定IP';
```
