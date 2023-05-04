import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import {
  CreateArticleLabelRequest,
  GetArticleLabelResponse,
  ModifyArticleLabelRequest,
} from './article-label.model';
import { BaseMessageResponse } from '../shared/shared.model';

@Injectable({
  providedIn: 'root',
})
export class ArticleLabelService {
  constructor(private http: HttpClient) {}

  getArticleLabel() {
    return this.http.get<GetArticleLabelResponse>(`${environment.baseUrl}/articleLabel`);
  }

  modifyArticleLabel(req: ModifyArticleLabelRequest) {
    return this.http.patch<BaseMessageResponse>(
      `${environment.baseUrl}/articleLabel/${req.labelId}`,
      req,
    );
  }

  createArticleLabel(req: CreateArticleLabelRequest) {
    return this.http.post<BaseMessageResponse>(`${environment.baseUrl}/articleLabel`, req);
  }
}
