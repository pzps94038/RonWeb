import { Injectable, inject, signal } from '@angular/core';
import { DeviceService } from './device.service';
import { Router } from '@angular/router';
import { Token } from '../api/shared/shared.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  deviceSrv = inject(DeviceService);
  router = inject(Router);
  isLogin = signal(false);

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
    if (this.deviceSrv.isServer) {
      return undefined;
    }
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
  }

  /**
   * 存取token
   * @param token
   */
  setToken(token: Token) {
    if (this.deviceSrv.isServer) {
      return;
    }
    localStorage.setItem('token', JSON.stringify(token));
  }

  /**
   * 移除token
   */
  removeToken() {
    if (this.deviceSrv.isServer) {
      return;
    }
    localStorage.removeItem('token');
  }

  /**
   * 取UserId
   * @returns
   */
  getUserId() {
    if (this.deviceSrv.isServer) {
      return undefined;
    }
    const localUserId = localStorage.getItem('userId');
    if (localUserId) {
      const userId = parseInt(localUserId);
      const id = isNaN(userId) ? undefined : userId;
      if (id) {
        return id;
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
  setUserId(userId: number) {
    if (this.deviceSrv.isServer) {
      return;
    }
    localStorage.setItem('userId', JSON.stringify(userId));
  }

  /**
   * 移除token
   */
  removeUserId() {
    if (this.deviceSrv.isServer) {
      return;
    }
    localStorage.removeItem('userId');
  }
}
