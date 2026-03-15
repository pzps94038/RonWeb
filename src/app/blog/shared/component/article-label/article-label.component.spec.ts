import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { ArticleLabelComponent } from './article-label.component';
import { of, throwError } from 'rxjs';

describe('ArticleLabelComponent - 文章標籤側邊欄元件', () => {
  let component: ArticleLabelComponent;
  let fixture: ComponentFixture<ArticleLabelComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ArticleLabelComponent, HttpClientTestingModule, RouterTestingModule],
    });
    fixture = TestBed.createComponent(ArticleLabelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('應建立元件', () => {
    expect(component).toBeTruthy();
  });

  it('初始化成功載入標籤', fakeAsync(() => {
    const fakeLabels = [
      { labelId: 1, labelName: 'Angular', createDate: '2024-01-01' },
      { labelId: 2, labelName: 'React', createDate: '2024-01-01' },
    ];
    spyOn(component.contentSrv, 'getLabels').and.returnValue(of(fakeLabels));
    component.getArticleLabel();
    tick();
    expect(component.labels()).toEqual(fakeLabels);
    expect(component.isLoading()).toBe(false);
  }));

  it('API 異常時設定 isError', fakeAsync(() => {
    spyOn(component.contentSrv, 'getLabels').and.returnValue(
      throwError(() => new Error('API異常')),
    );
    component.getArticleLabel();
    tick();
    expect(component.isError()).toBe(true);
    expect(component.isLoading()).toBe(false);
  }));
});
