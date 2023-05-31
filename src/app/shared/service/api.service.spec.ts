import { flush, TestBed } from '@angular/core/testing';
import { ReturnCode } from '../api/shared/shared.model';
import { ApiService } from './api.service';
import { of } from 'rxjs';

describe('ApiService', () => {
  let service: ApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('API 成功', () => {
    const ifSuccess = service.ifSuccess(
      {
        returnCode: ReturnCode.Success,
        returnMessage: '成功',
      },
      false,
    );
    expect(ifSuccess).toBe(true);
  });

  it('API 成功 ShowError', () => {
    spyOn(service.swalSrv, 'alert' as never).and.returnValue(of(true) as never);
    const ifSuccess = service.ifSuccess({
      returnCode: ReturnCode.Success,
      returnMessage: '成功',
    });
    expect(ifSuccess).toBe(true);
  });

  it('API 失敗', () => {
    const ifSuccess = service.ifSuccess(
      {
        returnCode: ReturnCode.Fail,
        returnMessage: '失敗',
      },
      false,
    );
    expect(ifSuccess).toBe(false);
  });

  it('API 失敗 ShowError', () => {
    spyOn(service.swalSrv, 'alert' as never).and.returnValue(of(true) as never);
    const ifSuccess = service.ifSuccess({
      returnCode: ReturnCode.Fail,
      returnMessage: '失敗',
    });
    expect(ifSuccess).toBe(false);
  });
});
