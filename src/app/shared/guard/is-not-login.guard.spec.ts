import { HomeComponent } from './../../blog/home/home.component';
import { TestBed } from '@angular/core/testing';
import { ActivatedRouteSnapshot, CanActivateFn, RouterStateSnapshot } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

import { isNotLoginGuard } from './is-not-login.guard';
import { UserService } from '../service/user.service';

describe('isNotLoginGuard', () => {
  let userSrv: UserService;
  let mockSnapshot: RouterStateSnapshot;
  const executeGuard: CanActivateFn = (...guardParameters) =>
    TestBed.runInInjectionContext(() => isNotLoginGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes([{ path: 'blog', component: HomeComponent }])],
    });
    userSrv = TestBed.inject(UserService);
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });

  it('未登入者可進入', () => {
    userSrv.isLogin.set(false);
    expect(executeGuard(new ActivatedRouteSnapshot(), mockSnapshot)).toBe(true);
  });

  it('以登入者不可進入', () => {
    userSrv.isLogin.set(true);
    expect(executeGuard(new ActivatedRouteSnapshot(), mockSnapshot)).toBe(false);
  });
});
