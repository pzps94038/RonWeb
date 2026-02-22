import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from 'src/environments/environment';
import {
  CreateAdminCodeRequest,
  GetAdminCodeByIdResponse,
  GetAdminCodeResponse,
  UpdateAdminCodeRequest,
} from './admin-code.model';
import { BaseMessageResponse } from '../shared/shared.model';

@Injectable({
  providedIn: 'root',
})
export class AdminCodeService {
  private http = inject(HttpClient);

  getAdminCode(codeTypeId: string, page?: number) {
    let params = new HttpParams().append('codeTypeId', codeTypeId);
    if (page != null) {
      params = params.append('page', page);
    }
    return this.http.get<GetAdminCodeResponse>(`${environment.baseUrl}/adminCode`, {
      params,
    });
  }

  getAdminCodeById(id: number) {
    return this.http.get<GetAdminCodeByIdResponse>(`${environment.baseUrl}/adminCode/${id}`);
  }

  updateAdminCode(id: number, req: UpdateAdminCodeRequest) {
    return this.http.patch<BaseMessageResponse>(`${environment.baseUrl}/adminCode/${id}`, req);
  }

  createAdminCode(req: CreateAdminCodeRequest) {
    return this.http.post<BaseMessageResponse>(`${environment.baseUrl}/adminCode`, req);
  }

  deleteAdminCode(id: number) {
    return this.http.delete<BaseMessageResponse>(`${environment.baseUrl}/adminCode/${id}`);
  }
}
