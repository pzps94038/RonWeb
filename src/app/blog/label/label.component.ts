import { Component, DestroyRef, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router } from '@angular/router';
import { combineLatest, filter, catchError, finalize } from 'rxjs';
import { Category } from 'src/app/shared/api/article-category/article-category.model';
import { Articles } from 'src/app/shared/api/article/article.model';
import { SearchService } from 'src/app/shared/api/search/search.service';
import { ReturnCode } from 'src/app/shared/api/shared/shared.model';
import { SharedService } from 'src/app/shared/service/shared.service';
import { ErrorComponent } from '../../shared/component/error/error.component';
import { PaginationComponent } from '../../shared/component/pagination/pagination.component';
import { LoadingCardComponent } from '../shared/component/loading-card/loading-card.component';
import { LoadingKeywordComponent } from '../shared/component/loading-keyword/loading-keyword.component';
import { ArticleCardComponent } from '../shared/component/article-card/article-card.component';
import { ArticleLabel } from 'src/app/shared/api/article-label/article-label.model';

@Component({
  selector: 'app-label',
  standalone: true,
  templateUrl: './label.component.html',
  styleUrls: ['./label.component.scss'],
  imports: [
    CommonModule,
    ErrorComponent,
    PaginationComponent,
    LoadingCardComponent,
    LoadingKeywordComponent,
    ArticleCardComponent,
  ],
})
export class LabelComponent {
  route = inject(ActivatedRoute);
  router = inject(Router);
  searchSrv = inject(SearchService);
  sharedSrv = inject(SharedService);
  label = signal('');
  labelId = signal<number | undefined>(undefined);
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
        this.labelId.set(id);
        const page = queryParam.get('page');
        const num = page ? parseInt(page) : 1;
        this.page.set(isNaN(num) ? 1 : num);
        this.searchLabel(id, this.page());
      });
  }

  searchLabel(id: number, page?: number) {
    this.isError.set(false);
    this.isLoading.set(true);
    this.searchSrv
      .label(id, page)
      .pipe(
        catchError(err => {
          this.isError.set(true);
          throw err;
        }),
        finalize(() => this.isLoading.set(false)),
        takeUntilDestroyed(this._destroyRef),
      )
      .subscribe(res => {
        if (this.sharedSrv.ifSuccess(res, false)) {
          const {
            data: { total, articles, keyword },
          } = res;
          this.total.set(total);
          this.articles.set(articles);
          this.label.set(keyword);
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
    this.router.navigate(['blog', 'label', this.labelId()], {
      queryParams: {
        page,
      },
    });
  }
}
