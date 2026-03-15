---
{
  'title': 'Angular  RouteReuseStrategy 緩存路由',
  'categoryId': 1,
  'categoryName': '前端',
  'labels': [],
  'createDate': '2023-05-21T03:27:04.323Z',
  'references': [],
  'flag': 'Y',
}
---

## 繼承 RouteReuseStrategy 抽象類別

第一步是建立一個類別，並繼承 RouteReuseStrategy 的抽象類別。

由於是緩存式元件，只有第一次進入才會觸發 Angular 的生命週期。

```typescript
abstract class RouteReuseStrategy {
  // 判斷路由是否能重複使用
  abstract shouldDetach(route: ActivatedRouteSnapshot): boolean;
  // 當路由離開時，會觸發此方法
  abstract store(route: ActivatedRouteSnapshot, handle: DetachedRouteHandle): void;
  // 當路由進入時，可判斷是否還原路由的暫存內容
  abstract shouldAttach(route: ActivatedRouteSnapshot): boolean;
  // 從 Cache 中取得對應的暫存內容
  abstract retrieve(route: ActivatedRouteSnapshot): DetachedRouteHandle | null;
  // 判斷是否同一路由
  abstract shouldReuseRoute(future: ActivatedRouteSnapshot, curr: ActivatedRouteSnapshot): boolean;
}
```

## 實作範例

在過程中有發現，使用復用元件時 fn 有多次觸發的情況，如同底下的 issue：

[RouteReuseStrategy retrieve() gets fired twice · Issue #43251 · angular/angular (github.com)](https://github.com/angular/angular/issues/43251)

如果在復用時有對元件呼叫 fn，需要做延遲處理，當短時間有多次觸發時以最後的觸發為主。

```typescript
export class CacheRouteStrategy extends RouteReuseStrategy implements OnDestroy {
    private static _handlers: { [key: string]: any } = {};
    // 處理多次進入判斷觸發，以最後的為主
    private static _lock: { [key: string]: NodeJS.Timeout } = {};

    ngOnDestroy(): void {
        CacheRouteStrategy._handlers = {};
        CacheRouteStrategy._lock = {};
    }

    /**
     * 判斷路由是否能重複使用
     * @param param0
     * @returns
     */
    public shouldDetach({ data, url }: ActivatedRouteSnapshot): boolean {
        return data['keep'] ?? false;
    }

    /**
     * 當路由離開時，會觸發此方法
     * @param param0
     * @param handle
     */
    public store({ data, routeConfig }: ActivatedRouteSnapshot, handle: DetachedRouteHandle): void {
        // 將目前路由內容暫存起來
        // key 網址 value 元件
        if (routeConfig?.path && data['keep']) {
            CacheRouteStrategy._handlers[routeConfig.path!] = handle;
            const cacheComponent = CacheRouteStrategy._handlers[routeConfig.path!];
            const instance = cacheComponent?.componentRef?.instance;
            if (instance && typeof instance?.onDetach === 'function') {
                instance.onDetach();
            }
        }
    }

    /**
     * 當路由進入時，可判斷是否還原路由的暫存內容
     * @param param0
     * @returns
     */
    shouldAttach({ data, routeConfig }: ActivatedRouteSnapshot): boolean {
        if (routeConfig?.path) {
            if (!!data['keep']) {
                return !!CacheRouteStrategy._handlers[routeConfig?.path];
            } else {
                return false;
            }
        } else {
            return false;
        }
    }

    /**
     * 從 Cache 中取得對應的暫存內容
     * @param param0
     * @returns
     */
    retrieve({ data, routeConfig }: ActivatedRouteSnapshot): DetachedRouteHandle | null {
        if (!data['keep'] || !routeConfig) return null;
        else if (routeConfig.loadChildren || routeConfig.children) return null;
        else {
            if (routeConfig.path) {
                const cacheComponent = CacheRouteStrategy._handlers[routeConfig.path];
                const instance = cacheComponent?.componentRef?.instance;
                // 處理有同時多次呼叫問題
                if (instance && typeof instance?.onAttach === 'function') {
                    if (CacheRouteStrategy._lock[routeConfig.path]) {
                        clearTimeout(CacheRouteStrategy._lock[routeConfig.path]);
                    }
                    CacheRouteStrategy._lock[routeConfig.path] = setTimeout(() => {
                        instance.onAttach();
                        delete CacheRouteStrategy._lock[routeConfig.path!];
                    });
                }
                return cacheComponent;
            } else {
                return null;
            }
        }
    }

    /**
     * 判斷是否同一路由
     * @param future
     * @param current
     * @returns
     */
    public shouldReuseRoute(
        future: ActivatedRouteSnapshot,
        current: ActivatedRouteSnapshot,
    ): boolean {
        return future.routeConfig === current.routeConfig;
    }
```

## 配置使用緩存式路由

```typescript
@NgModule({
  declarations: [AppComponent],
  imports: [ComponentsModule],
  providers: [
    {
      provide: RouteReuseStrategy,
      useClass: CacheRouteStrategy,
      deps: [],
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
```

```typescript
const routes: Routes = [
  { path: '', redirectTo: 'home' },
  {
    // 首頁
    path: 'home',
    component: HomeComponent,
    // 這邊提供參數，給緩存式來做判定
    data: { keep: true },
  },
  { path: '**', redirectTo: 'home', pathMatch: 'full' },
];
```
