import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { UserService } from './user.service';
import { RouterTestingModule } from '@angular/router/testing';
import { HomeComponent } from 'src/app/blog/home/home.component';
import { DeviceService } from './device.service';
import { Component, Injectable, signal } from '@angular/core';

@Component({
  template: '',
  standalone: true,
})
class MockComponent {}

describe('UserService', () => {
  let service: UserService;
  let router: Router;
  let deviceService: DeviceService;

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
    router = TestBed.inject(Router);
    deviceService = TestBed.inject(DeviceService);
  });

  afterEach(() => {
    localStorage.clear();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should have initial isLogin signal as false', () => {
    expect(service.isLogin()).toBeFalsy();
  });

  describe('Token Management', () => {
    it('should set and get token', () => {
      const token = {
        accessToken: 'accessToken',
        refreshToken: 'refreshToken',
      };
      service.setToken(token);
      expect(service.getToken()?.accessToken).toBe(token.accessToken);
      expect(service.getToken()?.refreshToken).toBe(token.refreshToken);
    });

    it('should return undefined for incomplete token', () => {
      const token = {
        accessToken: 'accessToken',
      };
      service.removeToken();
      localStorage.setItem('token', JSON.stringify(token));
      expect(service.getToken()).toBe(undefined);
    });

    it('should return undefined when no token exists', () => {
      service.removeToken();
      expect(service.getToken()).toBe(undefined);
    });

    it('should remove token', () => {
      const token = {
        accessToken: 'accessToken',
        refreshToken: 'refreshToken',
      };
      service.setToken(token);
      service.removeToken();
      expect(service.getToken()).toBe(undefined);
    });

    it('should handle malformed token in localStorage', () => {
      localStorage.setItem('token', 'invalid-json');
      expect(() => service.getToken()).toThrow();
    });
  });

  describe('User ID Management', () => {
    it('should set and get user ID', () => {
      service.setUserId(1);
      expect(service.getUserId()).toBe(1);
    });

    it('should remove user ID', () => {
      service.setUserId(1);
      service.removeUserId();
      expect(service.getUserId()).toBe(undefined);
    });

    it('should handle unparseable user ID', () => {
      localStorage.setItem('userId', 'NaN');
      expect(service.getUserId()).toBe(undefined);
    });

    it('should handle non-numeric user ID', () => {
      localStorage.setItem('userId', '"not-a-number"');
      expect(service.getUserId()).toBe(undefined);
    });

    it('should handle zero user ID', () => {
      service.setUserId(0);
      // Zero is falsy, so it should return undefined
      expect(service.getUserId()).toBe(undefined);
    });

    it('should handle negative user ID', () => {
      service.setUserId(-1);
      // Negative values are truthy, so they should be returned
      expect(service.getUserId()).toBe(-1);
    });

    it('should return undefined when no user ID exists', () => {
      service.removeUserId();
      expect(service.getUserId()).toBe(undefined);
    });
  });

  describe('Logout Functionality', () => {
    it('should logout and clear all data', () => {
      const token = {
        accessToken: 'accessToken',
        refreshToken: 'refreshToken',
      };
      service.setToken(token);
      service.setUserId(1);
      service.isLogin.set(true);
      
      spyOn(router, 'navigate');
      
      service.logout();
      
      expect(service.getToken()).toBe(undefined);
      expect(service.getUserId()).toBe(undefined);
      expect(service.isLogin()).toBeFalsy();
      expect(router.navigate).toHaveBeenCalledWith(['blog']);
    });

    it('should handle logout when already logged out', () => {
      spyOn(router, 'navigate');
      
      service.logout();
      
      expect(service.getToken()).toBe(undefined);
      expect(service.getUserId()).toBe(undefined);
      expect(service.isLogin()).toBeFalsy();
      expect(router.navigate).toHaveBeenCalledWith(['blog']);
    });
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

  afterEach(() => {
    localStorage.clear();
  });

  it('should return undefined for token in server mode', () => {
    const token = {
      accessToken: 'accessToken',
      refreshToken: 'refreshToken',
    };
    service.setToken(token);
    service.setUserId(1);
    spyOnProperty(service.deviceSrv, 'isServer', 'get').and.returnValue(true);
    
    expect(service.getToken()).toBe(undefined);
    expect(service.getUserId()).toBe(undefined);
  });

  it('should not set token in server mode', () => {
    spyOnProperty(service.deviceSrv, 'isServer', 'get').and.returnValue(true);
    
    const token = {
      accessToken: 'accessToken',
      refreshToken: 'refreshToken',
    };
    service.setToken(token);
    
    expect(localStorage.getItem('token')).toBe(null);
  });

  it('should not remove token in server mode', () => {
    // Set token in normal mode first
    const token = {
      accessToken: 'accessToken',
      refreshToken: 'refreshToken',
    };
    localStorage.setItem('token', JSON.stringify(token));
    
    spyOnProperty(service.deviceSrv, 'isServer', 'get').and.returnValue(true);
    
    service.removeToken();
    
    expect(localStorage.getItem('token')).toBe(JSON.stringify(token));
  });

  it('should not set userId in server mode', () => {
    spyOnProperty(service.deviceSrv, 'isServer', 'get').and.returnValue(true);
    
    service.setUserId(1);
    
    expect(localStorage.getItem('userId')).toBe(null);
  });

  it('should not remove userId in server mode', () => {
    // Set userId in normal mode first
    localStorage.setItem('userId', '1');
    
    spyOnProperty(service.deviceSrv, 'isServer', 'get').and.returnValue(true);
    
    service.removeUserId();
    
    expect(localStorage.getItem('userId')).toBe('1');
  });

  it('should handle logout in server mode', () => {
    spyOnProperty(service.deviceSrv, 'isServer', 'get').and.returnValue(true);
    spyOn(service.router, 'navigate');
    
    service.logout();
    
    expect(service.isLogin()).toBeFalsy();
    expect(service.router.navigate).toHaveBeenCalledWith(['blog']);
  });
});
