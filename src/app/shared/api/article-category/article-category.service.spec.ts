import { TestBed } from '@angular/core/testing';

import { ArticleCategoryService } from './article-category.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

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
});
