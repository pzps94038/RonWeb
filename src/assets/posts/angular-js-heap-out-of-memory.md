---
{
  "title": "Angular遇到JavaScript heap out of memory",
  "categoryId": 1,
  "categoryName": "前端",
  "labels": [],
  "createDate": "2024-08-05T15:14:24.774Z",
  "references": [],
  "flag": "Y"
}
---
## 問題描述

JavaScript heap out of memory 解決辦法：

![](/assets/images/angular-js-heap-out-of-memory/1.png)

## 解決方式

### 更新 Node.js

升級至較新版本的 Node.js。

### 擴充 max_old_space_size

可以透過環境變數設定，或是直接使用底下的指令啟動：

```plaintext
node --max_old_space_size=8048 ./node_modules/@angular/cli/bin/ng serve --host 0.0.0.0
```
