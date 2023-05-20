import { Observable, shareReplay } from 'rxjs';
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
import { TransferService } from '../../service/transfer.service';

@Injectable({
  providedIn: 'root',
})
export class ArticleService {
  http = inject(HttpClient);
  transferSrv = inject(TransferService);
  articleMap = new Map<undefined | number, Observable<GetArticleResponse>>();
  articleByIdMap = new Map<undefined | number, Observable<GetArticleByIdResponse>>();

  /**
   * 取得文章列表
   * @param page
   * @returns
   */
  getArticle(page?: number, cache: boolean = true) {
    const fn = () => {
      if (cache && this.articleMap.has(page)) {
        return this.articleMap.get(page)!;
      }
      const params = page ? new HttpParams().append('page', page) : undefined;

      const article$ = this.http
        .get<GetArticleResponse>(`${environment.baseUrl}/article`, {
          params,
        })
        .pipe(shareReplay());
      this.articleMap.set(page, article$);
      return article$;
    };
    return this.transferSrv.transfer(`articleList-${page}`, fn);
  }

  /**
   * 取得該筆文章
   * @param id
   * @returns
   */
  getArticleById(id: number, cache: boolean = true) {
    const fn = () => {
      if (cache && this.articleByIdMap.has(id)) {
        return this.articleByIdMap.get(id)!;
      }
      const article$ = this.http
        .get<GetArticleByIdResponse>(`${environment.baseUrl}/article/${id}`)
        .pipe(shareReplay());
      this.articleByIdMap.set(id, article$);
      return article$;
    };
    return this.transferSrv.transfer(`article-${id}`, fn);
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
  deleteArticle(id: number) {
    return this.http.delete<BaseMessageResponse>(`${environment.baseUrl}/article/${id}`);
  }

  /**
   * 更新文章瀏覽次數
   * @param id
   * @returns
   */
  updateArticleViews(id: number) {
    return this.http.patch<BaseMessageResponse>(
      `${environment.baseUrl}/article/updateArticleViews/${id}`,
      {},
    );
  }
}
