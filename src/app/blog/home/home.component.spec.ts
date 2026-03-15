import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { HomeComponent } from './home.component';
import { of, throwError, Observable } from 'rxjs';
import { ArticleComponent } from '../article/article.component';
import { CategoryComponent } from '../category/category.component';
import { LabelComponent } from '../label/label.component';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { StaticContentService, PostIndexItem } from 'src/app/shared/service/static-content.service';

/**
 * 產生假文章索引資料
 * @param count - 筆數
 * @returns 假文章陣列
 */
function createFakeArticles(count: number): PostIndexItem[] {
  return Array.from({ length: count }, (_, i) => ({
    slug: `2024-01-01-article-${i + 1}`,
    articleTitle: `title${i + 1}`,
    categoryId: 1,
    categoryName: 'categoryName',
    labels: [{ labelId: 1, labelName: '標籤1' }],
    viewCount: 0,
    createDate: '2023-05-08T13:22:00.124Z',
    previewContent: 'previewContent',
    flag: 'Y',
  }));
}

describe('HomeComponent - 首頁元件', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HomeComponent,
        HttpClientTestingModule,
        RouterTestingModule.withRoutes([
          { path: 'blog', component: HomeComponent },
          { path: 'blog/article/:slug', component: ArticleComponent },
          { path: 'blog/category/:id', component: CategoryComponent },
          { path: 'blog/label/:id', component: LabelComponent },
        ]),
      ],
    });
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('應建立元件', () => {
    expect(component).toBeTruthy();
  });

  it('取得文章列表成功', fakeAsync(() => {
    const fakeItems = createFakeArticles(3);
    spyOn(component.contentSrv, 'getArticles').and.returnValue(of({ total: 3, items: fakeItems }));
    component.getArticles(1);
    tick();
    expect(component.total()).toBe(3);
    expect(component.articles().length).toBe(3);
    expect(component.isLoading()).toBe(false);
  }));

  it('取得文章列表失敗', fakeAsync(() => {
    spyOn(component.contentSrv, 'getArticles').and.returnValue(
      throwError(() => new Error('Error')),
    );
    component.getArticles(1);
    tick();
    expect(component.isError()).toBe(true);
    expect(component.isLoading()).toBe(false);
  }));

  it('導向文章詳情頁', () => {
    spyOn(component.router, 'navigateByUrl');
    component.showMore('2024-01-01-test-article');
    expect(component.router.navigateByUrl).toHaveBeenCalledWith(
      '/blog/article/2024-01-01-test-article',
    );
  });

  it('導向分類頁', () => {
    spyOn(component.router, 'navigateByUrl');
    component.navigateCategory({ categoryId: 2, categoryName: '後端' });
    expect(component.router.navigateByUrl).toHaveBeenCalledWith('/blog/category/2');
  });

  it('導向標籤頁', () => {
    spyOn(component.router, 'navigateByUrl');
    component.navigateLabel({ labelId: 3 });
    expect(component.router.navigateByUrl).toHaveBeenCalledWith('/blog/label/3');
  });

  it('分頁切換', () => {
    spyOn(component.router, 'navigate');
    component.paginationChange(2);
    expect(component.router.navigate).toHaveBeenCalledWith(['/blog'], {
      queryParams: { page: 2 },
    });
  });
});

describe('HomeComponent - 初始化帶頁碼參數', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  const fakePage = '5';
  const queryParamMap = of({
    get: (key: string) => fakePage,
  }) as Observable<ParamMap>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HomeComponent, HttpClientTestingModule],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { queryParamMap } as ActivatedRoute,
        },
      ],
    });
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('正確解析頁碼參數', fakeAsync(() => {
    spyOn(component.contentSrv, 'getArticles').and.returnValue(of({ total: 0, items: [] }));
    component.ngOnInit();
    tick();
    expect(component.page()).toBe(5);
  }));
});

describe('HomeComponent - 無效頁碼參數', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  const queryParamMap = of({
    get: (key: string) => 'NAN',
  }) as Observable<ParamMap>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HomeComponent, HttpClientTestingModule],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { queryParamMap } as ActivatedRoute,
        },
      ],
    });
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('無效頁碼回退為第1頁', fakeAsync(() => {
    spyOn(component.contentSrv, 'getArticles').and.returnValue(of({ total: 0, items: [] }));
    component.ngOnInit();
    tick();
    expect(component.page()).toBe(1);
  }));
});
