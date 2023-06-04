import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { ArticleCategoryComponent } from './article-category.component';
import { of, throwError } from 'rxjs';
import { ReturnCode } from 'src/app/shared/api/shared/shared.model';

describe('ArticleCategoryComponent', () => {
  let component: ArticleCategoryComponent;
  let fixture: ComponentFixture<ArticleCategoryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ArticleCategoryComponent, HttpClientTestingModule],
    });
    fixture = TestBed.createComponent(ArticleCategoryComponent);
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
    };
    spyOn(component.articleCategorySrv, 'getArticleCategory').and.returnValue(of(fake) as never);
    component.ngOnInit();
    tick();
    expect(component.categorys()).toEqual(fake.data.categorys);
  }));

  it('測試API 後端回傳錯誤', fakeAsync(() => {
    const fake = {
      returnCode: ReturnCode.Fail,
      returnMessage: 'msg',
    };
    spyOn(component.articleCategorySrv, 'getArticleCategory').and.returnValue(of(fake) as never);
    component.ngOnInit();
    tick();
    expect(component.isError()).toBe(true);
  }));

  it('測試API異常', fakeAsync(() => {
    spyOn(component.articleCategorySrv, 'getArticleCategory').and.returnValue(
      throwError(() => new Error('API異常')) as never,
    );
    component.ngOnInit();
    tick();
    expect(component.isError()).toBe(true);
  }));
});
