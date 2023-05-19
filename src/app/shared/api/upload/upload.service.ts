import { BaseMessageResponse } from './../shared/shared.model';
import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { UploadFiles, UploadResponse } from './upload.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UploadService {
  private http = inject(HttpClient);

  upload(formData: FormData) {
    return this.http.post<UploadResponse>(`${environment.baseUrl}/upload`, formData);
  }
}
