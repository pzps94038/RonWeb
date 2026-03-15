---
{
  'title': '.Net Core 8.0 ShadowCopy 陰影複製',
  'categoryId': 2,
  'categoryName': '後端',
  'labels': [{ 'labelId': 7, 'labelName': '.Net Core' }],
  'createDate': '2024-08-01T20:38:10.995Z',
  'references':
    [
      'https://learn.microsoft.com/zh-tw/aspnet/core/host-and-deploy/iis/advanced?view=aspnetcore-8.0',
      'https://blog.miniasp.com/post/2021/11/13/ASPNET-Core-6-Shadow-copying-in-IIS',
      'https://hackmd.io/@ILLzjqclQ1-M3mhr6ieCpA/Sk4cO_o6Y',
    ],
  'flag': 'Y',
}
---

## 問題背景

ASP.NET Core 部署至 IIS 時，\*.dll 檔案會被鎖定，導致這些檔案無法順利更新，必須暫時關閉應用程式集區才能順利對網站進行部署。

舊版本可以利用 app_offline.htm，但 \*.dll 不會馬上解除鎖定。

## web.config 範例配置

```plaintext
<?xml version="1.0" encoding="utf-8"?>
<configuration>
  <location path="." inheritInChildApplications="false">
    <system.webServer>
      <handlers>
        <add name="aspNetCore" path="*" verb="*" modules="AspNetCoreModuleV2" resourceType="Unspecified" />
      </handlers>
      <aspNetCore processPath="dotnet" arguments=".\Test.dll" stdoutLogEnabled="true" stdoutLogFile=".\logs\stdout">
        <handlerSettings>
          <handlerSetting name="enableShadowCopy" value="true" />
          <handlerSetting name="shadowCopyDirectory" value="./ShadowCopyDirectory/" />
          <!-- Only enable handler logging if you encounter issues-->
          <handlerSetting name="debugFile" value="./ShadowCopyLogs/aspnetcore-debug.log" />
          <handlerSetting name="debugLevel" value="FILE,TRACE" />
        </handlerSettings>
      </aspNetCore>
    </system.webServer>
  </location>
</configuration>
```

## 參數說明

| 配置參數            | 說明              |
| ------------------- | ----------------- |
| enableShadowCopy    | 啟用陰影複製      |
| shadowCopyDirectory | 複製資料夾路徑    |
| debugFile           | 陰影複製 Log 路徑 |
| debugLevel          | 寫入 Level        |

## 注意事項

Log 不要放在同 WebSite 資料夾內，ShadowCopy 也會整個複製，導致容量過大。
