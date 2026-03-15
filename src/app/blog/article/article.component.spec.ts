import { EllipsisPipe } from './../../shared/pipe/ellipsis.pipe';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { ArticleComponent } from './article.component';
import { of, throwError, Observable } from 'rxjs';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Article } from 'src/app/shared/api/article/article.model';

describe('ArticleComponent - 文章詳情元件', () => {
  let component: ArticleComponent;
  let fixture: ComponentFixture<ArticleComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ArticleComponent, HttpClientTestingModule, RouterTestingModule],
      providers: [EllipsisPipe],
    });
    fixture = TestBed.createComponent(ArticleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('應建立元件', () => {
    expect(component).toBeTruthy();
  });

  it('取得文章成功', fakeAsync(() => {
    const fakeArticle: Article = {
      slug: '2024-01-01-test-article',
      articleTitle: '測試文章',
      categoryId: 1,
      categoryName: '前端',
      previewContent: '預覽',
      flag: 'Y',
      labels: [],
      content: '<h2>標題</h2><p>內容</p>',
      references: [],
      viewCount: 10,
      createDate: '2024-01-01T00:00:00.000Z',
    };
    spyOn(component.contentSrv, 'getArticleBySlug').and.returnValue(of(fakeArticle));
    component.getArticleBySlug('2024-01-01-test-article');
    tick();
    expect(component.article()?.articleTitle).toBe('測試文章');
    expect(component.isLoading()).toBe(false);
    expect(component.isError()).toBe(false);
  }));

  it('取得文章失敗', fakeAsync(() => {
    spyOn(component.contentSrv, 'getArticleBySlug').and.returnValue(
      throwError(() => new Error('404')),
    );
    try {
      component.getArticleBySlug('non-existent-slug');
      tick();
    } catch (e) {
      // catchError 內的 throw err 會拋出
    }
    expect(component.isError()).toBe(true);
    expect(component.isLoading()).toBe(false);
  }));

  it('scrollToHeading 呼叫 scrollIntoView', () => {
    const el = document.createElement('div');
    el.id = 'heading-0';
    document.body.appendChild(el);
    const spy = spyOn(el, 'scrollIntoView');
    component.scrollToHeading('heading-0');
    expect(spy).toHaveBeenCalledWith({ behavior: 'smooth', block: 'start' });
    document.body.removeChild(el);
  });
});

describe('ArticleComponent - 帶路由參數初始化', () => {
  let component: ArticleComponent;
  let fixture: ComponentFixture<ArticleComponent>;
  const paramMap = of({
    get: (key: string) => '2024-01-01-test-article',
    has: (key: string) => true,
    getAll: (key: string) => ['2024-01-01-test-article'],
    keys: ['slug'],
  }) as Observable<ParamMap>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ArticleComponent, HttpClientTestingModule, RouterTestingModule],
      providers: [
        EllipsisPipe,
        {
          provide: ActivatedRoute,
          useValue: { paramMap } as Partial<ActivatedRoute>,
        },
      ],
    });
    fixture = TestBed.createComponent(ArticleComponent);
    component = fixture.componentInstance;
  });

  it('從路由參數取得文章 slug 並載入文章', fakeAsync(() => {
    const fakeArticle: Article = {
      slug: '2024-01-01-test-article',
      articleTitle: '文章42',
      categoryId: 1,
      categoryName: '前端',
      previewContent: '預覽',
      flag: 'Y',
      labels: [],
      content: '<p>42</p>',
      references: [],
      viewCount: 0,
      createDate: '2024-01-01',
    };
    spyOn(component.contentSrv, 'getArticleBySlug').and.returnValue(of(fakeArticle));
    fixture.detectChanges();
    tick();
    expect(component.articleSlug()).toBe('2024-01-01-test-article');
    expect(component.contentSrv.getArticleBySlug).toHaveBeenCalledWith('2024-01-01-test-article');
  }));
});
