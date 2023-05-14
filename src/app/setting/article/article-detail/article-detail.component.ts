import { Component, DestroyRef, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { heroPencilSquare, heroTrash } from '@ng-icons/heroicons/outline';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { ErrorComponent } from 'src/app/shared/components/error/error.component';
import { PaginationComponent } from 'src/app/shared/components/pagination/pagination.component';
import { DayJsPipe } from 'src/app/shared/pipe/day-js.pipe';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { catchError, finalize, filter, switchMap } from 'rxjs';
import { Articles } from 'src/app/shared/api/article/article.model';
import { ArticleService } from 'src/app/shared/api/article/article.service';
import { SharedService } from 'src/app/shared/service/shared.service';
import { SwalService, SwalIcon } from 'src/app/shared/service/swal.service';

@Component({
  selector: 'app-article-detail',
  standalone: true,
  providers: [provideIcons({ heroPencilSquare, heroTrash })],
  imports: [
    CommonModule,
    NgIconComponent,
    ErrorComponent,
    PaginationComponent,
    DayJsPipe,
    RouterOutlet,
  ],
  templateUrl: './article-detail.component.html',
  styleUrls: ['./article-detail.component.scss'],
})
export class ArticleDetailComponent {
  articleSrv = inject(ArticleService);
  sharedSrv = inject(SharedService);
  swalSrv = inject(SwalService);
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

  paginationChange(page: number) {
    this.router.navigate(['/setting/article'], {
      queryParams: {
        page,
      },
    });
  }

  deleteArticle(id: string) {
    this.swalSrv
      .confirm({
        text: '確定要刪除文章嗎?',
      })
      .pipe(
        filter(({ isConfirmed }) => isConfirmed),
        switchMap(() => this.articleSrv.deleteArticle(id)),
        filter(res => this.sharedSrv.ifSuccess(res, true)),
        switchMap(res => this.swalSrv.alert({ icon: SwalIcon.Success, text: res.returnMessage })),
        takeUntilDestroyed(this._destroyRef),
      )
      .subscribe(() => this.getArticle());
  }
}
