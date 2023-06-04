import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { ArticleLabelCreateComponent } from './article-label-create.component';
import { of } from 'rxjs';
import { ReturnCode, BaseMessageResponse } from 'src/app/shared/api/shared/shared.model';

describe('ArticleLabelCreateComponent', () => {
  let component: ArticleLabelCreateComponent;
  let fixture: ComponentFixture<ArticleLabelCreateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ArticleLabelCreateComponent, HttpClientTestingModule],
    });
    fixture = TestBed.createComponent(ArticleLabelCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('測試創建標籤', fakeAsync(() => {
    const fake = {
      returnCode: ReturnCode.Success,
      returnMessage: 'msg',
    } as BaseMessageResponse;
    spyOn(component.articleLabelSrv, 'createArticleLabel').and.returnValue(of(fake));
    spyOn(component.swalSrv, 'alert').and.returnValue(of({ isConfirmed: true }) as never);
    const spy = spyOn(component.router, 'navigate');
    component.form.controls['labelName'].setValue('labelName');
    component.submit();
    tick();
    expect(spy).toHaveBeenCalled();
  }));

  it('測試創建標籤驗證沒過', fakeAsync(() => {
    component.form.controls['labelName'].setValue('');
    component.submit();
    tick();
    expect(component.form.valid).toBe(false);
  }));
});
