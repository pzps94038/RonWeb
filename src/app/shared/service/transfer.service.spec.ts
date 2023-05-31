import { TestBed } from '@angular/core/testing';

import { TransferService } from './transfer.service';
import { of } from 'rxjs';
import { makeStateKey } from '@angular/core';

describe('TransferService', () => {
  let service: TransferService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TransferService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('Test Server Cache', () => {
    spyOnProperty(service.deviceSrv, 'isServer', 'get').and.returnValue(true);
    const key = 'Test';
    const val = 'TestValue';
    service
      .transfer(key, () => of(val), false)
      .subscribe(() => {
        const stateKey = makeStateKey<string>(key);
        expect(service.transferState.get(stateKey, undefined)).toBe(val);
      });
    service
      .transfer(key, () => of(val))
      .subscribe(cacheValue => {
        expect(cacheValue).toBe(val);
      });
  });
});
