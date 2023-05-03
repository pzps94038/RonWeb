import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RefreshTokenRequest, RefreshTokenResponse } from './refresh-token.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class RefreshTokenService {
  constructor(private http: HttpClient) {}

  refreshToken(req: RefreshTokenRequest) {
    return this.http.post<RefreshTokenResponse>(`${environment.baseUrl}/refreshToken`, req);
  }
}
