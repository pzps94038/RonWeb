---
{
  "title": "使用C# Entity Framework Core連接MySQL",
  "categoryId": 2,
  "categoryName": "後端",
  "labels": [
    {
      "labelId": 3,
      "labelName": "MySQL"
    },
    {
      "labelId": 4,
      "labelName": "EntityFramework"
    },
    {
      "labelId": 7,
      "labelName": ".Net Core"
    }
  ],
  "createDate": "2023-05-20T08:04:05.887Z",
  "references": [],
  "flag": "Y"
}
---
## 安裝套件

先安裝以下套件：

```shell
dotnet add package Microsoft.EntityFrameworkCore
dotnet add package Microsoft.EntityFrameworkCore.Design
dotnet add package Pomelo.EntityFrameworkCore.MySql
```

## 建立 DbContext 模型

```csharp
 public class RonWebDbContext: DbContext
    {
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
        	// 配置連線
            string connectionString = "連線字串";
            optionsBuilder.UseMySql(connectionString, new MySqlServerVersion(new Version(8, 0, 33)),
            options => options.EnableRetryOnFailure());
        }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
        	// 配置雙主鍵
            modelBuilder.Entity<RefreshTokenLog>()
                .HasKey(a => new { a.RefreshToken, a.UserId });
        }

		// 資料庫每一張表
        public DbSet<UserMain> UserMain { get; set; }
        public DbSet<RefreshTokenLog> RefreshTokenLog { get; set; }

    }
```

## 雙主鍵表及關聯表範例

```csharp
    public class RefreshTokenLog
    {
        /// <summary>
        /// RefreshToken
        /// </summary>
        [Key]
        public string RefreshToken { get; set; } = string.Empty;

        [Key]
        public long UserId { get; set; }

        /// 關聯表
        [ForeignKey("UserId")]
        public virtual UserMain? UserMain { get; set; }

        [Required]
        public DateTime ExpirationDate { get; set; }

        [Required]
        public DateTime CreateDate { get; set; }
    }
```

## 自動遞增表範例

```csharp
    public class UserMain
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public long UserId { get; set; }

        [Required]
        [StringLength(50)]
        public string Account { get; set; } = string.Empty;

        [Required]
        public string Password { get; set; } = string.Empty;

        [Required]
        [StringLength(20)]
        public string UserName { get; set; } = string.Empty;

        [StringLength(250)]
        [Required]
        public string? Email { get; set; }

        [Required]
        public DateTime CreateDate { get; set;}

        public DateTime? UpdateDate { get; set; }
    }
```

## 製作遷移檔

透過指令來製作遷移檔：

```shell
 dotnet ef migrations add "更新說明"
```

## 更新資料庫

```shell
dotnet ef database update
```

如果有環境變數需求：

```shell
環境變數連線字串名稱="連線字串" dotnet ef database update
```

連線字串的範例如下：

```plaintext
"server=＄host;port=$port;user id=$user;password=$pwd;database=$db;charset=utf8;"
```

## 使用範例

以上就是建立 C# 及 MySQL 資料庫的整個流程。後續使用方式跟 Entity Framework 操作方式相同：

```csharp
using (var db = new RonWebDbContext())
{
	var data = new RefreshTokenLog()
    {
        RefreshToken = "RefreshToken",
    	UserId = 1,
        ExpirationDate = DateTime.Now,
        CreateDate = DateTime.Now
    };
    await db.RefreshTokenLog.AddAsync(data);
    await db.SaveChangesAsync();
}
```

## 遠端備份 SQL

$ 為變數，注意 $pwd 的地方不能有間隔：

```shell
echo mysqldump -h $host --port $port -u $user -p$pwd --databases $db > backup_$(date +"%Y%m%d_%H%M%S")_$backupName.sql
```
