import { DeviceService } from 'src/app/shared/service/device.service';
import { Injectable, inject } from '@angular/core';
import { BaseMessageResponse, ReturnCode, Token } from '../api/shared/shared.model';
import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  device = inject(DeviceService);
  router = inject(Router);

  private _isLogin$ = new BehaviorSubject(false);

  get isLogin$() {
    return this._isLogin$.asObservable();
  }

  /**
   * 設定登入狀態
   * @param state
   */
  setLoginStatus(state: boolean) {
    this._isLogin$.next(state);
  }

  /**
   * 登出
   */
  logout() {
    this.removeToken();
    this.setLoginStatus(false);
    this.router.navigate(['blog']);
  }

  /**
   * 取Token
   * @returns
   */
  getToken() {
    if (this.device.isClient) {
      const localToken = localStorage.getItem('token');
      if (localToken) {
        const token = JSON.parse(localToken) as Token;
        const accessToken = token?.accessToken;
        const refreshToken = token?.refreshToken;
        if (accessToken && refreshToken) {
          return token;
        } else {
          return undefined;
        }
      } else {
        return undefined;
      }
    } else {
      return undefined;
    }
  }

  /**
   * 存取token
   * @param token
   */
  setToken(token: Token) {
    if (this.device.isClient) {
      localStorage.setItem('token', JSON.stringify(token));
    }
  }

  /**
   * 移除token
   */
  removeToken() {
    if (this.device.isClient) {
      localStorage.removeItem('token');
    }
  }

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
