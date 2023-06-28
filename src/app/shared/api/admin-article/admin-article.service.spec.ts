import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed, fakeAsync, tick } from '@angular/core/testing';

import { AdminArticleService } from './admin-article.service';
import { Observable, of } from 'rxjs';
import { ReturnCode } from '../shared/shared.model';
import { GetArticleResponse } from './admin-article.model';
import { HttpClient } from '@angular/common/http';

describe('AdminArticleService', () => {
  let service: AdminArticleService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(AdminArticleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('測試文章', fakeAsync(() => {
    const fake = of({
      returnCode: ReturnCode.Success,
      returnMessage: 'msg',
    }) as Observable<GetArticleResponse>;
    const spy = spyOn((service as any).http as HttpClient, 'get').and.returnValue(fake);
    service.getArticle();
    tick();
    expect(spy).toHaveBeenCalled();
  }));

  it('測試文章帶參數', fakeAsync(() => {
    const page = 1;
    const keyword = 'keyword';
    const fake = of({
      returnCode: ReturnCode.Success,
      returnMessage: 'msg',
    }) as Observable<GetArticleResponse>;
    const spy = spyOn((service as any).http as HttpClient, 'get').and.returnValue(fake);
    service.getArticle(page, keyword);
    tick();
    expect(spy).toHaveBeenCalled();
  }));

  it('測試文章更新', fakeAsync(() => {
    const spy = spyOn((service as any).http as HttpClient, 'patch');
    service.updateArticle({
      categoryId: 1,
      userId: 1,
      articleId: 1,
      articleTitle: '',
      content: '',
      previewContent: '',
      flag: 'Y',
      prevFiles: [],
      contentFiles: [],
      labels: [],
    });
    tick();
    expect(spy).toHaveBeenCalled();
  }));

  it('測試文章創建', fakeAsync(() => {
    const spy = spyOn((service as any).http as HttpClient, 'post');
    service.createArticle({
      categoryId: 1,
      userId: 1,
      articleTitle: '',
      content: '',
      previewContent: '',
      flag: 'Y',
      prevFiles: [],
      contentFiles: [],
      labels: [],
    });
    tick();
    expect(spy).toHaveBeenCalled();
  }));

  it('測試文章刪除', fakeAsync(() => {
    const spy = spyOn((service as any).http as HttpClient, 'delete');
    service.deleteArticle(1);
    tick();
    expect(spy).toHaveBeenCalled();
  }));
});
