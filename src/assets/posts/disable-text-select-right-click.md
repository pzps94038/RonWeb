---
{
  "title": "網頁上禁用文本選擇及滑鼠右鍵",
  "categoryId": 1,
  "categoryName": "前端",
  "labels": [],
  "createDate": "2024-09-23T00:45:10.602Z",
  "references": [
    "https://www.astralweb.com.tw/how-to-disable-text-selection-and-right-click-on-a-web-page/"
  ],
  "flag": "Y"
}
---
## 選取禁用

### 使用 CSS

```css
-webkit-user-select: none; /*Chrome, Opera (older versions), IOS Safari*/
-webkit-touch-callout: none; /*Safari*/
-moz-user-select: none; /*Mozilla*/
-ms-user-select: none;
user-select: none;
```

### 使用 JavaScript

```javascript
document.body.addEventListener('selectstart', (e)=> e.preventDefault());
```

## 右鍵禁用

```javascript
document.body.addEventListener('contextmenu', (e)=> e.preventDefault());
```
