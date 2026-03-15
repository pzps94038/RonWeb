---
{
  'title': 'IOS 跟隨手機字體設定放大縮小',
  'categoryId': 1,
  'categoryName': '前端',
  'labels': [{ 'labelId': 28, 'labelName': 'IOS' }],
  'createDate': '2025-03-20T00:26:27.694Z',
  'references': [],
  'flag': 'Y',
}
---

## 步驟一：DEMO HTML 設定

```html
<p class="headline">headline</p>
<p class="subheadline">subheadline</p>
<p class="body">body</p>
<p>一般文字</p>
```

## 步驟二：DEMO CSS 設定

```css
.headline {
  font: -apple-system-headline;
}
.subheadline {
  font: -apple-system-subheadline;
}
.body {
  font: -apple-system-body;
}
```

## 步驟三：預設設定及畫面

![](/assets/images/ios-follow-system-font-size/1.png)![](/assets/images/ios-follow-system-font-size/2.png)

## 步驟四：把設定放大

![](/assets/images/ios-follow-system-font-size/3.png)![](/assets/images/ios-follow-system-font-size/2.png)

## 結論

可以發現只有該字體，會跟隨系統設定來做放大，一般文字根本不吃
