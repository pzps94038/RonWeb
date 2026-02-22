import { Component, DestroyRef, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { finalize, filter, switchMap, combineLatest } from 'rxjs';
import { SwalService, SwalIcon } from 'src/app/shared/service/swal.service';
import { provideIcons, NgIconComponent } from '@ng-icons/core';
import { heroPencilSquare, heroTrash } from '@ng-icons/heroicons/outline';
import { ErrorComponent } from 'src/app/shared/component/error/error.component';
import { PaginationComponent } from 'src/app/shared/component/pagination/pagination.component';
import { DayJsPipe } from 'src/app/shared/pipe/day-js.pipe';
import { ApiService } from 'src/app/shared/service/api.service';
import { AdminCodeService } from 'src/app/shared/api/admin-code/admin-code.service';
import { Codes } from 'src/app/shared/api/admin-code/admin-code.model';

@Component({
  selector: 'app-code-detail',
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
  templateUrl: './code-detail.component.html',
  styleUrls: ['./code-detail.component.scss'],
})
export class CodeDetailComponent {
  adminCodeSrv = inject(AdminCodeService);
  apiSrv = inject(ApiService);
  swalSrv = inject(SwalService);
  route = inject(ActivatedRoute);
  router = inject(Router);
  total = signal(0);
  codes = signal<Codes>([]);
  codeTypeId = signal<string | null>(null);
  codeTypeName = signal<string | null>(null);
  isLoading = signal(false);
  isError = signal(false);
  page = signal(1);
  private _destroyRef = inject(DestroyRef);

  ngOnInit() {
    combineLatest([this.route.paramMap, this.route.queryParamMap])
      .pipe(takeUntilDestroyed(this._destroyRef))
      .subscribe(([params, queryParam]) => {
        const codeTypeId = params.get('code-type-id');
        this.codeTypeId.set(codeTypeId);
        const page = queryParam.get('page');
        const num = page ? parseInt(page) : 1;
        this.page.set(isNaN(num) ? 1 : num);
        this.getAdminCode(codeTypeId!, this.page());
      });
  }

  getAdminCode(codeTypeId: string, page?: number) {
    this.isError.set(false);
    this.isLoading.set(true);
    this.adminCodeSrv
      .getAdminCode(codeTypeId, page)
      .pipe(
        finalize(() => this.isLoading.set(false)),
        takeUntilDestroyed(this._destroyRef),
      )
      .subscribe({
        next: res => {
          if (this.apiSrv.ifSuccess(res, false)) {
            const {
              data: { total, codes, codeTypeId, codeTypeName },
            } = res;
            this.total.set(total);
            this.codes.set(codes);
            this.codeTypeId.set(codeTypeId);
            this.codeTypeName.set(codeTypeName);
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
    this.router.navigate([`/setting/code-type/${this.codeTypeId()}/detail`], {
      queryParams: {
        page,
      },
    });
  }

  deleteCode(id: number) {
    this.swalSrv
      .confirm({
        title: '確定要刪除代碼嗎?',
        text: '這個操作將永久刪除該代碼。請確認您的決定，因為這些內容將無法恢復。',
      })
      .pipe(
        filter(({ isConfirmed }) => isConfirmed),
        switchMap(() => this.adminCodeSrv.deleteAdminCode(id)),
        filter(res => this.apiSrv.ifSuccess(res)),
        switchMap(res => this.swalSrv.alert({ icon: SwalIcon.Success, text: res.returnMessage })),
        takeUntilDestroyed(this._destroyRef),
      )
      .subscribe(() => {
        this.page.set(1);
        this.getAdminCode(this.codeTypeId()!, this.page());
      });
  }

  refreshCode() {
    this.page.set(1);
    this.getAdminCode(this.codeTypeId()!, this.page());
  }
}
