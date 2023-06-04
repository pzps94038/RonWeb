import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed, fakeAsync, tick } from '@angular/core/testing';

import { ArticleService } from './article.service';
import { Observable, of } from 'rxjs';
import { ReturnCode } from '../shared/shared.model';
import { GetArticleByIdResponse, GetArticleResponse } from './article.model';
import { HttpClient } from '@angular/common/http';

describe('ArticleService', () => {
  let service: ArticleService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(ArticleService);
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

  it('測試文章ID緩存', fakeAsync(() => {
    const id = 1;
    const fake = of({
      returnCode: ReturnCode.Success,
      returnMessage: 'msg',
    }) as Observable<GetArticleByIdResponse>;
    spyOn(service.articleByIdMap, 'has').and.returnValue(true);
    const spy = spyOn(service.articleByIdMap, 'get').and.returnValue(fake);
    service.getArticleById(id);
    tick();
    expect(spy).toHaveBeenCalled();
  }));

  it('測試文章ID無緩存', fakeAsync(() => {
    const id = 1;
    const fake = of({
      returnCode: ReturnCode.Success,
      returnMessage: 'msg',
    }) as Observable<GetArticleByIdResponse>;
    const spy = spyOn((service as any).http as HttpClient, 'get').and.returnValue(fake);
    service.getArticleById(id, false);
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

  it('測試文章更新瀏覽次數', fakeAsync(() => {
    const spy = spyOn((service as any).http as HttpClient, 'patch');
    service.updateArticleViews(1);
    tick();
    expect(spy).toHaveBeenCalled();
  }));
});
