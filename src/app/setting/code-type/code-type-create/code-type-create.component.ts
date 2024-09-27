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
import {
  ArticleLabels,
  CreateArticleLabelRequest,
} from 'src/app/shared/api/article-label/article-label.model';
import { ApiService } from 'src/app/shared/service/api.service';
import { AdminArticleLabelService } from 'src/app/shared/api/admin-article-label/admin-article-label.service';
import { AdminCodeTypeService } from 'src/app/shared/api/admin-code-type/admin-code-type.service';
import {
  CodeTypes,
  CreateAdminCodeTypeRequest,
} from 'src/app/shared/api/admin-code-type/admin-code-type.model';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputComponent } from 'src/app/shared/component/form/input/input.component';
import { UserService } from 'src/app/shared/service/user.service';
import { CreateAdminCodeRequest } from 'src/app/shared/api/admin-code/admin-code.model';

@Component({
  selector: 'app-code-type-create',
  standalone: true,
  imports: [CommonModule, InputComponent, ReactiveFormsModule],
  providers: [provideIcons({ heroPencilSquare, heroTrash })],
  templateUrl: './code-type-create.component.html',
  styleUrls: ['./code-type-create.component.scss'],
})
export class CodeTypeCreateComponent {
  apiSrv = inject(ApiService);
  userSrv = inject(UserService);
  swalSrv = inject(SwalService);
  adminCodeTypeSrv = inject(AdminCodeTypeService);
  router = inject(Router);
  isLoading = signal(false);
  private _destroyRef = inject(DestroyRef);
  form = new FormGroup({
    codeTypeId: new FormControl('', [Validators.required]),
    codeTypeName: new FormControl('', [Validators.required]),
  });

  submit() {
    this.form.markAllAsTouched();
    if (!this.form.valid) {
      return;
    }
    const req = {
      codeTypeId: this.form.get('codeTypeId')!.value,
      codeTypeName: this.form.get('codeTypeName')!.value,
      userId: this.userSrv.getUserId(),
    } as CreateAdminCodeTypeRequest;
    this.isLoading.set(true);
    this.adminCodeTypeSrv
      .createAdminCodeType(req)
      .pipe(
        filter(res => this.apiSrv.ifSuccess(res)),
        switchMap(({ returnMessage }) =>
          this.swalSrv.alert({
            icon: SwalIcon.Success,
            text: returnMessage,
          }),
        ),
        finalize(() => this.isLoading.set(false)),
        takeUntilDestroyed(this._destroyRef),
      )
      .subscribe(() => this.router.navigate(['/setting/code-type']));
  }
}
