/**
 * 靜態 Sitemap 產生腳本
 * 從 content/posts/*.md 的 frontmatter 讀取文章、分類、標籤資訊，
 * 產生 sitemap XML 檔案至 dist/RonWeb/browser/。
 */
const { createWriteStream, readdirSync, readFileSync, existsSync, mkdirSync } = require('fs');
const { resolve, join, basename, dirname } = require('path');
const matter = require('gray-matter');
const { SitemapAndIndexStream, SitemapStream } = require('sitemap');

const POSTS_DIR = join(__dirname, 'content', 'posts');
const OUTPUT_DIR = './dist/RonWeb/browser';
const hostName = 'https://pzps94038.github.io/RonWeb';
const lastmod = new Date();

/**
 * 確保目錄存在，若不存在則建立
 * @param {string} targetPath - 檔案路徑
 */
const checkDir = targetPath => {
  const targetDir = dirname(targetPath);
  if (!existsSync(targetDir)) {
    mkdirSync(targetDir, { recursive: true });
    console.log('資料夾已建立:', targetDir);
  }
};

/**
 * 從 content/posts/*.md 讀取所有已發佈文章的 frontmatter
 * @returns {{ slugs: string[], categoryIds: Set<number>, labelIds: Set<number> }}
 */
function readPosts() {
  const files = readdirSync(POSTS_DIR).filter(f => f.endsWith('.md'));
  const slugs = [];
  const categoryIds = new Set();
  const labelIds = new Set();

  for (const file of files) {
    const raw = readFileSync(join(POSTS_DIR, file), 'utf-8');
    const { data } = matter(raw, {
      engines: { json: s => JSON.parse(s) },
    });
    if (!data || !data.title || data.flag !== 'Y') continue;

    const slug = basename(file, '.md');
    slugs.push(slug);

    if (data.categoryId != null) {
      categoryIds.add(data.categoryId);
    }
    if (Array.isArray(data.labels)) {
      for (const l of data.labels) {
        if (l.labelId != null) {
          labelIds.add(l.labelId);
        }
      }
    }
  }

  return { slugs, categoryIds, labelIds };
}

// 主流程
const { slugs, categoryIds, labelIds } = readPosts();

// 靜態頁面
let urls = [
  { url: '/about-me', changefreq: 'weekly', priority: 1.0, lastmod },
  { url: '/blog', changefreq: 'daily', priority: 1.0, lastmod },
];

// 文章頁面
for (const slug of slugs) {
  urls.push({
    url: `/blog/article/${slug}`,
    changefreq: 'daily',
    priority: 0.9,
    lastmod,
  });
}

// 文章分頁
const itemsPerPage = 10;
const totalPages = Math.ceil(slugs.length / itemsPerPage);
for (let i = 1; i <= totalPages; i++) {
  urls.push({
    url: `/blog?page=${i}`,
    changefreq: 'daily',
    priority: 0.9,
    lastmod,
  });
}

// 分類頁面
for (const id of categoryIds) {
  urls.push({
    url: `/blog/category/${id}`,
    changefreq: 'weekly',
    priority: 0.8,
    lastmod,
  });
}

// 標籤頁面
for (const id of labelIds) {
  urls.push({
    url: `/blog/label/${id}`,
    changefreq: 'weekly',
    priority: 0.8,
    lastmod,
  });
}

// 產生 Sitemap
let sitemapCount = 0;
const sms = new SitemapAndIndexStream({
  limit: 20000,
  getSitemapStream: i => {
    const sitemapStream = new SitemapStream({ hostname: hostName });
    const path = `${OUTPUT_DIR}/sitemap-${i + 1}.xml`;
    checkDir(path);
    sitemapCount++;
    const ws = sitemapStream.pipe(createWriteStream(resolve(path)));
    return [new URL(`sitemap-${i + 1}.xml`, `${hostName}/`).toString(), sitemapStream, ws];
  },
});

urls.forEach(url => sms.write(url));
sms.end();

const indexPath = `${OUTPUT_DIR}/sitemap-index.xml`;
checkDir(indexPath);
sms.pipe(createWriteStream(resolve(indexPath)));
sms.on('end', () => {
  console.log(`產生了 ${sitemapCount} 個 sitemap 檔案，共 ${urls.length} 個網址。`);
});
