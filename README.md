[![Build Status](https://drone.ronwebs.com/api/badges/pzps94038/RonWeb/status.svg)](https://drone.ronwebs.com/pzps94038/RonWeb)

# RonWeb 個人部落格
<img width="556" alt="image" src="https://github.com/pzps94038/RonWeb/assets/80943379/f861afae-beac-40bf-841a-a446448d305a">

## 如何開始

以下是在本地開發環境中啟動專案的步驟：

1. 確保已安裝 Node.js（建議使用 v16.x.x）：[https://nodejs.org](https://nodejs.org)
2. 複製專案程式碼到本地
3. 在專案目錄中，執行以下命令以安裝相依套件：

```
npm ci
```

### 本機運行

```
npm run start:local
```

### 單元測試

```
npm run test
```

### 單元測試-只執行一次(提供給 CICD)

```
npm run test-ci
```

### 建置專案

```
npm run build
```

### 建立 GithubPage 專案

```
npm run build:gitHubPage
```

### 開發模式 SSR

```
npm run dev:ssr
```

### 運行建置後的 Server-Side-Render

```
npm run serve:ssr
```

### 建置 PreRender - 靜態 html 檔案

```
npm run prerender
```

### 建置 docker file

```
npm run build:docker
```

### 把佔用 port 3000 && 4200 砍掉

```
npm run killport
```

### 產生 SEO 使用的索引清單

```
npm run sitemap
```

### 跑 E2E 測試-本機

```
npm run cypress:open:local
```

### 跑 E2E 測試-正式機

```
npm run cypress:open:prod
```

### 列出瀏覽器支援清單

```
npm run browserslist
```

## 專案版本及套件相關

在此列出專案使用的主要技術和相關套件。

- Angular 版本: 16.0.4
- 部署相關套件或工具：
  - ckeditor 版本: 37.1.0
  - ng-icons 版本: 23.3.0
  - ng-select 版本: 11.0.0
  - @ngneat/dialog 版本: 4.0.0
  - angular/universal 版本: 16.0.0
  - animate.css 版本: 4.1.1
  - daisyui 版本: 2.51.5
  - dayjs 版本: 1.11.7
  - express 版本: 4.15.2
  - highlight.js 版本: 11.8.0
  - lottie-web 版本: 5.11.0
  - sweetalert2 版本: 11.7.5
  - swiper 版本: 9.2.2
- 本機相關套件或工具
  - autoprefixer 版本: 10.4.14
  - axios 版本: 1.4.0
  - cypress 版本: latest
  - husky 版本: 8.0.3
  - sitemap 版本: 7.1.1
  - tailwindcss 版本: 3.3.2
