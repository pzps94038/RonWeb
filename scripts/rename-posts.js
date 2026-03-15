/**
 * 重命名部落格文章檔案腳本
 *
 * 功能：
 * - 讀取 content/posts/ 下所有 .md 檔案
 * - 解析每個檔案的 frontmatter（JSON 格式，在 --- 之間）
 * - 根據 createDate 和 title 生成新檔名（格式：YYYY-MM-DD-slug.md）
 * - 在 frontmatter 中新增 slug 欄位
 * - 重新命名檔案
 * - 更新 articles-metadata.json，為每筆加上 slug 欄位
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/** 專案根目錄 */
const ROOT = path.resolve(__dirname, '..');
/** 文章目錄 */
const POSTS_DIR = path.join(ROOT, 'content', 'posts');
/** 文章 metadata JSON 路徑 */
const METADATA_PATH = path.join(ROOT, 'content', 'data', 'articles-metadata.json');

/**
 * 手動定義每篇文章 id 對應的英文 slug
 * 中文標題由人工翻譯/推斷出英文關鍵字，確保語意正確
 */
const SLUG_MAP = {
  1: 'angular-v16-upgrade',
  2: 'csharp-ef-core-mysql',
  3: 'angular-github-action-cicd',
  4: 'angular-route-reuse-strategy',
  5: 'angular-custom-form-control',
  6: 'leetcode-1-two-sum',
  7: 'leetcode-2619-array-prototype-last',
  8: 'leetcode-9-palindrome-number',
  9: 'leetcode-2621-sleep',
  10: 'leetcode-2626-array-reduce',
  11: 'leetcode-2629-function-composition',
  13: 'leetcode-2637-promise-time-limit',
  14: 'leetcode-2635-array-transform',
  15: 'leetcode-2677-chunk-array',
  16: 'leetcode-2695-array-wrapper',
  17: 'leetcode-2665-counter-ii',
  18: 'leetcode-2666-allow-one-function-call',
  19: 'leetcode-2667-hello-world-function',
  20: 'leetcode-2620-counter',
  21: 'csharp-simple-captcha',
  22: 'leetcode-705-design-hashset',
  23: 'angular-unit-test',
  24: 'csharp-dotnet-core-graphql',
  25: 'nginx-manager-lets-encrypt',
  26: 'linux-cron-scheduled-tasks',
  27: 'devops-drone-docker-cicd-server',
  28: 'docker-redmine-setup',
  29: 'husky-prettier-git-commit-style',
  30: 'docker-common-commands',
  32: 'leetcode-225-stack-using-queues',
  33: 'mysql-workbench-backup-restore',
  34: 'angular-browserslist-compatibility',
  35: 'dotnet-core-8-mvc-iis-publish',
  36: 'dotnet-core-8-shadow-copy',
  37: 'angular-js-heap-out-of-memory',
  38: 'iis-app-offline-htm',
  39: 'mssql-server-editions',
  40: 'csharp-oop-introduction',
  41: 'vscode-install-specific-version',
  42: 'csharp-single-instance-app',
  43: 'windows-server-scheduled-tasks',
  44: 'windows-debug-ios-app',
  45: 'windows-openssl-command-fix',
  46: 'disable-text-select-right-click',
  47: 'iis-dotnet-core-deploy',
  48: 'angular-version-upgrade-guide',
  49: 'ios-follow-system-font-size',
  52: 'windows-iis-ftp-setup',
  53: 'gitea-server-setup',
  54: 'angular-rendering-modes',
  55: 'iis-spa-api-web-config',
  57: 'git-bfg-repo-cleaner',
  58: 'csharp-recommended-packages',
  59: 'postgresql-backup-restore',
  61: 'windows-server-mysql-install',
};

/**
 * 解析 Markdown 檔案的 frontmatter（JSON 格式，以 --- 包圍）
 * @param {string} content - 檔案完整內容
 * @returns {{ frontmatter: object, body: string, rawFrontmatter: string }} 解析結果
 */
function parseFrontmatter(content) {
  const match = content.match(/^---\n([\s\S]*?)\n---/);
  if (!match) {
    throw new Error('無法解析 frontmatter');
  }
  const rawFrontmatter = match[1];
  const frontmatter = JSON.parse(rawFrontmatter);
  const body = content.slice(match[0].length);
  return { frontmatter, body, rawFrontmatter };
}

/**
 * 從 ISO 日期字串中擷取 YYYY-MM-DD 格式的日期
 * @param {string} dateStr - ISO 日期字串（如 "2023-05-20T07:16:59.032Z"）
 * @returns {string} YYYY-MM-DD 格式日期
 */
function extractDate(dateStr) {
  return dateStr.slice(0, 10);
}

/**
 * 主要執行函式：讀取所有文章、重命名、更新 metadata
 */
async function main() {
  const files = fs.readdirSync(POSTS_DIR).filter(f => f.endsWith('.md'));
  /** 記錄新舊檔名對照 */
  const renameLog = [];
  /** 記錄每個 id 對應的 slug（供 metadata 更新使用） */
  const idToSlug = {};
  /** 用來檢查是否有重複檔名 */
  const usedNames = new Set();

  console.log(`找到 ${files.length} 個 .md 檔案\n`);

  // 第一階段：解析所有檔案並生成新檔名
  for (const file of files) {
    const filePath = path.join(POSTS_DIR, file);
    const content = fs.readFileSync(filePath, 'utf-8');
    const { frontmatter, body } = parseFrontmatter(content);

    const id = frontmatter.id;
    const date = extractDate(frontmatter.createDate);
    const slug = SLUG_MAP[id];

    if (!slug) {
      console.warn(`警告：找不到 id=${id} 的 slug 對應，跳過檔案 ${file}`);
      continue;
    }

    let newBaseName = `${date}-${slug}`;

    // 檢查重複檔名，若有重複則加上 id 區分
    if (usedNames.has(newBaseName)) {
      newBaseName = `${date}-${id}-${slug}`;
    }
    usedNames.add(newBaseName);

    const newFileName = `${newBaseName}.md`;

    // 在 frontmatter 中新增 slug 欄位
    frontmatter.slug = newBaseName;
    idToSlug[id] = newBaseName;

    // 重新組合檔案內容（保留原始 body 內容不變）
    const newContent = `---\n${JSON.stringify(frontmatter, null, 2)}\n---${body}`;

    // 寫入更新後的內容
    fs.writeFileSync(filePath, newContent, 'utf-8');

    // 重新命名檔案
    const newFilePath = path.join(POSTS_DIR, newFileName);
    if (filePath !== newFilePath) {
      fs.renameSync(filePath, newFilePath);
    }

    renameLog.push({ oldName: file, newName: newFileName });
  }

  // 第二階段：更新 articles-metadata.json
  const metadata = JSON.parse(fs.readFileSync(METADATA_PATH, 'utf-8'));
  for (const article of metadata) {
    const slug = idToSlug[article.articleId];
    if (slug) {
      article.slug = slug;
    }
  }
  fs.writeFileSync(METADATA_PATH, JSON.stringify(metadata, null, 2) + '\n', 'utf-8');

  // 輸出新舊檔名對照表
  console.log('=== 重命名對照表 ===');
  console.log('舊檔名'.padEnd(12) + ' → ' + '新檔名');
  console.log('-'.repeat(80));
  for (const { oldName, newName } of renameLog.sort((a, b) => {
    const aId = parseInt(a.oldName);
    const bId = parseInt(b.oldName);
    return aId - bId;
  })) {
    console.log(`${oldName.padEnd(12)} → ${newName}`);
  }
  console.log(`\n完成！共重命名 ${renameLog.length} 個檔案`);
  console.log(`已更新 ${METADATA_PATH}`);
}

main().catch(err => {
  console.error('執行失敗:', err);
  process.exit(1);
});
