# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 語言規範

- 所有回覆、註解、字串一律使用**繁體中文**
- 新增或修改的 function 必須加上完整文件註解（說明用途、參數、回傳值）

## 常用指令

| 指令                            | 說明                              |
| ------------------------------- | --------------------------------- |
| `npm run start`                 | 本地開發伺服器                    |
| `npm run build:static`          | 靜態建置（含內容預編譯）          |
| `npm run build`                 | Angular 建置（自動執行 prebuild） |
| `npm run test`                  | 單元測試（含覆蓋率，watch 模式）  |
| `npm run test-ci`               | CI 用單元測試（無 watch）         |
| `npm run prettier`              | Prettier 格式化                   |
| `npm run sitemap`               | 生成 Sitemap                      |
| `node scripts/build-content.js` | 手動重建靜態內容 JSON             |

## 架構概覽

Angular 17 純靜態個人部落格，採用 **Standalone Components** + **CSR（Client-Side Rendering）**。

- **資料來源**: 文章列表用預編譯索引 JSON，單篇文章直接讀取 .md 並在客戶端解析
- **內容管道**: `content/posts/*.md` → `scripts/build-content.js` → `src/assets/content/posts/*.md` + `articles-index.json`
- **應用配置**: `src/app/app.config.ts`（簡化版，無 SSR/攔截器/認證）
- **路由**: `src/app/app.route.ts` 為主路由，`/blog` 子路由在 `src/app/blog/blog.route.ts`

### 路由結構

```
/ → /blog（重定向）
├── /blog          — 部落格首頁（文章列表 + 側邊分類/標籤）
│   ├── /search/:keyword  — 關鍵字搜尋
│   ├── /category/:id     — 分類篩選
│   ├── /label/:id        — 標籤篩選
│   ├── /article/:slug    — 文章詳情（含 TOC 目錄，slug 取自檔名）
│   └── /notFound          — 404
├── /about-me      — 關於我
└── **             → /blog
```

### 資料服務

- `StaticContentService`（`src/app/shared/service/static-content.service.ts`）— 取代所有 API 呼叫，列表用索引 JSON，單篇文章直接讀取 .md 並用 `marked` 轉 HTML

### 共享模組 (`src/app/shared/`)

- **service/** — 單例服務：
  - `static-content.service` — 靜態內容讀取（分頁、篩選、搜尋）
  - `theme.service` — DaisyUI 深色/淺色主題切換
  - `seo.service` — 動態 meta 標籤管理
  - `device.service` — 平台檢測
  - `code-block-highlight` — highlight.js 程式碼高亮
- **component/** — 共享 UI 元件（header、footer、pagination 等）
- **pipe/** — dayjs、ellipsis、highlight-keyword、safe 管道

### 新增文章流程

1. 在 `content/posts/` 新增 `.md` 檔案
2. 在檔案頂部加入 JSON frontmatter（格式見下方）
3. 執行 `npm run build` 即可發佈

#### Frontmatter 格式

檔名即為 slug（如 `2026-03-15-my-article.md` → slug 為 `2026-03-15-my-article`），不需在 frontmatter 中指定 id 或 slug。

```markdown
---
{
  'title': '文章標題',
  'categoryId': 1,
  'categoryName': '前端',
  'labels': [{ 'labelId': 1, 'labelName': 'Angular' }],
  'viewCount': 0,
  'createDate': '2026-03-15T00:00:00.000Z',
  'updateDate': '2026-03-15T00:00:00.000Z',
  'references': [],
  'previewContent': '<p>預覽內容</p>',
  'flag': 'Y',
}
---

Markdown 內容...
```

## 技術棧

- **框架**: Angular 17.3（CSR 模式）
- **UI**: TailwindCSS 3 + DaisyUI（自訂主題）
- **圖示**: @ng-icons（Heroicons）
- **程式碼高亮**: highlight.js
- **日期**: dayjs
- **Markdown**: marked（客戶端即時轉換）+ gray-matter（build 時解析索引）
- **測試**: Jasmine/Karma（單元）、Cypress（E2E）
- **字體**: JetBrains Mono + Inter + Noto Sans TC

## 程式碼風格

- Prettier 強制格式化（2 空格、單引號、100 字元寬度）
- Pre-commit hook 自動執行 `prettier --write`（透過 husky + lint-staged）
- 所有元件皆為 Standalone Component
