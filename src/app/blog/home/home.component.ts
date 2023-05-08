import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Component, DestroyRef, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArticleCardComponent } from '../shared/components/article-card/article-card.component';
import { PaginationComponent } from 'src/app/shared/components/pagination/pagination.component';
import { ArticleService } from 'src/app/shared/api/article/article.service';
import { SharedService } from 'src/app/shared/service/shared.service';
import { Articles } from 'src/app/shared/api/article/article.model';
import { catchError, finalize, delay } from 'rxjs';
import { Router } from '@angular/router';
import { ArticleCategory } from 'src/app/shared/api/article-category/article-category.model';
import { ErrorComponent } from 'src/app/shared/components/error/error.component';
import { LoadingCardComponent } from '../shared/components/loading-card/loading-card.component';

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
  sharedSrv = inject(SharedService);
  router = inject(Router);
  total = signal(0);
  articles = signal<Articles>([]);
  isLoading = signal(false);
  isError = signal(false);
  private _destroyRef = inject(DestroyRef);

  ngOnInit() {
    this.getArticle();
  }

  getArticle(page?: number) {
    this.isError.set(false);
    this.isLoading.set(true);
    this.articleSrv
      .getArticle(page)
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
}
