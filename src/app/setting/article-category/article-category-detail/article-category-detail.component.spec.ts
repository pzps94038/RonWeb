import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { ArticleCategoryDetailComponent } from './article-category-detail.component';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { of, Observable, throwError } from 'rxjs';
import { ReturnCode } from 'src/app/shared/api/shared/shared.model';
import { GetArticleCategoryResponse } from 'src/app/shared/api/article-category/article-category.model';

describe('ArticleCategoryDetailComponent', () => {
  let component: ArticleCategoryDetailComponent;
  let fixture: ComponentFixture<ArticleCategoryDetailComponent>;
  const fakePage = '1';
  const queryParamMap = of({
    get: (key: string) => fakePage,
  }) as Observable<ParamMap>;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ArticleCategoryDetailComponent, HttpClientTestingModule, RouterTestingModule],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            queryParamMap,
          } as ActivatedRoute,
        },
      ],
    });
    fixture = TestBed.createComponent(ArticleCategoryDetailComponent);
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
        total: 0,
        categorys: [],
      },
    } as GetArticleCategoryResponse;
    spyOn(component.articleCategorySrv, 'getArticleCategory').and.returnValue(of(fake));
    component.ngOnInit();
    tick();
    expect(component.categorys()).toEqual(fake.data.categorys);
    expect(component.total()).toBe(fake.data.total);
  }));

  it('測試API 有異常', fakeAsync(() => {
    const fake = {
      returnCode: ReturnCode.Fail,
      returnMessage: 'msg',
    } as GetArticleCategoryResponse;
    spyOn(component.articleCategorySrv, 'getArticleCategory').and.returnValue(of(fake));
    component.ngOnInit();
    tick();
    expect(component.isError()).toBe(true);
  }));

  it('測試API回傳錯誤', fakeAsync(() => {
    const fake = {
      returnCode: ReturnCode.Fail,
      returnMessage: 'msg',
    } as GetArticleCategoryResponse;
    spyOn(component.articleCategorySrv, 'getArticleCategory').and.returnValue(of(fake));
    component.ngOnInit();
    tick();
    expect(component.isError()).toBe(true);
  }));

  it('測試API異常', fakeAsync(() => {
    spyOn(component.articleCategorySrv, 'getArticleCategory').and.returnValue(
      throwError(() => new Error('API異常')),
    );
    component.ngOnInit();
    tick();
    expect(component.isError()).toBe(true);
  }));

  it('測試分頁切換', fakeAsync(() => {
    const spy = spyOn(component.router, 'navigate');
    component.paginationChange(1);
    tick();
    expect(spy).toHaveBeenCalled();
  }));

  it('測試刪除', fakeAsync(() => {
    const spy = spyOn(component.articleCategorySrv, 'deleteArticleCategory').and.returnValue(
      of({
        returnCode: ReturnCode.Success,
        returnMessage: 'msg',
      }),
    );
    const fake = {
      returnCode: ReturnCode.Success,
      returnMessage: 'msg',
      data: {
        total: 0,
        categorys: [],
      },
    } as GetArticleCategoryResponse;
    const spyCategory = spyOn(component.articleCategorySrv, 'getArticleCategory').and.returnValue(
      of(fake),
    );
    spyOn(component.swalSrv, 'confirm').and.returnValue(of({ isConfirmed: true }) as never);
    spyOn(component.swalSrv, 'alert').and.returnValue(of({ isConfirmed: true }) as never);
    component.deleteArticleCategory(1);
    tick();
    expect(spy).toHaveBeenCalled();
    expect(spyCategory).toHaveBeenCalled();
  }));

  it('測試重新整理', fakeAsync(() => {
    const spy = spyOn(component, 'getArticleCategory');
    component.refreshArticleCategory();
    tick();
    expect(spy).toHaveBeenCalled();
  }));
});
