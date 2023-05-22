import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from 'src/environments/environment';
import { SearchResponse } from './search.model';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  private http = inject(HttpClient);

  category(id: number, page?: number) {
    if (page) {
      const params = new HttpParams().append('page', page);
      return this.http.get<SearchResponse>(`${environment.baseUrl}/search/category/${id}`, {
        params,
      });
    } else {
      const params = new HttpParams().append('id', id);
      return this.http.get<SearchResponse>(`${environment.baseUrl}/search/category/${id}`, {
        params,
      });
    }
  }

  label(id: number, page?: number) {
    if (page) {
      const params = new HttpParams().append('page', page);
      return this.http.get<SearchResponse>(`${environment.baseUrl}/search/label/${id}`, {
        params,
      });
    } else {
      const params = new HttpParams().append('id', id);
      return this.http.get<SearchResponse>(`${environment.baseUrl}/search/label/${id}`, {
        params,
      });
    }
  }
}
