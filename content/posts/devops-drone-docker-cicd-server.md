---
{
  'title': 'DevOps Drone 利用Docker自架一個 CI CD Server',
  'categoryId': 3,
  'categoryName': 'CI CD',
  'labels': [{ 'labelId': 21, 'labelName': 'Drone' }, { 'labelId': 22, 'labelName': 'Github' }],
  'createDate': '2023-06-22T05:21:03.560Z',
  'references':
    [
      'https://docs.drone.io/server/provider/github/',
      'https://medium.com/@stu60610/%E4%BD%BF%E7%94%A8-docker-drone-%E5%BB%BA%E7%AB%8B%E7%B0%A1%E6%98%93%E8%87%AA%E5%8B%95%E9%83%A8%E7%BD%B2%E6%B5%81%E7%A8%8B-part2-7d250e926bd8',
      'https://vagrantpi.github.io/2018/10/21/drone-pipeline/',
      'https://blog.wu-boy.com/2020/02/install-drone-with-github-in-five-minutes/',
      'https://medium.com/starbugs/%E5%BE%9E%E9%9B%B6%E9%96%8B%E5%A7%8B%E5%AD%B8-devops-%E9%82%A3%E5%B0%B1%E9%81%B8%E6%93%87%E6%9C%80%E7%B0%A1%E5%96%AE%E7%9A%84-drone-ci-%E9%96%8B%E5%A7%8B%E5%90%A7-931126671139',
      'https://docs.drone.io/pipeline/configuration/',
      'https://www.youtube.com/watch?v=OlucMSF1Xss',
    ],
  'flag': 'Y',
}
---

## 步驟一：選擇 Repo 類型

在官方安裝文件中 [Drone CI / CD | Drone](https://docs.drone.io/)第一步是要根據 Repo 的類型來做安裝，再本文章使用 github 來做範例，但官方文件中也有其他像是 Gitlab、GitGogs 等其他倉庫的設定方式

![](/assets/images/devops-drone-docker-cicd-server/1.png)

## 步驟二：在 Github 設立 OAuth 應用程式

在 Github 設立應用程式的 OAuth [Developer applications (github.com)](https://github.com/settings/developers)

Homepage URL 為 Drone 的網址

Authorization callback URL 為 Drone 的網址加上/login

![](/assets/images/devops-drone-docker-cicd-server/2.png)

## 步驟三：取得 Client Id、Client Secret 與 Shared Secret

建立完成後會有一個 Client Id 跟 Client Secret 等等會用到，還會需要一個 Shared Secret 用於跟 runner 匹配

Shared Secret 可以使用 openssl 來產生或是透過這個網址隨機產出[`random.org/cgi-bin/randbyte?nbytes=16&format=h`](https://www.random.org/cgi-bin/randbyte?nbytes=16&format=h)

![](/assets/images/devops-drone-docker-cicd-server/3.png)

## 步驟四：使用 Docker 運行 Drone Image

使用 Docker 運行 Drone Image，記得 DRONE_USER_CREATE 跟 DRONE_USER_FILTER 要做設定，不然誰都能進入此 CICD 來使用，後續都權限管理能透過 admin 來管控

```shell
docker run
  -v /var/lib/drone:/data \
  -e DRONE_GITHUB_CLIENT_ID=your-id \
  -e DRONE_GITHUB_CLIENT_SECRET=super-duper-secret \
  -e DRONE_RPC_SECRET=super-duper-secret \
  -e DRONE_SERVER_HOST=drone.company.com \
  -e DRONE_SERVER_PROTO=https \
  -e DRONE_USER_CREATE=username:root,admin:true \
  -e DRONE_USER_FILTER=root,organize \
  -p 80:80 \
  -p 443:443 \
  --restart=always \
  --detach=true \
  --name=drone \
  "drone/drone:2"
```

每個設定解釋如下

```shell
docker run \
  -v /var/lib/drone:/data \ 對應本機位置
  -e DRONE_GITHUB_CLIENT_ID=your-id \ github CLIENT_ID
  -e DRONE_GITHUB_CLIENT_SECRET=super-duper-secret \ github CLIENT_SECRET
  -e DRONE_RPC_SECRET=super-duper-secret \ 剛剛產出的secret runner 跟這個必須一致
  -e DRONE_SERVER_HOST=drone.company.com \ drone的對外網址
  -e DRONE_SERVER_PROTO=https \ 用http or https
  -e DRONE_USER_CREATE=username:root,admin:true \ 初始的admin
  -e DRONE_USER_FILTER=root,organize \ 可用此CICD的授權者，也可以是組織
  -p 80:80 \ server 80 對容器 80
  -p 443:443 \ server 443 對容器 443
  --restart=always \ 掛掉自動重啟
  --detach=true \ 背景運行
  --name=drone \ 名稱
  "drone/drone:2"
```

## 步驟五：使用 Docker 運行 Drone Runner Image

使用 Docker 運行 Drone Runner Image 這邊的 DRONE_RPC_SECRET 需跟上面 Drone 一致

```shell
docker run --detach \
  -v /var/run/docker.sock:/var/run/docker.sock \
  -e DRONE_RPC_PROTO=https \
  -e DRONE_RPC_HOST=drone.company.com \
  -e DRONE_RPC_SECRET=super-duper-secret \
  -e DRONE_RUNNER_CAPACITY=2 \
  -e DRONE_RUNNER_NAME=drone-runner \
  -p 3000:3000 \
  --restart=always \
  --name=drone-runner \
  "drone/drone-runner-docker:1"
```

每個設定解釋如下

```shell
docker run --detach // 背景運行
  -v /var/run/docker.sock:/var/run/docker.sock \ 對應本機位置 這個不能隨意更動
  -e DRONE_RPC_PROTO=https \ 用http or https
  -e DRONE_RPC_HOST=drone.company.com \ drone 主機的網址
  -e DRONE_RPC_SECRET=super-duper-secret \ 剛剛產出的secret runner 跟這個必須一致
  -e DRONE_RUNNER_CAPACITY=2 \ 同時運行的task數量
  -e DRONE_RUNNER_NAME=drone-runner \ RUNNER_NAME
  -p 3000:3000 \
  --restart=always \
  --name=drone-runner \
  "drone/drone-runner-docker:1"
```

可以根據文件[Reference | Drone](https://docs.drone.io/runner/docker/configuration/reference/)設立以下環境變數，以免跑 CICD 吃掉過多資源導致其他服務被影響

DRONE_CPU_PERIOD = 100000 使用 1CPU

DRONE_MEMORY_LIMIT = 3000000000 使用 3GB 記憶體

## 步驟六：進入後台查看倉庫

進入後台就能看到倉庫底下的所有 repo

![](/assets/images/devops-drone-docker-cicd-server/4.png)

## 步驟七：配置 .drone.yaml CICD 工作腳本

倉庫底下需配置一個.drone.yaml 的 CICD 工作腳本，簡單的範例如下，每個步驟都需要有個 image 當基底

```yaml
kind: pipeline
name: default
workspace:
  base: /src
  path: drone_test
steps:
  - name: install-package
    image: node:16
    commands:
      - echo install package
      - npm ci
  - name: test
    image: node:16
    commands:
      - echo install Chrome
      - apt-get update -qq && apt-get install -qq --no-install-recommends chromium && apt-get clean && rm -rf /var/lib/apt/lists/* && ln -s /usr/bin/chromium /usr/bin/google-chrome
      - echo test
      - npm run test-ci
  - name: build
    image: node
    commands:
      - echo build
      - npm run build
trigger:
  branch:
    - master
  event:
    - push
```

## 步驟八：設定 Drone 後台與密鑰

設定對應 Repo 的 Drone 後台，這邊能設定觸發及 CICD 後台公開私密，以及 CICD 腳本的密鑰等等，畢竟像是連線字串這種比較隱密的環境變數，還是不合適放在程式碼腳本當中

![](/assets/images/devops-drone-docker-cicd-server/5.png)

![](/assets/images/devops-drone-docker-cicd-server/5.png)

## 步驟九：確認 Webhook 設定

建立保存後，之後的每個 hook 都會透過 github 配合你 CICD 的腳本來做條件觸發，可以去 github repo 的 webhooks 設定發現會多了一個通知設定到你的 CICD Server

![](/assets/images/devops-drone-docker-cicd-server/6.png)

![](/assets/images/devops-drone-docker-cicd-server/7.png)
