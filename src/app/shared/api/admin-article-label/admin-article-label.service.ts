import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import {
  CreateArticleLabelRequest,
  GetArticleLabelByIdResponse,
  GetArticleLabelResponse,
  UpdateArticleLabelRequest,
} from './admin-article-label.model';
import { environment } from 'src/environments/environment';
import { BaseMessageResponse } from '../shared/shared.model';

@Injectable({
  providedIn: 'root',
})
export class AdminArticleLabelService {
  private http = inject(HttpClient);

  getArticleLabel(page?: number) {
    const params = page ? new HttpParams().append('page', page) : undefined;
    return this.http.get<GetArticleLabelResponse>(`${environment.baseUrl}/adminArticleLabel`, {
      params,
    });
  }

  getArticleLabelById(id: number, cache: boolean = true) {
    return this.http.get<GetArticleLabelByIdResponse>(
      `${environment.baseUrl}/adminArticleLabel/${id}`,
    );
  }

  updateArticleLabel(req: UpdateArticleLabelRequest) {
    return this.http.patch<BaseMessageResponse>(
      `${environment.baseUrl}/adminArticleLabel/${req.labelId}`,
      req,
    );
  }

  createArticleLabel(req: CreateArticleLabelRequest) {
    return this.http.post<BaseMessageResponse>(`${environment.baseUrl}/adminArticleLabel`, req);
  }

  deleteArticleLabel(id: number) {
    return this.http.delete<BaseMessageResponse>(`${environment.baseUrl}/adminArticleLabel/${id}`);
  }
}
