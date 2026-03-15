---
{
  'title': 'Angular 版本更新',
  'categoryId': 1,
  'categoryName': '前端',
  'labels': [{ 'labelId': 1, 'labelName': '版本更新' }],
  'createDate': '2025-03-17T23:37:31.538Z',
  'references': ['https://angular.dev/update-guide'],
  'flag': 'Y',
}
---

## 步驟一：根據自身條件選取

```plaintext
1. 哪個版本升級到指定版本
2. 選擇複雜性
3. 相關依賴項， Angular Material、Windows環境
```

![](/assets/images/angular-version-upgrade-guide/1.png)

## 步驟二：列出更新的項目

一步一步往下做，做完勾選以防漏掉

更新指令可以類似下方範例加上 --force

忽略相依性版本問題

```bash
ng update @angular/core@13 @angular/cli@13 --force
```

![](/assets/images/angular-version-upgrade-guide/2.png)

## 步驟三：驗證每次版本更新

檢核每次版本更新是否有套件不支援情況，導致專案無法正常啟動

如果遇到該狀況，如果原套件有更新支援版本可以直接往上到支援版本

若"**無**"，需要找有無替代套件

如果無替代套件，可能需要找其他套件或是把該套件自行協助升級後往上更新，在上傳至遠端 npm  
例如以下  
![](/assets/images/angular-version-upgrade-guide/1.png)

替換  
![](/assets/images/angular-version-upgrade-guide/4.png)
