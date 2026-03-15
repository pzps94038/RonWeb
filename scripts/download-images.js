/**
 * Firebase Storage 圖片下載腳本
 *
 * 掃描 content/posts/*.md 中所有 Firebase Storage 圖片 URL，
 * 下載到 content/images/{slug}/ 目錄，並將 Markdown 中的 URL
 * 替換為本地絕對路徑 /assets/images/{slug}/N.ext。
 *
 * 注意：不會修改 frontmatter（--- 之間）的內容，保留 previewContent 中的 URL。
 *
 * 用法：node scripts/download-images.js
 */

const fs = require('fs');
const path = require('path');
const https = require('https');

const POSTS_DIR = path.join(__dirname, '..', 'content', 'posts');
const IMAGES_DIR = path.join(__dirname, '..', 'content', 'images');

/** Firebase Storage URL 的正規表達式（用於 Markdown 圖片語法） */
const FIREBASE_IMG_RE = /!\[([^\]]*)\]\((https:\/\/firebasestorage\.googleapis\.com\/[^)]+)\)/g;

/**
 * 從文章檔名提取 slug（去除日期前綴與副檔名）
 * @param {string} filename - 文章檔名，例如 "2023-05-20-angular-v16-upgrade.md"
 * @returns {string} slug，例如 "angular-v16-upgrade"
 */
function extractSlug(filename) {
  const base = path.basename(filename, '.md');
  // 去掉開頭的日期部分 (YYYY-MM-DD-)
  return base.replace(/^\d{4}-\d{2}-\d{2}-/, '');
}

/**
 * 從 Firebase Storage URL 推斷圖片副檔名
 * @param {string} url - Firebase Storage URL
 * @returns {string} 副檔名（含點號），例如 ".png"
 */
function getExtensionFromUrl(url) {
  try {
    const urlObj = new URL(url);
    // URL 路徑格式：/v0/b/.../o/日期%2FArticle%2F{uuid}.{ext}
    const pathPart = decodeURIComponent(urlObj.pathname);
    const match = pathPart.match(/\.(\w+)$/);
    if (match) {
      return '.' + match[1].toLowerCase();
    }
  } catch {
    // 忽略解析錯誤
  }
  return '.png'; // 預設
}

/**
 * 從 HTTP Content-Type 標頭推斷副檔名
 * @param {string} contentType - Content-Type 值
 * @returns {string} 副檔名（含點號）
 */
function getExtensionFromContentType(contentType) {
  const map = {
    'image/png': '.png',
    'image/jpeg': '.jpg',
    'image/gif': '.gif',
    'image/webp': '.webp',
    'image/svg+xml': '.svg',
    'image/bmp': '.bmp',
  };
  return map[contentType] || '.png';
}

/**
 * 透過 HTTPS 下載檔案並儲存到本地
 * @param {string} url - 下載來源 URL
 * @param {string} destPath - 本地儲存路徑
 * @returns {Promise<string>} 實際使用的副檔名
 */
function downloadFile(url, destPath) {
  return new Promise((resolve, reject) => {
    /**
     * 遞迴處理重新導向
     * @param {string} currentUrl - 當前要請求的 URL
     * @param {number} redirectCount - 已重導次數
     */
    function doRequest(currentUrl, redirectCount = 0) {
      if (redirectCount > 5) {
        reject(new Error('重導次數過多'));
        return;
      }

      https
        .get(currentUrl, res => {
          // 處理重新導向
          if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
            doRequest(res.headers.location, redirectCount + 1);
            return;
          }

          if (res.statusCode !== 200) {
            reject(new Error(`HTTP ${res.statusCode}`));
            return;
          }

          const fileStream = fs.createWriteStream(destPath);
          res.pipe(fileStream);
          fileStream.on('finish', () => {
            fileStream.close();
            resolve(res.headers['content-type'] || '');
          });
          fileStream.on('error', reject);
        })
        .on('error', reject);
    }

    doRequest(url);
  });
}

/**
 * 分離 Markdown 檔案的 frontmatter 與內文
 * @param {string} content - 完整的 .md 檔案內容
 * @returns {{ frontmatter: string, body: string, separator: string }} 分離後的各部分
 */
function splitFrontmatter(content) {
  const match = content.match(/^(---\s*\n[\s\S]*?\n---\s*\n)([\s\S]*)$/);
  if (match) {
    return { frontmatter: match[1], body: match[2] };
  }
  return { frontmatter: '', body: content };
}

/**
 * 確保目錄存在，不存在則建立
 * @param {string} dir - 目錄路徑
 */
function ensureDir(dir) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

/**
 * 主程式：掃描所有文章、下載圖片、替換 URL
 */
async function main() {
  console.log('開始掃描文章中的 Firebase Storage 圖片...\n');

  const files = fs.readdirSync(POSTS_DIR).filter(f => f.endsWith('.md'));
  console.log(`找到 ${files.length} 篇文章`);

  let totalImages = 0;
  let downloadedImages = 0;
  let failedImages = 0;
  const errors = [];

  for (const file of files) {
    const filePath = path.join(POSTS_DIR, file);
    const raw = fs.readFileSync(filePath, 'utf-8');
    const slug = extractSlug(file);

    const { frontmatter, body } = splitFrontmatter(raw);

    // 找出內文中所有 Firebase 圖片 URL
    const matches = [...body.matchAll(FIREBASE_IMG_RE)];
    if (matches.length === 0) continue;

    console.log(`\n📄 ${file} (slug: ${slug}) — ${matches.length} 張圖片`);

    const slugDir = path.join(IMAGES_DIR, slug);
    ensureDir(slugDir);

    let newBody = body;
    let imageIndex = 1;

    for (const match of matches) {
      const fullMatch = match[0]; // 完整的 ![...](url)
      const altText = match[1]; // alt 文字
      const url = match[2]; // Firebase URL

      totalImages++;

      // 從 URL 推斷副檔名
      let ext = getExtensionFromUrl(url);
      const localFilename = `${imageIndex}${ext}`;
      const localPath = path.join(slugDir, localFilename);

      try {
        process.stdout.write(`  下載 ${imageIndex}/${matches.length}...`);
        const contentType = await downloadFile(url, localPath);

        // 如果 URL 沒有副檔名資訊，就從 Content-Type 判斷
        if (ext === '.png' && contentType && !url.includes('.png')) {
          const ctExt = getExtensionFromContentType(contentType);
          if (ctExt !== ext) {
            const newPath = path.join(slugDir, `${imageIndex}${ctExt}`);
            fs.renameSync(localPath, newPath);
            ext = ctExt;
          }
        }

        const finalFilename = `${imageIndex}${ext}`;
        const assetPath = `/assets/images/${slug}/${finalFilename}`;
        const newMarkdown = `![${altText}](${assetPath})`;
        newBody = newBody.replace(fullMatch, newMarkdown);

        console.log(` ✓ ${finalFilename}`);
        downloadedImages++;
      } catch (err) {
        console.log(` ✗ 失敗: ${err.message}`);
        errors.push({ file, url, error: err.message });
        failedImages++;
      }

      imageIndex++;
    }

    // 寫回檔案（frontmatter 不變，只替換內文）
    fs.writeFileSync(filePath, frontmatter + newBody, 'utf-8');
  }

  console.log('\n========== 完成 ==========');
  console.log(`總計圖片: ${totalImages}`);
  console.log(`成功下載: ${downloadedImages}`);
  console.log(`下載失敗: ${failedImages}`);

  if (errors.length > 0) {
    console.log('\n失敗清單:');
    for (const e of errors) {
      console.log(`  - ${e.file}: ${e.error}`);
      console.log(`    URL: ${e.url}`);
    }
  }
}

main().catch(console.error);
