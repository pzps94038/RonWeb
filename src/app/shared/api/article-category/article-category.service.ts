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
  transferSrv = inject(TransferService);
  articleCategoryMap = new Map<undefined | number, Observable<GetArticleCategoryResponse>>();

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
}
