import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import {
  CreateArticleLabelRequest,
  GetArticleLabelByIdResponse,
  GetArticleLabelResponse,
  UpdateArticleLabelRequest,
} from './article-label.model';
import { environment } from 'src/environments/environment';
import { BaseMessageResponse } from '../shared/shared.model';

@Injectable({
  providedIn: 'root',
})
export class ArticleLabelService {
  private http = inject(HttpClient);

  getArticleLabel(page?: number) {
    if (page) {
      const params = new HttpParams().append('page', page);
      return this.http.get<GetArticleLabelResponse>(`${environment.baseUrl}/articleLabel`, {
        params,
      });
    } else {
      return this.http.get<GetArticleLabelResponse>(`${environment.baseUrl}/articleLabel`);
    }
  }

  getArticleLabelById(id: number) {
    return this.http.get<GetArticleLabelByIdResponse>(`${environment.baseUrl}/articleLabel/${id}`);
  }

  updateArticleLabel(req: UpdateArticleLabelRequest) {
    return this.http.patch<BaseMessageResponse>(
      `${environment.baseUrl}/articleLabel/${req.labelId}`,
      req,
    );
  }

  createArticleLabel(req: CreateArticleLabelRequest) {
    return this.http.post<BaseMessageResponse>(`${environment.baseUrl}/articleLabel`, req);
  }

  deleteArticleLabel(id: number) {
    return this.http.delete<BaseMessageResponse>(`${environment.baseUrl}/articleLabel/${id}`);
  }
}
