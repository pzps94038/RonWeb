import {
  HttpRequest,
  HttpEvent,
  HttpErrorResponse,
  HttpInterceptorFn,
  HttpHandlerFn,
} from '@angular/common/http';
import { inject } from '@angular/core';
import { Observable, catchError, concatMap, retry } from 'rxjs';
import { RefreshTokenService } from '../refresh-token/refresh-token.service';
import { ReturnCode } from './shared.model';

export const httpInterceptor: HttpInterceptorFn = (
  req: HttpRequest<any>,
  next: HttpHandlerFn,
): Observable<HttpEvent<any>> => {
  const refresh = inject(RefreshTokenService);
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
      concatMap(({ returnCode, data }) => {
        if (returnCode === ReturnCode.Success) {
          const headers = req.headers.set('Authorization', `Bearer ${data.accessToken}`);
          const newReq = req.clone({ headers });
          return next(newReq);
        } else if (returnCode === ReturnCode.AuthExpired) {
          //TODO 身分驗證過期
          throw err;
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
