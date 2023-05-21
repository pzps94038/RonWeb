import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { UserService } from '../service/user.service';

export const isNotLoginGuard: CanActivateFn = (route, state) => {
  const userSrv = inject(UserService);
  const router = inject(Router);
  if (!userSrv.isLogin()) {
    return true;
  } else {
    router.navigate(['blog']);
    return false;
  }
};
