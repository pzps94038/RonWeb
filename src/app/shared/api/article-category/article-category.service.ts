import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { GetArticleCategoryResponse } from './article-category.model';
import { environment } from 'src/environments/environment';
import { Observable, shareReplay } from 'rxjs';
import { TransferService } from '../../service/transfer.service';

@Injectable({
  providedIn: 'root',
})
export class ArticleCategoryService {
  private http = inject(HttpClient);

  getArticleCategory() {
    return this.http.get<GetArticleCategoryResponse>(`${environment.baseUrl}/articleCategory`);
  }
}
