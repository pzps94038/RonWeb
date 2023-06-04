import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { ArticleDetailComponent } from './article-detail.component';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { of, Observable, throwError } from 'rxjs';
import { ReturnCode } from 'src/app/shared/api/shared/shared.model';

describe('ArticleDetailComponent', () => {
  let component: ArticleDetailComponent;
  let fixture: ComponentFixture<ArticleDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        ArticleDetailComponent,
        HttpClientTestingModule,
        RouterTestingModule.withRoutes([
          {
            path: '**',
            component: ArticleDetailComponent,
          },
        ]),
      ],
    });
    fixture = TestBed.createComponent(ArticleDetailComponent);
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
        articles: [],
      },
    };
    spyOn(component.articleSrv, 'getArticle').and.returnValue(of(fake) as never);
    component.ngOnInit();
    tick();
    expect(component.articles()).toEqual(fake.data.articles);
  }));

  it('測試初始化 API錯誤', fakeAsync(() => {
    const fake = {
      returnCode: ReturnCode.Fail,
      returnMessage: 'msg',
      data: {},
    };
    spyOn(component.articleSrv, 'getArticle').and.returnValue(of(fake) as never);
    component.ngOnInit();
    tick();
    expect(component.isError()).toBe(true);
  }));

  it('測試初始化 異常錯誤', fakeAsync(() => {
    spyOn(component.articleSrv, 'getArticle').and.returnValue(
      throwError(() => new Error('異常錯誤')) as never,
    );
    component.ngOnInit();
    tick();
    expect(component.isError()).toBe(true);
  }));

  it('測試分頁切換', () => {
    const spy = spyOn(component.router, 'navigate');
    component.paginationChange();
    expect(spy).toHaveBeenCalled();
  });

  it('測試搜尋', () => {
    const spy = spyOn(component.router, 'navigate');
    component.keyword = '關鍵字';
    component.search();
    expect(spy).toHaveBeenCalled();
  });

  it('測試刪除', () => {
    const fake = {
      returnCode: ReturnCode.Success,
      returnMessage: 'msg',
    };
    spyOn(component.swalSrv, 'confirm').and.returnValue(of({ isConfirmed: true }) as never);
    spyOn(component.swalSrv, 'alert').and.returnValue(of({ isConfirmed: true }) as never);
    spyOn(component.articleSrv, 'deleteArticle').and.returnValue(of(fake) as never);
    const spy = spyOn(component, 'paginationChange');
    component.deleteArticle(1);
    expect(spy).toHaveBeenCalled();
  });
});

describe('測試初始化可選頁面網址', () => {
  let component: ArticleDetailComponent;
  let fixture: ComponentFixture<ArticleDetailComponent>;
  const fakePage = '13';
  const queryParamMap = of({
    get: (key: string) => fakePage,
  }) as Observable<ParamMap>;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ArticleDetailComponent, HttpClientTestingModule, RouterTestingModule],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            queryParamMap,
          } as ActivatedRoute,
        },
      ],
    });
    fixture = TestBed.createComponent(ArticleDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('測試初始化', fakeAsync(() => {
    component.ngOnInit();
    tick();
    expect(component.page()).toBe(parseInt(fakePage));
  }));
});

describe('測試初始化Nan頁面網址', () => {
  let component: ArticleDetailComponent;
  let fixture: ComponentFixture<ArticleDetailComponent>;
  const fakePage = 'Nan';
  const queryParamMap = of({
    get: (key: string) => fakePage,
  }) as Observable<ParamMap>;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ArticleDetailComponent, HttpClientTestingModule, RouterTestingModule],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            queryParamMap,
          } as ActivatedRoute,
        },
      ],
    });
    fixture = TestBed.createComponent(ArticleDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('測試初始化', fakeAsync(() => {
    component.ngOnInit();
    tick();
    expect(component.page()).toBe(1);
  }));
});
