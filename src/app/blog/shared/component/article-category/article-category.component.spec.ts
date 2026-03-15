import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { ArticleCategoryComponent } from './article-category.component';
import { of, throwError } from 'rxjs';

describe('ArticleCategoryComponent - 文章分類側邊欄元件', () => {
  let component: ArticleCategoryComponent;
  let fixture: ComponentFixture<ArticleCategoryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ArticleCategoryComponent, HttpClientTestingModule, RouterTestingModule],
    });
    fixture = TestBed.createComponent(ArticleCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('應建立元件', () => {
    expect(component).toBeTruthy();
  });

  it('初始化成功載入分類', fakeAsync(() => {
    const fakeCategories = [
      { categoryId: 1, categoryName: '前端', createDate: '2024-01-01' },
      { categoryId: 2, categoryName: '後端', createDate: '2024-01-01' },
    ];
    spyOn(component.contentSrv, 'getCategories').and.returnValue(of(fakeCategories));
    component.getArticleCategory();
    tick();
    expect(component.categorys()).toEqual(fakeCategories);
    expect(component.isLoading()).toBe(false);
  }));

  it('API 異常時設定 isError', fakeAsync(() => {
    spyOn(component.contentSrv, 'getCategories').and.returnValue(
      throwError(() => new Error('API異常')),
    );
    component.getArticleCategory();
    tick();
    expect(component.isError()).toBe(true);
    expect(component.isLoading()).toBe(false);
  }));
});
