import { Component, DestroyRef, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { catchError, combineLatest, filter, finalize, map, delay } from 'rxjs';
import { ArticleCategory } from 'src/app/shared/api/article-category/article-category.model';
import { Articles } from 'src/app/shared/api/article/article.model';
import { SearchService } from 'src/app/shared/api/search/search.service';
import { SharedService } from 'src/app/shared/service/shared.service';
import { ErrorComponent } from 'src/app/shared/components/error/error.component';
import { PaginationComponent } from 'src/app/shared/components/pagination/pagination.component';
import { ArticleCardComponent } from '../shared/components/article-card/article-card.component';
import { LoadingCardComponent } from '../shared/components/loading-card/loading-card.component';
import { LoadingKeywordComponent } from '../shared/components/loading-keyword/loading-keyword.component';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [
    CommonModule,
    PaginationComponent,
    ArticleCardComponent,
    ErrorComponent,
    LoadingCardComponent,
    LoadingKeywordComponent,
  ],
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit {
  route = inject(ActivatedRoute);
  router = inject(Router);
  searchSrv = inject(SearchService);
  sharedSrv = inject(SharedService);
  keyword = signal('');
  total = signal(0);
  articles = signal<Articles>([]);
  isLoading = signal(false);
  isError = signal(false);
  page = signal(1);
  private _destroyRef = inject(DestroyRef);

  ngOnInit(): void {
    combineLatest([this.route.paramMap, this.route.queryParamMap])
      .pipe(
        filter(([params]) => {
          if (!!params.get('keyword')) {
            return true;
          } else {
            this.router.navigate(['blog']);
            return false;
          }
        }),
        takeUntilDestroyed(this._destroyRef),
      )
      .subscribe(([params, queryParam]) => {
        const keyword = params.get('keyword') as string;
        this.keyword.set(keyword);
        const page = queryParam.get('page');
        const num = page ? parseInt(page) : 1;
        this.page.set(isNaN(num) ? 1 : num);
        this.searchKeyword(this.keyword(), this.page());
      });
  }

  searchKeyword(keyword: string, page?: number) {
    this.isError.set(false);
    this.isLoading.set(true);
    this.searchSrv
      .keyword(keyword.trim(), page)
      .pipe(
        catchError(err => {
          this.isError.set(true);
          throw err;
        }),
        finalize(() => this.isLoading.set(false)),
        takeUntilDestroyed(this._destroyRef),
      )
      .subscribe(res => {
        if (this.sharedSrv.ifSuccess(res)) {
          const {
            data: { total, articles },
          } = res;
          this.total.set(total);
          this.articles.set(articles);
        } else {
          this.isError.set(true);
        }
      });
  }

  showMore(id: string) {
    this.router.navigateByUrl(`/blog/article/${id}`);
  }

  navigateCategory({ categoryId }: ArticleCategory) {
    this.router.navigateByUrl(`/blog/category/${categoryId}`);
  }

  paginationChange(page: number) {
    this.router.navigate(['blog', 'search', this.keyword()], {
      queryParams: {
        page,
      },
    });
  }
}
