import { TestBed } from '@angular/core/testing';

import { UploadAdapterService } from './upload-adapter.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('UploadAdapterService', () => {
  let service: UploadAdapterService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(UploadAdapterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
