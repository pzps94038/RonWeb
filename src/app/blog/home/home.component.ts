import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Component, DestroyRef, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArticleCardComponent } from '../shared/component/article-card/article-card.component';
import { PaginationComponent } from 'src/app/shared/component/pagination/pagination.component';
import { ArticleService } from 'src/app/shared/api/article/article.service';
import { Articles } from 'src/app/shared/api/article/article.model';
import { catchError, finalize } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { Category } from 'src/app/shared/api/article-category/article-category.model';
import { ErrorComponent } from 'src/app/shared/component/error/error.component';
import { LoadingCardComponent } from '../shared/component/loading-card/loading-card.component';
import { ArticleLabel } from 'src/app/shared/api/article-label/article-label.model';
import { ApiService } from 'src/app/shared/service/api.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    ArticleCardComponent,
    PaginationComponent,
    ErrorComponent,
    LoadingCardComponent,
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  articleSrv = inject(ArticleService);
  apiSrv = inject(ApiService);
  route = inject(ActivatedRoute);
  router = inject(Router);
  total = signal(0);
  articles = signal<Articles>([]);
  isLoading = signal(false);
  isError = signal(false);
  page = signal(1);
  private _destroyRef = inject(DestroyRef);

  ngOnInit() {
    this.route.queryParamMap.pipe(takeUntilDestroyed(this._destroyRef)).subscribe(params => {
      const page = params.get('page');
      const num = page ? parseInt(page) : 1;
      this.page.set(isNaN(num) ? 1 : num);
      this.getArticle(this.page());
    });
  }

  getArticle(page?: number, cache: boolean = true) {
    this.isError.set(false);
    this.isLoading.set(true);
    this.articleSrv
      .getArticle(page, cache)
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
    this.router.navigate(['/blog/home'], {
      queryParams: {
        page,
      },
    });
  }
}
