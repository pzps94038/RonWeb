import { TestBed } from '@angular/core/testing';

import { AdminCodeTypeService } from './admin-code-type.service';

describe('AdminCodeTypeService', () => {
  let service: AdminCodeTypeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdminCodeTypeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
