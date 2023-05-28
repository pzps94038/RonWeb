import { TestBed } from '@angular/core/testing';

import { UserService } from './user.service';

describe('UserService', () => {
  let service: UserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
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

  it('測試Token', () => {
    const token = {
      accessToken: 'accessToken',
      refreshToken: 'refreshToken',
    };
    service.setToken(token);
    expect(service.getToken()?.accessToken).toBe(token.accessToken);
    expect(service.getToken()?.refreshToken).toBe(token.refreshToken);
    service.removeToken();
    expect(service.getToken()).toBe(undefined);
  });

  it('測試User Id', () => {
    service.setUserId(1);
    expect(service.getUserId()).toBe(1);
    service.removeUserId();
    expect(service.getUserId()).toBe(undefined);
  });
});
