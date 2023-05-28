import { TestBed } from '@angular/core/testing';
import { EllipsisPipe } from '../pipe/ellipsis.pipe';

import { SeoService } from './seo.service';

describe('SeoService', () => {
  let service: SeoService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EllipsisPipe],
    });
    service = TestBed.inject(SeoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
