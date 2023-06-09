import { TestBed, fakeAsync, tick } from '@angular/core/testing';

import { ArticleCategoryService } from './article-category.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { GetArticleCategoryResponse } from './article-category.model';
import { Observable, of } from 'rxjs';
import { ReturnCode } from '../shared/shared.model';
import { HttpClient } from '@angular/common/http';

describe('ArticleCategoryService', () => {
  let service: ArticleCategoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ArticleCategoryService],
    });
    service = TestBed.inject(ArticleCategoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('測試分類緩存', fakeAsync(() => {
    const page = 1;
    const fake = of({
      returnCode: ReturnCode.Success,
      returnMessage: 'msg',
    }) as Observable<GetArticleCategoryResponse>;
    spyOn(service.articleCategoryMap, 'has').and.returnValue(true);
    const spy = spyOn(service.articleCategoryMap, 'get').and.returnValue(fake);
    service.getArticleCategory(page);
    tick();
    expect(spy).toHaveBeenCalled();
  }));

  it('測試分類無緩存', fakeAsync(() => {
    const page = 1;
    const fake = of({
      returnCode: ReturnCode.Success,
      returnMessage: 'msg',
    }) as Observable<GetArticleCategoryResponse>;
    const spy = spyOn((service as any).http as HttpClient, 'get').and.returnValue(fake);
    service.getArticleCategory(page, false);
    tick();
    expect(spy).toHaveBeenCalled();
  }));
});
