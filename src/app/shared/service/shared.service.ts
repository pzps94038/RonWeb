import { DeviceService } from 'src/app/shared/service/device.service';
import { Injectable, inject, signal } from '@angular/core';
import { BaseMessageResponse, ReturnCode, Token } from '../api/shared/shared.model';
import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { BehaviorSubject, take } from 'rxjs';
import { Router } from '@angular/router';
import { SwalService } from './swal.service';

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  deviceSrv = inject(DeviceService);
  swalSrv = inject(SwalService);
  router = inject(Router);
  isLogin = signal(false);
  darkMode = signal(false);

  constructor() {
    if (this.deviceSrv.isClient) {
      if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        this.darkMode.set(true);
      } else {
        this.darkMode.set(false);
      }
      this.toggleTheme(this.darkMode());
    }
  }

  /**
   * 登出
   */
  logout() {
    this.removeToken();
    this.removeUserId();
    this.isLogin.set(false);
    this.router.navigate(['blog']);
  }

  /**
   * 取Token
   * @returns
   */
  getToken() {
    if (this.deviceSrv.isClient) {
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
    if (this.deviceSrv.isClient) {
      localStorage.setItem('token', JSON.stringify(token));
    }
  }

  /**
   * 移除token
   */
  removeToken() {
    if (this.deviceSrv.isClient) {
      localStorage.removeItem('token');
    }
  }

  /**
   * 取UserId
   * @returns
   */
  getUserId() {
    if (this.deviceSrv.isClient) {
      const localUserId = localStorage.getItem('userId');
      if (localUserId) {
        const id = JSON.parse(localUserId) as string;
        if (id) {
          return id;
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
   * 存取userId
   * @param
   */
  setUserId(userId: string) {
    if (this.deviceSrv.isClient) {
      localStorage.setItem('userId', userId);
    }
  }

  /**
   * 移除token
   */
  removeUserId() {
    if (this.deviceSrv.isClient) {
      localStorage.removeItem('userId');
    }
  }

  /**
   * 是否回傳成功
   * @param res
   * @returns
   */
  ifSuccess<T extends BaseMessageResponse>(res: T, showError = false) {
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

  toggleTheme(darkMode: boolean) {
    this.darkMode.set(darkMode);
    const html = document.getElementsByTagName('html')[0];
    if (darkMode) {
      html.setAttribute('data-theme', 'business');
    } else {
      html.setAttribute('data-theme', 'winter');
    }
  }
}
