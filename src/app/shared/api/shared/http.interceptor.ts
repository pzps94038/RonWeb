import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, concatMap, map, retry, tap } from 'rxjs';
import { RefreshTokenService } from '../refresh-token/refresh-token.service';
import { ReturnCode } from './shared.model';

@Injectable()
export class HttpInterceptor implements HttpInterceptor {
  constructor(private refresh: RefreshTokenService) {}

  public intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const accessToken = '';
    const authReq = req.clone({
      headers: req.headers.set('Authorization', `Bearer ${accessToken}`),
    });
    return next.handle(authReq).pipe(
      catchError((err: HttpErrorResponse) => {
        if (err.status === 401) {
          return this.refreshToken(next, authReq, err);
        } else {
          throw err;
        }
      }),
      retry(2),
    );
  }

  refreshToken(next: HttpHandler, req: HttpRequest<any>, err: HttpErrorResponse) {
    return this.refresh.refreshToken({ userId: '', refreshToken: '' }).pipe(
      concatMap(({ returnCode, data }) => {
        if (returnCode === ReturnCode.Success) {
          const headers = req.headers.set('Authorization', `Bearer ${data.accessToken}`);
          const newReq = req.clone({ headers });
          return next.handle(newReq);
        } else if (returnCode === ReturnCode.AuthExpired) {
          //TODO 身分驗證過期
          throw err;
        } else {
          throw err;
        }
      }),
    );
  }
}
