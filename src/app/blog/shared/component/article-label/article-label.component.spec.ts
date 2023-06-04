import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { ArticleLabelComponent } from './article-label.component';
import { of, throwError } from 'rxjs';
import { ReturnCode } from 'src/app/shared/api/shared/shared.model';

describe('ArticleLabelComponent', () => {
  let component: ArticleLabelComponent;
  let fixture: ComponentFixture<ArticleLabelComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ArticleLabelComponent, HttpClientTestingModule],
    });
    fixture = TestBed.createComponent(ArticleLabelComponent);
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
        labels: [
          {
            labelId: 1,
            labelName: '標籤',
            createDate: '2023-05-08T13:22:00.124Z',
          },
        ],
      },
    };
    spyOn(component.articleLabelSrv, 'getArticleLabel').and.returnValue(of(fake) as never);
    component.ngOnInit();
    tick();
    expect(component.labels()).toEqual(fake.data.labels);
  }));

  it('測試API 後端回傳錯誤', fakeAsync(() => {
    const fake = {
      returnCode: ReturnCode.Fail,
      returnMessage: 'msg',
    };
    spyOn(component.articleLabelSrv, 'getArticleLabel').and.returnValue(of(fake) as never);
    component.ngOnInit();
    tick();
    expect(component.isError()).toBe(true);
  }));

  it('測試API異常', fakeAsync(() => {
    spyOn(component.articleLabelSrv, 'getArticleLabel').and.returnValue(
      throwError(() => new Error('API異常')) as never,
    );
    component.ngOnInit();
    tick();
    expect(component.isError()).toBe(true);
  }));
});
