import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { ArticleLabelService } from './article-label.service';
import { Observable, of } from 'rxjs';
import { ReturnCode } from '../shared/shared.model';
import { GetArticleLabelByIdResponse, GetArticleLabelResponse } from './article-label.model';
import { HttpClient } from '@angular/common/http';

describe('ArticleLabelService', () => {
  let service: ArticleLabelService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule],
    });
    service = TestBed.inject(ArticleLabelService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('測試標籤緩存', fakeAsync(() => {
    const fake = of({
      returnCode: ReturnCode.Success,
      returnMessage: 'msg',
    }) as Observable<GetArticleLabelResponse>;
    spyOn(service.articleLabelMap, 'has').and.returnValue(true);
    const spy = spyOn(service.articleLabelMap, 'get').and.returnValue(fake);
    service.getArticleLabel();
    tick();
    expect(spy).toHaveBeenCalled();
  }));

  it('測試標籤無緩存', fakeAsync(() => {
    const page = 1;
    const fake = of({
      returnCode: ReturnCode.Success,
      returnMessage: 'msg',
    }) as Observable<GetArticleLabelResponse>;
    const spy = spyOn((service as any).http as HttpClient, 'get').and.returnValue(fake);
    service.getArticleLabel(page, false);
    tick();
    expect(spy).toHaveBeenCalled();
  }));

  it('測試標籤ID緩存', fakeAsync(() => {
    const id = 1;
    const fake = of({
      returnCode: ReturnCode.Success,
      returnMessage: 'msg',
    }) as Observable<GetArticleLabelByIdResponse>;
    spyOn(service.articleLabelByIdMap, 'has').and.returnValue(true);
    const spy = spyOn(service.articleLabelByIdMap, 'get').and.returnValue(fake);
    service.getArticleLabelById(id);
    tick();
    expect(spy).toHaveBeenCalled();
  }));

  it('測試分類ID無緩存', fakeAsync(() => {
    const id = 1;
    const fake = of({
      returnCode: ReturnCode.Success,
      returnMessage: 'msg',
    }) as Observable<GetArticleLabelByIdResponse>;
    const spy = spyOn((service as any).http as HttpClient, 'get').and.returnValue(fake);
    service.getArticleLabelById(id, false);
    tick();
    expect(spy).toHaveBeenCalled();
  }));

  it('測試分類更新', fakeAsync(() => {
    const spy = spyOn((service as any).http as HttpClient, 'patch');
    service.updateArticleLabel({ labelId: 1, labelName: '測試', userId: 1 });
    tick();
    expect(spy).toHaveBeenCalled();
  }));

  it('測試分類創建', fakeAsync(() => {
    const spy = spyOn((service as any).http as HttpClient, 'post');
    service.createArticleLabel({ labelName: '測試', userId: 1 });
    tick();
    expect(spy).toHaveBeenCalled();
  }));

  it('測試分類刪除', fakeAsync(() => {
    const spy = spyOn((service as any).http as HttpClient, 'delete');
    service.deleteArticleLabel(1);
    tick();
    expect(spy).toHaveBeenCalled();
  }));
});
