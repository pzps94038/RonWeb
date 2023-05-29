import { FormsModule } from '@angular/forms';
import { ChangeDetectionStrategy, Component, DestroyRef, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { heroPencilSquare, heroTrash } from '@ng-icons/heroicons/outline';
import { ActivatedRoute, Router, RouterLink, RouterOutlet } from '@angular/router';
import { ErrorComponent } from 'src/app/shared/component/error/error.component';
import { PaginationComponent } from 'src/app/shared/component/pagination/pagination.component';
import { DayJsPipe } from 'src/app/shared/pipe/day-js.pipe';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { catchError, finalize, filter, switchMap } from 'rxjs';
import { Articles } from 'src/app/shared/api/article/article.model';
import { ArticleService } from 'src/app/shared/api/article/article.service';
import { SwalService, SwalIcon } from 'src/app/shared/service/swal.service';
import { ApiService } from 'src/app/shared/service/api.service';
import { InputComponent } from 'src/app/shared/component/form/input/input.component';

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
    RouterLink,
    FormsModule,
    InputComponent,
  ],
  templateUrl: './article-detail.component.html',
  styleUrls: ['./article-detail.component.scss'],
})
export class ArticleDetailComponent {
  articleSrv = inject(ArticleService);
  apiSrv = inject(ApiService);
  swalSrv = inject(SwalService);
  route = inject(ActivatedRoute);
  router = inject(Router);
  total = signal(0);
  articles = signal<Articles>([]);
  isLoading = signal(false);
  isError = signal(false);
  page = signal(1);
  keyword?: string;
  queryKeyword?: string;
  private _destroyRef = inject(DestroyRef);

  ngOnInit() {
    this.route.queryParamMap.pipe(takeUntilDestroyed(this._destroyRef)).subscribe(params => {
      const page = params.get('page');
      const keyword = (params.get('keyword') ? params.get('keyword') : undefined) as
        | string
        | undefined;
      const num = page ? parseInt(page) : 1;
      this.page.set(isNaN(num) ? 1 : num);
      this.queryKeyword = keyword;
      this.getArticle(this.page(), keyword);
    });
  }

  getArticle(page: number, keyword?: string) {
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
        } else {
          this.isError.set(true);
        }
      });
  }

  paginationChange(page?: number) {
    this.router.navigate(['/setting/article'], {
      queryParams: {
        page,
        keyword: !!this.queryKeyword ? this.queryKeyword : undefined,
      },
    });
  }

  deleteArticle(id: number) {
    this.swalSrv
      .confirm({
        text: '確定要刪除文章嗎?',
      })
      .pipe(
        filter(({ isConfirmed }) => isConfirmed),
        switchMap(() => this.articleSrv.deleteArticle(id)),
        filter(res => this.apiSrv.ifSuccess(res)),
        switchMap(res => this.swalSrv.alert({ icon: SwalIcon.Success, text: res.returnMessage })),
        takeUntilDestroyed(this._destroyRef),
      )
      .subscribe(() => this.paginationChange(1));
  }

  search() {
    this.queryKeyword = this.keyword;
    this.paginationChange(1);
  }
}
