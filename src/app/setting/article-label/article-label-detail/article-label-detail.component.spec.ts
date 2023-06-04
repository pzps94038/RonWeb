import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { ArticleLabelDetailComponent } from './article-label-detail.component';
import { ParamMap, ActivatedRoute } from '@angular/router';
import { of, Observable, throwError } from 'rxjs';
import { GetArticleLabelResponse } from 'src/app/shared/api/article-label/article-label.model';
import { BaseMessageResponse, ReturnCode } from 'src/app/shared/api/shared/shared.model';

describe('ArticleLabelDetailComponent', () => {
  let component: ArticleLabelDetailComponent;
  let fixture: ComponentFixture<ArticleLabelDetailComponent>;
  const fakePage = '1';
  const queryParamMap = of({
    get: (key: string) => fakePage,
  }) as Observable<ParamMap>;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        ArticleLabelDetailComponent,
        HttpClientTestingModule,
        RouterTestingModule.withRoutes([
          {
            path: 'setting/article-label',
            component: ArticleLabelDetailComponent,
          },
        ]),
      ],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            queryParamMap,
          } as ActivatedRoute,
        },
      ],
    });
    fixture = TestBed.createComponent(ArticleLabelDetailComponent);
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
        labels: [],
      },
    } as GetArticleLabelResponse;
    spyOn(component.articleLabelSrv, 'getArticleLabel').and.returnValue(of(fake));
    component.ngOnInit();
    tick();
    expect(component.labels()).toEqual(fake.data.labels);
    expect(component.total()).toBe(fake.data.total);
  }));

  it('測試API 回傳有錯誤', fakeAsync(() => {
    const fake = {
      returnCode: ReturnCode.Fail,
      returnMessage: 'msg',
    } as GetArticleLabelResponse;
    spyOn(component.articleLabelSrv, 'getArticleLabel').and.returnValue(of(fake));
    component.getArticleLabel();
    tick();
    expect(component.isError()).toBe(true);
  }));

  it('測試API 有異常', fakeAsync(() => {
    spyOn(component.articleLabelSrv, 'getArticleLabel').and.returnValue(
      throwError(() => new Error('API 有異常')),
    );
    component.getArticleLabel();
    tick();
    expect(component.isError()).toBe(true);
  }));

  it('測試分頁切換', () => {
    const spy = spyOn(component.router, 'navigate');
    component.paginationChange(1);
    expect(spy).toHaveBeenCalled();
  });

  it('測試刪除標籤', fakeAsync(() => {
    const fake = {
      returnCode: ReturnCode.Success,
      returnMessage: 'msg',
      data: {
        total: 0,
        labels: [],
      },
    } as GetArticleLabelResponse;
    const fakeMsg = {
      returnCode: ReturnCode.Success,
      returnMessage: 'msg',
    } as BaseMessageResponse;

    spyOn(component.swalSrv, 'confirm').and.returnValue(of({ isConfirmed: true }) as never);
    spyOn(component.swalSrv, 'alert').and.returnValue(of({ isConfirmed: true }) as never);
    const getSpy = spyOn(component.articleLabelSrv, 'getArticleLabel').and.returnValue(of(fake));
    const deleteSpy = spyOn(component.articleLabelSrv, 'deleteArticleLabel').and.returnValue(
      of(fakeMsg),
    );
    component.deleteArticleLabel(1);
    tick();
    expect(deleteSpy).toHaveBeenCalled();
    expect(getSpy).toHaveBeenCalled();
  }));

  it('測試標籤重整', () => {
    const fake = {
      returnCode: ReturnCode.Success,
      returnMessage: 'msg',
      data: {
        total: 0,
        labels: [],
      },
    } as GetArticleLabelResponse;
    const spy = spyOn(component.articleLabelSrv, 'getArticleLabel').and.returnValue(of(fake));
    component.refreshArticleLabel();
    expect(spy).toHaveBeenCalled();
  });
});

describe('測試分頁無法解析', () => {
  let component: ArticleLabelDetailComponent;
  let fixture: ComponentFixture<ArticleLabelDetailComponent>;
  const fakePage = 'NAN';
  const queryParamMap = of({
    get: (key: string) => fakePage,
  }) as Observable<ParamMap>;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ArticleLabelDetailComponent, HttpClientTestingModule, RouterTestingModule],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            queryParamMap,
          } as ActivatedRoute,
        },
      ],
    });
    fixture = TestBed.createComponent(ArticleLabelDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('測試分頁無法解析', fakeAsync(() => {
    const fake = {
      returnCode: ReturnCode.Success,
      returnMessage: 'msg',
      data: {
        total: 0,
        labels: [],
      },
    } as GetArticleLabelResponse;
    spyOn(component.articleLabelSrv, 'getArticleLabel').and.returnValue(of(fake));
    component.ngOnInit();
    tick();
    expect(component.page()).toBe(1);
  }));
});

describe('測試沒有分頁參數', () => {
  let component: ArticleLabelDetailComponent;
  let fixture: ComponentFixture<ArticleLabelDetailComponent>;
  const queryParamMap = of({
    get: (key: string) => null,
  }) as Observable<ParamMap>;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ArticleLabelDetailComponent, HttpClientTestingModule, RouterTestingModule],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            queryParamMap,
          } as ActivatedRoute,
        },
      ],
    });
    fixture = TestBed.createComponent(ArticleLabelDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('測試沒有分頁參數', fakeAsync(() => {
    const fake = {
      returnCode: ReturnCode.Success,
      returnMessage: 'msg',
      data: {
        total: 0,
        labels: [],
      },
    } as GetArticleLabelResponse;
    spyOn(component.articleLabelSrv, 'getArticleLabel').and.returnValue(of(fake));
    component.ngOnInit();
    tick();
    expect(component.page()).toBe(1);
  }));
});
