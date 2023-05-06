import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { ContactUsRequest } from './contact-us.model';
import { BaseMessageResponse } from '../shared/shared.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ContactUsService {
  private http = inject(HttpClient);

  sendContactUsMail(req: ContactUsRequest) {
    return this.http.post<BaseMessageResponse>(`${environment.baseUrl}/contactUs`, req);
  }
}
