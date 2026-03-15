---
{
  "title": "Angular Github Action CI CD 範例",
  "categoryId": 3,
  "categoryName": "CI CD",
  "labels": [
    {
      "labelId": 5,
      "labelName": "Github/GiteaAction"
    },
    {
      "labelId": 22,
      "labelName": "Github"
    }
  ],
  "createDate": "2023-05-21T00:24:01.329Z",
  "references": [],
  "flag": "Y"
}
---
## 完整 Workflow 範例

以下為 Github Action 的 Angular workflow 範例：

```yaml
name: Node.js CI

on:
    pull_request:
        branches: ['main']
    push:
        branches: ['main']
jobs:
    build:
        runs-on: ubuntu-latest
            matrix:
                node-version: [16.x]
        steps:
            - uses: actions/checkout@v2
            // 描述
            - name: Use Node.js ${{ matrix.node-version }}
              uses: actions/setup-node@v2
              with:
                  node-version: ${{ matrix.node-version }}
                  cache: 'npm'
              // 這邊直接載相關套件
              // 通常是會用npm ci 才不會去更動到package.json
            - run: npm ci --force
              // 打包專案
            - run: npm run prerender
              // 上傳artifact
            - name: Upload build artifact
              if: github.ref == 'refs/heads/main'
              uses: actions/upload-artifact@v2
              // 設定檔案名稱、路徑、過期時間
              // 過期時間一定要設定，不然有空間限制容易爆滿
              with:
                  name: prerender
                  path: dist
                  retention-days: 1
              // 這邊設定當主要分支為main，才能部署到github page
              // 如果是遠端伺服器可以透過最原始的scp把檔案複製過去
              // 但cd的流程通常要自動化，跟伺服器本身要是能夠通的
            - run: npm run build:gitHubPage
              if: github.ref == 'refs/heads/main'
            - name: Deploy to GitHub Pages
              if: github.ref == 'refs/heads/main'
              uses: JamesIves/github-pages-deploy-action@4.1.5
              with:
                branch: gh-pages
                folder: dist/RonWeb/browser
                // 可以透過設置github action secrets來做安全設定
                token: ${{ secrets.TOKEN }}
```

## 觸發條件

如何觸發這個 workflow：

```yaml
on:
    pull_request:
        branches: ['main']
    push:
        branches: ['main']
```

## 設定版本

```yaml
build:
    	//運行os
        runs-on: ubuntu-latest
        strategy:
        	// 運行版本，通常要指定，避免更新不相容問題
            matrix:
                node-version: [16.x]
```

## 每個 Step 的介紹

```yaml
// 使用什麼工具，這邊的每個uses都對應著一個github的倉庫
// 如果想要知道裡面的流程，可以去翻對應的倉庫
// 像是這邊就是actions底下的checkout倉庫版本號為v2
- uses: actions/checkout@v2
// 描述
- name: Use Node.js ${{ matrix.node-version }}
	uses: actions/setup-node@v2
	// with是uses這個job他提供的額外引數
	// 提供什麼參數需看對應文件，或看原始碼所提供的參數
 	with:
		node-version: ${{ matrix.node-version }}
		cache: 'npm'
```

## Secrets 安全金鑰設定

Github Action 有個 secrets 的安全金鑰設定，通常會把 token 或 key 之類的敏感資訊放在這邊設定使用：

```yaml
${{ secrets.TOKEN }}
```

對應倉庫

![](/assets/images/angular-github-action-cicd/1.png)

倉庫底下的 action.yml 會有相關使用參數的介紹：

![](/assets/images/angular-github-action-cicd/2.png)
