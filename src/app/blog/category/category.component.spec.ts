import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { CategoryComponent } from './category.component';
import { ParamMap, ActivatedRoute } from '@angular/router';
import { of, Observable, throwError } from 'rxjs';

describe('CategoryComponent - 分類搜尋元件', () => {
  let component: CategoryComponent;
  let fixture: ComponentFixture<CategoryComponent>;
  const fakeId = '1';
  const paramMap = of({
    get: (key: string) => fakeId,
  }) as Observable<ParamMap>;
  const queryParamMap = of({
    get: (key: string) => null,
  }) as Observable<ParamMap>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CategoryComponent, RouterTestingModule, HttpClientTestingModule],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { paramMap, queryParamMap } as ActivatedRoute,
        },
      ],
    });
    fixture = TestBed.createComponent(CategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('應建立元件', () => {
    expect(component).toBeTruthy();
  });

  it('初始化成功載入分類文章', fakeAsync(() => {
    spyOn(component.contentSrv, 'getArticlesByCategory').and.returnValue(
      of({
        total: 1,
        items: [
          {
            slug: '2024-01-01-test-article',
            articleTitle: 'title',
            categoryId: 1,
            categoryName: '前端',
            labels: [],
            viewCount: 0,
            createDate: '2024-01-01',
            previewContent: 'preview',
            flag: 'Y',
          },
        ],
        keyword: '前端',
      }),
    );
    component.ngOnInit();
    tick();
    expect(component.categoryId()).toBe(1);
    expect(component.articles().length).toBe(1);
    expect(component.category()).toBe('前端');
  }));

  it('查無分類時導向 notFound', fakeAsync(() => {
    spyOn(component.contentSrv, 'getArticlesByCategory').and.returnValue(
      of({ total: 0, items: [], keyword: '' }),
    );
    const spy = spyOn(component.router, 'navigate');
    component.searchCategory(999);
    tick();
    expect(spy).toHaveBeenCalledWith(['blog', 'notFound']);
  }));

  it('API 異常時設定 isError', fakeAsync(() => {
    spyOn(component.contentSrv, 'getArticlesByCategory').and.returnValue(
      throwError(() => new Error('異常錯誤')),
    );
    component.searchCategory(1);
    tick();
    expect(component.isError()).toBe(true);
  }));

  it('導向文章詳情頁', () => {
    const spy = spyOn(component.router, 'navigateByUrl');
    component.showMore('2024-01-01-test-article');
    expect(spy).toHaveBeenCalledWith('/blog/article/2024-01-01-test-article');
  });

  it('導向分類頁', () => {
    const spy = spyOn(component.router, 'navigateByUrl');
    component.navigateCategory({ categoryId: 2, categoryName: '後端' });
    expect(spy).toHaveBeenCalledWith('/blog/category/2');
  });

  it('導向標籤頁', () => {
    const spy = spyOn(component.router, 'navigateByUrl');
    component.navigateLabel({ labelId: 1 });
    expect(spy).toHaveBeenCalledWith('/blog/label/1');
  });

  it('分頁切換', () => {
    const spy = spyOn(component.router, 'navigate');
    component.categoryId.set(1);
    component.paginationChange(2);
    expect(spy).toHaveBeenCalledWith(['blog', 'category', 1], {
      queryParams: { page: 2 },
    });
  });
});

describe('CategoryComponent - 無效分類 ID', () => {
  let component: CategoryComponent;
  let fixture: ComponentFixture<CategoryComponent>;
  const paramMap = of({
    get: (key: string) => 'NAN',
  }) as Observable<ParamMap>;
  const queryParamMap = of({
    get: (key: string) => null,
  }) as Observable<ParamMap>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CategoryComponent, RouterTestingModule, HttpClientTestingModule],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { paramMap, queryParamMap } as ActivatedRoute,
        },
      ],
    });
    fixture = TestBed.createComponent(CategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('無效 ID 導向 blog 首頁', fakeAsync(() => {
    const spy = spyOn(component.router, 'navigate');
    component.ngOnInit();
    tick();
    expect(spy).toHaveBeenCalledWith(['blog']);
  }));
});
