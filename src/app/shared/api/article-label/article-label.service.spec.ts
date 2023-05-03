import { TestBed } from '@angular/core/testing';

import { ArticleLabelService } from './article-label.service';

describe('ArticleLabelService', () => {
  let service: ArticleLabelService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ArticleLabelService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
