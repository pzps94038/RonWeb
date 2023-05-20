import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import {
  CreateArticleCategoryRequest,
  GetArticleCategoryByIdResponse,
  GetArticleCategoryResponse,
  UpdateArticleCategoryRequest,
} from './article-category.model';
import { environment } from 'src/environments/environment';
import { BaseMessageResponse } from '../shared/shared.model';

@Injectable({
  providedIn: 'root',
})
export class ArticleCategoryService {
  private http = inject(HttpClient);

  getArticleCategory(page?: number) {
    if (page) {
      const params = new HttpParams().append('page', page);
      return this.http.get<GetArticleCategoryResponse>(`${environment.baseUrl}/articleCategory`, {
        params,
      });
    } else {
      return this.http.get<GetArticleCategoryResponse>(`${environment.baseUrl}/articleCategory`);
    }
  }

  getArticleCategoryById(id: number) {
    return this.http.get<GetArticleCategoryByIdResponse>(
      `${environment.baseUrl}/articleCategory/${id}`,
    );
  }

  updateArticleCategory(req: UpdateArticleCategoryRequest) {
    return this.http.patch<BaseMessageResponse>(
      `${environment.baseUrl}/articleCategory/${req.categoryId}`,
      req,
    );
  }

  createArticleCategory(req: CreateArticleCategoryRequest) {
    return this.http.post<BaseMessageResponse>(`${environment.baseUrl}/articleCategory`, req);
  }

  deleteArticleCategory(id: number) {
    return this.http.delete<BaseMessageResponse>(`${environment.baseUrl}/articleCategory/${id}`);
  }
}
