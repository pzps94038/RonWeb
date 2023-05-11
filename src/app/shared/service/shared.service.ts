import { Injectable } from '@angular/core';
import { BaseMessageResponse, ReturnCode } from '../api/shared/shared.model';
import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  /**
   * 是否回傳成功
   * @param res
   * @returns
   */
  ifSuccess<T extends BaseMessageResponse>(res: T) {
    return res.returnCode === ReturnCode.Success;
  }

  /**
   * 驗證不為空字串格式
   * @returns
   */
  emptyValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const isEmpty = !((control?.value as string | undefined | null) ?? '').trim().length;
      return isEmpty ? { empty: { value: control.value } } : null;
    };
  }
}
