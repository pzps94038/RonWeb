# Ron's Blog

Angular 17 純靜態個人技術部落格，文章以 Markdown 撰寫，build 時自動編譯。

## 快速開始

```bash
npm install
npm run start        # 本地開發（http://localhost:4200）
npm run build        # 建置（含 prebuild 自動編譯內容）
```

---

## 新增文章 SOP

### 步驟一：建立 Markdown 檔案

在 `content/posts/` 新增 `.md` 檔案。**檔名即為網址 slug**：

```
content/posts/my-article-title.md
```

文章網址：`/blog/article/my-article-title`

> 命名建議：全小寫英文，用 `-` 連接，簡短描述文章主題

### 步驟二：撰寫 Frontmatter

在檔案頂部加入 JSON frontmatter（`---` 包圍）：

```markdown
---
{
  'title': '文章標題',
  'categoryId': 1,
  'categoryName': '前端',
  'labels': [{ 'labelId': 33, 'labelName': 'Angular' }],
  'createDate': '2026-03-15T00:00:00.000Z',
  'references': [],
  'flag': 'Y',
}
---

## 第一個章節

正文 Markdown 內容...
```

### 步驟三：撰寫文章內容

- 使用 `##`（h2）作為主要章節標題
- 使用 `###`（h3）作為子標題
- **不要使用** `#`（h1），因為標題由 frontmatter 的 `title` 提供
- 標題會自動產生 TOC 目錄（桌面左側 / 手機底部浮動按鈕）
- 程式碼區塊支援語法高亮（如 ` ```typescript `）

### 步驟四：加入圖片（如有）

1. 將圖片放入 `content/images/{slug}/` 目錄
2. 在 Markdown 中引用：

```markdown
![說明文字](/assets/images/my-article-title/1.png)
```

### 步驟五：建置發佈

```bash
npm run build
```

prebuild 腳本會自動：

- 掃描所有 `.md` frontmatter → 生成 TypeScript 索引
- 複製 `.md` 到 `src/assets/posts/`
- 複製圖片到 `src/assets/images/`
- 自動提取分類和標籤（無需額外設定檔）
- 自動產生文章摘要

### 草稿機制

將 frontmatter 的 `flag` 設為 `"N"` 即為草稿，不會出現在網站上：

```json
{ "flag": "N" }
```

---

## Frontmatter 欄位說明

| 欄位           | 必填 | 說明                              |
| -------------- | ---- | --------------------------------- |
| `title`        | 是   | 文章標題                          |
| `categoryId`   | 是   | 分類 ID                           |
| `categoryName` | 是   | 分類名稱                          |
| `labels`       | 否   | 標籤陣列 `[{labelId, labelName}]` |
| `createDate`   | 是   | 建立日期（ISO 格式）              |
| `references`   | 否   | 參考連結陣列                      |
| `flag`         | 是   | `"Y"` 發佈 / `"N"` 草稿           |

## 既有分類

| ID  | 名稱     |
| --- | -------- |
| 1   | 前端     |
| 2   | 後端     |
| 3   | CI CD    |
| 4   | Docker   |
| 5   | Leetcode |
| 10  | Nginx    |
| 11  | Linux    |
| 12  | Git      |
| 14  | 資料庫   |
| 15  | VSCode   |
| 16  | Web      |
| 17  | Windows  |

> 使用新的 `categoryId` + `categoryName` 即自動建立新分類，標籤同理。

---

## 專案結構

```
content/
├── posts/              # Markdown 文章（檔名 = URL slug）
└── images/             # 文章圖片（按 slug 分資料夾）

scripts/
├── build-content.js    # 內容建置（prebuild 自動執行）
└── download-images.js  # Firebase 圖片下載工具

src/
├── app/
│   ├── blog/           # 部落格（首頁、文章、分類、標籤、搜尋）
│   ├── about-me/       # 關於我
│   └── shared/
│       ├── data/       # 自動生成的索引（勿手動編輯）
│       └── service/    # StaticContentService
└── assets/
    ├── posts/          # build 時複製的 .md
    └── images/         # build 時複製的圖片
```

## 常用指令

| 指令               | 說明                  |
| ------------------ | --------------------- |
| `npm run start`    | 本地開發伺服器        |
| `npm run build`    | 建置（含 prebuild）   |
| `npm run test`     | 單元測試              |
| `npm run test-ci`  | CI 用測試（無 watch） |
| `npm run prettier` | 程式碼格式化          |

## 技術棧

- **框架**: Angular 17（CSR）
- **UI**: TailwindCSS 3 + DaisyUI（Warm Amber 深色主題）
- **Markdown**: marked（客戶端即時轉換）
- **程式碼高亮**: highlight.js
- **字體**: JetBrains Mono + Inter + Noto Sans TC
- **測試**: Jasmine/Karma + Cypress
