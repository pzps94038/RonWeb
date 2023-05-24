import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Component, DestroyRef, OnInit, inject, signal, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { PaginationComponent } from 'src/app/shared/component/pagination/pagination.component';
import { catchError, combineLatest, delay, filter, finalize, map } from 'rxjs';
import { SearchService } from 'src/app/shared/api/search/search.service';
import { Articles } from 'src/app/shared/api/article/article.model';
import { ErrorComponent } from 'src/app/shared/component/error/error.component';
import { ArticleCardComponent } from '../shared/component/article-card/article-card.component';
import { LoadingCardComponent } from '../shared/component/loading-card/loading-card.component';
import {
  ArticleCategory,
  Category,
} from 'src/app/shared/api/article-category/article-category.model';
import { ReturnCode } from 'src/app/shared/api/shared/shared.model';
import { LoadingKeywordComponent } from '../shared/component/loading-keyword/loading-keyword.component';
import { ArticleLabel } from 'src/app/shared/api/article-label/article-label.model';
import { ApiService } from 'src/app/shared/service/api.service';
import { CodeBlockHighlightService } from 'src/app/shared/service/code-block-highlight.service';

@Component({
  selector: 'app-category',
  standalone: true,
  imports: [
    CommonModule,
    PaginationComponent,
    ArticleCardComponent,
    ErrorComponent,
    LoadingKeywordComponent,
    LoadingCardComponent,
  ],
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss'],
})
export class CategoryComponent implements OnInit {
  route = inject(ActivatedRoute);
  router = inject(Router);
  searchSrv = inject(SearchService);
  apiSrv = inject(ApiService);
  codeBlockSrv = inject(CodeBlockHighlightService);
  category = signal('');
  categoryId = signal<number | undefined>(undefined);
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
          if (!!params.get('id') && !isNaN(parseInt(params.get('id')!))) {
            return true;
          } else {
            this.router.navigate(['blog']);
            return false;
          }
        }),
        takeUntilDestroyed(this._destroyRef),
      )
      .subscribe(([params, queryParam]) => {
        const id = parseInt(params.get('id')!);
        this.categoryId.set(id);
        const page = queryParam.get('page');
        const num = page ? parseInt(page) : 1;
        this.page.set(isNaN(num) ? 1 : num);
        this.searchCategory(id, this.page());
      });
  }

  searchCategory(id: number, page?: number) {
    this.isError.set(false);
    this.isLoading.set(true);
    this.searchSrv
      .category(id, page)
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
            data: { total, articles, keyword },
          } = res;
          this.total.set(total);
          this.articles.set(articles);
          this.category.set(keyword);
          this.codeBlockSrv.highlightAllBlock();
        } else if (res.returnCode === ReturnCode.NotFound) {
          this.router.navigate(['blog', 'notFound']);
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
    this.router.navigate(['blog', 'category', this.categoryId()], {
      queryParams: {
        page,
      },
    });
  }
}
