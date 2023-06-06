import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { ArticleCategoryCreateComponent } from './article-category-create.component';
import { BaseMessageResponse, ReturnCode } from 'src/app/shared/api/shared/shared.model';
import { of } from 'rxjs';

describe('ArticleCategoryCreateComponent', () => {
  let component: ArticleCategoryCreateComponent;
  let fixture: ComponentFixture<ArticleCategoryCreateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ArticleCategoryCreateComponent, HttpClientTestingModule, RouterTestingModule],
    });
    fixture = TestBed.createComponent(ArticleCategoryCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('測試創建分類', fakeAsync(() => {
    const fake = {
      returnCode: ReturnCode.Success,
      returnMessage: 'msg',
    } as BaseMessageResponse;
    spyOn(component.articleCategorySrv, 'createArticleCategory').and.returnValue(of(fake));
    spyOn(component.swalSrv, 'alert').and.returnValue(of({ isConfirmed: true }) as never);
    const spy = spyOn(component.router, 'navigate');
    component.form.controls['categoryName'].setValue('categoryName');
    component.submit();
    tick();
    expect(spy).toHaveBeenCalled();
  }));

  it('測試創建分類驗證沒過', fakeAsync(() => {
    component.form.controls['categoryName'].setValue('');
    component.submit();
    tick();
    expect(component.form.valid).toBe(false);
  }));
});
