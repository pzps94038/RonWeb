import { Component, DestroyRef, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputComponent } from 'src/app/shared/component/form/input/input.component';
import { ActivatedRoute, Router } from '@angular/router';
import { SwalIcon, SwalService } from 'src/app/shared/service/swal.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { tap, filter, map, switchMap, finalize } from 'rxjs';
import { ApiService } from 'src/app/shared/service/api.service';
import { UserService } from 'src/app/shared/service/user.service';
import { AdminCodeTypeService } from 'src/app/shared/api/admin-code-type/admin-code-type.service';
import {
  CodeType,
  UpdateAdminCodeTypeRequest,
} from 'src/app/shared/api/admin-code-type/admin-code-type.model';

@Component({
  selector: 'app-code-type-edit',
  standalone: true,
  imports: [CommonModule, InputComponent, ReactiveFormsModule],
  templateUrl: './code-type-edit.component.html',
  styleUrls: ['./code-type-edit.component.scss'],
})
export class CodeTypeEditComponent implements OnInit {
  apiSrv = inject(ApiService);
  userSrv = inject(UserService);
  swalSrv = inject(SwalService);
  adminCodeTypeSrv = inject(AdminCodeTypeService);
  route = inject(ActivatedRoute);
  router = inject(Router);
  isLoading = signal(false);
  editIsLoading = signal(false);
  isError = signal(false);
  private _destroyRef = inject(DestroyRef);
  form = new FormGroup({
    id: new FormControl<undefined | number>(undefined, [Validators.required]),
    codeTypeId: new FormControl('', [Validators.required]),
    codeTypeName: new FormControl('', [Validators.required]),
  });

  ngOnInit(): void {
    this.route.paramMap
      .pipe(
        tap(() => this.isLoading.set(true)),
        filter(param => !!param.get('id')),
        map(param => param.get('id')!),
        filter(id => !isNaN(parseInt(id))),
        map(id => parseInt(id)),
        switchMap(id => this.adminCodeTypeSrv.getAdminCodeTypeById(id)),
        filter(res => this.apiSrv.ifSuccess(res)),
        map(({ data }) => data),
        takeUntilDestroyed(this._destroyRef),
      )
      .subscribe(res => {
        const { id, codeTypeId, codeTypeName } = res as CodeType;
        this.form.controls.id.setValue(id);
        this.form.controls.codeTypeId.setValue(codeTypeId);
        this.form.controls.codeTypeName.setValue(codeTypeName);
        this.isLoading.set(false);
      });
  }

  submit() {
    this.form.markAllAsTouched();
    if (this.form.invalid) {
      return;
    }
    const req = {
      codeTypeId: this.form.controls.codeTypeId.value,
      codeTypeName: this.form.controls.codeTypeName.value,
      userId: this.userSrv.getUserId(),
    } as UpdateAdminCodeTypeRequest;
    this.editIsLoading.set(true);
    this.adminCodeTypeSrv
      .updateAdminCodeType(this.form.controls.id.value!, req)
      .pipe(
        filter(res => this.apiSrv.ifSuccess(res, true)),
        switchMap(({ returnMessage }) =>
          this.swalSrv.alert({
            icon: SwalIcon.Success,
            text: returnMessage,
          }),
        ),
        finalize(() => this.editIsLoading.set(false)),
        takeUntilDestroyed(this._destroyRef),
      )
      .subscribe(() => this.router.navigate(['/setting/code-type']));
  }
}
