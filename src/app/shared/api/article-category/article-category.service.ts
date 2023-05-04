import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  CreateArticleCategoryRequest,
  GetArticleCategoryResponse,
  ModifyArticleCategoryRequest,
} from './article-category.model';
import { environment } from 'src/environments/environment';
import { BaseMessageResponse } from '../shared/shared.model';

@Injectable({
  providedIn: 'root',
})
export class ArticleCategoryService {
  constructor(private http: HttpClient) {}

  getArticleCategory() {
    return this.http.get<GetArticleCategoryResponse>(`${environment.baseUrl}/articleCategory`);
  }

  modifyArticleCategory(req: ModifyArticleCategoryRequest) {
    return this.http.patch<BaseMessageResponse>(
      `${environment.baseUrl}/articleCategory/${req.categoryId}`,
      req,
    );
  }

  createArticleCategory(req: CreateArticleCategoryRequest) {
    return this.http.post<BaseMessageResponse>(`${environment.baseUrl}/articleCategory`, req);
  }
}
