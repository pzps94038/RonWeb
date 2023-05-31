import { ReturnCode } from 'src/app/shared/api/shared/shared.model';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { ContactUsService } from './contact-us.service';
import { BaseMessageResponse } from '../shared/shared.model';
import { of } from 'rxjs';
import { HttpClient } from '@angular/common/http';

describe('ContactUsService', () => {
  let service: ContactUsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(ContactUsService);
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
    service
      .sendContactUsMail({
        clientToken: '',
        subject: '',
        email: '',
        body: '',
      })
      .subscribe(res => expect(res.returnCode).toBe(returnCode));
  });
});
