import { LoginComponent } from './../../login/login.component';
import { RouterTestingModule } from '@angular/router/testing';
import { inject, TestBed } from '@angular/core/testing';
import { ActivatedRouteSnapshot, CanActivateFn, RouterStateSnapshot } from '@angular/router';
import { UserService } from '../service/user.service';

import { isLoginGuard } from './is-login.guard';

describe('isLoginGuard', () => {
  let userSrv: UserService;
  let mockSnapshot: RouterStateSnapshot;
  const executeGuard: CanActivateFn = (...guardParameters) =>
    TestBed.runInInjectionContext(() => isLoginGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes([{ path: 'login', component: LoginComponent }])],
    });
    userSrv = TestBed.inject(UserService);
    mockSnapshot = jasmine.createSpyObj<RouterStateSnapshot>('RouterStateSnapshot', ['toString']);
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });

  it('以登入者可進入', () => {
    userSrv.isLogin.set(true);
    expect(executeGuard(new ActivatedRouteSnapshot(), mockSnapshot)).toBe(true);
  });

  it('未登入者不可進入', () => {
    userSrv.isLogin.set(false);
    expect(executeGuard(new ActivatedRouteSnapshot(), mockSnapshot)).toBe(false);
  });
});
