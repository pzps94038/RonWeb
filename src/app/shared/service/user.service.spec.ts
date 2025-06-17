import { TestBed } from '@angular/core/testing';

import { UserService } from './user.service';
import { RouterTestingModule } from '@angular/router/testing';
import { HomeComponent } from 'src/app/blog/home/home.component';
import { DeviceService } from './device.service';
import { Injectable } from '@angular/core';

describe('UserService', () => {
  let service: UserService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes([
          {
            path: 'blog',
            component: HomeComponent,
          },
        ]),
      ],
    });
    service = TestBed.inject(UserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('測試Token', () => {
    const token = {
      accessToken: 'accessToken',
      refreshToken: 'refreshToken',
    };
    service.setToken(token);
    expect(service.getToken()?.accessToken).toBe(token.accessToken);
    expect(service.getToken()?.refreshToken).toBe(token.refreshToken);
  });

  it('測試只有單個Token', () => {
    const token = {
      accessToken: 'accessToken',
    };
    service.removeToken();
    localStorage.setItem('token', JSON.stringify(token));
    expect(service.getToken()).toBe(undefined);
  });

  it('測試沒有Token', () => {
    service.removeToken();
    expect(service.getToken()).toBe(undefined);
  });

  it('測試User Id', () => {
    service.setUserId(1);
    expect(service.getUserId()).toBe(1);
    service.removeUserId();
    expect(service.getUserId()).toBe(undefined);
  });

  it('測試無法解析的User Id', () => {
    localStorage.setItem('userId', 'NaN');
    expect(service.getUserId()).toBe(undefined);
    service.removeUserId();
  });

  it('測試登出', () => {
    service.logout();
    expect(service.getToken()).toBe(undefined);
    expect(service.getUserId()).toBe(undefined);
  });
});

describe('UserService ServerMode', () => {
  let service: UserService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes([
          {
            path: 'blog',
            component: HomeComponent,
          },
        ]),
      ],
    });
    service = TestBed.inject(UserService);
  });

  it('測試Server 模式取資料', () => {
    const token = {
      accessToken: 'accessToken',
      refreshToken: 'refreshToken',
    };
    service.setToken(token);
    service.setUserId(1);
    spyOnProperty(service.deviceSrv, 'isServer', 'get').and.returnValue(true);
    expect(service.getToken()).toBe(undefined);
    expect(service.getUserId()).toBe(undefined);
    service.logout();
  });
});
