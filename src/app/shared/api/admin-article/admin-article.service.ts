import { Observable, shareReplay } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import {
  CreateArticleRequest,
  GetArticleByIdResponse,
  GetArticleResponse,
  UpdateArticleRequest,
} from './admin-article.model';
import { environment } from 'src/environments/environment';
import { BaseMessageResponse } from '../shared/shared.model';
import { TransferService } from '../../service/transfer.service';

@Injectable({
  providedIn: 'root',
})
export class AdminArticleService {
  http = inject(HttpClient);
  transferSrv = inject(TransferService);

  /**
   * 取得文章列表
   * @param page
   * @returns
   */
  getArticle(page?: number, keyword?: string) {
    let params = new HttpParams();
    if (page) {
      params = params.append('page', page);
    }
    if (keyword) {
      params = params.append('keyword', keyword);
    }
    return this.http.get<GetArticleResponse>(`${environment.baseUrl}/adminArticle`, {
      params,
    });
  }

  /**
   * 取得該筆文章
   * @param id
   * @returns
   */
  getArticleById(id: number) {
    return this.http.get<GetArticleByIdResponse>(`${environment.baseUrl}/adminArticle/${id}`);
  }

  /**
   * 創建文章
   * @param data
   * @returns
   */
  createArticle(data: CreateArticleRequest) {
    return this.http.post<BaseMessageResponse>(`${environment.baseUrl}/adminArticle`, data);
  }

  /**
   * 更新文章
   * @param data
   * @returns
   */
  updateArticle(data: UpdateArticleRequest) {
    return this.http.patch<BaseMessageResponse>(
      `${environment.baseUrl}/adminArticle/${data.articleId}`,
      data,
    );
  }

  /**
   * 刪除文章
   * @param id
   * @returns
   */
  deleteArticle(id: number) {
    return this.http.delete<BaseMessageResponse>(`${environment.baseUrl}/adminArticle/${id}`);
  }
}
