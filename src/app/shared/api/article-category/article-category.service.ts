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
import { Observable, shareReplay } from 'rxjs';
import { TransferService } from '../../service/transfer.service';

@Injectable({
  providedIn: 'root',
})
export class ArticleCategoryService {
  private http = inject(HttpClient);
  transferSrv = inject(TransferService);
  articleCategoryMap = new Map<undefined | number, Observable<GetArticleCategoryResponse>>();
  articleCategoryByIdMap = new Map<
    undefined | number,
    Observable<GetArticleCategoryByIdResponse>
  >();

  getArticleCategory(page?: number, cache: boolean = true) {
    const fn = () => {
      if (cache && this.articleCategoryMap.has(page)) {
        return this.articleCategoryMap.get(page)!;
      }
      const params = page ? new HttpParams().append('page', page) : undefined;
      const category$ = this.http
        .get<GetArticleCategoryResponse>(`${environment.baseUrl}/articleCategory`, {
          params,
        })
        .pipe(shareReplay());
      this.articleCategoryMap.set(page, category$);
      return category$;
    };
    return this.transferSrv.transfer(`categoryList-${page}`, fn, cache);
  }

  getArticleCategoryById(id: number, cache: boolean = true) {
    const fn = () => {
      if (cache && this.articleCategoryByIdMap.has(id)) {
        return this.articleCategoryByIdMap.get(id)!;
      }
      const category$ = this.http
        .get<GetArticleCategoryByIdResponse>(`${environment.baseUrl}/articleCategory/${id}`)
        .pipe(shareReplay());
      this.articleCategoryByIdMap.set(id, category$);
      return category$;
    };
    return this.transferSrv.transfer(`category-${id}`, fn, cache);
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
