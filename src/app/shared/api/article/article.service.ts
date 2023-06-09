import { Observable, shareReplay } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { GetArticleByIdResponse, GetArticleResponse } from './article.model';
import { environment } from 'src/environments/environment';
import { BaseMessageResponse } from '../shared/shared.model';
import { TransferService } from '../../service/transfer.service';

@Injectable({
  providedIn: 'root',
})
export class ArticleService {
  http = inject(HttpClient);
  transferSrv = inject(TransferService);
  articleByIdMap = new Map<undefined | number, Observable<GetArticleByIdResponse>>();

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
    return this.http.get<GetArticleResponse>(`${environment.baseUrl}/article`, {
      params,
    });
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
    return this.transferSrv.transfer(`article-${id}`, fn, cache);
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
