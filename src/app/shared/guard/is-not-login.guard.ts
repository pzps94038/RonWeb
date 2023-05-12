import { CanActivateFn, Router } from '@angular/router';
import { SharedService } from '../service/shared.service';
import { inject } from '@angular/core';

export const isNotLoginGuard: CanActivateFn = (route, state) => {
  const sharedSrv = inject(SharedService);
  const router = inject(Router);
  if (!sharedSrv.isLogin()) {
    return true;
  } else {
    router.navigate(['blog']);
    return false;
  }
};
