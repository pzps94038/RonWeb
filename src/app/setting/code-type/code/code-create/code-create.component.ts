import { Component, DestroyRef, OnInit, inject, signal } from '@angular/core';
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
import { Codes, CreateAdminCodeRequest } from 'src/app/shared/api/admin-code/admin-code.model';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { CreateAdminCodeTypeRequest } from 'src/app/shared/api/admin-code-type/admin-code-type.model';
import { UserService } from 'src/app/shared/service/user.service';
import { InputComponent } from 'src/app/shared/component/form/input/input.component';
import { AdminCodeTypeService } from 'src/app/shared/api/admin-code-type/admin-code-type.service';

@Component({
  selector: 'app-code-create',
  standalone: true,
  imports: [
    CommonModule,
    PaginationComponent,
    NgIconComponent,
    RouterLink,
    DayJsPipe,
    ErrorComponent,
    InputComponent,
    ReactiveFormsModule,
  ],
  providers: [provideIcons({ heroPencilSquare, heroTrash })],
  templateUrl: './code-create.component.html',
  styleUrls: ['./code-create.component.scss'],
})
export class CodeCreateComponent implements OnInit {
  route = inject(ActivatedRoute);
  apiSrv = inject(ApiService);
  userSrv = inject(UserService);
  swalSrv = inject(SwalService);
  adminCodeSrv = inject(AdminCodeService);
  adminCodeTypeSrv = inject(AdminCodeTypeService);
  router = inject(Router);
  isLoading = signal(false);
  private _destroyRef = inject(DestroyRef);
  form = new FormGroup({
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
    this.route.paramMap.pipe(takeUntilDestroyed(this._destroyRef)).subscribe(params => {
      const codeTypeId = params.get('code-type-id');
      this.form.controls.codeTypeId.setValue(codeTypeId);
      this.form.controls.codeTypeName.setValue(history?.state?.codeTypeName);
    });
  }

  submit() {
    this.form.markAllAsTouched();
    if (this.form.invalid) {
      return;
    }
    const req = {
      codeTypeId: this.form.controls.codeTypeId.value,
      codeId: this.form.controls.codeId.value,
      codeName: this.form.controls.codeName.value,
      userId: this.userSrv.getUserId(),
    } as CreateAdminCodeRequest;
    this.isLoading.set(true);
    this.adminCodeSrv
      .createAdminCode(req)
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
      .subscribe(() =>
        this.router.navigate([`/setting/code-type/${this.form.controls.codeTypeId}`]),
      );
  }
}
