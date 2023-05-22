const { createWriteStream } = require('fs');
const { resolve } = require('path');
const axios = require('axios');
const { createGzip } = require('zlib');
const { SitemapAndIndexStream, SitemapStream } = require('sitemap');
(async () => {
  const { data } = await axios('https://ronweb-api.zeabur.app/api/siteMap/article').catch(error => {
    // 處理錯誤
    console.error(error);
  });
  const { returnCode } = data;
  if (returnCode === '00') {
    const { data: list } = data;
    console.warn(JSON.stringify(list));
  }
})();

const urls = [
  { url: '/page-1/', changefreq: 'daily' },
  { url: '/page-2/', changefreq: 'weekly' },
  { url: '/page-3/', changefreq: 'monthly' },
  { url: '/page-4/', changefreq: 'weekly' },
  { url: '/page-5/', changefreq: 'monthly' },
  { url: '/page-6/', changefreq: 'daily' },
  { url: '/page-7/', changefreq: 'weekly' },
  { url: '/page-8/', changefreq: 'monthly' },
  { url: '/page-9/', changefreq: 'daily' },
  { url: '/page-10/', changefreq: 'weekly' },
];

// 每幾個網址分割成一個 sitemap 檔案
const urlsPerSitemap = 20000;
// 計算 sitemap 檔案數量
let sitemapCount = 0;

// 建立 SitemapAndIndexStream
const sms = new SitemapAndIndexStream({
  limit: urlsPerSitemap,
  getSitemapStream: i => {
    const sitemapStream = new SitemapStream({ hostname: 'https://example.com' });
    const path = `./dist/RonWeb/browser/sitemap-${i + 1}.xml`;
    // 每次產生新的 sitemap 檔案時增加計數
    sitemapCount = sitemapCount + 1;
    console.warn(sitemapCount);
    const ws = sitemapStream.pipe(createWriteStream(resolve(path)));

    return [new URL(path, 'https://example.com/').toString(), sitemapStream, ws];
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
// fetch('https://api.example.com/endpoint')
//   .then(response => response.json())
//   .then(data => {
//     // 在這裡處理接收到的回應資料
//     console.log(data);
//   })
//   .catch(error => {
//     // 處理錯誤
//     console.error(error);
//   });
// (async () => {
//   const { data } = await axios('https://ronweb-api.zeabur.app/api/siteMap/article').catch(error => {
//     // 處理錯誤
//     console.error(error);
//   })
//   const { returnCode } = data;
//   if (returnCode === '00') {
//     const { data: list } = data;
//     console.warn(JSON.stringify(list))
//   }
// })()
