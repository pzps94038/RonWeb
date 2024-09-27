import { TestBed } from '@angular/core/testing';

import { AdminCodeTypeService } from './admin-code-type.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('AdminCodeTypeService', () => {
  let service: AdminCodeTypeService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AdminCodeTypeService],
    });
    service = TestBed.inject(AdminCodeTypeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
