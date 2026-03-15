---
{
  "title": "Windows Debug IOS APP",
  "categoryId": 16,
  "categoryName": "Web",
  "labels": [
    {
      "labelId": 28,
      "labelName": "IOS"
    }
  ],
  "createDate": "2024-09-11T15:00:26.768Z",
  "references": [
    "https://github.com/ScoopInstaller/Scoop/wiki/Quick-Start",
    "https://medium.com/michal-ms/how-to-debug-a-website-in-ios-safari-on-windows-5aed4f806931",
    "https://github.com/RemoteDebug/remotedebug-ios-webkit-adapter",
    "https://inspect.dev/"
  ],
  "flag": "Y"
}
---
## 步驟一：安裝 remotedebug-ios-webkit-adapter

```shell
npm i -g remotedebug-ios-webkit-adapter
```

## 步驟二：開啟 PowerShell（非系統管理員模式）

![](/assets/images/windows-debug-ios-app/1.png)  
 

## 步驟三：安裝 Scoop

```shell
irm get.scoop.sh | iex
```

![](/assets/images/windows-debug-ios-app/2.png)

## 步驟四：安裝 Scoop 附加庫

```shell
scoop bucket add extras https://github.com/lukesampson/scoop-extras.git
```

## 步驟五：安裝 ios-webkit-debug-proxy

```shell
scoop install ios-webkit-debug-proxy
```

## 步驟六：瀏覽器開啟 inspect

Chrome: chrome://inspect/#devices

Edge: edge://inspect/#devices

![](/assets/images/windows-debug-ios-app/2.png)

## 步驟七：設定新增 Port

localhost:9000

![](/assets/images/windows-debug-ios-app/3.png)

![](/assets/images/windows-debug-ios-app/5.png)

## 步驟八：執行 remotedebug_ios_webkit_adapter

```shell
remotedebug_ios_webkit_adapter — port=9000
```

![](/assets/images/windows-debug-ios-app/6.png)

## 步驟九：裝置開啟網頁檢閱器

![](/assets/images/windows-debug-ios-app/4.png)

## 步驟十：連結裝置

![](/assets/images/windows-debug-ios-app/6.png)

## 步驟十一：開啟 inspect

![](/assets/images/windows-debug-ios-app/5.png)

## 步驟十二：主控台 Debug

![](/assets/images/windows-debug-ios-app/8.png)
