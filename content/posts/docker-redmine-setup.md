---
{
  'title': '利用Docker快速建立一個Redmine專案管理系統',
  'categoryId': 4,
  'categoryName': 'Docker',
  'labels': [{ 'labelId': 3, 'labelName': 'MySQL' }, { 'labelId': 19, 'labelName': 'Docker' }],
  'createDate': '2023-06-26T06:46:42.306Z',
  'references':
    [
      'https://github.com/docker-library/redmine/issues/155',
      'https://github.com/redmine/redmine/blob/4.1.0/config/configuration.yml.example',
      'https://hub.docker.com/_/redmine/',
      'https://www.jinnsblog.com/2021/08/redmine-must-know-setting-guide.html',
      'https://zhuanlan.zhihu.com/p/493253076',
    ],
  'flag': 'Y',
}
---

今天這篇文章是使用[redmine - Official Image | Docker Hub](https://hub.docker.com/_/redmine/)來實作，當中的資料庫我是使用現有的 Mysql 資料庫

## 步驟一：建立空的 MySQL 資料庫

先建立空的 Mysql 資料庫，提供 Redmine 來做存取資料使用

![](/assets/images/docker-redmine-setup/1.png)

## 步驟二：建立 configuration.yml 檔案

先建立 configuration.yml 檔案

官方 remine 有很多設定範例提供在[redmine/config/configuration.yml.example at 4.1.0 · redmine/redmine · GitHub](https://github.com/redmine/redmine/blob/4.1.0/config/configuration.yml.example)

這邊我使用最簡易的 Google 信箱當作寄送信箱，整個檔案設定如下

當中密碼為[應用程式密碼 (google.com)](https://myaccount.google.com/apppasswords?rapt=AEjHL4PAZ5KDfX9NiPiXX2nWz4is8ndUMKj_cSRo_NOCMmkjxePgKIzlDwTexvy9rBMNCgl1a72MJWw7xRYxXKudO6xj2pMBog)

```yaml
default:
  email_delivery:
    delivery_method: :smtp
    smtp_settings:
      enable_starttls_auto: true
      address: smtp.gmail.com
      port: 587
      domain: gmail.com
      authentication: :login
      user_name: 你的Google 信箱帳號
      password: 你的Google 應用程式密碼
```

## 步驟三：啟動 Redmine 容器

```shell
docker run -d --name redmine --restart=always  \
-e REDMINE_DB_MYSQL=$host \
-e REDMINE_DB_PORT=$port \
-e REDMINE_DB_USERNAME=$username \
-e REDMINE_DB_PASSWORD=$pwd \
-e REDMINE_DB_DATABASE=$db \
-p 3000:3000 \
-v /redmine/config/configuration.yml:/usr/src/redmine/config/configuration.yml \
"redmine"
```

解釋如下

```shell
docker run -d --name redmine --restart=always \
-e REDMINE_DB_MYSQL=$host \ mysql host
-e REDMINE_DB_PORT=$port \ mysql port
-e REDMINE_DB_USERNAME=$username \ mysql user名稱
-e REDMINE_DB_PASSWORD=$pwd \ mysql User密碼
-e REDMINE_DB_DATABASE=$db \ mysql 剛剛建立的資料庫名稱
-p 3000:3000 \ server的3000 port 對應容器內的 3000 port
-v /redmine/config/configuration.yml:/usr/src/redmine/config/configuration.yml \ 這邊可選，如果你有寄送信件需求才需添加
"redmine"
```

## 步驟四：登入 Redmine

進行登入

預設帳號為 admin

預設密碼為 admin

進入後他會要求你改密碼

![](/assets/images/docker-redmine-setup/2.png)

## 步驟五：進入網站管理設定

![](/assets/images/docker-redmine-setup/3.png)

## 步驟六：設定網站網域與標題

![](/assets/images/docker-redmine-setup/4.png)

## 步驟七：測試電子郵件寄送

![](/assets/images/docker-redmine-setup/5.png)

![](/assets/images/docker-redmine-setup/5.png)

![](/assets/images/docker-redmine-setup/6.png)

![](/assets/images/docker-redmine-setup/6.png)
