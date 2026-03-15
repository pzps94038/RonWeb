---
{
  "title": "C# .Net Core 7.0 和 Graphql 實作",
  "categoryId": 2,
  "categoryName": "後端",
  "labels": [
    {
      "labelId": 3,
      "labelName": "MySQL"
    },
    {
      "labelId": 7,
      "labelName": ".Net Core"
    },
    {
      "labelId": 15,
      "labelName": "Graphql"
    }
  ],
  "createDate": "2023-06-03T09:52:21.249Z",
  "references": [
    "https://www.youtube.com/watch?v=Lu9wC1ONScM&list=PLA8ZIAm2I03g9z705U3KWJjTv0Nccw9pj&index=4",
    "https://chillicream.com/docs/hotchocolate/v13/fetching-data/filtering",
    "https://chillicream.com/docs/hotchocolate/v13/fetching-data/sorting"
  ],
  "flag": "Y"
}
---
## 安裝套件

首先安裝以下三個套件：

```shell
dotnet add package HotChocolate.AspNetCore
dotnet add package HotChocolate.AspNetCore.Playground
dotnet add package HotChocolate.Data.EntityFramework
```

## 設定路由入口

在 Program 加入網址入口：

```csharp
app.MapGraphQL("/graphql"); // 實際接口入口
app.UsePlayground(new PlaygroundOptions
{
    Path = "/playground", // gui入口
    QueryPath = "/graphql", // 跟gui講實際接口入口
});
```

## 核心概念

GraphQL 有三個主要核心，分別是 Query、Mutation、Subscription，本次實作主要以 Query 和 Mutation 為主。

```plaintext
Query - 查詢
Mutation - 新增、修改、刪除
Subscription - 即時更新通知
```

## Query

這是定義如何跟資料庫做關聯 Mapping，重點是要使用 IQueryable 的型別：

```csharp
public class Query {
        private readonly ILogHelper _logHelper;

        public Query(ILogHelper logHelper)
        {
            this._logHelper = logHelper;
        }

        [UsePaging(MaxPageSize = 50, DefaultPageSize = 10)] // 這個一定要先，分頁式
        [UseProjection] // 查詢投影
        [UseFiltering] // 條件
        [UseSorting] // 排序方式
        public IQueryable<Article> GetArticles([Service] RonWebDbContext db)
        {
            try
            {
                return db.Article;
            }
            catch(Exception ex)
            {
                this._logHelper.Error(ex);
                throw;
            }
        }
}
```

### 設定服務對應

```csharp
builder.Services
    .AddGraphQLServer()
    .AddQueryType<Query>()
    .AddProjections()
    .AddFiltering()
    .AddSorting();
```

### 設定資料庫 DI

要注意的是，因為 GraphQL 可以在一個查詢中同時對多個資源做條件搜尋，所以資料庫的設定要特別注意。

如果用預設的 Scope，同時查詢兩個以上會有競爭關係，因此這邊調整為每個都使用獨立連線：

```csharp
// graphql 如果用scope 每個查詢都用同個db的話會有競爭問題，這邊開分別實例
builder.Services.AddDbContext<RonWebDbContext>(options =>
{
    string connectionString = "資料庫連線字串";
    options.UseMySql(connectionString, new MySqlServerVersion(new Version(8, 0, 33)),
    options => options.EnableRetryOnFailure());
}, ServiceLifetime.Transient);
```

定義好就能嘗試看看連接狀況：

![](/assets/images/csharp-dotnet-core-graphql/1.png)

## Mutation

Mutation 主要作用是處理新增、修改以及刪除。

寫法跟一般新增修改刪除一樣，差別在於需要定義回傳值，不能為 void：

```csharp
public class ArticleCategoryMutation: IArticleCategoryHelper {
        public async Task<ArticleCategory?> CreateAsync([Service] RonWebDbContext db, CreateArticleCategoryRequest data)
	{
		var category = await db.ArticleCategory.SingleOrDefaultAsync(a => a.CategoryName == data.CategoryName);
		if (category != null)
		{
			return null;
		}
		else
		{
			category = new ArticleCategory()
			{
				CategoryName = data.CategoryName,
				CreateDate = DateTime.Now,
				CreateBy = data.UserId
			};
 			await db.AddAsync(category);
  			await db.SaveChangesAsync();
			return category;
		}
	}
}
```

### 補上 Mutation 設定

```csharp
builder.Services
    .AddGraphQLServer()
    .AddQueryType<Query>()
    .AddProjections()
    .AddFiltering()
    .AddSorting()
    .AddMutationType<ArticleCategoryMutation>(); // 補上這個Mutation
```

定義好就能嘗試看看連接狀況：

![](/assets/images/csharp-dotnet-core-graphql/2.png)
