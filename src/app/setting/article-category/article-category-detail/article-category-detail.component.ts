import { Component, DestroyRef, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArticleCategoryService } from 'src/app/shared/api/article-category/article-category.service';
import { SharedService } from 'src/app/shared/service/shared.service';
import { SwalIcon, SwalService } from 'src/app/shared/service/swal.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ArticleCategorys } from 'src/app/shared/api/article-category/article-category.model';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { catchError, filter, finalize, switchMap } from 'rxjs';
import { PaginationComponent } from '../../../shared/components/pagination/pagination.component';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { heroPencilSquare, heroTrash } from '@ng-icons/heroicons/outline';
import { DayJsPipe } from '../../../shared/pipe/day-js.pipe';
import { ErrorComponent } from '../../../shared/components/error/error.component';

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
  sharedSrv = inject(SharedService);
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
      .getArticleCategory(page)
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
            data: { total, categorys },
          } = res;
          this.total.set(total);
          this.categorys.set(categorys);
        } else {
          this.isError.set(true);
        }
      });
  }

  paginationChange(page: number) {
    this.router.navigate(['/setting/article-category'], {
      queryParams: {
        page,
      },
    });
  }

  deleteArticleCategory(id: string) {
    this.swalSrv
      .confirm({
        text: '確定要刪除分類嗎?',
      })
      .pipe(
        filter(({ isConfirmed }) => isConfirmed),
        switchMap(() => this.articleCategorySrv.deleteAtircleCategory(id)),
        filter(res => this.sharedSrv.ifSuccess(res)),
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
