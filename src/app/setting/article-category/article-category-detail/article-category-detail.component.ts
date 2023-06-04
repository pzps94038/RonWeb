import { Component, DestroyRef, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArticleCategoryService } from 'src/app/shared/api/article-category/article-category.service';
import { SwalIcon, SwalService } from 'src/app/shared/service/swal.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ArticleCategorys } from 'src/app/shared/api/article-category/article-category.model';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { catchError, filter, finalize, switchMap } from 'rxjs';
import { PaginationComponent } from '../../../shared/component/pagination/pagination.component';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { heroPencilSquare, heroTrash } from '@ng-icons/heroicons/outline';
import { DayJsPipe } from '../../../shared/pipe/day-js.pipe';
import { ErrorComponent } from '../../../shared/component/error/error.component';
import { ApiService } from 'src/app/shared/service/api.service';

@Component({
  selector: 'app-article-category-detail',
  standalone: true,
  templateUrl: './article-category-detail.component.html',
  styleUrls: ['./article-category-detail.component.scss'],
  providers: [provideIcons({ heroPencilSquare, heroTrash })],
  imports: [
    CommonModule,
    PaginationComponent,
    NgIconComponent,
    RouterLink,
    DayJsPipe,
    ErrorComponent,
  ],
})
export class ArticleCategoryDetailComponent {
  articleCategorySrv = inject(ArticleCategoryService);
  apiSrv = inject(ApiService);
  swalSrv = inject(SwalService);
  route = inject(ActivatedRoute);
  router = inject(Router);
  total = signal(0);
  categorys = signal<ArticleCategorys>([]);
  isLoading = signal(false);
  isError = signal(false);
  page = signal(1);
  private _destroyRef = inject(DestroyRef);

  ngOnInit() {
    this.route.queryParamMap.pipe(takeUntilDestroyed(this._destroyRef)).subscribe(params => {
      const page = params.get('page');
      const num = page ? parseInt(page) : 1;
      this.page.set(isNaN(num) ? 1 : num);
      this.getArticleCategory(this.page());
    });
  }

  getArticleCategory(page?: number) {
    this.isError.set(false);
    this.isLoading.set(true);
    this.articleCategorySrv
      .getArticleCategory(page, false)
      .pipe(
        finalize(() => this.isLoading.set(false)),
        takeUntilDestroyed(this._destroyRef),
      )
      .subscribe({
        next: res => {
          if (this.apiSrv.ifSuccess(res, false)) {
            const {
              data: { total, categorys },
            } = res;
            this.total.set(total);
            this.categorys.set(categorys);
          } else {
            this.isError.set(true);
          }
        },
        error: () => {
          this.isError.set(true);
        },
      });
  }

  paginationChange(page: number) {
    this.router.navigate(['/setting/article-category'], {
      queryParams: {
        page,
      },
    });
  }

  deleteArticleCategory(id: number) {
    this.swalSrv
      .confirm({
        title: '確定要刪除分類嗎?',
        text: '這個操作將永久刪除該分類及相關的所有文章。請確認您的決定，因為這些內容將無法恢復。',
      })
      .pipe(
        filter(({ isConfirmed }) => isConfirmed),
        switchMap(() => this.articleCategorySrv.deleteArticleCategory(id)),
        filter(res => this.apiSrv.ifSuccess(res)),
        switchMap(res => this.swalSrv.alert({ icon: SwalIcon.Success, text: res.returnMessage })),
        takeUntilDestroyed(this._destroyRef),
      )
      .subscribe(() => {
        this.page.set(1);
        this.getArticleCategory(this.page());
      });
  }

  refreshArticleCategory() {
    this.page.set(1);
    this.getArticleCategory(this.page());
  }
}
