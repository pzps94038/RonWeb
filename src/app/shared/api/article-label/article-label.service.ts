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
  transferSrv = inject(TransferService);
  articleLabelMap = new Map<undefined | number, Observable<GetArticleLabelResponse>>();
  articleLabelByIdMap = new Map<undefined | number, Observable<GetArticleLabelByIdResponse>>();

  getArticleLabel(page?: number, cache: boolean = true) {
    const fn = () => {
      if (cache && this.articleLabelMap.has(page)) {
        return this.articleLabelMap.get(page)!;
      }
      const params = page ? new HttpParams().append('page', page) : undefined;
      const label$ = this.http
        .get<GetArticleLabelResponse>(`${environment.baseUrl}/articleLabel`, {
          params,
        })
        .pipe(shareReplay());
      this.articleLabelMap.set(page, label$);
      return label$;
    };
    return this.transferSrv.transfer(`labelList-${page}`, fn, cache);
  }
}
