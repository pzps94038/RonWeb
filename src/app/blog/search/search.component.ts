import { Component, DestroyRef, OnInit, inject, signal, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { catchError, combineLatest, filter, finalize } from 'rxjs';
import { Category } from 'src/app/shared/api/article-category/article-category.model';
import { Articles } from 'src/app/shared/api/article/article.model';
import { SearchService } from 'src/app/shared/api/search/search.service';
import { ErrorComponent } from 'src/app/shared/component/error/error.component';
import { PaginationComponent } from 'src/app/shared/component/pagination/pagination.component';
import { ArticleCardComponent } from '../shared/component/article-card/article-card.component';
import { LoadingCardComponent } from '../shared/component/loading-card/loading-card.component';
import { LoadingKeywordComponent } from '../shared/component/loading-keyword/loading-keyword.component';
import { ArticleLabel } from 'src/app/shared/api/article-label/article-label.model';
import { ApiService } from 'src/app/shared/service/api.service';
import { ArticleService } from 'src/app/shared/api/article/article.service';
import { CodeBlockHighlightService } from 'src/app/shared/service/code-block-highlight.service';

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
  articleSrv = inject(ArticleService);
  apiSrv = inject(ApiService);
  codeBlockSrv = inject(CodeBlockHighlightService);
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
        this.keyword.set(keyword.trim());
        const page = queryParam.get('page');
        const num = page ? parseInt(page) : 1;
        this.page.set(isNaN(num) ? 1 : num);
        this.searchKeyword(this.keyword(), this.page());
      });
  }

  searchKeyword(keyword: string, page?: number) {
    this.isError.set(false);
    this.isLoading.set(true);
    this.articleSrv
      .getArticle(page, keyword)
      .pipe(
        catchError(err => {
          this.isError.set(true);
          throw err;
        }),
        finalize(() => this.isLoading.set(false)),
        takeUntilDestroyed(this._destroyRef),
      )
      .subscribe(res => {
        if (this.apiSrv.ifSuccess(res, false)) {
          const {
            data: { total, articles },
          } = res;
          this.total.set(total);
          this.articles.set(articles);
          this.codeBlockSrv.highlightAllBlock();
        } else {
          this.isError.set(true);
        }
      });
  }

  showMore(id: number) {
    this.router.navigateByUrl(`/blog/article/${id}`);
  }

  navigateCategory({ categoryId }: Category) {
    this.router.navigateByUrl(`/blog/category/${categoryId}`);
  }

  navigateLabel({ labelId }: ArticleLabel) {
    this.router.navigateByUrl(`/blog/label/${labelId}`);
  }

  paginationChange(page: number) {
    this.router.navigate(['blog', 'search', this.keyword()], {
      queryParams: {
        page,
      },
    });
  }
}
