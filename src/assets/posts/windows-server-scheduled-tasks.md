---
{
  "title": "Windows Server 排程設立",
  "categoryId": 2,
  "categoryName": "後端",
  "labels": [
    {
      "labelId": 7,
      "labelName": ".Net Core"
    },
    {
      "labelId": 8,
      "labelName": ".Net Framework"
    }
  ],
  "createDate": "2024-09-11T13:41:28.073Z",
  "references": [],
  "flag": "Y"
}
---
## 工作排程器（Windows 內建）

選擇只有使用者登入才執行 => 批次為應用程式

可以搭配[設定 Windows 以自動登入 - Windows Server | Microsoft Learn](https://learn.microsoft.com/zh-tw/troubleshoot/windows-server/user-profiles-and-logon/turn-on-automatic-logon)，達到自動化

**字串值**

數值

AutoAdminLogon

1

DefaultUserName

要預設登入的使用者

DefaultPassword

要預設登入的使用者密碼

![](/assets/images/windows-server-scheduled-tasks/1.png)

選擇不論使用者登入與否均執行 => 批次為背景處理程序

![](/assets/images/windows-server-scheduled-tasks/2.png)

![](/assets/images/windows-server-scheduled-tasks/3.png)

## Windows 服務（Windows 內建）

只能背景執行

![](/assets/images/windows-server-scheduled-tasks/2.png)

## SqlAgent（需搭配資料庫安裝）

只能背景執行

![](/assets/images/windows-server-scheduled-tasks/3.png)

## Web 應用啟動背景任務

**IHostedService/BackgroundService**: 在 ASP.NET Core 中，你可以通過 `IHostedService` 或 `BackgroundService` 實現背景任務。這些任務會在 Web 應用啟動時執行，並且可以一直運行，直到應用關閉。
