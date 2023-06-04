import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { CategoryComponent } from './category.component';
import { ParamMap, ActivatedRoute } from '@angular/router';
import { of, Observable, throwError } from 'rxjs';
import { ReturnCode } from 'src/app/shared/api/shared/shared.model';
import { SearchResponse } from 'src/app/shared/api/search/search.model';

describe('CategoryComponent', () => {
  let component: CategoryComponent;
  let fixture: ComponentFixture<CategoryComponent>;
  const fakePage = 'NAN';
  const fakeId = '1';
  const paramMap = of({
    get: (key: string) => fakeId,
  }) as Observable<ParamMap>;
  const queryParamMap = of({
    get: (key: string) => fakePage,
  }) as Observable<ParamMap>;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CategoryComponent, RouterTestingModule, HttpClientTestingModule],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            paramMap,
            queryParamMap,
          } as ActivatedRoute,
        },
      ],
    });
    fixture = TestBed.createComponent(CategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('測試初始化', fakeAsync(() => {
    const fake = {
      returnCode: ReturnCode.Success,
      returnMessage: 'msg',
      data: {
        total: 1,
        articles: [
          {
            articleId: 2,
            articleTitle: 'title',
            previewContent: 'previewContent',
            categoryId: 1,
            categoryName: 'categoryName',
            labels: [
              {
                labelId: 1,
                labelName: '標籤1',
                createDate: '2023-05-08T13:22:00.124Z',
              },
            ],
            viewCount: 0,
            createDate: '2023-05-08T13:22:00.124Z',
          },
        ],
        keyword: 'keyword',
      },
    } as SearchResponse;
    spyOn(component.searchSrv, 'category').and.returnValue(of(fake) as never);
    component.ngOnInit();
    tick();
    expect(component.categoryId()).toBe(parseInt(fakeId));
    expect(component.articles()).toEqual(fake.data.articles);
    expect(component.total()).toBe(fake.data.total);
  }));

  it('測試查無分類', fakeAsync(() => {
    const fake = {
      returnCode: ReturnCode.NotFound,
      returnMessage: 'msg',
      data: {},
    };
    spyOn(component.searchSrv, 'category').and.returnValue(of(fake) as never);
    const spy = spyOn(component.router, 'navigate');
    component.searchCategory(1);
    tick();
    expect(spy).toHaveBeenCalledWith(['blog', 'notFound']);
  }));

  it('測試API 有錯誤', fakeAsync(() => {
    const fake = {
      returnCode: ReturnCode.Fail,
      returnMessage: 'msg',
      data: {},
    };
    spyOn(component.searchSrv, 'category').and.returnValue(of(fake) as never);
    component.searchCategory(1);
    tick();
    expect(component.isError()).toBe(true);
  }));

  it('測試API 有異常', fakeAsync(() => {
    spyOn(component.searchSrv, 'category').and.returnValue(
      throwError(() => new Error('異常錯誤')) as never,
    );
    component.searchCategory(1);
    expect(component.isError()).toBe(true);
  }));

  it('測試查看明細', () => {
    const spy = spyOn(component.router, 'navigateByUrl');
    component.showMore(1);
    expect(spy).toHaveBeenCalled();
  });

  it('測試轉址分類', () => {
    const spy = spyOn(component.router, 'navigateByUrl');
    component.navigateCategory({ categoryId: 1, categoryName: '測試' });
    expect(spy).toHaveBeenCalled();
  });

  it('測試轉址標籤', () => {
    const spy = spyOn(component.router, 'navigateByUrl');
    component.navigateLabel({ labelId: 1, labelName: '測試', createDate: '' });
    expect(spy).toHaveBeenCalled();
  });

  it('測試分頁功能', () => {
    const spy = spyOn(component.router, 'navigateByUrl');
    component.paginationChange(1);
    expect(spy).toHaveBeenCalled();
  });
});

describe('測試無效類別ID 及 無效分頁', () => {
  let component: CategoryComponent;
  let fixture: ComponentFixture<CategoryComponent>;
  const paramMap = of({
    get: (key: string) => 'NAN',
  }) as Observable<ParamMap>;
  const queryParamMap = of({
    get: (key: string) => 'NAN',
  }) as Observable<ParamMap>;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CategoryComponent, RouterTestingModule, HttpClientTestingModule],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            paramMap,
            queryParamMap,
          } as ActivatedRoute,
        },
      ],
    });
    fixture = TestBed.createComponent(CategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('測試初始化', fakeAsync(() => {
    const spy = spyOn(component.router, 'navigate');
    component.ngOnInit();
    tick();
    expect(spy).toHaveBeenCalled();
  }));
});
