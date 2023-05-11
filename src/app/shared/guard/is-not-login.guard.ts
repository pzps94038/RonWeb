import { CanActivateFn, Router } from '@angular/router';
import { SharedService } from '../service/shared.service';
import { inject } from '@angular/core';
import { map, tap } from 'rxjs';

export const isNotLoginGuard: CanActivateFn = (route, state) => {
  const sharedSrv = inject(SharedService);
  const router = inject(Router);
  return sharedSrv.isLogin$.pipe(
    map(val => {
      if (!val) {
        return true;
      } else {
        router.navigate(['blog']);
        return false;
      }
    }),
  );
};
