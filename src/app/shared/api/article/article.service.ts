import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import {
  CreateArticleRequest,
  GetArticleByIdResponse,
  GetArticleResponse,
  UpdateArticleRequest,
} from './article.model';
import { environment } from 'src/environments/environment';
import { BaseMessageResponse } from '../shared/shared.model';

@Injectable({
  providedIn: 'root',
})
export class ArticleService {
  http = inject(HttpClient);

  /**
   * 取得文章列表
   * @param page
   * @returns
   */
  getArticle(page?: number) {
    if (page) {
      const params = new HttpParams().append('page', page);
      return this.http.get<GetArticleResponse>(`${environment.baseUrl}/article`, { params });
    } else {
      return this.http.get<GetArticleResponse>(`${environment.baseUrl}/article`);
    }
  }

  /**
   * 取得該筆文章
   * @param id
   * @returns
   */
  getArticleById(id: string) {
    return this.http.get<GetArticleByIdResponse>(`${environment.baseUrl}/article/${id}`);
  }

  /**
   * 創建文章
   * @param data
   * @returns
   */
  createArticle(data: CreateArticleRequest) {
    return this.http.post<BaseMessageResponse>(`${environment.baseUrl}/article`, data);
  }

  /**
   * 更新文章
   * @param data
   * @returns
   */
  updateArticle(data: UpdateArticleRequest) {
    return this.http.patch<BaseMessageResponse>(
      `${environment.baseUrl}/article/${data.articleId}`,
      data,
    );
  }

  /**
   * 刪除文章
   * @param id
   * @returns
   */
  deleteArticle(id: string) {
    return this.http.delete<BaseMessageResponse>(`${environment.baseUrl}/article/${id}`);
  }
}
