import { CanActivateFn, Router } from '@angular/router';
import { SharedService } from '../service/shared.service';
import { inject } from '@angular/core';
import { tap } from 'rxjs';

export const isLoginGuard: CanActivateFn = (route, state) => {
  const sharedSrv = inject(SharedService);
  const router = inject(Router);
  if (sharedSrv.isLogin()) {
    return true;
  } else {
    router.navigate(['login']);
    return false;
  }
};
