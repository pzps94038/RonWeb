---
{
  'title': 'husky Prettier git commit統一風格設定',
  'categoryId': 12,
  'categoryName': 'Git',
  'labels': [{ 'labelId': 25, 'labelName': 'husky' }],
  'createDate': '2023-06-29T21:08:21.687Z',
  'references':
    [
      'https://ithelp.ithome.com.tw/m/articles/10296947',
      'https://medium.com/@sky.tienyu/setting-husky-prettier-with-git-hooks-in-angular-project-c37566ebf2c7',
      'https://blog.miniasp.com/post/2021/08/27/Angular-husky-Git-hooks-Prettier-formatter',
    ],
  'flag': 'Y',
}
---

## 安裝 husky 與 pretty-quick 套件

```shell
npm install husky prettier pretty-quick --save-dev
```

## 設定 npm 的 prepare 生命週期腳本並執行 husky 安裝

```shell
npm set-script prepare "husky install"
npm run prepare
```

這會在 package.json 新增一個 prepare 來安裝 husky 的 shell，讓 npm ci 和 npm install 也會一併安裝。

## 設定 husky 的 pre-commit Hook

以下已棄用：

```plaintext
npx husky set .husky/pre-commit "npx pretty-quick --staged"
```

最新指令：

```plaintext
npx husky init
```

這裡我們設定 pre-commit Hook，讓團隊成員在執行 git commit 之前，就會自動透過 pretty-quick 的 `pretty-quick --staged` 命令對 Git 暫存的檔案（Staged files）進行程式碼編排，而且是參照 .prettierrc.json、.prettierignore 與 .editorconfig 的設定進行，確保團隊的程式撰寫風格一致。以下命令會產生一個 .husky/pre-commit 檔案，這個檔案需要加入到 Git 版控之中。

## 加入 .prettierignore 檔案

不要透過 Prettier 排版的檔案清單：

![](/assets/images/husky-prettier-git-commit-style/1.png)

```plaintext
# IDE/Editor
.vscode
.idea

# Package Manager
package.json
package-lock.json
yarn.lock

# Angular-related
/dist
/coverage
**/assets/**/*
```

## 加入 .prettierrc.json 檔案

排版的設定，需要跟 .editorconfig 同步。

.editorconfig

![](/assets/images/husky-prettier-git-commit-style/2.png)

.prettierrc.json

![](/assets/images/husky-prettier-git-commit-style/2.png)

```json
{
  "tabWidth": 2, //空格寬度
  "useTabs": false, //Prettier 的預設值是使用空格而不是 tab 進行縮排，useTabs 預設值為 false。
  "printWidth": 100, // 該行最多多少
  "bracketSpacing": true, //控制花括號內部是否添加空格，預設為 true，即添加空格。
  "curly": "all", // 設定大括號的使用方式，預設為 "all"，即強制要求所有地方都必須使用大括號。
  "singleQuote": true, // 控制是否使用單引號，預設為 false，即使用雙引號。
  "trailingComma": "all", // 控制是否在物件、數組等結尾添加逗號，預設為 "es5"，即只在 ES5 中規定的情況下添加逗號。其他的設定值還有 "none"，即不添加逗號；以及 "all"，即在所有地方都添加逗號。
  "semi": true, // 控制是否在語句結尾添加分號，預設為 true，即添加分號。
  "arrowParens": "avoid", // 設定箭頭函式的參數括號，預設為 "avoid"，即在只有一個參數時不添加括號。
  "bracketSameLine": true, // 控制花括號的位置，預設為 true，即在同一行的結尾添加花括號。若設定為 false，則花括號會獨占一行
  "overrides": [
    // 用來指定不同檔案的格式化方式
    {
      "files": ["*.json", ".babelrc"],
      "options": {
        "parser": "json-stringify"
      }
    },
    {
      "files": ["*.jsonc", "tsconfig*.json"],
      "options": {
        "parser": "json"
      }
    },
    {
      "files": ["*.js", "*.cjs", "*.mjs"],
      "options": {
        "parser": "babel"
      }
    },
    {
      "files": ["*.ts"],
      "options": {
        "parser": "typescript"
      }
    },
    {
      "files": ["*.html"],
      "options": {
        "parser": "html"
      }
    }
  ]
}
```

## 設定 lint-staged 只 Lint 修改的檔案

```shell
npm install lint-staged --save-dev
```

這邊設定是根據檔案類型，分別需要經過 linter 檢查和 prettier format，可依照自己的需求調整。

提供兩種設置方法，擇一即可。

### package.json 方式

```json
 "lint-staged": {
    "*.{ts,js,vue}": [
      "eslint --fix"
    ],
    "*.{html,scss,css,vue}": [
      "prettier --write",
      "stylelint --fix"
    ]
 },

```

### .lintstagedrc.json 方式

```json
{
  "*.{ts,js,vue}": ["eslint --fix"],
  "*.{html,scss,css,vue}": ["prettier --write", "stylelint --fix"]
}
```

## 調整 pre-commit 相容 nvm

```json
#!/bin/sh
# ~/.huskyrc
# This loads nvm.sh and sets the correct PATH before running hook
export NVM_DIR="$HOME/.nvm"

if [ -s "$NVM_DIR/nvm.sh" ]; then
  # Load nvm
  . "$NVM_DIR/nvm.sh"
fi

. "$(dirname "$0")/_/husky.sh"

npx pretty-quick --staged lint-staged
```

每次 git commit 就會自動觸發，程式碼都要符合 eslint、stylelint 的設定檔規則，確保程式碼都是跟團隊規範保持一致的。
