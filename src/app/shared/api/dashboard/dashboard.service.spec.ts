import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { DashboardService } from './dashboard.service';
import { GetDashboardResponse } from './dashboard.model';
import { ReturnCode } from '../shared/shared.model';

describe('DashboardService', () => {
  let service: DashboardService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(DashboardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('測試取得儀表板資料', fakeAsync(() => {
    const fake = of({
      returnCode: ReturnCode.Success,
      returnMessage: 'msg',
    }) as Observable<GetDashboardResponse>;
    const spy = spyOn((service as any).http as HttpClient, 'get').and.returnValue(fake);
    service.getDashboard();
    tick();
    expect(spy).toHaveBeenCalled();
  }));
});
