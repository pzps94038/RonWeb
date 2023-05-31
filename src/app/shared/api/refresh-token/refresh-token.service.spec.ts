import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { TestBed } from '@angular/core/testing';

import { RefreshTokenService } from './refresh-token.service';
import { BaseMessageResponse, ReturnCode } from '../shared/shared.model';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';

describe('RefreshTokenService', () => {
  let service: RefreshTokenService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientTestingModule],
    });
    service = TestBed.inject(RefreshTokenService);
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
      .refreshToken({
        refreshToken: '',
        userId: 1,
      })
      .subscribe(res => expect(res.returnCode).toBe(returnCode));
  });
});
