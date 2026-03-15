/**
 * Favicon 產生腳本
 * 從 SVG 模板生成各尺寸 PNG icon 至 src/assets/icons/，
 * 同時生成 favicon.ico 供瀏覽器使用。
 *
 * 依賴：sharp（需先安裝）
 * 用法：node scripts/generate-icons.js
 */
const fs = require('fs');
const path = require('path');

const ICONS_DIR = path.join(__dirname, '..', 'src', 'assets', 'icons');
const FAVICON_PATH = path.join(__dirname, '..', 'src', 'favicon.ico');

const sizes = [72, 96, 128, 144, 152, 192, 384, 512];

/**
 * 生成 "R" 字母 SVG，搭配 Warm Amber 漸層背景與圓角
 * @param {number} size - 圖片尺寸（正方形）
 * @returns {string} SVG 字串
 */
function generateSvg(size) {
  const fontSize = Math.round(size * 0.58);
  const radius = Math.round(size * 0.22);
  const dy = Math.round(fontSize * 0.36);

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#f59e0b"/>
      <stop offset="100%" stop-color="#d97706"/>
    </linearGradient>
  </defs>
  <rect width="${size}" height="${size}" rx="${radius}" ry="${radius}" fill="url(#bg)"/>
  <text x="50%" y="50%" dy="${dy}" text-anchor="middle" font-family="'Inter','Helvetica Neue',Arial,sans-serif" font-weight="700" font-size="${fontSize}" fill="#18181b" letter-spacing="-0.02em">R</text>
</svg>`;
}

async function main() {
  let sharp;
  try {
    sharp = require('sharp');
  } catch {
    console.error('請先安裝 sharp: npm install sharp --save-dev');
    process.exit(1);
  }

  if (!fs.existsSync(ICONS_DIR)) {
    fs.mkdirSync(ICONS_DIR, { recursive: true });
  }

  // 生成各尺寸 PNG
  for (const size of sizes) {
    const svg = generateSvg(size);
    const outputPath = path.join(ICONS_DIR, `icon-${size}x${size}.png`);
    await sharp(Buffer.from(svg)).png().toFile(outputPath);
    console.log(`已生成: icon-${size}x${size}.png`);
  }

  // 生成 favicon.ico（使用 32x32 PNG）
  const faviconSvg = generateSvg(32);
  const faviconPng = await sharp(Buffer.from(faviconSvg)).png().toBuffer();
  // ICO 格式：簡易單圖 ICO header + PNG payload
  const icoHeader = Buffer.alloc(22);
  icoHeader.writeUInt16LE(0, 0); // reserved
  icoHeader.writeUInt16LE(1, 2); // type: ICO
  icoHeader.writeUInt16LE(1, 4); // image count
  icoHeader.writeUInt8(32, 6); // width
  icoHeader.writeUInt8(32, 7); // height
  icoHeader.writeUInt8(0, 8); // color palette
  icoHeader.writeUInt8(0, 9); // reserved
  icoHeader.writeUInt16LE(1, 10); // color planes
  icoHeader.writeUInt16LE(32, 12); // bits per pixel
  icoHeader.writeUInt32LE(faviconPng.length, 14); // image size
  icoHeader.writeUInt32LE(22, 18); // image offset
  const ico = Buffer.concat([icoHeader, faviconPng]);
  fs.writeFileSync(FAVICON_PATH, ico);
  console.log('已生成: favicon.ico');

  console.log('全部完成！');
}

main().catch(console.error);
