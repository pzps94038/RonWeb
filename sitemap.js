const { createWriteStream, writeFile, mkdirSync, existsSync } = require('fs');
const { resolve, dirname } = require('path');
const axios = require('axios');
const { createGzip } = require('zlib');
const { SitemapAndIndexStream, SitemapStream } = require('sitemap');

const lastmod = new Date();

let urls = [
  { url: '/login', changefreq: 'monthly', priority: 0.8, lastmod },
  { url: '/about-me', changefreq: 'weekly', priority: 1.0, lastmod },
  { url: '/blog', changefreq: 'daily', priority: 1.0, lastmod },
  { url: '/notFound', changefreq: 'monthly', priority: 0.5, lastmod },
];

(async () => {
  const [articles, categorys, labels] = await Promise.all([
    axios('https://blog-api.ronwebs.com/api/siteMap/article')
      .then(({ data }) => data)
      .then(({ data }) => data ?? [])
      .then(array => {
        const path = array.map(({ id }) => ({
          url: `/blog/article/${id}`,
          changefreq: 'daily',
          priority: 0.9,
          lastmod,
        }));
        const totalItems = array.length;
        const itemsPerPage = 10; // 每頁筆數
        const totalPages = Math.ceil(totalItems / itemsPerPage);
        for (let i = 1; i <= totalPages; i++) {
          path.push({
            url: `/blog?page=${i}`,
            changefreq: 'daily',
            priority: 0.9,
            lastmod,
          });
        }
        return path;
      })
      .catch(error => {
        // 處理錯誤
        console.error(error);
        return [];
      }),
    axios('https:/blog-api.ronwebs.com/api/siteMap/category')
      .then(({ data }) => data)
      .then(({ data }) => data ?? [])
      .then(array =>
        array.map(({ id }) => ({
          url: `/blog/category/${id}`,
          changefreq: 'weekly',
          priority: 0.8,
          lastmod,
        })),
      )
      .catch(error => {
        // 處理錯誤
        console.error(error);
        return [];
      }),
    axios('https://blog-api.ronwebs.com/api/siteMap/label')
      .then(({ data }) => data)
      .then(({ data }) => data ?? [])
      .then(array =>
        array.map(({ id }) => ({
          url: `/blog/label/${id}`,
          changefreq: 'weekly',
          priority: 0.8,
          lastmod,
        })),
      )
      .catch(error => {
        // 處理錯誤
        console.error(error);
        return [];
      }),
  ]);
  urls = [...urls, ...articles, ...categorys, ...labels];
  // 每幾個網址分割成一個 sitemap 檔案
  const urlsPerSitemap = 20000;
  // 計算 sitemap 檔案數量
  let sitemapCount = 0;
  // 建立 SitemapAndIndexStream
  const sms = new SitemapAndIndexStream({
    limit: urlsPerSitemap,
    getSitemapStream: i => {
      const sitemapStream = new SitemapStream({ hostname: 'https://blog.ronwebs.com' });
      const path = `./dist/RonWeb/browser/sitemap-${i + 1}.xml`;
      checkDir(path);
      // 每次產生新的 sitemap 檔案時增加計數
      sitemapCount = sitemapCount + 1;
      const ws = sitemapStream.pipe(createWriteStream(resolve(path)));

      return [
        new URL(`sitemap-${i + 1}.xml`, 'https://blog.ronwebs.com/').toString(),
        sitemapStream,
        ws,
      ];
    },
  });

  // 添加網址資訊到 SitemapAndIndexStream
  urls.forEach(url => {
    sms.write(url);
  });
  // 產生prerender route map
  const routes = urls
    .map(({ url }) => url)
    .filter(url => !url.includes('?'))
    .join('\r\n');
  writeFile('routes.txt', '\r\n' + routes, err => {
    if (err) {
      console.error(err);
    }
  });

  // 結束 SitemapAndIndexStream 並建立 sitemap-index 檔案
  sms.end();
  const path = './dist/RonWeb/browser/sitemap-index.xml';
  checkDir(path);
  sms.pipe(createWriteStream(resolve(path)));
  // 等待 SitemapAndIndexStream 結束事件
  sms.on('end', () => {
    console.log(`產生了 ${sitemapCount} 個 sitemap 檔案。`);
  });
})();

const checkDir = targetPath => {
  const targetDir = dirname(targetPath);
  // 使用 fs.existsSync() 檢查目標路徑的資料夾是否存在
  if (!existsSync(targetDir)) {
    try {
      // 使用 fs.mkdirSync() 建立資料夾
      mkdirSync(targetDir, { recursive: true });
      console.log('資料夾已建立:', targetDir);
    } catch (err) {
      console.error('無法建立資料夾:', err);
    }
  }
};
