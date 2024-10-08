import { Component, DestroyRef, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { filter, finalize, switchMap } from 'rxjs';
import { SwalService, SwalIcon } from 'src/app/shared/service/swal.service';
import { Router } from '@angular/router';
import { InputComponent } from '../../../shared/component/form/input/input.component';
import { ApiService } from 'src/app/shared/service/api.service';
import { UserService } from 'src/app/shared/service/user.service';
import { AdminArticleCategoryService } from 'src/app/shared/api/admin-category/admin-article-category.service';
import { CreateArticleCategoryRequest } from 'src/app/shared/api/admin-category/admin-article-category.model';

@Component({
  selector: 'app-article-category-create',
  standalone: true,
  templateUrl: './article-category-create.component.html',
  styleUrls: ['./article-category-create.component.scss'],
  imports: [CommonModule, InputComponent, ReactiveFormsModule],
})
export class ArticleCategoryCreateComponent {
  apiSrv = inject(ApiService);
  userSrv = inject(UserService);
  swalSrv = inject(SwalService);
  articleCategorySrv = inject(AdminArticleCategoryService);
  router = inject(Router);
  isLoading = signal(false);
  private _destroyRef = inject(DestroyRef);
  form = new FormGroup({
    categoryName: new FormControl('', [Validators.required]),
  });

  submit() {
    this.form.markAllAsTouched();
    if (this.form.invalid) {
      return;
    }
    const req = {
      categoryName: this.form.controls.categoryName.value,
      userId: this.userSrv.getUserId(),
    } as CreateArticleCategoryRequest;
    this.isLoading.set(true);
    this.articleCategorySrv
      .createArticleCategory(req)
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
      .subscribe(() => this.router.navigate(['/setting/article-category/detail']));
  }
}
