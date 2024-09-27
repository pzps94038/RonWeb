import { Component, DestroyRef, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { finalize, filter, switchMap } from 'rxjs';
import { SwalService, SwalIcon } from 'src/app/shared/service/swal.service';
import { provideIcons, NgIconComponent } from '@ng-icons/core';
import { heroPencilSquare, heroTrash } from '@ng-icons/heroicons/outline';
import { ErrorComponent } from 'src/app/shared/component/error/error.component';
import { PaginationComponent } from 'src/app/shared/component/pagination/pagination.component';
import { DayJsPipe } from 'src/app/shared/pipe/day-js.pipe';
import { ArticleLabels } from 'src/app/shared/api/article-label/article-label.model';
import { ApiService } from 'src/app/shared/service/api.service';
import { AdminArticleLabelService } from 'src/app/shared/api/admin-article-label/admin-article-label.service';
import { AdminCodeTypeService } from 'src/app/shared/api/admin-code-type/admin-code-type.service';
import { CodeTypes } from 'src/app/shared/api/admin-code-type/admin-code-type.model';

@Component({
  selector: 'app-code-type-detail',
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
  templateUrl: './code-type-detail.component.html',
  styleUrls: ['./code-type-detail.component.scss'],
})
export class CodeTypeDetailComponent {
  adminCodeTypeSrv = inject(AdminCodeTypeService);
  apiSrv = inject(ApiService);
  swalSrv = inject(SwalService);
  route = inject(ActivatedRoute);
  router = inject(Router);
  total = signal(0);
  codeTypes = signal<CodeTypes>([]);
  isLoading = signal(false);
  isError = signal(false);
  page = signal(1);
  private _destroyRef = inject(DestroyRef);

  ngOnInit() {
    this.route.queryParamMap.pipe(takeUntilDestroyed(this._destroyRef)).subscribe(params => {
      const page = params.get('page');
      const num = page ? parseInt(page) : 1;
      this.page.set(isNaN(num) ? 1 : num);
      this.getAdminCodeType(this.page());
    });
  }

  getAdminCodeType(page?: number) {
    this.isError.set(false);
    this.isLoading.set(true);
    this.adminCodeTypeSrv
      .getAdminCodeType(page)
      .pipe(
        finalize(() => this.isLoading.set(false)),
        takeUntilDestroyed(this._destroyRef),
      )
      .subscribe({
        next: res => {
          if (this.apiSrv.ifSuccess(res, false)) {
            const {
              data: { total, codeTypes },
            } = res;
            this.total.set(total);
            this.codeTypes.set(codeTypes);
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
    this.router.navigate(['/setting/code-type/detail'], {
      queryParams: {
        page,
      },
    });
  }

  deleteCodeType(id: number) {
    this.swalSrv
      .confirm({
        title: '確定要刪除代碼類型嗎?',
        text: '這個操作將永久刪除該代碼類型及相關的代碼。請確認您的決定，因為這些內容將無法恢復。',
      })
      .pipe(
        filter(({ isConfirmed }) => isConfirmed),
        switchMap(() => this.adminCodeTypeSrv.deleteAdminCodeType(id)),
        filter(res => this.apiSrv.ifSuccess(res)),
        switchMap(res => this.swalSrv.alert({ icon: SwalIcon.Success, text: res.returnMessage })),
        takeUntilDestroyed(this._destroyRef),
      )
      .subscribe(() => {
        this.page.set(1);
        this.getAdminCodeType(this.page());
      });
  }

  refreshCodeType() {
    this.page.set(1);
    this.getAdminCodeType(this.page());
  }
}
