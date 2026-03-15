---
{
  'title': 'PostgreSQL 備份及還原',
  'categoryId': 14,
  'categoryName': '資料庫',
  'labels': [{ 'labelId': 34, 'labelName': 'PostgreSQL' }],
  'createDate': '2025-08-20T21:14:20.172Z',
  'references': ['https://www.postgresql.org/'],
  'flag': 'Y',
}
---

## 步驟一：備份資料庫（使用 pg_dump）

需先安裝 PostgreSQL

進到安裝資料夾 bin 檔

可以設成環境變數

打開 CMD

![](/assets/images/postgresql-backup-restore/1.png)

![](/assets/images/postgresql-backup-restore/2.png)

## 步驟二：執行備份語法

```sql
pg_dump -U UserID -d wt_sustainmall > backup.sql
```

![](/assets/images/postgresql-backup-restore/2.png)

## 步驟三：還原資料庫

先建立空資料庫(或已存在資料庫)

**文章用 wt_sustainmall 當範例**

![](/assets/images/postgresql-backup-restore/3.png)

進到遠端安裝 PostgreSQL 的資料夾

利用 psql 做還原

![](/assets/images/postgresql-backup-restore/3.png)

```sql
psql -U UserID -d wt_sustainmall <  backup.sql
```

![](/assets/images/postgresql-backup-restore/5.png)
