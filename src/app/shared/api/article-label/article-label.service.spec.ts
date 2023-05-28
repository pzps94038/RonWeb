import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { ArticleLabelService } from './article-label.service';

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
});
