import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { tap } from 'rxjs';
import { UserService } from '../service/user.service';

export const isLoginGuard: CanActivateFn = (route, state) => {
  const userSrv = inject(UserService);
  const router = inject(Router);
  if (userSrv.isLogin()) {
    return true;
  } else {
    router.navigate(['login']);
    return false;
  }
};
