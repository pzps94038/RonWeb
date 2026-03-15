---
{
  "title": "Nginx Manager 及  Let's Encrypt 簡易實作",
  "categoryId": 10,
  "categoryName": "Nginx",
  "labels": [
    {
      "labelId": 17,
      "labelName": "SSL"
    },
    {
      "labelId": 18,
      "labelName": "反向代理"
    },
    {
      "labelId": 19,
      "labelName": "Docker"
    }
  ],
  "createDate": "2023-06-07T04:33:15.856Z",
  "references": [
    "https://www.youtube.com/watch?v=TBGOJA27m_0",
    "https://www.youtube.com/watch?v=B40TQcOzsNU&list=LL"
  ],
  "flag": "Y"
}
---
## 安裝 Docker 及 Docker Compose

[Nginx Proxy Manager](https://nginxproxymanager.com/guide/#quick-setup) 整合到 Docker 來啟動，所以首先需要先安裝 Docker 及 Docker Compose。

## 建立 docker-compose.yml

官方範例如下，對外 80 及 443 讓域名指過來能夠透過反向代理再轉到真實伺服器。

其中 port 81 是管理平台的 port 號：

```yaml
version: '3.8'
services:
  app:
    image: 'jc21/nginx-proxy-manager:latest'
    restart: unless-stopped
    ports:
      - '80:80'
      - '81:81'
      - '443:443'
    volumes:
      - ./data:/data
      - ./letsencrypt:/etc/letsencrypt
```

## 運行指令

```shell
docker-compose up -d
```

## 進入管理頁面

運行成功後進入管理頁面，預設帳號及密碼如下，首次進入會需要更換 Email 及密碼：

```yaml
Email:    admin@example.com
Password: changeme
```

## 管理面板

完成後，管理面板類似如下：

![](/assets/images/nginx-manager-lets-encrypt/1.png)

## 設定網域 DNS

設定網域 DNS 轉到反向代理伺服器，這邊提供 Godaddy 的範例。

實際網站都是透過子域名來做區分，其中資料都是指到反向代理伺服器的 IP：

![](/assets/images/nginx-manager-lets-encrypt/2.png)

## 設置子域名對應

設置子域名對應反向代理位置，這邊提供基本範例，其他根據個人需求添加：

![](/assets/images/nginx-manager-lets-encrypt/3.png)

![](/assets/images/nginx-manager-lets-encrypt/4.png)

## 完成

![](/assets/images/nginx-manager-lets-encrypt/5.png)
