import { Injectable } from '@angular/core';
import { ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class ValidService {
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
