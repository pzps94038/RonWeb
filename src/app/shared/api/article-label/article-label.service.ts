import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import {
  CreateArticleLabelRequest,
  GetArticleLabelByIdResponse,
  GetArticleLabelResponse,
  UpdateArticleLabelRequest,
} from './article-label.model';
import { environment } from 'src/environments/environment';
import { BaseMessageResponse } from '../shared/shared.model';
import { Observable, shareReplay } from 'rxjs';
import { TransferService } from '../../service/transfer.service';

@Injectable({
  providedIn: 'root',
})
export class ArticleLabelService {
  private http = inject(HttpClient);

  getArticleLabel() {
    return this.http.get<GetArticleLabelResponse>(`${environment.baseUrl}/articleLabel`);
  }
}
