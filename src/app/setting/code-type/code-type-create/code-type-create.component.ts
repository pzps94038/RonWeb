import { Component, DestroyRef, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Router } from '@angular/router';
import { finalize, filter, switchMap } from 'rxjs';
import { SwalService, SwalIcon } from 'src/app/shared/service/swal.service';
import { provideIcons } from '@ng-icons/core';
import { heroPencilSquare, heroTrash } from '@ng-icons/heroicons/outline';
import { ApiService } from 'src/app/shared/service/api.service';
import { AdminCodeTypeService } from 'src/app/shared/api/admin-code-type/admin-code-type.service';
import { CreateAdminCodeTypeRequest } from 'src/app/shared/api/admin-code-type/admin-code-type.model';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputComponent } from 'src/app/shared/component/form/input/input.component';
import { UserService } from 'src/app/shared/service/user.service';

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
    if (this.form.invalid) {
      return;
    }
    const req = {
      codeTypeId: this.form.controls.codeTypeId.value,
      codeTypeName: this.form.controls.codeTypeName.value,
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
