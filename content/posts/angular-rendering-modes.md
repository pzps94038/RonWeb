---
{
  'title': 'Angular 渲染模式',
  'categoryId': 1,
  'categoryName': '前端',
  'labels': [{ 'labelId': 33, 'labelName': 'Angular' }],
  'createDate': '2025-06-12T18:48:45.107Z',
  'references':
    [
      'https://v17.angular.io/guide/prerendering',
      'https://v17.angular.io/guide/ssr',
      'https://www.rx-angular.io/docs/isr',
    ],
  'flag': 'Y',
}
---

## 1\. CSR（Client-Side Rendering）客戶端渲染

### 原理：

頁面先下載空白 HTML 和 JS

Angular 在瀏覽器中啟動，動態生成畫面

### 優點：

⚡ 快速開發、部署簡單

🔄 客戶端互動性佳

📦 前端打包一次即可部署到 CDN

### 缺點：

🐌 首屏載入較慢

❌ SEO 表現差（搜尋引擎抓不到動態內容）

### 使用時機：

登入後的管理後台、SPA 應用

SEO 不重要的系統

## 2\. SSR（Server-Side Rendering）伺服器渲染

### 原理：

伺服器接到請求後即時產出 HTML，再交給使用者

使用 Angular Universal 套件實作

### 優點：

✅ 首屏渲染快

✅ 良好的 SEO

🌐 支援社群分享預覽（FB、Line）

### 缺點：

🧮 每次請求都需後端運算（伺服器負擔重）

🛠 開發與部署複雜（需要 Node server）

### 使用時機：

SEO 敏感頁面，如首頁、新聞、電商商品頁

動態內容需要每次都即時顯示

## 3\. SSG（Static Site Generation）靜態網站生成

### 原理：

開發時預先產生好 HTML

發布時部署純靜態檔案（無需伺服器）

### 優點：

🚀 載入速度超快

🆓 免伺服器，支援 CDN

✅ 良好 SEO

### 缺點：

⏱ 每次更新都要重新 build、重新部署

不適合資料頻繁變動的網站

### 使用時機：

Blog、說明頁面、常駐內容頁

發布前可確定內容的頁面

## 4\. ISR（Incremental Static Regeneration）增量靜態再生

### 原理：

和 SSG 一樣先預產生 HTML

但允許 HTML 到期後在背景「再生」新的版本

由 `@rx-angular/isr` 套件支援

### 優點：

✅ 快速首屏 + SEO 佳

✅ 不需要重建整站

♻️ 背景更新資料，不影響使用者體驗

📉 減輕伺服器壓力

### 缺點：

🛠 需整合 Angular Universal + ISR 套件

對快取控管要小心

### 使用時機：

資料偶爾會變更的商品頁、新聞頁

想要 SEO + 快速載入 + 低成本的最佳解法

模式

首屏速度

SEO 友善

開發難度

資料即時性

適合場景

CSR

🟡 中

🔴 差

🟢 簡單

🟢 佳

管理後台、SPA

SSR

🟢 快

🟢 好

🔴 較複雜

🟢 即時

首頁、搜尋頁、動態頁

SSG

🟢 超快

🟢 好

🟡 中等

🔴 重新建置需時間

說明頁、公司網站

ISR

🟢 超快

🟢 好

🟡 中等

🟢 還不錯

電商頁、常更新但不是秒級需求
