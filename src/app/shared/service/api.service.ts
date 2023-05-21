import { Injectable, inject } from '@angular/core';
import { take } from 'rxjs';
import { BaseMessageResponse, ReturnCode } from '../api/shared/shared.model';
import { SwalService } from './swal.service';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  swalSrv = inject(SwalService);

  /**
   * 是否回傳成功
   * @param res
   * @returns
   */
  ifSuccess<T extends BaseMessageResponse>(res: T, showError = true) {
    if (showError) {
      if (res.returnCode === ReturnCode.Success) {
        return true;
      } else {
        this.swalSrv
          .alert({
            text: res.returnMessage,
          })
          .pipe(take(1))
          .subscribe();
        return false;
      }
    } else {
      return res.returnCode === ReturnCode.Success;
    }
  }
}
