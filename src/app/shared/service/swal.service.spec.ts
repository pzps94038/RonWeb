import { TestBed } from '@angular/core/testing';
import { EllipsisPipe } from '../pipe/ellipsis.pipe';

import { SwalService } from './swal.service';

describe('SwalService', () => {
  let service: SwalService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EllipsisPipe],
    });
    service = TestBed.inject(SwalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
