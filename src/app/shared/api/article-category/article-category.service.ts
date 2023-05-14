import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import {
  CreateArticleCategoryRequest,
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

  getArticleCategory() {
    return this.http.get<GetArticleCategoryResponse>(`${environment.baseUrl}/articleCategory`);
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
}
