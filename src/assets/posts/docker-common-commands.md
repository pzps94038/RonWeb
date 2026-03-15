---
{
  "title": "Docker 常用指令介紹",
  "categoryId": 4,
  "categoryName": "Docker",
  "labels": [
    {
      "labelId": 19,
      "labelName": "Docker"
    },
    {
      "labelId": 23,
      "labelName": "常用指令"
    }
  ],
  "createDate": "2023-07-01T00:51:45.327Z",
  "references": [
    "https://docs.docker.com/reference/cli/docker/"
  ],
  "flag": "Y"
}
---
## 基本常用指令

| 指令 | 說明 |
| --- | --- |
| docker --version | 查看版本 |
| docker images | 查看本機所有 Image |
| docker login | Docker 登入 |
| docker logout | Docker 登出 |
| docker push $account/$image | 推送本地 Image 到 registry |
| docker rm $name | 刪除容器 |
| docker rmi $name | 刪除 Image |
| docker container ls | 查看本機所有運行中的容器 |
| docker container ls -a | 查看本機所有的容器 |
| docker exec -it $name /bin/sh | 容器內執行 Shell |
| docker container start $name | 運行暫停的容器 |
| docker container stop $name | 暫停啟動的容器 |
| docker build -t $account/$image . --no-cache | 透過 Dockerfile 建置 Image 且不用緩存 |
| docker network ls | 列出網路模式 |
| docker network inspect $name | 查看網路模式狀態 |
| docker inspect $name | 查看容器設定 |
| docker logs $name | 查看該容器運行 log |
| docker exec $name env | 查看該容器環境變數 |
| docker run $image | 運行 Image，可搭配底下的引數來做啟動設定 |

## Docker Run 常用引數

| 引數 | 說明 | 範例 |
| --- | --- | --- |
| --detach, -d | 背景持續運行 | docker run -d $image |
| --env, -e | 設定環境變數 | docker run -e ENV=ENV $image |
| --env-file | 讀環境變數檔案 | docker run --env-file env.list $image |
| --pull | 執行前先拉取新的 Image（always / missing / never） | docker run --pull always $image |
| --restart | 重新啟動策略，在容器退出時應用 | docker run -d --restart $image |
| --rm | 容器退出時自動移除容器 | docker run -d --rm $image |
| --volume, -v | 綁定本機與容器內的路徑對應，用於留存狀態 | docker run -d -v /dir:/dir $image |
| --name | 為運行容器設定名稱 | docker run --name $containerName $image |
| --oom-kill-disable | 禁用 OOM Killer（137 代碼） | docker run --oom-kill-disable $image |
