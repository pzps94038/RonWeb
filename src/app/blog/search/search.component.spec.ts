import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { SearchComponent } from './search.component';
import { of, throwError, Observable } from 'rxjs';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { PostIndexItem } from 'src/app/shared/service/static-content.service';

describe('SearchComponent - 搜尋結果元件', () => {
  let component: SearchComponent;
  let fixture: ComponentFixture<SearchComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [SearchComponent, RouterTestingModule, HttpClientTestingModule],
    });
    fixture = TestBed.createComponent(SearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('應建立元件', () => {
    expect(component).toBeTruthy();
  });

  it('搜尋成功', fakeAsync(() => {
    const fakeItems: PostIndexItem[] = [
      {
        slug: '2024-01-01-angular-intro',
        articleTitle: 'Angular 入門',
        categoryId: 1,
        categoryName: '前端',
        labels: [],
        viewCount: 0,
        createDate: '2024-01-01',
        previewContent: '預覽',
        flag: 'Y',
      },
    ];
    spyOn(component.contentSrv, 'searchArticles').and.returnValue(
      of({ total: 1, items: fakeItems }),
    );
    component.searchKeyword('Angular', 1);
    tick();
    expect(component.total()).toBe(1);
    expect(component.articles().length).toBe(1);
    expect(component.isLoading()).toBe(false);
  }));

  it('搜尋失敗', fakeAsync(() => {
    spyOn(component.contentSrv, 'searchArticles').and.returnValue(
      throwError(() => new Error('Error')),
    );
    try {
      component.searchKeyword('test', 1);
      tick();
    } catch (e) {
      // catchError 內的 throw err 會拋出
    }
    expect(component.isError()).toBe(true);
    expect(component.isLoading()).toBe(false);
  }));

  it('導向文章詳情頁', () => {
    spyOn(component.router, 'navigateByUrl');
    component.showMore('2024-01-01-angular-intro');
    expect(component.router.navigateByUrl).toHaveBeenCalledWith(
      '/blog/article/2024-01-01-angular-intro',
    );
  });

  it('導向分類頁', () => {
    spyOn(component.router, 'navigateByUrl');
    component.navigateCategory({ categoryId: 1, categoryName: '前端' });
    expect(component.router.navigateByUrl).toHaveBeenCalledWith('/blog/category/1');
  });

  it('導向標籤頁', () => {
    spyOn(component.router, 'navigateByUrl');
    component.navigateLabel({ labelId: 1 });
    expect(component.router.navigateByUrl).toHaveBeenCalledWith('/blog/label/1');
  });

  it('分頁切換', () => {
    spyOn(component.router, 'navigate');
    component.keyword.set('Angular');
    component.paginationChange(2);
    expect(component.router.navigate).toHaveBeenCalledWith(['blog', 'search', 'Angular'], {
      queryParams: { page: 2 },
    });
  });
});

describe('SearchComponent - 帶路由參數初始化', () => {
  let component: SearchComponent;
  let fixture: ComponentFixture<SearchComponent>;
  const paramMap = of({
    get: (key: string) => (key === 'keyword' ? 'Angular' : null),
    has: (key: string) => key === 'keyword',
    getAll: (key: string) => (key === 'keyword' ? ['Angular'] : []),
    keys: ['keyword'],
  }) as Observable<ParamMap>;
  const queryParamMap = of({
    get: (key: string) => null,
    has: (key: string) => false,
    getAll: (key: string) => [],
    keys: [],
  }) as Observable<ParamMap>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [SearchComponent, HttpClientTestingModule, RouterTestingModule],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { paramMap, queryParamMap } as Partial<ActivatedRoute>,
        },
      ],
    });
    fixture = TestBed.createComponent(SearchComponent);
    component = fixture.componentInstance;
  });

  it('從路由參數取得關鍵字並搜尋', fakeAsync(() => {
    spyOn(component.contentSrv, 'searchArticles').and.returnValue(of({ total: 0, items: [] }));
    fixture.detectChanges();
    tick();
    expect(component.keyword()).toBe('Angular');
    expect(component.contentSrv.searchArticles).toHaveBeenCalledWith('Angular', 1);
  }));
});
