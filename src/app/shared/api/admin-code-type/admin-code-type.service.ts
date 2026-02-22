import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from 'src/environments/environment';
import { CreateAdminCodeRequest } from '../admin-code/admin-code.model';
import { BaseMessageResponse } from '../shared/shared.model';
import {
  CreateAdminCodeTypeRequest,
  GetAdminCodeTypeByIdResponse,
  GetAdminCodeTypeResponse,
  UpdateAdminCodeTypeRequest,
} from './admin-code-type.model';

@Injectable({
  providedIn: 'root',
})
export class AdminCodeTypeService {
  private http = inject(HttpClient);

  getAdminCodeType(page?: number) {
    const params = page ? new HttpParams().append('page', page) : undefined;
    return this.http.get<GetAdminCodeTypeResponse>(`${environment.baseUrl}/adminCodeType`, {
      params,
    });
  }

  getAdminCodeTypeById(id: number) {
    return this.http.get<GetAdminCodeTypeByIdResponse>(
      `${environment.baseUrl}/adminCodeType/${id}`,
    );
  }

  updateAdminCodeType(id: number, req: UpdateAdminCodeTypeRequest) {
    return this.http.patch<BaseMessageResponse>(`${environment.baseUrl}/adminCodeType/${id}`, req);
  }

  createAdminCodeType(req: CreateAdminCodeTypeRequest) {
    return this.http.post<BaseMessageResponse>(`${environment.baseUrl}/adminCodeType`, req);
  }

  deleteAdminCodeType(id: number) {
    return this.http.delete<BaseMessageResponse>(`${environment.baseUrl}/adminCodeType/${id}`);
  }
}
