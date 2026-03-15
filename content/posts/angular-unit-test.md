---
{
  'title': 'Angular Unit Test',
  'categoryId': 1,
  'categoryName': '前端',
  'labels':
    [
      { 'labelId': 12, 'labelName': 'Unit Test' },
      { 'labelId': 13, 'labelName': 'Jasmine' },
      { 'labelId': 14, 'labelName': 'Karma' },
    ],
  'createDate': '2023-06-02T22:51:54.482Z',
  'references': [],
  'flag': 'Y',
}
---

## 介紹

單元測試（Unit Test）是目前業界常見的一種測試方式。在測試當中，單元測試是以程式碼最小的一個單元來做測試。

何謂最小的一個單元？就是類別當中的一個函式。

在單元測試當中，相較於其他測試應該是最穩定的，只需專注在程式的 Input 及期望的 Output。像是跟網路相關的 API 通常會被 spy 成假資料。

## 測試的三大要素

```plaintext
測試執行器(Test Runner)
- 決定測試環境
- 執行測試案例程式碼
- 取得測試結果，並產生測試報告

測試框架(Testing Framework)
- 用來撰寫測試案例的框架
- 用來執行測試案例來看結果，通知測試框架

測試案例(Test Case)
- 每個期望輸出會得到的結果
```

## 寫測試的思考步驟 — 3A Pattern

```plaintext
- Arrange (安排) - 準備測試資料
- Act (執行) - 執行測試
- Assert (判斷) - 確認結果是符合預期
```

推薦安裝 [Jasmine code snippets - Visual Studio Marketplace](https://marketplace.visualstudio.com/items?itemName=xabikos.JasmineSnippets)

## 基本範例

```typescript
describe('AboutMeComponent', () => {
  // 測試環境
  let component: AboutMeComponent;
  let fixture: ComponentFixture<AboutMeComponent>;

  beforeEach(async () => {
    // 每個it 執行前會觸發
    await TestBed.configureTestingModule({
      // 每個測試的獨立module環境
      imports: [AboutMeComponent, HttpClientTestingModule],
    }).compileComponents();

    fixture = TestBed.createComponent(AboutMeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    // 每個測試案例
    expect(component).toBeTruthy(); // 每個測試是否符合預期
  });
});
```

使用以下指令來看測試結果：

```shell
ng test
```

## 測試週期

```typescript
describe('測試案例群組', () => {
  beforeAll(() => {
    /* 在整個 describe() 一開始執行 */
  });
  beforeEach(() => {
    /* 在 describe() 內的每個 it() 前執行 */
  });
  /* 測試案例不一定會照順序執行 */ it('測試案例內容 1', () => {
    expect(true).toBe(true);
  });
  it('測試案例內容 2', () => {
    expect(true).toBe(true);
  });
  afterEach(() => {
    /* 在 describe() 內的每個 it() 結束後執行 */
  });
  afterAll(() => {
    /* 在整個 describe() 將要結束前執行 */
  });
});
```

## Matchers — Assert 工具箱

Matchers 用來與 expect() 搭配，判斷（斷言、Assertion）測試結果是否符合預期。

使用 expect(actual) 會得到一個 matchers，matchers 包含了用來判斷執行結果的 API 方法。

[Matchers 清單](https://jasmine.github.io/api/edge/matchers.html)

### 常用的斷言方法

```typescript
判斷數值
toBe(expected) - 相當於使用 === 比對結果
toBeGreaterThan(expecteed) - 相當於使用 > 比對結果
toBeGreaterThanOrEqual(expected) - 相當於使用 >= 比對結果
toBeLessThan(expected) - 相當於使用 < 比對結果
toBeLessThanOrEqual(expected) - 相當於使用 <= 比對結果
判斷物件、字串或陣列
toBeTruthy(expected) - 用來判斷 expected 值是否為 truthy
toBeFalsy(expected) - 用來判斷 expected 值是否為 falsy
toEqual(expected) - 深層比對兩個物件是否相同
toContain(expected) - 是否在陣列當中 or 是否在字串當中
toMatch(expected) - 比對文字是否符合，可使用regex
```

## SpyOn

Jasmine 提供 SpyOn 來模擬物件、方法的行為，使用 SpyOn 可以攔截原本的方法呼叫，改呼叫 SpyOn 產生出來的假物件及方法。

### 範例

```typescript
使用 spyOn() 方法，可以在物件的方法植入一個間諜(spy)
spyOn(service, 'methodName')

//使用.and.callFake(fn)，在方法要被呼叫時，間諜會幫你呼叫自訂的假方法
spyOn(service, 'methodName').and.callFake((...args)=> of(apiRes));

//如果只需要假的回傳值，可以使用.and.returnValue (value)，控制回傳內容
spyOn(service, 'methodName').and.returnValue(of(apiRes));
```

### 比對 Spy 後常用的方法

```plaintext
判斷建立的 spy 行為
• toHaveBeenCalled() - spy 是否被呼叫過
• toHaveBeenCalledTimes(expected) - spy 被呼叫過幾次
- ex:toHaveBeenCalledTimes(1)
• toHaveBeenCalledWith(expected)
- spy 被呼叫時包含哪些參數
- 參數可以有多個
- ex:toHaveBeenCalledWith(1,2)
```

## Angular TestBed

```typescript
describe('AboutMeComponent', () => { // 測試環境
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async () => { // 每個it 執行前會觸發
 	await TestBed.configureTestingModule({
  		declarations: [
    		AppComponent
  		],
  		imports: [
  			HttpClientTestingModule, // 測試Http
  			RouterTestingModule // 測試路由
  		],
  		providers: [] // 這邊也能像ngModule 把服務抽換，來方便做測試
	}).compileComponents();
	fixture = TestBed.createComponent(AppComponent); // 建立元件
    component = fixture.componentInstance; // 取得元件實體
    fixture.detectChanges()
  });

  it('測試表單參數值變化', () => {
	const hostElement = fixture.nativeElement as HTMLElement;
	const input = hostElement.querySelector('input[name=account]') as HTMLInputElement;
	input.value = 'account';
	fixture.detectChanges();
	觸發文字方塊的 input 事件
	input.dispatchEvent(new Event('input'));
	expect(fixture.componentInstance.input).toBe('account');
  });

  it('使用DebugElement 測試表單參數值變化', fakeAsync(() => {
    const val = 'Test';
    const input = fixture.debugElement.query(By.css('input')).nativeElement;
    input.value = val;
    input.dispatchEvent(new Event('input'));
    tick();
    expect(fixture.componentInstance.input).toBe(val);
  }));

  it('測試非同步', fakeAsync(() => {
    const fake = {
    	data: {
    		total: 0,
    		articles: []
    	}
    };
    spyOn(component.articleSrv, 'getArticle' as never).and.returnValue(of(fake) as never);
    component.getArticle();
    tick(); // delay 幾秒
    expect(component.total()).toBe(fake.data.total);
    expect(component.articles()).toBe(fake.data.articles);
  }));
});
```

## 測試指令

```shell
ng test --watch=false --browsers=ChromeHeadless --code-coverage
--watch=false // 讓測試只執行一次便停止，用於跑CI CD 測試使用
--browsers=ChromeHeadless // 讓CI CD測試環境，不會實際開瀏覽器起來
--code-coverage // 產生測試覆蓋率報告
```
