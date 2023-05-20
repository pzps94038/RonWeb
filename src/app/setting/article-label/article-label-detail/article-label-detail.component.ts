import { Component, DestroyRef, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { catchError, finalize, filter, switchMap } from 'rxjs';
import { SharedService } from 'src/app/shared/service/shared.service';
import { SwalService, SwalIcon } from 'src/app/shared/service/swal.service';
import { provideIcons, NgIconComponent } from '@ng-icons/core';
import { heroPencilSquare, heroTrash } from '@ng-icons/heroicons/outline';
import { ErrorComponent } from 'src/app/shared/component/error/error.component';
import { PaginationComponent } from 'src/app/shared/component/pagination/pagination.component';
import { DayJsPipe } from 'src/app/shared/pipe/day-js.pipe';
import { ArticleLabelService } from 'src/app/shared/api/article-label/article-label.service';
import { ArticleLabels } from 'src/app/shared/api/article-label/article-label.model';

@Component({
  selector: 'app-article-label-detail',
  standalone: true,
  imports: [
    CommonModule,
    PaginationComponent,
    NgIconComponent,
    RouterLink,
    DayJsPipe,
    ErrorComponent,
  ],
  providers: [provideIcons({ heroPencilSquare, heroTrash })],
  templateUrl: './article-label-detail.component.html',
  styleUrls: ['./article-label-detail.component.scss'],
})
export class ArticleLabelDetailComponent {
  articleLabelSrv = inject(ArticleLabelService);
  sharedSrv = inject(SharedService);
  swalSrv = inject(SwalService);
  route = inject(ActivatedRoute);
  router = inject(Router);
  total = signal(0);
  labels = signal<ArticleLabels>([]);
  isLoading = signal(false);
  isError = signal(false);
  page = signal(1);
  private _destroyRef = inject(DestroyRef);

  ngOnInit() {
    this.route.queryParamMap.pipe(takeUntilDestroyed(this._destroyRef)).subscribe(params => {
      const page = params.get('page');
      const num = page ? parseInt(page) : 1;
      this.page.set(isNaN(num) ? 1 : num);
      this.getArticleLabel(this.page());
    });
  }

  getArticleLabel(page?: number) {
    this.isError.set(false);
    this.isLoading.set(true);
    this.articleLabelSrv
      .getArticleLabel(page)
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
            data: { total, labels },
          } = res;
          this.total.set(total);
          this.labels.set(labels);
        } else {
          this.isError.set(true);
        }
      });
  }

  paginationChange(page: number) {
    this.router.navigate(['/setting/article-label'], {
      queryParams: {
        page,
      },
    });
  }

  deleteArticleLabel(id: number) {
    this.swalSrv
      .confirm({
        title: '確定要刪除標籤嗎?',
        text: '這個操作將永久刪除該標籤及相關的所有文章的對應關係。請確認您的決定，因為這些內容將無法恢復。',
      })
      .pipe(
        filter(({ isConfirmed }) => isConfirmed),
        switchMap(() => this.articleLabelSrv.deleteArticleLabel(id)),
        filter(res => this.sharedSrv.ifSuccess(res)),
        switchMap(res => this.swalSrv.alert({ icon: SwalIcon.Success, text: res.returnMessage })),
        takeUntilDestroyed(this._destroyRef),
      )
      .subscribe(() => {
        this.page.set(1);
        this.getArticleLabel(this.page());
      });
  }

  refreshArticleLabel() {
    this.page.set(1);
    this.getArticleLabel(this.page());
  }
}
