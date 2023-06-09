import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import {
  GetArticleCategoryByIdResponse,
  GetArticleCategoryResponse,
} from './admin-article-category.model';
import { Observable, of } from 'rxjs';
import { ReturnCode } from '../shared/shared.model';
import { HttpClient } from '@angular/common/http';
import { AdminArticleCategoryService } from './admin-article-category.service';

describe('AdminArticleCategoryService', () => {
  let service: AdminArticleCategoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AdminArticleCategoryService],
    });
    service = TestBed.inject(AdminArticleCategoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('測試分類更新', fakeAsync(() => {
    const spy = spyOn((service as any).http as HttpClient, 'patch');
    service.updateArticleCategory({ categoryId: 1, categoryName: '測試', userId: 1 });
    tick();
    expect(spy).toHaveBeenCalled();
  }));

  it('測試分類創建', fakeAsync(() => {
    const spy = spyOn((service as any).http as HttpClient, 'post');
    service.createArticleCategory({ categoryName: '測試', userId: 1 });
    tick();
    expect(spy).toHaveBeenCalled();
  }));

  it('測試分類刪除', fakeAsync(() => {
    const spy = spyOn((service as any).http as HttpClient, 'delete');
    service.deleteArticleCategory(1);
    tick();
    expect(spy).toHaveBeenCalled();
  }));
});
