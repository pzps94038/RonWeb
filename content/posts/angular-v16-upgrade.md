---
{
  'title': 'Angular v16 升級大綱',
  'categoryId': 1,
  'categoryName': '前端',
  'labels': [{ 'labelId': 1, 'labelName': '版本更新' }],
  'createDate': '2023-05-20T07:16:59.032Z',
  'references':
    [
      'https://blog.angular.io/angular-v16-is-here-4d7a28ec680d',
      'https://angular.io/guide/rxjs-interop',
    ],
  'flag': 'Y',
}
---

## Angular 新增 Signals，zone.js 變為可選設定

其中 Signals 當中我覺得 computed 最實用，雖然其他框架已經都有類似的功能，不過對於需要轉型或計算的場景，原本都只能透過管道或是先處理完再塞到樣板當中，現在多了一種方式可用。

以下為使用範例：

```typescript
@Component({
  selector: 'my-app',
  standalone: true,
  template: ` {{ fullName() }} <button (click)="setName('John')">Click</button> `,
})
export class App {
  firstName = signal('Jane');
  lastName = signal('Doe');
  fullName = computed(() => `${this.firstName()} ${this.lastName()}`);

  constructor() {
    effect(() => console.log('Name changed:', this.fullName()));
  }

  setName(newName: string) {
    this.firstName.set(newName);
  }
}
```

### Zone.js 可選設置

```typescript
bootstrapApplication(App, {
  providers: [provideZoneChangeDetection({ eventCoalescing: true })],
});
```

### RxJS interoperability

因應 Signal 新增了 RxJS interoperability，不過只能在建構式階段使用。

```typescript
import { toObservable, signal } from '@angular/core/rxjs-interop';

@Component({...})
export class App {
  count = signal(0);
  count$ = toObservable(this.count);

  ngOnInit() {
    this.count$.subscribe(() => ...);
  }
}
```

## RxJS 新的運算子 takeUntilDestroyed

原本常用的銷毀訂閱方式：

```typescript
destroy$ = new Subject<any>();
data$ = http.get('...').pipe(takeUntil(this.destroy$));
ngOnDestroy() {
	this.destroy$.next(null);
	this.destroy$.complete();
}
```

改成在建構式階段可以直接使用：

```typescript
constructor(){
	http.get('…').pipe(takeUntilDestroyed()).subscribe(() => ...);
}
```

建構式以外的生命週期使用方式：

```typescript
private _destroyRef = inject(DestroyRef);
ngOnInit() {
	http.get('…').pipe(
		takeUntilDestroyed(this._destroyRef)
	).subscribe(() => ...);
}
```

## Server-side Rendering and Hydration Enhanced

伺服器渲染模式優化：

```typescript
import {
  bootstrapApplication,
  provideClientHydration,
} from '@angular/platform-browser';

...

bootstrapApplication(RootCmp, {
  providers: [provideClientHydration()]
});
```

## Standalone 處理模式，使元件、管道、Directives 解耦

```shell
// 專案遷移
ng generate @angular/core:standalone
// 起專案
ng new --standalone
```

## 開發配置 Vite 為預設項目，超快編譯

進入 angular.json 中設定，可惜 Tailwind 還沒辦法一起配置。

[Tailwind support in esbuild builder · Issue #24752 · angular/angular-cli (github.com)](https://github.com/angular/angular-cli/issues/24752)

```json
"builder": "@angular-devkit/build-angular:browser-esbuild"
```

```shell
// 專案遷移
ng generate @angular/core:standalone
// 起專案
ng new --standaloneular:browser-esbuild\",\n...
```

## Autocomplete Imports in Templates

![](/assets/images/angular-v16-upgrade/1.gif)

## Required Inputs

@Input 可以被設為必填項目。這點蠻方便的，很多元件都有必填參數，多了這個可以減少忘記給參數的情況。

```typescript
@Component(...) export class App {
	@Input({ required: true }) title: string = '';
}
```

## 自閉標籤

**以往**

```html
<super-duper-long-component-name [prop]="someVar"></super-duper-long-component-name>
```

現在可以簡化為：

```html
<super-duper-long-component-name [prop]="someVar" />
```
