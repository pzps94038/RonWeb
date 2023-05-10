import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { LoginRequest, LoginResponse } from './login.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private http = inject(HttpClient);

  login(req: LoginRequest) {
    return this.http.post<LoginResponse>(`${environment.baseUrl}/login`, req);
  }
}
