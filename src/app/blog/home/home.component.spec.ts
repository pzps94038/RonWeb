import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { HomeComponent } from './home.component';
import { of } from 'rxjs';
import { GetArticleResponse } from 'src/app/shared/api/article/article.model';
import { ReturnCode } from 'src/app/shared/api/shared/shared.model';
import { ArticleComponent } from '../article/article.component';
import { CategoryComponent } from '../category/category.component';
import { LabelComponent } from '../label/label.component';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HomeComponent,
        HttpClientTestingModule,
        RouterTestingModule.withRoutes([
          {
            path: 'blog/home',
            component: HomeComponent,
          },
          {
            path: 'blog/article/:id',
            component: ArticleComponent,
          },
          {
            path: 'blog/category/:id',
            component: CategoryComponent,
          },
          {
            path: 'blog/label/:id',
            component: LabelComponent,
          },
        ]),
      ],
    });
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('測試初始化', fakeAsync(() => {
    const fake = {
      returnCode: '00',
      returnMessage: 'success',
      data: {
        total: 1,
        articles: [
          {
            articleId: 1,
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
      },
    } as GetArticleResponse;
    spyOn(component.articleSrv, 'getArticle' as never).and.returnValue(of(fake) as never);
    component.ngOnInit();
    tick();
    expect(component.total()).toBe(fake.data.total);
    expect(component.articles()).toBe(fake.data.articles);
  }));

  it('測試取得文章', fakeAsync(() => {
    const fake = {
      returnCode: '00',
      returnMessage: 'success',
      data: {
        total: 10,
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
      },
    } as GetArticleResponse;
    spyOn(component.articleSrv, 'getArticle' as never).and.returnValue(of(fake) as never);
    component.getArticle();
    tick();
    expect(component.total()).toBe(fake.data.total);
    expect(component.articles()).toBe(fake.data.articles);
  }));

  it('測試取得文章有錯誤', fakeAsync(() => {
    const mask = {
      returnCode: ReturnCode.Fail,
      returnMessage: 'error',
    } as unknown as GetArticleResponse;
    spyOn(component.articleSrv, 'getArticle' as never).and.returnValue(of(mask) as never);
    component.getArticle();
    tick();
    expect(component.isError()).toBe(true);
  }));

  it('測試轉址到文章', () => {
    spyOn(component.router, 'navigateByUrl');
    const id = 1;
    component.showMore(id);
    expect(component.router.navigateByUrl).toHaveBeenCalledWith(`/blog/article/${id}`);
  });

  it('測試轉址到類別', () => {
    spyOn(component.router, 'navigateByUrl');
    const categoryId = 1;
    const categoryName = 'categoryName';
    component.navigateCategory({ categoryId, categoryName });
    expect(component.router.navigateByUrl).toHaveBeenCalledWith(`/blog/category/${categoryId}`);
  });

  it('測試轉址到標籤', () => {
    spyOn(component.router, 'navigateByUrl');
    const labelId = 1;
    const labelName = 'labelName';
    const createDate = '2023-05-08T13:22:00.124Z';
    component.navigateLabel({ labelId, labelName, createDate });
    expect(component.router.navigateByUrl).toHaveBeenCalledWith(`/blog/label/${labelId}`);
  });

  it('測試轉址', () => {
    const page = 2;
    spyOn(component.router, 'navigate');
    component.paginationChange(page);
    expect(component.router.navigate).toHaveBeenCalledWith(['/blog/home'], {
      queryParams: {
        page,
      },
    });
  });
});
