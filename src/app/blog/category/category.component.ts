import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Component, DestroyRef, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { PaginationComponent } from 'src/app/shared/components/pagination/pagination.component';
import { catchError, combineLatest, delay, filter, finalize, map } from 'rxjs';
import { SearchService } from 'src/app/shared/api/search/search.service';
import { Articles } from 'src/app/shared/api/article/article.model';
import { SharedService } from 'src/app/shared/service/shared.service';
import { ErrorComponent } from 'src/app/shared/components/error/error.component';
import { ArticleCardComponent } from '../shared/components/article-card/article-card.component';
import { LoadingCardComponent } from '../shared/components/loading-card/loading-card.component';
import { ArticleCategory } from 'src/app/shared/api/article-category/article-category.model';
import { ReturnCode } from 'src/app/shared/api/shared/shared.model';
import { LoadingKeywordComponent } from '../shared/components/loading-keyword/loading-keyword.component';

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
  sharedSrv = inject(SharedService);
  category = signal('');
  categoryId = signal<string>('');
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
          if (!!params.get('id')) {
            return true;
          } else {
            this.router.navigate(['blog']);
            return false;
          }
        }),
        takeUntilDestroyed(this._destroyRef),
      )
      .subscribe(([params, queryParam]) => {
        const id = params.get('id');
        this.categoryId.set(id as string);
        const page = queryParam.get('page');
        const num = page ? parseInt(page) : 1;
        this.page.set(isNaN(num) ? 1 : num);
        this.searchCategory(this.categoryId(), this.page());
      });
  }

  searchCategory(id: string, page?: number) {
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
        console.warn(res);
        console.warn(res.returnCode, res.returnCode === ReturnCode.NotFound);
        if (this.sharedSrv.ifSuccess(res)) {
          const {
            data: { total, articles, keyword },
          } = res;
          this.total.set(total);
          this.articles.set(articles);
          this.category.set(keyword);
        } else if (res.returnCode === ReturnCode.NotFound) {
          this.router.navigate(['blog', 'notFound']);
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
    this.router.navigate(['blog', 'category', this.categoryId()], {
      queryParams: {
        page,
      },
    });
  }
}
