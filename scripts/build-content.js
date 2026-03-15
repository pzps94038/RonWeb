/**
 * 靜態內容建置腳本
 * 掃描 content/posts/*.md 的 frontmatter，生成 TypeScript 索引檔。
 * 並將 .md 檔案複製到 src/assets/posts/ 供前端直接讀取。
 *
 * 產出：
 * - src/app/shared/data/posts-index.ts：文章索引常數（編譯進 bundle）
 * - src/assets/posts/{slug}.md：原始 Markdown 檔案（slug 取自檔名）
 * - src/assets/images/{slug}/：文章圖片資源
 */
const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

const CONTENT_DIR = path.join(__dirname, '..', 'content');
const POSTS_DIR = path.join(CONTENT_DIR, 'posts');
const PROJECTS_DIR = path.join(CONTENT_DIR, 'projects');
const IMAGES_DIR = path.join(CONTENT_DIR, 'images');
const ASSETS_POSTS_DIR = path.join(__dirname, '..', 'src', 'assets', 'posts');
const ASSETS_IMAGES_DIR = path.join(__dirname, '..', 'src', 'assets', 'images');
const INDEX_OUTPUT = path.join(__dirname, '..', 'src', 'app', 'shared', 'data', 'posts-index.ts');

/**
 * 確保目錄存在，若不存在則建立
 * @param {string} dir - 目錄路徑
 */
function ensureDir(dir) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

/**
 * 清空目錄中的檔案
 * @param {string} dir - 目錄路徑
 */
function cleanDir(dir) {
  if (fs.existsSync(dir)) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
      const filePath = path.join(dir, file);
      if (fs.statSync(filePath).isFile()) {
        fs.unlinkSync(filePath);
      }
    }
  }
}

/**
 * 遞迴刪除目錄（含所有子目錄與檔案）
 * @param {string} dir - 目錄路徑
 */
function removeDirRecursive(dir) {
  if (fs.existsSync(dir)) {
    fs.rmSync(dir, { recursive: true, force: true });
  }
}

/**
 * 遞迴複製目錄（含所有子目錄與檔案）
 * @param {string} src - 來源目錄路徑
 * @param {string} dest - 目標目錄路徑
 */
function copyDirRecursive(src, dest) {
  ensureDir(dest);
  const entries = fs.readdirSync(src, { withFileTypes: true });
  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);
    if (entry.isDirectory()) {
      copyDirRecursive(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

/**
 * 從 Markdown 內容提取純文字摘要
 * 移除所有 Markdown 語法（程式碼、圖片、連結、標題等），
 * 只保留有意義的文字段落，截取前 maxLength 個字元。
 * @param {string} markdown - Markdown 原始內容
 * @param {number} maxLength - 最大字元數
 * @returns {string} 純文字摘要
 */
function extractPreview(markdown, maxLength) {
  const text = markdown
    // 移除程式碼區塊
    .replace(/```[\s\S]*?```/g, '')
    // 移除行內程式碼
    .replace(/`([^`]+)`/g, '$1')
    // 移除圖片
    .replace(/!\[[^\]]*\]\([^)]+\)/g, '')
    // 移除連結但保留文字
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    // 移除 HTML 標籤
    .replace(/<[^>]+>/g, '')
    // 移除標題符號
    .replace(/^#{1,6}\s+/gm, '')
    // 移除粗體/斜體
    .replace(/\*{1,3}([^*]+)\*{1,3}/g, '$1')
    .replace(/_{1,3}([^_]+)_{1,3}/g, '$1')
    // 移除刪除線
    .replace(/~~([^~]+)~~/g, '$1')
    // 移除分隔線
    .replace(/^[-*_]{3,}\s*$/gm, '')
    // 移除清單符號
    .replace(/^\s*[-*+]\s+/gm, '')
    .replace(/^\s*\d+[.)]\s+/gm, '')
    .replace(/^\s*\d+\\\.\s*/gm, '')
    // 移除引用符號
    .replace(/^\s*>\s*/gm, '')
    // 移除多餘空行和空白
    .replace(/\n{2,}/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

  if (!text) return '';
  if (text.length <= maxLength) return text;
  // 在字邊界截斷
  const truncated = text.substring(0, maxLength);
  const lastSpace = truncated.lastIndexOf(' ');
  return (lastSpace > maxLength * 0.7 ? truncated.substring(0, lastSpace) : truncated) + '...';
}

/**
 * 主要建置流程
 */
function build() {
  console.log('開始建置靜態內容...');

  ensureDir(ASSETS_POSTS_DIR);
  ensureDir(path.dirname(INDEX_OUTPUT));
  cleanDir(ASSETS_POSTS_DIR);

  // 複製圖片資源：content/images/ → src/assets/images/
  removeDirRecursive(ASSETS_IMAGES_DIR);
  if (fs.existsSync(IMAGES_DIR)) {
    copyDirRecursive(IMAGES_DIR, ASSETS_IMAGES_DIR);
    const imgDirs = fs
      .readdirSync(IMAGES_DIR)
      .filter(f => fs.statSync(path.join(IMAGES_DIR, f)).isDirectory());
    console.log('已複製 ' + imgDirs.length + ' 個圖片目錄到 ' + ASSETS_IMAGES_DIR);
  }

  const files = fs.readdirSync(POSTS_DIR).filter(f => f.endsWith('.md'));
  console.log('找到 ' + files.length + ' 篇文章');

  const articles = [];

  for (const file of files) {
    const filePath = path.join(POSTS_DIR, file);
    const raw = fs.readFileSync(filePath, 'utf-8');
    const { data, content } = matter(raw, {
      engines: { json: s => JSON.parse(s) },
    });

    // slug 從檔名推斷（去掉 .md 副檔名）
    const slug = path.basename(file, '.md');

    if (!data || !data.title) {
      console.warn('跳過無效檔案: ' + file);
      continue;
    }
    if (data.flag !== 'Y') continue;

    // 將 .md 寫入 assets，frontmatter 重新序列化為標準雙引號 JSON
    // 確保前端 JSON.parse 可正確解析（原始檔可能使用單引號 JSON）
    const normalizedMd = '---\n' + JSON.stringify(data, null, 2) + '\n---\n' + content;
    fs.writeFileSync(path.join(ASSETS_POSTS_DIR, slug + '.md'), normalizedMd, 'utf-8');

    // 從 Markdown body 自動生成純文字摘要（取前 200 字）
    const previewContent = extractPreview(content, 200);

    articles.push({
      slug: slug,
      articleTitle: data.title,
      categoryId: data.categoryId,
      categoryName: data.categoryName,
      labels: data.labels || [],
      createDate: data.createDate,
      previewContent: previewContent,
    });
  }

  // 按建立日期降序
  articles.sort((a, b) => new Date(b.createDate).getTime() - new Date(a.createDate).getTime());

  // 加上前後篇資訊
  for (let i = 0; i < articles.length; i++) {
    if (i > 0) {
      articles[i].nextArticle = {
        slug: articles[i - 1].slug,
        articleTitle: articles[i - 1].articleTitle,
      };
    }
    if (i < articles.length - 1) {
      articles[i].prevArticle = {
        slug: articles[i + 1].slug,
        articleTitle: articles[i + 1].articleTitle,
      };
    }
  }

  // 從文章 frontmatter 自動提取分類（去重，按 categoryId 排序）
  const categoryMap = new Map();
  for (const a of articles) {
    if (!categoryMap.has(a.categoryId)) {
      categoryMap.set(a.categoryId, {
        categoryId: a.categoryId,
        categoryName: a.categoryName,
      });
    }
  }
  const categories = Array.from(categoryMap.values()).sort((a, b) => a.categoryId - b.categoryId);

  // 從文章 frontmatter 自動提取標籤（去重，按 labelId 排序）
  const labelMap = new Map();
  for (const a of articles) {
    for (const l of a.labels) {
      if (!labelMap.has(l.labelId)) {
        labelMap.set(l.labelId, {
          labelId: l.labelId,
          labelName: l.labelName,
        });
      }
    }
  }
  const labels = Array.from(labelMap.values()).sort((a, b) => a.labelId - b.labelId);

  // 讀取專案經歷 .md 檔案
  const projects = [];
  if (fs.existsSync(PROJECTS_DIR)) {
    const projectFiles = fs.readdirSync(PROJECTS_DIR).filter(f => f.endsWith('.md'));
    const { marked } = require('marked');
    for (const file of projectFiles) {
      const filePath = path.join(PROJECTS_DIR, file);
      const raw = fs.readFileSync(filePath, 'utf-8');
      const { data, content } = matter(raw, {
        engines: { json: s => JSON.parse(s) },
      });
      if (!data || !data.id) continue;
      projects.push({
        id: data.id,
        name: data.name,
        role: data.role || '',
        period: data.period || '',
        techs: data.techs || [],
        order: data.order || 999,
        description: marked(content.trim(), { async: false }),
      });
    }
    projects.sort((a, b) => a.order - b.order);
    console.log('找到 ' + projects.length + ' 個專案經歷');
  }

  // 生成 TypeScript 索引檔
  const lines = [
    '/**',
    ' * 自動生成的文章索引（由 scripts/build-content.js 產生）',
    ' * 請勿手動編輯此檔案',
    ' */',
    '',
    '/** 文章索引項目 */',
    'export type PostIndexItem = {',
    '  slug: string;',
    '  articleTitle: string;',
    '  categoryId: number;',
    '  categoryName: string;',
    '  labels: { labelId: number; labelName: string }[];',
    '  createDate: string;',
    '  previewContent: string;',
    '  nextArticle?: { slug: string; articleTitle: string };',
    '  prevArticle?: { slug: string; articleTitle: string };',
    '};',
    '',
    '/** 分類項目 */',
    'export type CategoryItem = {',
    '  categoryId: number;',
    '  categoryName: string;',
    '};',
    '',
    '/** 標籤項目 */',
    'export type LabelItem = {',
    '  labelId: number;',
    '  labelName: string;',
    '};',
    '',
    '/** 專案經歷項目 */',
    'export type ProjectItem = {',
    '  id: number;',
    '  name: string;',
    '  role: string;',
    '  period: string;',
    '  techs: string[];',
    '  order: number;',
    '  description: string;',
    '};',
    '',
    '/** 所有已發佈文章索引（按日期降序） */',
    'export const POSTS_INDEX: PostIndexItem[] = ' + JSON.stringify(articles, null, 2) + ';',
    '',
    '/** 所有分類 */',
    'export const CATEGORIES: CategoryItem[] = ' + JSON.stringify(categories, null, 2) + ';',
    '',
    '/** 所有標籤 */',
    'export const LABELS: LabelItem[] = ' + JSON.stringify(labels, null, 2) + ';',
    '',
    '/** 所有專案經歷（按 order 排序） */',
    'export const PROJECTS: ProjectItem[] = ' + JSON.stringify(projects, null, 2) + ';',
    '',
  ];

  fs.writeFileSync(INDEX_OUTPUT, lines.join('\n'), 'utf-8');

  console.log('建置完成！共 ' + articles.length + ' 篇文章');
  console.log('TypeScript 索引: ' + INDEX_OUTPUT);
  console.log('Markdown 檔案: ' + ASSETS_POSTS_DIR);
}

build();
