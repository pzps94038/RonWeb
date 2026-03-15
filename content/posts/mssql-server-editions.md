---
{
  'title': 'Microsoft SQL Server 版本介紹',
  'categoryId': 14,
  'categoryName': '資料庫',
  'labels': [{ 'labelId': 27, 'labelName': 'Microsoft SQL Server' }],
  'createDate': '2024-08-18T22:02:42.979Z',
  'references':
    [
      'https://learn.microsoft.com/zh-tw/sql/sql-server/editions-and-components-of-sql-server-2022?view=sql-server-ver16',
    ],
  'flag': 'Y',
}
---

## 查詢版本

可以用底下 SQL 查詢版本：

```sql
SELECT @@VERSION
```

預計呈現：

![](/assets/images/mssql-server-editions/1.png)

## 版本定義

| 版本                  | 定義                                                                                                                                                                                                                                                                               |
| --------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Enterprise            | SQL Server Enterprise Edition 提供完整的高階資料中心功能，具備極快速的效能、不受限制的虛擬化，以及端對端商業智慧。Enterprise 版本可供評估使用，評估部署可使用 180 天。如需詳細資訊，請參閱 [SQL Server 授權資源和文件](https://www.microsoft.com/licensing/docs/view/SQL-Server)。 |
| 標準（Standard）      | SQL Server Standard 版本針對部門和小型組織提供基本的資料管理與商業智慧資料庫來執行應用程式，並支援適用於內部部署與雲端的一般開發工具，從而以最少的 IT 資源提供最有效率的資料庫管理。                                                                                               |
| Web（Azure）          | SQL Server Web 版本對於 Web 主機服務提供者和 Web VAP 而言是一個擁有權總成本低廉的選項，可針對小型到大型規模的 Web 資產提供具可擴縮性、負擔輕鬆且管理方便的功能。                                                                                                                   |
| 開發人員（Developer） | SQL Server Developer 版本可讓開發人員在 SQL Server 上建置任何類型的應用程式。其中包含 Enterprise Edition 的所有功能，但只授權做為開發和測試系統使用，而不做為實際伺服器使用。                                                                                                      |
| Express（輕量服務）   | SQL Server Express 版本是入門級的免費資料庫，非常適合用來學習及建置桌上型電腦和小型伺服器資料驅動應用程式。如果需要更進階的資料庫功能，可將 SQL Server Express 順暢地升級到其他更高階的 SQL Server 版本。                                                                          |

## Developer 和 Evaluation 版本

如需 Developer 和 Evaluation 版本所支援的功能，請參閱下列各表中針對 SQL Server Enterprise Edition 列出的功能。

Developer Edition 只持續支援 1 個 [SQL Server Distributed Replay](https://learn.microsoft.com/zh-tw/sql/tools/distributed-replay/sql-server-distributed-replay?view=sql-server-ver16) 用戶端，這已在 SQL Server 2022 (16.x) 退場。

## 各版本功能比較

| 功能                                 | Enterprise / Developer | 標準（Standard）             | Web（Azure）                 | Express                     |
| ------------------------------------ | ---------------------- | ---------------------------- | ---------------------------- | --------------------------- |
| 計算容量上限（資料庫引擎）           | 作業系統最大值         | 4 個插槽或 24 個核心的較小者 | 4 個插槽或 16 個核心的較小者 | 1 個插槽或 4 個核心的較小者 |
| 計算容量上限（Analysis / Reporting） | 作業系統最大值         | 4 個插槽或 24 個核心的較小者 | 4 個插槽或 16 個核心的較小者 | 1 個插槽或 4 個核心的較小者 |
| 緩衝集區記憶體上限                   | 作業系統最大值         | 128 GB                       | 64 GB                        | 1,410 MB                    |
| 資料行存放區區段快取記憶體上限       | 無限制                 | 32 GB                        | 16 GB                        | 352 MB                      |
| 記憶體最佳化資料大小上限             | 無限制                 | 32 GB                        | 16 GB                        | 352 MB                      |
| Analysis Services 記憶體上限         | 作業系統最大值         | 16 GB / 64 GB                | N/A                          | N/A                         |
| Reporting Services 記憶體上限        | 作業系統最大值         | 64 GB                        | 64 GB                        | 4 GB                        |
| 關聯式資料庫大小上限                 | 524 PB                 | 524 PB                       | 524 PB                       | 10 GB                       |
