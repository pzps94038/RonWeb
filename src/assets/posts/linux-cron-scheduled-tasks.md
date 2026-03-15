---
{
  "title": "Linux cron定時批次設定",
  "categoryId": 11,
  "categoryName": "Linux",
  "labels": [
    {
      "labelId": 19,
      "labelName": "Docker"
    },
    {
      "labelId": 20,
      "labelName": "批次"
    }
  ],
  "createDate": "2023-06-15T23:04:25.257Z",
  "references": [
    "https://linux.vbird.org/linux_basic/centos7/0430cron.php"
  ],
  "flag": "Y"
}
---
## 編輯批次

第一次執行會選擇編輯器，預設 nano 即可：

```shell
crontab -e
```

## 設置定時清理任務

設置每日凌晨三點清理 Docker 閒置資源，編輯好直接保存即可，不用特別設定路徑及檔名：

```shell
# Daily Docker cleanup
0 3 * * * echo "Starting Docker cleanup" && docker container prune -f && docker image prune -f && docker network prune -f && docker volume prune -f && echo "Docker cleanup completed"
```

### Cron 時間格式說明

```shell
0: 分鐘部分，表示在每小時的第 0 分鐘執行任務。
3: 小時部分，表示在每天的第 3 小時（凌晨 3 點）執行任務。
*: 日（月內的天數）部分，表示任何日期都匹配，沒有限制。
*: 月份部分，表示任何月份都匹配，沒有限制。
*: 星期部分，表示任何星期都匹配，沒有限制。
```

## 常用指令

```shell
// 查看批次有無設定成功
crontab -l

// 查看cron狀態
service cron status

// 執行cron
sudo service cron start

// 停止cron
sudo service cron stop

// 查看系統日誌 -n  顯示數量
tail -n 50 /var/log/syslog

// 查看指定時間日誌
grep -E "^Jun (16)" /var/log/syslog | tail
```
