import { TestBed } from '@angular/core/testing';

import { AdminCodeService } from './admin-code.service';

describe('AdminCodeService', () => {
  let service: AdminCodeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdminCodeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
