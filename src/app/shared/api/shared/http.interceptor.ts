import {
  HttpRequest,
  HttpEvent,
  HttpErrorResponse,
  HttpInterceptorFn,
  HttpHandlerFn,
} from '@angular/common/http';
import { inject } from '@angular/core';
import { Observable, catchError, concatMap, retry, switchMap, throwError } from 'rxjs';
import { RefreshTokenService } from '../refresh-token/refresh-token.service';
import { ReturnCode } from './shared.model';
import { UserService } from '../../service/user.service';
import { DialogService } from '@ngneat/dialog';
import { ExpiredLoginComponent } from '../../dialog/expired-login/expired-login.component';

export const httpInterceptor: HttpInterceptorFn = (
  req: HttpRequest<any>,
  next: HttpHandlerFn,
): Observable<HttpEvent<any>> => {
  const refreshSrv = inject(RefreshTokenService);
  const userSrv = inject(UserService);
  const dialog = inject(DialogService);
  const accessToken = userSrv.getToken()?.accessToken;
  if (accessToken) {
    req = req.clone({
      headers: req.headers.set('Authorization', `Bearer ${accessToken}`),
    });
  }
  const refreshToken = (
    next: (req: HttpRequest<unknown>) => Observable<HttpEvent<unknown>>,
    req: HttpRequest<any>,
    userId: number,
    refreshToken: string,
    err: HttpErrorResponse,
  ) => {
    return refreshSrv.refreshToken({ userId, refreshToken }).pipe(
      concatMap(({ returnCode, returnMessage, data }) => {
        if (returnCode === ReturnCode.Success) {
          userSrv.setToken(data);
          const headers = req.headers.set('Authorization', `Bearer ${data.accessToken}`);
          const newReq = req.clone({ headers });
          return next(newReq);
        } else if (returnCode === ReturnCode.AuthExpired) {
          return dialog
            .open(ExpiredLoginComponent, {
              enableClose: false,
            })
            .afterClosed$.pipe(
              switchMap(isLogin => {
                if (isLogin) {
                  const headers = req.headers.set(
                    'Authorization',
                    `Bearer ${userSrv.getToken()?.accessToken}`,
                  );
                  const newReq = req.clone({ headers });
                  return next(newReq);
                } else {
                  userSrv.logout();
                  return throwError(() => err);
                }
              }),
            );
        } else {
          throw err;
        }
      }),
    );
  };
  return next(req).pipe(
    catchError((err: HttpErrorResponse) => {
      const userId = userSrv.getUserId();
      const token = userSrv.getToken()?.refreshToken;
      if (err.status === 401 && userId && token) {
        return refreshToken(next, req, userId, token, err);
      } else {
        throw err;
      }
    }),
    retry(1),
  );
};
