const { createWriteStream } = require('fs');
const { resolve } = require('path');
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
    axios('https://ronweb-api.zeabur.app/api/siteMap/article')
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
    axios('https://ronweb-api.zeabur.app/api/siteMap/category')
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
    axios('https://ronweb-api.zeabur.app/api/siteMap/label')
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
      const sitemapStream = new SitemapStream({ hostname: 'https://ronweb.zeabur.app' });
      const path = `./dist/RonWeb/browser/sitemap-${i + 1}.xml`;
      // 每次產生新的 sitemap 檔案時增加計數
      sitemapCount = sitemapCount + 1;
      const ws = sitemapStream.pipe(createWriteStream(resolve(path)));

      return [
        new URL(`sitemap-${i + 1}.xml`, 'https://ronweb.zeabur.app/').toString(),
        sitemapStream,
        ws,
      ];
    },
  });

  // 添加網址資訊到 SitemapAndIndexStream
  urls.forEach(url => sms.write(url));

  // 結束 SitemapAndIndexStream 並建立 sitemap-index 檔案
  sms.end();

  sms.pipe(createWriteStream(resolve('./dist/RonWeb/browser/sitemap-index.xml')));
  // 等待 SitemapAndIndexStream 結束事件
  sms.on('end', () => {
    console.log(`產生了 ${sitemapCount} 個 sitemap 檔案。`);
  });
})();
