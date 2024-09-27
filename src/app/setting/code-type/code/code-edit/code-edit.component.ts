import { Component, DestroyRef, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputComponent } from 'src/app/shared/component/form/input/input.component';
import { ActivatedRoute, Router } from '@angular/router';
import { SwalIcon, SwalService } from 'src/app/shared/service/swal.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { tap, filter, map, switchMap, finalize } from 'rxjs';
import { ArticleLabelService } from 'src/app/shared/api/article-label/article-label.service';
import { ArticleLabel } from 'src/app/shared/api/article-label/article-label.model';
import { ApiService } from 'src/app/shared/service/api.service';
import { UserService } from 'src/app/shared/service/user.service';
import { AdminArticleLabelService } from 'src/app/shared/api/admin-article-label/admin-article-label.service';
import { AdminCodeTypeService } from 'src/app/shared/api/admin-code-type/admin-code-type.service';
import {
  CodeType,
  UpdateAdminCodeTypeRequest,
} from 'src/app/shared/api/admin-code-type/admin-code-type.model';
import { AdminCodeService } from 'src/app/shared/api/admin-code/admin-code.service';
import { Code, UpdateAdminCodeRequest } from 'src/app/shared/api/admin-code/admin-code.model';

@Component({
  selector: 'app-code-edit',
  standalone: true,
  imports: [CommonModule, InputComponent, ReactiveFormsModule],
  templateUrl: './code-edit.component.html',
  styleUrls: ['./code-edit.component.scss'],
})
export class CodeEditComponent implements OnInit {
  apiSrv = inject(ApiService);
  userSrv = inject(UserService);
  swalSrv = inject(SwalService);
  adminCodeSrv = inject(AdminCodeService);
  route = inject(ActivatedRoute);
  router = inject(Router);
  isLoading = signal(false);
  editIsLoading = signal(false);
  isError = signal(false);
  private _destroyRef = inject(DestroyRef);
  form = new FormGroup({
    id: new FormControl<undefined | number>(undefined, [Validators.required]),
    codeTypeId: new FormControl(
      {
        value: '',
        disabled: true,
      },
      [Validators.required],
    ),
    codeTypeName: new FormControl(
      {
        value: '',
        disabled: true,
      },
      [Validators.required],
    ),
    codeId: new FormControl('', [Validators.required]),
    codeName: new FormControl('', [Validators.required]),
  });

  ngOnInit(): void {
    this.route.paramMap
      .pipe(
        tap(() => this.isLoading.set(true)),
        filter(param => !!param.get('id')),
        map(param => param.get('id')!),
        filter(id => !isNaN(parseInt(id))),
        map(id => parseInt(id)),
        switchMap(id => this.adminCodeSrv.getAdminCodeById(id)),
        filter(res => this.apiSrv.ifSuccess(res)),
        map(({ data }) => data),
        takeUntilDestroyed(this._destroyRef),
      )
      .subscribe(res => {
        const { id, codeId, codeName, codeTypeId, codeTypeName } = res as Code;
        this.form.get('id')?.setValue(id);
        this.form.get('codeId')?.setValue(codeId);
        this.form.get('codeName')?.setValue(codeName);
        this.form.get('codeTypeId')?.setValue(codeTypeId);
        this.form.get('codeTypeName')?.setValue(codeTypeName);
        this.isLoading.set(false);
      });
  }

  submit() {
    this.form.markAllAsTouched();
    if (this.form.invalid) {
      return;
    }
    const req = {
      codeTypeId: this.form.get('codeTypeId')!.value,
      codeId: this.form.get('codeId')!.value,
      codeName: this.form.get('codeName')!.value,
      userId: this.userSrv.getUserId(),
    } as UpdateAdminCodeRequest;
    this.editIsLoading.set(true);
    this.adminCodeSrv
      .updateAdminCode(this.form.get('id')!.value!, req)
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
      .subscribe(() =>
        this.router.navigate([`/setting/code-type/${this.form.get('codeTypeId')!.value}`]),
      );
  }
}
