# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 語言規範

- 所有回覆、註解、字串一律使用**繁體中文**
- 新增或修改的 function 必須加上完整文件註解（說明用途、參數、回傳值）

## 常用指令

| 指令                         | 說明                                |
| ---------------------------- | ----------------------------------- |
| `npm run start:local`        | 本地開發（帶代理至 localhost:3000） |
| `npm run build:ssr`          | SSR 完整構建 + 預渲染 + Sitemap     |
| `npm run serve:ssr`          | 啟動 SSR 伺服器                     |
| `npm run test`               | 單元測試（含覆蓋率，watch 模式）    |
| `npm run test-ci`            | CI 用單元測試（無 watch）           |
| `npm run prettier`           | Prettier 格式化                     |
| `npm run cypress:open:local` | 本地 Cypress E2E 測試               |
| `npm run sitemap`            | 生成 Sitemap                        |

## 架構概覽

Angular 17 個人部落格，採用 **Standalone Components** + **SSR/ISR 混合渲染**。

- **SSR 伺服器**: `server.ts` — Express + `@rx-angular/isr` 實現增量靜態再生成
- **應用配置**: `src/app/app.config.ts`（提供者、攔截器）、`app.config.server.ts`（SSR 專用）
- **路由**: `src/app/app.route.ts` 為主路由，`/blog` 子路由在 `src/app/blog/blog.route.ts`

### 路由結構

```
/ → /blog（重定向）
├── /blog          — 部落格（首頁、文章、分類、標籤、搜尋）
├── /login         — 登入（isNotLoginGuard）
├── /about-me      — 關於我（預渲染）
├── /setting       — 管理後台（isLoginGuard）
│   ├── /article、/article-category、/article-label
│   ├── /code-type、/project-experience
└── **             → /blog
```

### 共享模組 (`src/app/shared/`)

- **api/** — 各資源的 HTTP 服務（article、admin-\*、search、upload 等）
- **service/** — 單例服務：
  - `theme.service` — DaisyUI 深色/淺色主題切換
  - `seo.service` — 動態 meta 標籤管理
  - `user.service` — 認證狀態（Signals）
  - `transfer.service` — SSR 資料傳輸
  - `device.service` — 平台檢測（SSR/瀏覽器）
  - `code-block-highlight` — highlight.js 程式碼高亮
- **component/** — 共享 UI 元件（header、footer、pagination、form 等）
- **guard/** — 路由守衛（isLogin / isNotLogin）
- **pipe/** — dayjs、ellipsis、highlight-keyword、safe 管道
- **directive/** — scroll-animate 動畫指令

### 認證流程

HTTP 攔截器（`src/app/shared/api/shared/http.interceptor.ts`）自動附加 Bearer token，token 過期時透過 `RefreshTokenService` 自動刷新並重試請求，失敗則彈出過期登入對話框。

## 技術棧

- **框架**: Angular 17.3 + Express SSR
- **UI**: TailwindCSS 3 + DaisyUI 2
- **編輯器**: CKEditor 5（文章管理）
- **圖示**: @ng-icons（Feather + Heroicons）
- **動畫**: Lottie + animate.css
- **日期**: dayjs
- **測試**: Jasmine/Karma（單元）、Cypress（E2E）
- **部署**: Docker → Zeabur

## 程式碼風格

- Prettier 強制格式化（2 空格、單引號、100 字元寬度）
- Pre-commit hook 自動執行 `prettier --write`（透過 husky + lint-staged）
- 所有元件皆為 Standalone Component

## 環境設定

- 開發環境 API 代理：`proxy.conf.local.json` → `http://localhost:3000`
- 生產環境 API：`https://ron-web-api.zeabur.app/api`
- 環境變數定義在 `src/environments/`
