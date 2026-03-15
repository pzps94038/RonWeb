/**
 * 自動生成的文章索引（由 scripts/build-content.js 產生）
 * 請勿手動編輯此檔案
 */

/** 文章索引項目 */
export type PostIndexItem = {
  slug: string;
  articleTitle: string;
  categoryId: number;
  categoryName: string;
  labels: { labelId: number; labelName: string }[];
  createDate: string;
  previewContent: string;
  nextArticle?: { slug: string; articleTitle: string };
  prevArticle?: { slug: string; articleTitle: string };
};

/** 分類項目 */
export type CategoryItem = {
  categoryId: number;
  categoryName: string;
};

/** 標籤項目 */
export type LabelItem = {
  labelId: number;
  labelName: string;
};

/** 專案經歷項目 */
export type ProjectItem = {
  id: number;
  name: string;
  role: string;
  period: string;
  techs: string[];
  order: number;
  description: string;
};

/** 所有已發佈文章索引（按日期降序） */
export const POSTS_INDEX: PostIndexItem[] = [
  {
    slug: 'windows-server-mysql-install',
    articleTitle: 'Windows Server 安裝 MySQL',
    categoryId: 14,
    categoryName: '資料庫',
    labels: [
      {
        labelId: 3,
        labelName: 'MySQL',
      },
    ],
    createDate: '2025-09-03T19:34:30.128Z',
    previewContent:
      '步驟一：下載 MySQL 進到官方下載，安裝最新版本 MySQL :: Download MySQL Community Server 步驟二：下載 Visual Studio 2019 x64 Redistributable 最新支援的 Visual C++ 可轉散發套件下載 | Microsoft Learn 步驟三：安裝流程 個人選Typical Typical（典型安裝）...',
    prevArticle: {
      slug: 'postgresql-backup-restore',
      articleTitle: 'PostgreSQL 備份及還原',
    },
  },
  {
    slug: 'postgresql-backup-restore',
    articleTitle: 'PostgreSQL 備份及還原',
    categoryId: 14,
    categoryName: '資料庫',
    labels: [
      {
        labelId: 34,
        labelName: 'PostgreSQL',
      },
    ],
    createDate: '2025-08-20T21:14:20.172Z',
    previewContent:
      '步驟一：備份資料庫（使用 pgdump） 需先安裝PostgreSQL 進到安裝資料夾bin檔 可以設成環境變數 打開CMD 步驟二：執行備份語法 步驟三：還原資料庫 先建立空資料庫(或已存在資料庫) 文章用 wt\\sustainmall當範例 進到遠端安裝PostgreSQL的資料夾 利用psql做還原',
    nextArticle: {
      slug: 'windows-server-mysql-install',
      articleTitle: 'Windows Server 安裝 MySQL',
    },
    prevArticle: {
      slug: 'csharp-recommended-packages',
      articleTitle: 'C# 推薦套件庫',
    },
  },
  {
    slug: 'csharp-recommended-packages',
    articleTitle: 'C# 推薦套件庫',
    categoryId: 2,
    categoryName: '後端',
    labels: [
      {
        labelId: 7,
        labelName: '.Net Core',
      },
    ],
    createDate: '2025-08-15T02:33:35.352Z',
    previewContent:
      'ORM Microsoft.EntityFrameworkCore Npgsql.EntityFrameworkCore.PostgreSQL Swagger Swashbuckle.AspNetCore Swashbuckle.AspNetCore.SwaggerGen Swashbuckle.AspNetCore.SwaggerUI...',
    nextArticle: {
      slug: 'postgresql-backup-restore',
      articleTitle: 'PostgreSQL 備份及還原',
    },
    prevArticle: {
      slug: 'git-bfg-repo-cleaner',
      articleTitle: '刪除 Git 儲存庫大型歷史檔案 - BFG Repo-Cleaner',
    },
  },
  {
    slug: 'git-bfg-repo-cleaner',
    articleTitle: '刪除 Git 儲存庫大型歷史檔案 - BFG Repo-Cleaner',
    categoryId: 12,
    categoryName: 'Git',
    labels: [
      {
        labelId: 1,
        labelName: '版本更新',
      },
    ],
    createDate: '2025-07-10T23:23:18.424Z',
    previewContent:
      '步驟一：安裝 Java Java 8, 11, 17, 21, 23 Download for Linux, Windows and macOS 安裝完成輸入java 步驟二：下載 BFG Repo-Cleaner BFG Repo-Cleaner 由 rtyley 改名成bfg.jar方便執行 步驟三：備份倉庫 步驟四：開始清理...',
    nextArticle: {
      slug: 'csharp-recommended-packages',
      articleTitle: 'C# 推薦套件庫',
    },
    prevArticle: {
      slug: 'iis-spa-api-web-config',
      articleTitle: 'IIS 部署前端 SPA + API 共存範例：完整 web.config 設定',
    },
  },
  {
    slug: 'iis-spa-api-web-config',
    articleTitle: 'IIS 部署前端 SPA + API 共存範例：完整 web.config 設定',
    categoryId: 1,
    categoryName: '前端',
    labels: [
      {
        labelId: 7,
        labelName: '.Net Core',
      },
      {
        labelId: 33,
        labelName: 'Angular',
      },
    ],
    createDate: '2025-06-16T18:30:01.208Z',
    previewContent: 'IIS 站台配置 資料夾配置 web.config 配置',
    nextArticle: {
      slug: 'git-bfg-repo-cleaner',
      articleTitle: '刪除 Git 儲存庫大型歷史檔案 - BFG Repo-Cleaner',
    },
    prevArticle: {
      slug: 'angular-rendering-modes',
      articleTitle: 'Angular 渲染模式',
    },
  },
  {
    slug: 'angular-rendering-modes',
    articleTitle: 'Angular 渲染模式',
    categoryId: 1,
    categoryName: '前端',
    labels: [
      {
        labelId: 33,
        labelName: 'Angular',
      },
    ],
    createDate: '2025-06-12T18:48:45.107Z',
    previewContent:
      'CSR（Client-Side Rendering）客戶端渲染 原理： 頁面先下載空白 HTML 和 JS Angular 在瀏覽器中啟動，動態生成畫面 優點： ⚡ 快速開發、部署簡單 🔄 客戶端互動性佳 📦 前端打包一次即可部署到 CDN 缺點： 🐌 首屏載入較慢 ❌ SEO 表現差（搜尋引擎抓不到動態內容） 使用時機： 登入後的管理後台、SPA 應用 SEO 不重要的系統...',
    nextArticle: {
      slug: 'iis-spa-api-web-config',
      articleTitle: 'IIS 部署前端 SPA + API 共存範例：完整 web.config 設定',
    },
    prevArticle: {
      slug: 'gitea-server-setup',
      articleTitle: 'Gitea 伺服器架設',
    },
  },
  {
    slug: 'gitea-server-setup',
    articleTitle: 'Gitea 伺服器架設',
    categoryId: 12,
    categoryName: 'Git',
    labels: [
      {
        labelId: 29,
        labelName: 'Windows',
      },
    ],
    createDate: '2025-05-01T21:47:10.232Z',
    previewContent:
      '步驟一：下載與安裝檔案 Gitea | gitea 下載對應環境的安裝檔 步驟二：建立存放資料夾 步驟三：啟動 Gitea 服務 步驟四：設定防火牆 步驟五：進入 Gitea 系統設定 針對Gitea做系統設定 步驟六：配置 app.ini 細部設定 官方設定的文件說明 文件內涵蓋了 Gitea 的所有配置選項，並且會詳細說明每一個設定項目應該如何配置。...',
    nextArticle: {
      slug: 'angular-rendering-modes',
      articleTitle: 'Angular 渲染模式',
    },
    prevArticle: {
      slug: 'windows-iis-ftp-setup',
      articleTitle: 'Windows IIS 架設FTP 站台',
    },
  },
  {
    slug: 'windows-iis-ftp-setup',
    articleTitle: 'Windows IIS 架設FTP 站台',
    categoryId: 17,
    categoryName: 'Windows',
    labels: [
      {
        labelId: 32,
        labelName: 'IIS',
      },
    ],
    createDate: '2025-04-24T19:15:45.989Z',
    previewContent:
      '步驟一：啟動 Windows 的 IIS 及 FTP 功能 步驟二：IIS 新增 FTP 站台 步驟三：配置 FTP 設定 這邊可以根據個人需求設定IP、PORT、SSL憑證 配置授權 驗證差別 允許存取 可以設定哪個Windows使用者可使用 步驟四：防火牆設定 設定同FTP的PORT 步驟五：測試連線 步驟六：設定限定使用者 輸入剛建立的USER...',
    nextArticle: {
      slug: 'gitea-server-setup',
      articleTitle: 'Gitea 伺服器架設',
    },
    prevArticle: {
      slug: 'ios-follow-system-font-size',
      articleTitle: 'IOS 跟隨手機字體設定放大縮小',
    },
  },
  {
    slug: 'ios-follow-system-font-size',
    articleTitle: 'IOS 跟隨手機字體設定放大縮小',
    categoryId: 1,
    categoryName: '前端',
    labels: [
      {
        labelId: 28,
        labelName: 'IOS',
      },
    ],
    createDate: '2025-03-20T00:26:27.694Z',
    previewContent:
      '步驟一：DEMO HTML 設定 步驟二：DEMO CSS 設定 步驟三：預設設定及畫面 步驟四：把設定放大 結論 可以發現只有該字體，會跟隨系統設定來做放大，一般文字根本不吃',
    nextArticle: {
      slug: 'windows-iis-ftp-setup',
      articleTitle: 'Windows IIS 架設FTP 站台',
    },
    prevArticle: {
      slug: 'angular-version-upgrade-guide',
      articleTitle: 'Angular 版本更新',
    },
  },
  {
    slug: 'angular-version-upgrade-guide',
    articleTitle: 'Angular 版本更新',
    categoryId: 1,
    categoryName: '前端',
    labels: [
      {
        labelId: 1,
        labelName: '版本更新',
      },
    ],
    createDate: '2025-03-17T23:37:31.538Z',
    previewContent:
      '步驟一：根據自身條件選取 步驟二：列出更新的項目 一步一步往下做，做完勾選以防漏掉 更新指令可以類似下方範例加上 --force 忽略相依性版本問題 步驟三：驗證每次版本更新 檢核每次版本更新是否有套件不支援情況，導致專案無法正常啟動 如果遇到該狀況，如果原套件有更新支援版本可以直接往上到支援版本 若"無"，需要找有無替代套件...',
    nextArticle: {
      slug: 'ios-follow-system-font-size',
      articleTitle: 'IOS 跟隨手機字體設定放大縮小',
    },
    prevArticle: {
      slug: 'iis-dotnet-core-deploy',
      articleTitle: 'IIS 啟用',
    },
  },
  {
    slug: 'iis-dotnet-core-deploy',
    articleTitle: 'IIS 啟用',
    categoryId: 2,
    categoryName: '後端',
    labels: [
      {
        labelId: 7,
        labelName: '.Net Core',
      },
    ],
    createDate: '2025-01-13T22:59:49.671Z',
    previewContent:
      '步驟一：搜尋控制台 步驟二：選取程式集 步驟三：開啟或關閉 Windows 功能 步驟四：開啟 IIS 功能 細部調整須根據個人需求修改 步驟五：測試 IIS 站台連接 步驟六：下載及安裝 .Net Core Runtime',
    nextArticle: {
      slug: 'angular-version-upgrade-guide',
      articleTitle: 'Angular 版本更新',
    },
    prevArticle: {
      slug: 'disable-text-select-right-click',
      articleTitle: '網頁上禁用文本選擇及滑鼠右鍵',
    },
  },
  {
    slug: 'disable-text-select-right-click',
    articleTitle: '網頁上禁用文本選擇及滑鼠右鍵',
    categoryId: 1,
    categoryName: '前端',
    labels: [],
    createDate: '2024-09-23T00:45:10.602Z',
    previewContent: '選取禁用 使用 CSS 使用 JavaScript 右鍵禁用',
    nextArticle: {
      slug: 'iis-dotnet-core-deploy',
      articleTitle: 'IIS 啟用',
    },
    prevArticle: {
      slug: 'windows-openssl-command-fix',
      articleTitle: "解決 'openssl' 不是內部或外部命令、可執行的程式或批次檔",
    },
  },
  {
    slug: 'windows-openssl-command-fix',
    articleTitle: "解決 'openssl' 不是內部或外部命令、可執行的程式或批次檔",
    categoryId: 17,
    categoryName: 'Windows',
    labels: [
      {
        labelId: 29,
        labelName: 'Windows',
      },
    ],
    createDate: '2024-09-17T21:50:12.680Z',
    previewContent:
      '步驟一：搜尋環境變數 步驟二：進到環境變數設定 步驟三：編輯 Path 系統變數 步驟四：新增環境變數 步驟五：選擇安裝 openssl.exe 的路徑 步驟六：設定完成 步驟七：測試 CMD',
    nextArticle: {
      slug: 'disable-text-select-right-click',
      articleTitle: '網頁上禁用文本選擇及滑鼠右鍵',
    },
    prevArticle: {
      slug: 'windows-debug-ios-app',
      articleTitle: 'Windows Debug IOS APP',
    },
  },
  {
    slug: 'windows-debug-ios-app',
    articleTitle: 'Windows Debug IOS APP',
    categoryId: 16,
    categoryName: 'Web',
    labels: [
      {
        labelId: 28,
        labelName: 'IOS',
      },
    ],
    createDate: '2024-09-11T15:00:26.768Z',
    previewContent:
      '步驟一：安裝 remotedebug-ios-webkit-adapter 步驟二：開啟 PowerShell（非系統管理員模式） 步驟三：安裝 Scoop 步驟四：安裝 Scoop 附加庫 步驟五：安裝 ios-webkit-debug-proxy 步驟六：瀏覽器開啟 inspect Chrome: chrome://inspect/#devices Edge:...',
    nextArticle: {
      slug: 'windows-openssl-command-fix',
      articleTitle: "解決 'openssl' 不是內部或外部命令、可執行的程式或批次檔",
    },
    prevArticle: {
      slug: 'windows-server-scheduled-tasks',
      articleTitle: 'Windows Server 排程設立',
    },
  },
  {
    slug: 'windows-server-scheduled-tasks',
    articleTitle: 'Windows Server 排程設立',
    categoryId: 2,
    categoryName: '後端',
    labels: [
      {
        labelId: 7,
        labelName: '.Net Core',
      },
      {
        labelId: 8,
        labelName: '.Net Framework',
      },
    ],
    createDate: '2024-09-11T13:41:28.073Z',
    previewContent:
      '工作排程器（Windows 內建） 選擇只有使用者登入才執行 => 批次為應用程式 可以搭配設定 Windows 以自動登入 - Windows Server | Microsoft Learn，達到自動化 字串值 數值 AutoAdminLogon 1 DefaultUserName 要預設登入的使用者 DefaultPassword 要預設登入的使用者密碼 選擇不論使用者登入與否均執行 =>...',
    nextArticle: {
      slug: 'windows-debug-ios-app',
      articleTitle: 'Windows Debug IOS APP',
    },
    prevArticle: {
      slug: 'csharp-single-instance-app',
      articleTitle: 'C# 檢核程式為單一應用',
    },
  },
  {
    slug: 'csharp-single-instance-app',
    articleTitle: 'C# 檢核程式為單一應用',
    categoryId: 2,
    categoryName: '後端',
    labels: [
      {
        labelId: 7,
        labelName: '.Net Core',
      },
      {
        labelId: 8,
        labelName: '.Net Framework',
      },
    ],
    createDate: '2024-09-03T02:53:52.286Z',
    previewContent: '檢核程式碼 以下程式碼用於檢核程序是否為單一實例：',
    nextArticle: {
      slug: 'windows-server-scheduled-tasks',
      articleTitle: 'Windows Server 排程設立',
    },
    prevArticle: {
      slug: 'vscode-install-specific-version',
      articleTitle: 'Windows VSCode 安裝指定版本套件',
    },
  },
  {
    slug: 'vscode-install-specific-version',
    articleTitle: 'Windows VSCode 安裝指定版本套件',
    categoryId: 15,
    categoryName: 'VSCode',
    labels: [
      {
        labelId: 1,
        labelName: '版本更新',
      },
    ],
    createDate: '2024-08-27T00:10:39.185Z',
    previewContent:
      '步驟一：開啟命令面板 步驟二：輸入安裝指定版本指令 步驟三：選擇要安裝的套件 步驟四：選擇要安裝的版本 步驟五：安裝成功',
    nextArticle: {
      slug: 'csharp-single-instance-app',
      articleTitle: 'C# 檢核程式為單一應用',
    },
    prevArticle: {
      slug: 'csharp-oop-introduction',
      articleTitle: 'C#  物件導向程式設計（Object-Oriented Programming, OOP）介紹',
    },
  },
  {
    slug: 'csharp-oop-introduction',
    articleTitle: 'C#  物件導向程式設計（Object-Oriented Programming, OOP）介紹',
    categoryId: 2,
    categoryName: '後端',
    labels: [
      {
        labelId: 7,
        labelName: '.Net Core',
      },
      {
        labelId: 8,
        labelName: '.Net Framework',
      },
    ],
    createDate: '2024-08-26T03:55:27.522Z',
    previewContent:
      'OOP 的四大核心概念 封裝（Encapsulation） 將資料和方法封裝在類別中，對外部隱藏內部實現，只暴露必要的接口。這可以保護資料不被外部直接修改。 繼承（Inheritance） 允許一個類別從另一個類別繼承屬性和方法，讓子類別（derived class）可以重用父類別（base class）的程式碼，並在此基礎上擴展或修改功能。 多型（Polymorphism）...',
    nextArticle: {
      slug: 'vscode-install-specific-version',
      articleTitle: 'Windows VSCode 安裝指定版本套件',
    },
    prevArticle: {
      slug: 'mssql-server-editions',
      articleTitle: 'Microsoft SQL Server 版本介紹',
    },
  },
  {
    slug: 'mssql-server-editions',
    articleTitle: 'Microsoft SQL Server 版本介紹',
    categoryId: 14,
    categoryName: '資料庫',
    labels: [
      {
        labelId: 27,
        labelName: 'Microsoft SQL Server',
      },
    ],
    createDate: '2024-08-18T22:02:42.979Z',
    previewContent:
      '查詢版本 可以用底下 SQL 查詢版本： 預計呈現： 版本定義 | 版本 | 定義 | | --- | --- | | Enterprise | SQL Server Enterprise Edition 提供完整的高階資料中心功能，具備極快速的效能、不受限制的虛擬化，以及端對端商業智慧。Enterprise 版本可供評估使用，評估部署可使用 180 天。如需詳細資訊，請參閱 SQL...',
    nextArticle: {
      slug: 'csharp-oop-introduction',
      articleTitle: 'C#  物件導向程式設計（Object-Oriented Programming, OOP）介紹',
    },
    prevArticle: {
      slug: 'iis-app-offline-htm',
      articleTitle: 'IIS 應用程式離線檔案 app_offline.htm',
    },
  },
  {
    slug: 'iis-app-offline-htm',
    articleTitle: 'IIS 應用程式離線檔案 app_offline.htm',
    categoryId: 2,
    categoryName: '後端',
    labels: [
      {
        labelId: 7,
        labelName: '.Net Core',
      },
      {
        labelId: 8,
        labelName: '.Net Framework',
      },
    ],
    createDate: '2024-08-13T20:52:21.172Z',
    previewContent:
      '問題背景 當網站正在執行時，過程中所有 .dll 檔案都會被鎖定，無法成功覆蓋檔案，導致更版需要停止站台服務。 IIS 的兩個解決方案 方案一：appoffline.htm 在 IIS 網站上放置 app\\offline.htm，放置後該網站所有頁面都會導到你放置的 app\\_offline.htm 靜態檔案。 缺點：\\.dll 的鎖定不是馬上釋放。 方案二：.Net Core 6.0...',
    nextArticle: {
      slug: 'mssql-server-editions',
      articleTitle: 'Microsoft SQL Server 版本介紹',
    },
    prevArticle: {
      slug: 'angular-js-heap-out-of-memory',
      articleTitle: 'Angular遇到JavaScript heap out of memory',
    },
  },
  {
    slug: 'angular-js-heap-out-of-memory',
    articleTitle: 'Angular遇到JavaScript heap out of memory',
    categoryId: 1,
    categoryName: '前端',
    labels: [],
    createDate: '2024-08-05T15:14:24.774Z',
    previewContent:
      '問題描述 JavaScript heap out of memory 解決辦法： 解決方式 更新 Node.js 升級至較新版本的 Node.js。 擴充 maxoldspace_size 可以透過環境變數設定，或是直接使用底下的指令啟動：',
    nextArticle: {
      slug: 'iis-app-offline-htm',
      articleTitle: 'IIS 應用程式離線檔案 app_offline.htm',
    },
    prevArticle: {
      slug: 'dotnet-core-8-shadow-copy',
      articleTitle: '.Net Core 8.0 ShadowCopy 陰影複製',
    },
  },
  {
    slug: 'dotnet-core-8-shadow-copy',
    articleTitle: '.Net Core 8.0 ShadowCopy 陰影複製',
    categoryId: 2,
    categoryName: '後端',
    labels: [
      {
        labelId: 7,
        labelName: '.Net Core',
      },
    ],
    createDate: '2024-08-01T20:38:10.995Z',
    previewContent:
      '問題背景 ASP.NET Core 部署至 IIS 時，\\.dll 檔案會被鎖定，導致這些檔案無法順利更新，必須暫時關閉應用程式集區才能順利對網站進行部署。 舊版本可以利用 app\\_offline.htm，但 \\.dll 不會馬上解除鎖定。 web.config 範例配置 參數說明 | 配置參數 | 說明 | | --- | --- | | enableShadowCopy | 啟用陰影複製...',
    nextArticle: {
      slug: 'angular-js-heap-out-of-memory',
      articleTitle: 'Angular遇到JavaScript heap out of memory',
    },
    prevArticle: {
      slug: 'dotnet-core-8-mvc-iis-publish',
      articleTitle: '.Net Core 8.0 MVC IIS發行建置',
    },
  },
  {
    slug: 'dotnet-core-8-mvc-iis-publish',
    articleTitle: '.Net Core 8.0 MVC IIS發行建置',
    categoryId: 2,
    categoryName: '後端',
    labels: [
      {
        labelId: 7,
        labelName: '.Net Core',
      },
    ],
    createDate: '2024-08-01T18:07:48.289Z',
    previewContent:
      '步驟一：開啟 Windows 功能 步驟二：檢查 IIS 服務有打開 步驟三：安裝 .Net Hosting Bundle 步驟四：發布 .Net Core MVC 專案 步驟五：建立站台並放置發布檔案',
    nextArticle: {
      slug: 'dotnet-core-8-shadow-copy',
      articleTitle: '.Net Core 8.0 ShadowCopy 陰影複製',
    },
    prevArticle: {
      slug: 'angular-browserslist-compatibility',
      articleTitle: 'Angular 使用 Browserslist 處理瀏覽器相容性問題',
    },
  },
  {
    slug: 'angular-browserslist-compatibility',
    articleTitle: 'Angular 使用 Browserslist 處理瀏覽器相容性問題',
    categoryId: 1,
    categoryName: '前端',
    labels: [],
    createDate: '2024-07-25T13:33:57.957Z',
    previewContent:
      '設定方式 前端開發應用上有許多瀏覽器相容性問題，Angular 提供 .browserslistrc 配置來調整相容性。 參考文章 Building Angular apps',
    nextArticle: {
      slug: 'dotnet-core-8-mvc-iis-publish',
      articleTitle: '.Net Core 8.0 MVC IIS發行建置',
    },
    prevArticle: {
      slug: 'mysql-workbench-backup-restore',
      articleTitle: 'MySQL Workbench 還原備份',
    },
  },
  {
    slug: 'mysql-workbench-backup-restore',
    articleTitle: 'MySQL Workbench 還原備份',
    categoryId: 14,
    categoryName: '資料庫',
    labels: [
      {
        labelId: 3,
        labelName: 'MySQL',
      },
    ],
    createDate: '2024-07-25T09:38:11.992Z',
    previewContent: '操作步驟',
    nextArticle: {
      slug: 'angular-browserslist-compatibility',
      articleTitle: 'Angular 使用 Browserslist 處理瀏覽器相容性問題',
    },
    prevArticle: {
      slug: 'leetcode-225-stack-using-queues',
      articleTitle: '225. Implement Stack using Queues',
    },
  },
  {
    slug: 'leetcode-225-stack-using-queues',
    articleTitle: '225. Implement Stack using Queues',
    categoryId: 5,
    categoryName: 'Leetcode',
    labels: [
      {
        labelId: 9,
        labelName: 'Typescript',
      },
    ],
    createDate: '2023-08-27T20:13:04.016Z',
    previewContent:
      'Implement a last-in-first-out (LIFO) stack using only two queues. The implemented stack should support all the functions of a normal stack (push, top, pop, and empty). Implement the MyStack class:...',
    nextArticle: {
      slug: 'mysql-workbench-backup-restore',
      articleTitle: 'MySQL Workbench 還原備份',
    },
    prevArticle: {
      slug: 'docker-common-commands',
      articleTitle: 'Docker 常用指令介紹',
    },
  },
  {
    slug: 'docker-common-commands',
    articleTitle: 'Docker 常用指令介紹',
    categoryId: 4,
    categoryName: 'Docker',
    labels: [
      {
        labelId: 19,
        labelName: 'Docker',
      },
      {
        labelId: 23,
        labelName: '常用指令',
      },
    ],
    createDate: '2023-07-01T00:51:45.327Z',
    previewContent:
      '基本常用指令 | 指令 | 說明 | | --- | --- | | docker --version | 查看版本 | | docker images | 查看本機所有 Image | | docker login | Docker 登入 | | docker logout | Docker 登出 | | docker push $account/$image | 推送本地 Image 到...',
    nextArticle: {
      slug: 'leetcode-225-stack-using-queues',
      articleTitle: '225. Implement Stack using Queues',
    },
    prevArticle: {
      slug: 'husky-prettier-git-commit-style',
      articleTitle: 'husky Prettier git commit統一風格設定',
    },
  },
  {
    slug: 'husky-prettier-git-commit-style',
    articleTitle: 'husky Prettier git commit統一風格設定',
    categoryId: 12,
    categoryName: 'Git',
    labels: [
      {
        labelId: 25,
        labelName: 'husky',
      },
    ],
    createDate: '2023-06-29T21:08:21.687Z',
    previewContent:
      '安裝 husky 與 pretty-quick 套件 設定 npm 的 prepare 生命週期腳本並執行 husky 安裝 這會在 package.json 新增一個 prepare 來安裝 husky 的 shell，讓 npm ci 和 npm install 也會一併安裝。 設定 husky 的 pre-commit Hook 以下已棄用： 最新指令： 這裡我們設定 pre-commit...',
    nextArticle: {
      slug: 'docker-common-commands',
      articleTitle: 'Docker 常用指令介紹',
    },
    prevArticle: {
      slug: 'docker-redmine-setup',
      articleTitle: '利用Docker快速建立一個Redmine專案管理系統',
    },
  },
  {
    slug: 'docker-redmine-setup',
    articleTitle: '利用Docker快速建立一個Redmine專案管理系統',
    categoryId: 4,
    categoryName: 'Docker',
    labels: [
      {
        labelId: 3,
        labelName: 'MySQL',
      },
      {
        labelId: 19,
        labelName: 'Docker',
      },
    ],
    createDate: '2023-06-26T06:46:42.306Z',
    previewContent:
      '今天這篇文章是使用redmine - Official Image | Docker Hub來實作，當中的資料庫我是使用現有的Mysql資料庫 步驟一：建立空的 MySQL 資料庫 先建立空的Mysql資料庫，提供Redmine來做存取資料使用 步驟二：建立 configuration.yml 檔案 先建立configuration.yml檔案...',
    nextArticle: {
      slug: 'husky-prettier-git-commit-style',
      articleTitle: 'husky Prettier git commit統一風格設定',
    },
    prevArticle: {
      slug: 'devops-drone-docker-cicd-server',
      articleTitle: 'DevOps Drone 利用Docker自架一個 CI CD Server',
    },
  },
  {
    slug: 'devops-drone-docker-cicd-server',
    articleTitle: 'DevOps Drone 利用Docker自架一個 CI CD Server',
    categoryId: 3,
    categoryName: 'CI CD',
    labels: [
      {
        labelId: 21,
        labelName: 'Drone',
      },
      {
        labelId: 22,
        labelName: 'Github',
      },
    ],
    createDate: '2023-06-22T05:21:03.560Z',
    previewContent:
      '步驟一：選擇 Repo 類型 在官方安裝文件中 Drone CI / CD | Drone第一步是要根據Repo的類型來做安裝，再本文章使用github來做範例，但官方文件中也有其他像是Gitlab、GitGogs等其他倉庫的設定方式 步驟二：在 Github 設立 OAuth 應用程式 在Github設立應用程式的OAuth Developer applications...',
    nextArticle: {
      slug: 'docker-redmine-setup',
      articleTitle: '利用Docker快速建立一個Redmine專案管理系統',
    },
    prevArticle: {
      slug: 'linux-cron-scheduled-tasks',
      articleTitle: 'Linux cron定時批次設定',
    },
  },
  {
    slug: 'linux-cron-scheduled-tasks',
    articleTitle: 'Linux cron定時批次設定',
    categoryId: 11,
    categoryName: 'Linux',
    labels: [
      {
        labelId: 19,
        labelName: 'Docker',
      },
      {
        labelId: 20,
        labelName: '批次',
      },
    ],
    createDate: '2023-06-15T23:04:25.257Z',
    previewContent:
      '編輯批次 第一次執行會選擇編輯器，預設 nano 即可： 設置定時清理任務 設置每日凌晨三點清理 Docker 閒置資源，編輯好直接保存即可，不用特別設定路徑及檔名： Cron 時間格式說明 常用指令',
    nextArticle: {
      slug: 'devops-drone-docker-cicd-server',
      articleTitle: 'DevOps Drone 利用Docker自架一個 CI CD Server',
    },
    prevArticle: {
      slug: 'nginx-manager-lets-encrypt',
      articleTitle: "Nginx Manager 及  Let's Encrypt 簡易實作",
    },
  },
  {
    slug: 'nginx-manager-lets-encrypt',
    articleTitle: "Nginx Manager 及  Let's Encrypt 簡易實作",
    categoryId: 10,
    categoryName: 'Nginx',
    labels: [
      {
        labelId: 17,
        labelName: 'SSL',
      },
      {
        labelId: 18,
        labelName: '反向代理',
      },
      {
        labelId: 19,
        labelName: 'Docker',
      },
    ],
    createDate: '2023-06-07T04:33:15.856Z',
    previewContent:
      '安裝 Docker 及 Docker Compose Nginx Proxy Manager 整合到 Docker 來啟動，所以首先需要先安裝 Docker 及 Docker Compose。 建立 docker-compose.yml 官方範例如下，對外 80 及 443 讓域名指過來能夠透過反向代理再轉到真實伺服器。 其中 port 81 是管理平台的 port 號： 運行指令 進入管理頁面...',
    nextArticle: {
      slug: 'linux-cron-scheduled-tasks',
      articleTitle: 'Linux cron定時批次設定',
    },
    prevArticle: {
      slug: 'csharp-dotnet-core-graphql',
      articleTitle: 'C# .Net Core 7.0 和 Graphql 實作',
    },
  },
  {
    slug: 'csharp-dotnet-core-graphql',
    articleTitle: 'C# .Net Core 7.0 和 Graphql 實作',
    categoryId: 2,
    categoryName: '後端',
    labels: [
      {
        labelId: 3,
        labelName: 'MySQL',
      },
      {
        labelId: 7,
        labelName: '.Net Core',
      },
      {
        labelId: 15,
        labelName: 'Graphql',
      },
    ],
    createDate: '2023-06-03T09:52:21.249Z',
    previewContent:
      '安裝套件 首先安裝以下三個套件： 設定路由入口 在 Program 加入網址入口： 核心概念 GraphQL 有三個主要核心，分別是 Query、Mutation、Subscription，本次實作主要以 Query 和 Mutation 為主。 Query 這是定義如何跟資料庫做關聯 Mapping，重點是要使用 IQueryable 的型別： 設定服務對應 設定資料庫 DI 要注意的是，因為...',
    nextArticle: {
      slug: 'nginx-manager-lets-encrypt',
      articleTitle: "Nginx Manager 及  Let's Encrypt 簡易實作",
    },
    prevArticle: {
      slug: 'angular-unit-test',
      articleTitle: 'Angular Unit Test',
    },
  },
  {
    slug: 'angular-unit-test',
    articleTitle: 'Angular Unit Test',
    categoryId: 1,
    categoryName: '前端',
    labels: [
      {
        labelId: 12,
        labelName: 'Unit Test',
      },
      {
        labelId: 13,
        labelName: 'Jasmine',
      },
      {
        labelId: 14,
        labelName: 'Karma',
      },
    ],
    createDate: '2023-06-02T22:51:54.482Z',
    previewContent:
      '介紹 單元測試（Unit Test）是目前業界常見的一種測試方式。在測試當中，單元測試是以程式碼最小的一個單元來做測試。 何謂最小的一個單元？就是類別當中的一個函式。 在單元測試當中，相較於其他測試應該是最穩定的，只需專注在程式的 Input 及期望的 Output。像是跟網路相關的 API 通常會被 spy 成假資料。 測試的三大要素 寫測試的思考步驟 — 3A Pattern 推薦安裝...',
    nextArticle: {
      slug: 'csharp-dotnet-core-graphql',
      articleTitle: 'C# .Net Core 7.0 和 Graphql 實作',
    },
    prevArticle: {
      slug: 'leetcode-705-design-hashset',
      articleTitle: '705. Design HashSet',
    },
  },
  {
    slug: 'leetcode-705-design-hashset',
    articleTitle: '705. Design HashSet',
    categoryId: 5,
    categoryName: 'Leetcode',
    labels: [
      {
        labelId: 9,
        labelName: 'Typescript',
      },
    ],
    createDate: '2023-05-29T21:25:20.800Z',
    previewContent:
      'Design a HashSet without using any built-in hash table libraries. Implement MyHashSet class: void add(key) Inserts the value key into the HashSet. bool contains(key) Returns whether the value key...',
    nextArticle: {
      slug: 'angular-unit-test',
      articleTitle: 'Angular Unit Test',
    },
    prevArticle: {
      slug: 'csharp-simple-captcha',
      articleTitle: 'C# 簡易驗證碼',
    },
  },
  {
    slug: 'csharp-simple-captcha',
    articleTitle: 'C# 簡易驗證碼',
    categoryId: 2,
    categoryName: '後端',
    labels: [
      {
        labelId: 11,
        labelName: '驗證碼',
      },
    ],
    createDate: '2023-05-28T21:42:28.331Z',
    previewContent:
      '產生隨機亂數 先產生隨機亂數，並且把亂數存在 Session： 隨機顏色 產生驗證碼圖片 範例程式如下： 回傳驗證碼 這邊是產生一個 Byte 之後回傳給前端一個檔案，但這個檔案並不存在伺服器上。驗證碼圖片的容量也蠻可觀的，驗證方式再拿 Session 跟輸入做核對即可。 實作完成範例',
    nextArticle: {
      slug: 'leetcode-705-design-hashset',
      articleTitle: '705. Design HashSet',
    },
    prevArticle: {
      slug: 'leetcode-2620-counter',
      articleTitle: '2620. Counter',
    },
  },
  {
    slug: 'leetcode-2620-counter',
    articleTitle: '2620. Counter',
    categoryId: 5,
    categoryName: 'Leetcode',
    labels: [
      {
        labelId: 9,
        labelName: 'Typescript',
      },
    ],
    createDate: '2023-05-25T18:32:22.196Z',
    previewContent:
      'Given an integer n, return a counter function. This counter function initially returns n and then returns 1 more than the previous value every subsequent time it is called (n, n + 1, n + 2, etc)....',
    nextArticle: {
      slug: 'csharp-simple-captcha',
      articleTitle: 'C# 簡易驗證碼',
    },
    prevArticle: {
      slug: 'leetcode-2667-hello-world-function',
      articleTitle: '2667. Create Hello World Function',
    },
  },
  {
    slug: 'leetcode-2667-hello-world-function',
    articleTitle: '2667. Create Hello World Function',
    categoryId: 5,
    categoryName: 'Leetcode',
    labels: [
      {
        labelId: 9,
        labelName: 'Typescript',
      },
    ],
    createDate: '2023-05-25T18:25:31.124Z',
    previewContent:
      'Write a function createHelloWorld. It should return a new function that always returns "Hello World". createHelloWorld 是一個回傳函式的函式，回傳的函式不管傳入什麼參數都是回傳 \'Hello World\'。 Example 1: Example 2: Constraints: 解法',
    nextArticle: {
      slug: 'leetcode-2620-counter',
      articleTitle: '2620. Counter',
    },
    prevArticle: {
      slug: 'leetcode-2666-allow-one-function-call',
      articleTitle: '2666. Allow One Function Call',
    },
  },
  {
    slug: 'leetcode-2666-allow-one-function-call',
    articleTitle: '2666. Allow One Function Call',
    categoryId: 5,
    categoryName: 'Leetcode',
    labels: [
      {
        labelId: 9,
        labelName: 'Typescript',
      },
    ],
    createDate: '2023-05-25T18:19:12.934Z',
    previewContent:
      'Given a function fn, return a new function that is identical to the original function except that it ensures fn is called at most once. The first time the returned function is called, it should...',
    nextArticle: {
      slug: 'leetcode-2667-hello-world-function',
      articleTitle: '2667. Create Hello World Function',
    },
    prevArticle: {
      slug: 'leetcode-2665-counter-ii',
      articleTitle: '2665. Counter II',
    },
  },
  {
    slug: 'leetcode-2665-counter-ii',
    articleTitle: '2665. Counter II',
    categoryId: 5,
    categoryName: 'Leetcode',
    labels: [
      {
        labelId: 9,
        labelName: 'Typescript',
      },
    ],
    createDate: '2023-05-25T04:52:39.180Z',
    previewContent:
      'Write a function createCounter. It should accept an initial integer init. It should return an object with three functions. The three functions are: increment() increases the current value by 1 and...',
    nextArticle: {
      slug: 'leetcode-2666-allow-one-function-call',
      articleTitle: '2666. Allow One Function Call',
    },
    prevArticle: {
      slug: 'leetcode-2695-array-wrapper',
      articleTitle: '2695. Array Wrapper',
    },
  },
  {
    slug: 'leetcode-2695-array-wrapper',
    articleTitle: '2695. Array Wrapper',
    categoryId: 5,
    categoryName: 'Leetcode',
    labels: [
      {
        labelId: 9,
        labelName: 'Typescript',
      },
    ],
    createDate: '2023-05-24T21:40:31.807Z',
    previewContent:
      "Create a class ArrayWrapper that accepts an array of integers in it's constructor. This class should have two features: When two instances of this class are added together with the + operator, the...",
    nextArticle: {
      slug: 'leetcode-2665-counter-ii',
      articleTitle: '2665. Counter II',
    },
    prevArticle: {
      slug: 'leetcode-2677-chunk-array',
      articleTitle: '2677. Chunk Array',
    },
  },
  {
    slug: 'leetcode-2677-chunk-array',
    articleTitle: '2677. Chunk Array',
    categoryId: 5,
    categoryName: 'Leetcode',
    labels: [
      {
        labelId: 9,
        labelName: 'Typescript',
      },
    ],
    createDate: '2023-05-24T21:27:29.925Z',
    previewContent:
      'Given an array arr and a chunk size size, return a chunked array. A chunked array contains the original elements in arr, but consists of subarrays each of length size. The length of the last subarray...',
    nextArticle: {
      slug: 'leetcode-2695-array-wrapper',
      articleTitle: '2695. Array Wrapper',
    },
    prevArticle: {
      slug: 'leetcode-2635-array-transform',
      articleTitle: '2635. Apply Transform Over Each Element in Array',
    },
  },
  {
    slug: 'leetcode-2635-array-transform',
    articleTitle: '2635. Apply Transform Over Each Element in Array',
    categoryId: 5,
    categoryName: 'Leetcode',
    labels: [
      {
        labelId: 9,
        labelName: 'Typescript',
      },
    ],
    createDate: '2023-05-24T20:20:17.201Z',
    previewContent:
      'Given an integer array arr and a mapping function fn, return a new array with a transformation applied to each element. The returned array should be created such that returnedArray[i] = fn(arr[i],...',
    nextArticle: {
      slug: 'leetcode-2677-chunk-array',
      articleTitle: '2677. Chunk Array',
    },
    prevArticle: {
      slug: 'leetcode-2637-promise-time-limit',
      articleTitle: '2637. Promise Time Limit',
    },
  },
  {
    slug: 'leetcode-2637-promise-time-limit',
    articleTitle: '2637. Promise Time Limit',
    categoryId: 5,
    categoryName: 'Leetcode',
    labels: [
      {
        labelId: 9,
        labelName: 'Typescript',
      },
    ],
    createDate: '2023-05-23T19:06:08.587Z',
    previewContent:
      'Given an asyncronous function fn and a time t in milliseconds, return a new time limited version of the input function. A time limited function is a function that is identical to the original unless...',
    nextArticle: {
      slug: 'leetcode-2635-array-transform',
      articleTitle: '2635. Apply Transform Over Each Element in Array',
    },
    prevArticle: {
      slug: 'leetcode-2629-function-composition',
      articleTitle: '2629. Function Composition',
    },
  },
  {
    slug: 'leetcode-2629-function-composition',
    articleTitle: '2629. Function Composition',
    categoryId: 5,
    categoryName: 'Leetcode',
    labels: [
      {
        labelId: 9,
        labelName: 'Typescript',
      },
    ],
    createDate: '2023-05-23T04:16:16.194Z',
    previewContent:
      'Given an array of functions [f1, f2, f3, ..., fn], return a new function fn that is the function composition of the array of functions. The function composition of [f(x), g(x), h(x)] is fn(x) =...',
    nextArticle: {
      slug: 'leetcode-2637-promise-time-limit',
      articleTitle: '2637. Promise Time Limit',
    },
    prevArticle: {
      slug: 'leetcode-2626-array-reduce',
      articleTitle: '2626. Array Reduce Transformation',
    },
  },
  {
    slug: 'leetcode-2626-array-reduce',
    articleTitle: '2626. Array Reduce Transformation',
    categoryId: 5,
    categoryName: 'Leetcode',
    labels: [
      {
        labelId: 9,
        labelName: 'Typescript',
      },
    ],
    createDate: '2023-05-22T21:34:54.249Z',
    previewContent:
      'Given an integer array nums, a reducer function fn, and an initial value init, return a reduced array. A reduced array is created by applying the following operation: val = fn(init, nums[0]), val =...',
    nextArticle: {
      slug: 'leetcode-2629-function-composition',
      articleTitle: '2629. Function Composition',
    },
    prevArticle: {
      slug: 'leetcode-2621-sleep',
      articleTitle: '2621. Sleep',
    },
  },
  {
    slug: 'leetcode-2621-sleep',
    articleTitle: '2621. Sleep',
    categoryId: 5,
    categoryName: 'Leetcode',
    labels: [
      {
        labelId: 9,
        labelName: 'Typescript',
      },
    ],
    createDate: '2023-05-22T21:25:41.935Z',
    previewContent:
      'Given a positive integer millis, write an asyncronous function that sleeps for millis milliseconds. It can resolve any value. Example 1: Example 2: Constraints: 解法 這題是在講非同步的概念，指定要多長時間才能夠做回應。',
    nextArticle: {
      slug: 'leetcode-2626-array-reduce',
      articleTitle: '2626. Array Reduce Transformation',
    },
    prevArticle: {
      slug: 'leetcode-9-palindrome-number',
      articleTitle: '9. Palindrome Number',
    },
  },
  {
    slug: 'leetcode-9-palindrome-number',
    articleTitle: '9. Palindrome Number',
    categoryId: 5,
    categoryName: 'Leetcode',
    labels: [
      {
        labelId: 9,
        labelName: 'Typescript',
      },
    ],
    createDate: '2023-05-22T20:22:53.830Z',
    previewContent:
      'Given an integer x, return true if x is a palindrome, and false otherwise_. 何謂回文→ 正讀反讀都能讀通的句子 意思是會給一個數字，如果是回文就回傳true,不是就回傳false Example 1: Example 2: Example 3: Constraints: 解法...',
    nextArticle: {
      slug: 'leetcode-2621-sleep',
      articleTitle: '2621. Sleep',
    },
    prevArticle: {
      slug: 'leetcode-2619-array-prototype-last',
      articleTitle: '2619. Array Prototype Last',
    },
  },
  {
    slug: 'leetcode-2619-array-prototype-last',
    articleTitle: '2619. Array Prototype Last',
    categoryId: 5,
    categoryName: 'Leetcode',
    labels: [
      {
        labelId: 9,
        labelName: 'Typescript',
      },
    ],
    createDate: '2023-05-22T06:20:11.073Z',
    previewContent:
      'Write code that enhances all arrays such that you can call the array.last() method on any array and it will return the last element. If there are no elements in the array, it should return -1....',
    nextArticle: {
      slug: 'leetcode-9-palindrome-number',
      articleTitle: '9. Palindrome Number',
    },
    prevArticle: {
      slug: 'leetcode-1-two-sum',
      articleTitle: '1. Two Sum 兩數之和',
    },
  },
  {
    slug: 'leetcode-1-two-sum',
    articleTitle: '1. Two Sum 兩數之和',
    categoryId: 5,
    categoryName: 'Leetcode',
    labels: [
      {
        labelId: 9,
        labelName: 'Typescript',
      },
    ],
    createDate: '2023-05-22T06:02:13.507Z',
    previewContent:
      'Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target. You may assume that each input would have exactly one solution, and you may...',
    nextArticle: {
      slug: 'leetcode-2619-array-prototype-last',
      articleTitle: '2619. Array Prototype Last',
    },
    prevArticle: {
      slug: 'angular-custom-form-control',
      articleTitle: 'Angular 自定義表單元件',
    },
  },
  {
    slug: 'angular-custom-form-control',
    articleTitle: 'Angular 自定義表單元件',
    categoryId: 1,
    categoryName: '前端',
    labels: [],
    createDate: '2023-05-21T04:31:14.992Z',
    previewContent:
      '首先要使用 Angular 自定義表單元件，有兩個步驟要實作。 實作 ControlValueAccessor 註冊提供者 簡化提供者匯出 然後像以下方式使用： 建立基底元件 寫一個基底元件讓其他自定義元件直接繼承使用： 繼承基底元件 其他自定義元件只要繼承基底即可： 當值有異動時，調用基底的 change 來通知表單參數有異動即可：',
    nextArticle: {
      slug: 'leetcode-1-two-sum',
      articleTitle: '1. Two Sum 兩數之和',
    },
    prevArticle: {
      slug: 'angular-route-reuse-strategy',
      articleTitle: 'Angular  RouteReuseStrategy 緩存路由',
    },
  },
  {
    slug: 'angular-route-reuse-strategy',
    articleTitle: 'Angular  RouteReuseStrategy 緩存路由',
    categoryId: 1,
    categoryName: '前端',
    labels: [],
    createDate: '2023-05-21T03:27:04.323Z',
    previewContent:
      '繼承 RouteReuseStrategy 抽象類別 第一步是建立一個類別，並繼承 RouteReuseStrategy 的抽象類別。 由於是緩存式元件，只有第一次進入才會觸發 Angular 的生命週期。 實作範例 在過程中有發現，使用復用元件時 fn 有多次觸發的情況，如同底下的 issue： RouteReuseStrategy retrieve() gets fired twice ·...',
    nextArticle: {
      slug: 'angular-custom-form-control',
      articleTitle: 'Angular 自定義表單元件',
    },
    prevArticle: {
      slug: 'angular-github-action-cicd',
      articleTitle: 'Angular Github Action CI CD 範例',
    },
  },
  {
    slug: 'angular-github-action-cicd',
    articleTitle: 'Angular Github Action CI CD 範例',
    categoryId: 3,
    categoryName: 'CI CD',
    labels: [
      {
        labelId: 5,
        labelName: 'Github/GiteaAction',
      },
      {
        labelId: 22,
        labelName: 'Github',
      },
    ],
    createDate: '2023-05-21T00:24:01.329Z',
    previewContent:
      '完整 Workflow 範例 以下為 Github Action 的 Angular workflow 範例： 觸發條件 如何觸發這個 workflow： 設定版本 每個 Step 的介紹 Secrets 安全金鑰設定 Github Action 有個 secrets 的安全金鑰設定，通常會把 token 或 key 之類的敏感資訊放在這邊設定使用： 對應倉庫 倉庫底下的 action.yml...',
    nextArticle: {
      slug: 'angular-route-reuse-strategy',
      articleTitle: 'Angular  RouteReuseStrategy 緩存路由',
    },
    prevArticle: {
      slug: 'csharp-ef-core-mysql',
      articleTitle: '使用C# Entity Framework Core連接MySQL',
    },
  },
  {
    slug: 'csharp-ef-core-mysql',
    articleTitle: '使用C# Entity Framework Core連接MySQL',
    categoryId: 2,
    categoryName: '後端',
    labels: [
      {
        labelId: 3,
        labelName: 'MySQL',
      },
      {
        labelId: 4,
        labelName: 'EntityFramework',
      },
      {
        labelId: 7,
        labelName: '.Net Core',
      },
    ],
    createDate: '2023-05-20T08:04:05.887Z',
    previewContent:
      '安裝套件 先安裝以下套件： 建立 DbContext 模型 雙主鍵表及關聯表範例 自動遞增表範例 製作遷移檔 透過指令來製作遷移檔： 更新資料庫 如果有環境變數需求： 連線字串的範例如下： 使用範例 以上就是建立 C# 及 MySQL 資料庫的整個流程。後續使用方式跟 Entity Framework 操作方式相同： 遠端備份 SQL $ 為變數，注意 $pwd 的地方不能有間隔：',
    nextArticle: {
      slug: 'angular-github-action-cicd',
      articleTitle: 'Angular Github Action CI CD 範例',
    },
    prevArticle: {
      slug: 'angular-v16-upgrade',
      articleTitle: 'Angular v16 升級大綱',
    },
  },
  {
    slug: 'angular-v16-upgrade',
    articleTitle: 'Angular v16 升級大綱',
    categoryId: 1,
    categoryName: '前端',
    labels: [
      {
        labelId: 1,
        labelName: '版本更新',
      },
    ],
    createDate: '2023-05-20T07:16:59.032Z',
    previewContent:
      'Angular 新增 Signals，zone.js 變為可選設定 其中 Signals 當中我覺得 computed 最實用，雖然其他框架已經都有類似的功能，不過對於需要轉型或計算的場景，原本都只能透過管道或是先處理完再塞到樣板當中，現在多了一種方式可用。 以下為使用範例： Zone.js 可選設置 RxJS interoperability 因應 Signal 新增了 RxJS...',
    nextArticle: {
      slug: 'csharp-ef-core-mysql',
      articleTitle: '使用C# Entity Framework Core連接MySQL',
    },
  },
];

/** 所有分類 */
export const CATEGORIES: CategoryItem[] = [
  {
    categoryId: 1,
    categoryName: '前端',
  },
  {
    categoryId: 2,
    categoryName: '後端',
  },
  {
    categoryId: 3,
    categoryName: 'CI CD',
  },
  {
    categoryId: 4,
    categoryName: 'Docker',
  },
  {
    categoryId: 5,
    categoryName: 'Leetcode',
  },
  {
    categoryId: 10,
    categoryName: 'Nginx',
  },
  {
    categoryId: 11,
    categoryName: 'Linux',
  },
  {
    categoryId: 12,
    categoryName: 'Git',
  },
  {
    categoryId: 14,
    categoryName: '資料庫',
  },
  {
    categoryId: 15,
    categoryName: 'VSCode',
  },
  {
    categoryId: 16,
    categoryName: 'Web',
  },
  {
    categoryId: 17,
    categoryName: 'Windows',
  },
];

/** 所有標籤 */
export const LABELS: LabelItem[] = [
  {
    labelId: 1,
    labelName: '版本更新',
  },
  {
    labelId: 3,
    labelName: 'MySQL',
  },
  {
    labelId: 4,
    labelName: 'EntityFramework',
  },
  {
    labelId: 5,
    labelName: 'Github/GiteaAction',
  },
  {
    labelId: 7,
    labelName: '.Net Core',
  },
  {
    labelId: 8,
    labelName: '.Net Framework',
  },
  {
    labelId: 9,
    labelName: 'Typescript',
  },
  {
    labelId: 11,
    labelName: '驗證碼',
  },
  {
    labelId: 12,
    labelName: 'Unit Test',
  },
  {
    labelId: 13,
    labelName: 'Jasmine',
  },
  {
    labelId: 14,
    labelName: 'Karma',
  },
  {
    labelId: 15,
    labelName: 'Graphql',
  },
  {
    labelId: 17,
    labelName: 'SSL',
  },
  {
    labelId: 18,
    labelName: '反向代理',
  },
  {
    labelId: 19,
    labelName: 'Docker',
  },
  {
    labelId: 20,
    labelName: '批次',
  },
  {
    labelId: 21,
    labelName: 'Drone',
  },
  {
    labelId: 22,
    labelName: 'Github',
  },
  {
    labelId: 23,
    labelName: '常用指令',
  },
  {
    labelId: 25,
    labelName: 'husky',
  },
  {
    labelId: 27,
    labelName: 'Microsoft SQL Server',
  },
  {
    labelId: 28,
    labelName: 'IOS',
  },
  {
    labelId: 29,
    labelName: 'Windows',
  },
  {
    labelId: 32,
    labelName: 'IIS',
  },
  {
    labelId: 33,
    labelName: 'Angular',
  },
  {
    labelId: 34,
    labelName: 'PostgreSQL',
  },
];

/** 所有專案經歷（按 order 排序） */
export const PROJECTS: ProjectItem[] = [];
