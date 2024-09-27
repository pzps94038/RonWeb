import { TestBed } from '@angular/core/testing';

import { AdminCodeService } from './admin-code.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('AdminCodeService', () => {
  let service: AdminCodeService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AdminCodeService],
    });
    service = TestBed.inject(AdminCodeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
