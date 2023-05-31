import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { UploadService } from './upload.service';
import { BaseMessageResponse, ReturnCode } from '../shared/shared.model';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';

describe('UploadService', () => {
  let service: UploadService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(UploadService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
    const returnCode = ReturnCode.Success;
    spyOn((service as any).http as HttpClient, 'post').and.returnValue(
      of({
        returnCode,
        returnMessage: '',
      } as BaseMessageResponse),
    );
    service.upload(new FormData()).subscribe(res => expect(res.returnCode).toBe(returnCode));
  });
});
