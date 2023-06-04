import { TestBed } from '@angular/core/testing';
import { EllipsisPipe } from '../pipe/ellipsis.pipe';
import Swal, { SweetAlertResult } from 'sweetalert2';
import { SwalService } from './swal.service';
import { Observable } from 'rxjs';

describe('SwalService', () => {
  let service: SwalService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EllipsisPipe],
    });
    service = TestBed.inject(SwalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('Test alert', () => {
    const spy = spyOn(Swal, 'fire').and.returnValue(new Promise<any>(resolve => resolve(null)));
    service.alert({
      title: 'test',
      text: 'text',
    });
    expect(spy).toHaveBeenCalled();
  });

  it('Test confirm', () => {
    const spy = spyOn(Swal, 'fire').and.returnValue(new Promise<any>(resolve => resolve(null)));
    service.confirm({
      title: 'test',
      text: 'text',
    });
    expect(spy).toHaveBeenCalled();
  });
});
