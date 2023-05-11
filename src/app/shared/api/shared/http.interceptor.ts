import {
  HttpRequest,
  HttpEvent,
  HttpErrorResponse,
  HttpInterceptorFn,
  HttpHandlerFn,
} from '@angular/common/http';
import { inject } from '@angular/core';
import { Observable, catchError, concatMap, retry, switchMap, tap, throwError } from 'rxjs';
import { RefreshTokenService } from '../refresh-token/refresh-token.service';
import { ReturnCode } from './shared.model';
import { SwalService } from '../../service/swal.service';
import { SharedService } from '../../service/shared.service';

export const httpInterceptor: HttpInterceptorFn = (
  req: HttpRequest<any>,
  next: HttpHandlerFn,
): Observable<HttpEvent<any>> => {
  const refresh = inject(RefreshTokenService);
  const sharedSrv = inject(SharedService);
  const swal = inject(SwalService);
  const accessToken = '';
  const authReq = req.clone({
    headers: req.headers.set('Authorization', `Bearer ${accessToken}`),
  });

  const refreshToken = (
    next: (req: HttpRequest<unknown>) => Observable<HttpEvent<unknown>>,
    req: HttpRequest<any>,
    err: HttpErrorResponse,
  ) => {
    return refresh.refreshToken({ userId: '', refreshToken: '' }).pipe(
      concatMap(({ returnCode, returnMessage, data }) => {
        if (returnCode === ReturnCode.Success) {
          const headers = req.headers.set('Authorization', `Bearer ${data.accessToken}`);
          const newReq = req.clone({ headers });
          return next(newReq);
        } else if (returnCode === ReturnCode.AuthExpired) {
          return swal
            .alert({
              text: returnMessage,
            })
            .pipe(
              tap(() => sharedSrv.logout()),
              switchMap(() => throwError(() => err)),
            );
        } else {
          throw err;
        }
      }),
    );
  };
  return next(authReq).pipe(
    catchError((err: HttpErrorResponse) => {
      if (err.status === 401) {
        return refreshToken(next, authReq, err);
      } else {
        throw err;
      }
    }),
    retry(2),
  );
};
