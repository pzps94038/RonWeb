import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { GetArticleByIdResponse, GetArticleResponse } from './article.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ArticleService {
  http = inject(HttpClient);

  getArticle() {
    return this.http.get<GetArticleResponse>(`${environment.baseUrl}/article`);
  }

  getArticleById(id: string) {
    return this.http.get<GetArticleByIdResponse>(`${environment.baseUrl}/article/${id}`);
  }
}
