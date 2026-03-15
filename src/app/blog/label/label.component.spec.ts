import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { LabelComponent } from './label.component';
import { of, Observable, throwError } from 'rxjs';
import { ActivatedRoute, ParamMap } from '@angular/router';

describe('LabelComponent - 標籤搜尋元件', () => {
  let component: LabelComponent;
  let fixture: ComponentFixture<LabelComponent>;
  const fakeId = '1';
  const paramMap = of({
    get: (key: string) => fakeId,
  }) as Observable<ParamMap>;
  const queryParamMap = of({
    get: (key: string) => null,
  }) as Observable<ParamMap>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [LabelComponent, RouterTestingModule, HttpClientTestingModule],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { paramMap, queryParamMap } as ActivatedRoute,
        },
      ],
    });
    fixture = TestBed.createComponent(LabelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('應建立元件', () => {
    expect(component).toBeTruthy();
  });

  it('初始化成功載入標籤文章', fakeAsync(() => {
    spyOn(component.contentSrv, 'getArticlesByLabel').and.returnValue(
      of({
        total: 1,
        items: [
          {
            slug: '2024-01-01-test-article',
            articleTitle: 'title',
            categoryId: 1,
            categoryName: '前端',
            labels: [{ labelId: 1, labelName: 'Angular' }],
            viewCount: 0,
            createDate: '2024-01-01',
            previewContent: 'preview',
            flag: 'Y',
          },
        ],
        keyword: 'Angular',
      }),
    );
    component.ngOnInit();
    tick();
    expect(component.labelId()).toBe(1);
    expect(component.articles().length).toBe(1);
    expect(component.label()).toBe('Angular');
  }));

  it('查無標籤時導向 notFound', fakeAsync(() => {
    spyOn(component.contentSrv, 'getArticlesByLabel').and.returnValue(
      of({ total: 0, items: [], keyword: '' }),
    );
    const spy = spyOn(component.router, 'navigate');
    component.searchLabel(999);
    tick();
    expect(spy).toHaveBeenCalledWith(['blog', 'notFound']);
  }));

  it('API 異常時設定 isError', fakeAsync(() => {
    spyOn(component.contentSrv, 'getArticlesByLabel').and.returnValue(
      throwError(() => new Error('異常')),
    );
    component.searchLabel(1);
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
    component.navigateCategory({ categoryId: 1, categoryName: '前端' });
    expect(spy).toHaveBeenCalledWith('/blog/category/1');
  });

  it('導向標籤頁', () => {
    const spy = spyOn(component.router, 'navigateByUrl');
    component.navigateLabel({ labelId: 2 });
    expect(spy).toHaveBeenCalledWith('/blog/label/2');
  });

  it('分頁切換', () => {
    const spy = spyOn(component.router, 'navigate');
    component.labelId.set(1);
    component.paginationChange(3);
    expect(spy).toHaveBeenCalledWith(['blog', 'label', 1], {
      queryParams: { page: 3 },
    });
  });
});

describe('LabelComponent - 無效標籤 ID', () => {
  let component: LabelComponent;
  let fixture: ComponentFixture<LabelComponent>;
  const paramMap = of({
    get: (key: string) => 'NAN',
  }) as Observable<ParamMap>;
  const queryParamMap = of({
    get: (key: string) => null,
  }) as Observable<ParamMap>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [LabelComponent, RouterTestingModule, HttpClientTestingModule],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { paramMap, queryParamMap } as ActivatedRoute,
        },
      ],
    });
    fixture = TestBed.createComponent(LabelComponent);
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
