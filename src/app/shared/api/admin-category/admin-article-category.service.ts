import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import {
  CreateArticleCategoryRequest,
  GetArticleCategoryByIdResponse,
  GetArticleCategoryResponse,
  UpdateArticleCategoryRequest,
} from './admin-article-category.model';
import { environment } from 'src/environments/environment';
import { BaseMessageResponse } from '../shared/shared.model';
import { Observable, shareReplay } from 'rxjs';
import { TransferService } from '../../service/transfer.service';

@Injectable({
  providedIn: 'root',
})
export class AdminArticleCategoryService {
  private http = inject(HttpClient);
  transferSrv = inject(TransferService);

  getArticleCategory(page?: number) {
    const params = page ? new HttpParams().append('page', page) : undefined;
    return this.http.get<GetArticleCategoryResponse>(
      `${environment.baseUrl}/adminArticleCategory`,
      {
        params,
      },
    );
  }

  getArticleCategoryById(id: number) {
    return this.http.get<GetArticleCategoryByIdResponse>(
      `${environment.baseUrl}/adminArticleCategory/${id}`,
    );
  }

  updateArticleCategory(req: UpdateArticleCategoryRequest) {
    return this.http.patch<BaseMessageResponse>(
      `${environment.baseUrl}/adminArticleCategory/${req.categoryId}`,
      req,
    );
  }

  createArticleCategory(req: CreateArticleCategoryRequest) {
    return this.http.post<BaseMessageResponse>(`${environment.baseUrl}/adminArticleCategory`, req);
  }

  deleteArticleCategory(id: number) {
    return this.http.delete<BaseMessageResponse>(
      `${environment.baseUrl}/adminArticleCategory/${id}`,
    );
  }
}
