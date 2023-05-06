import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { RefreshTokenRequest, RefreshTokenResponse } from './refresh-token.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class RefreshTokenService {
  private http = inject(HttpClient);

  refreshToken(req: RefreshTokenRequest) {
    return this.http.post<RefreshTokenResponse>(`${environment.baseUrl}/refreshToken`, req);
  }
}
