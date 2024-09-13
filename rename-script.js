const fs = require('fs');
const path = require('path');
const angular = require('./angular.json');
const dayjs = require('dayjs');
const packageName = process.argv[2];
// true is --output-hashing all || false is --output-hashing none
const include = process.argv?.[3] === 'true';
// add timeSpan to index.html rename file
const timeSpan = process.argv?.[4] === 'true';
const dir = angular.projects[packageName].architect.build.options.outputPath; // build 出來的目錄
const replaceFileNames = [
  {
    oldFile: {
      name: 'main',
      extension: 'js',
    },
    newFile: {
      name: 'main',
      extension: 'securejs',
    },
    include,
    timeSpan,
  },
  {
    oldFile: {
      name: 'polyfills',
      extension: 'js',
    },
    newFile: {
      name: 'polyfills',
      extension: 'securejs',
    },
    include,
    timeSpan,
  },
  {
    oldFile: {
      name: 'runtime',
      extension: 'js',
    },
    newFile: {
      name: 'runtime',
      extension: 'securejs',
    },
    include,
    timeSpan,
  },
  {
    oldFile: {
      name: 'scripts',
      extension: 'js',
    },
    newFile: {
      name: 'scripts',
      extension: 'securejs',
    },
    include,
    timeSpan,
  },
];

/**
 * 找出符合前綴詞的檔案
 * @param {*} directoryPath 指定目錄
 * @param {*} prefix 前綴詞
 * @returns 完整檔名
 */
const findFilesWithPrefix = (directoryPath, prefix) => {
  const files = fs.readdirSync(directoryPath);

  const foundFiles = files.filter(file => {
    const filePath = path.join(directoryPath, file);
    const fileStats = fs.statSync(filePath);

    // Check if it's a file and the filename starts with the specified prefix
    return fileStats.isFile() && file.startsWith(prefix);
  });

  // Extract just the filenames without extensions
  const fileNamesWithoutExtension = foundFiles.map(file => path.parse(file).name).join('');

  return fileNamesWithoutExtension;
};

for (const { oldFile, newFile, include, timeSpan } of replaceFileNames) {
  let oldFileName;
  let newFileName;
  // 更名 檔案
  if (include) {
    const name = findFilesWithPrefix(dir, oldFile.name);
    const hash = name.replace(oldFile.name, '');
    oldFileName = `${name}.${oldFile.extension}`;
    newFileName = `${newFile.name}${hash}.${newFile.extension}`;
  } else {
    oldFileName = `${oldFile.name}.${oldFile.extension}`;
    newFileName = `${newFile.name}.${newFile.extension}`;
  }
  const oldFilePath = path.join(dir, oldFileName);
  const newFilePath = path.join(dir, newFileName);
  if (fs.existsSync(oldFilePath)) {
    // 檔案存在
    fs.renameSync(oldFilePath, newFilePath);
    console.log(`Renamed ${oldFileName} to ${newFileName}`);
    if (timeSpan) {
      newFileName = newFileName + '?t=' + dayjs().format('YYYYMMDDHHMMssSSS');
    }
    // 修改 index.html 檔案裡的 連結 屬性
    const indexFilePath = path.join(dir, 'index.html');
    let indexFileContent = fs.readFileSync(indexFilePath, 'utf8');
    indexFileContent = indexFileContent.replace(oldFileName, newFileName);
    console.log(`Renamed indexFile src ${oldFileName} to ${newFileName}`);
    fs.writeFileSync(indexFilePath, indexFileContent, 'utf8');
  }
}
