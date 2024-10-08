import { Component, DestroyRef, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { tap, filter, map, switchMap, finalize } from 'rxjs';
import { ArticleCategory } from 'src/app/shared/api/article-category/article-category.model';
import { ArticleCategoryService } from 'src/app/shared/api/article-category/article-category.service';
import { SwalService, SwalIcon } from 'src/app/shared/service/swal.service';
import { InputComponent } from '../../../shared/component/form/input/input.component';
import { ApiService } from 'src/app/shared/service/api.service';
import { UserService } from 'src/app/shared/service/user.service';
import { AdminArticleCategoryService } from 'src/app/shared/api/admin-category/admin-article-category.service';
import { UpdateArticleCategoryRequest } from 'src/app/shared/api/admin-category/admin-article-category.model';

@Component({
  selector: 'app-article-category-edit',
  standalone: true,
  templateUrl: './article-category-edit.component.html',
  styleUrls: ['./article-category-edit.component.scss'],
  imports: [CommonModule, InputComponent, ReactiveFormsModule],
})
export class ArticleCategoryEditComponent {
  apiSrv = inject(ApiService);
  userSrv = inject(UserService);
  swalSrv = inject(SwalService);
  articleCategorySrv = inject(AdminArticleCategoryService);
  route = inject(ActivatedRoute);
  router = inject(Router);
  isLoading = signal(false);
  editIsLoading = signal(false);
  isError = signal(false);
  private _destroyRef = inject(DestroyRef);
  form = new FormGroup({
    categoryId: new FormControl<undefined | number>(undefined, [Validators.required]),
    categoryName: new FormControl('', [Validators.required]),
  });

  ngOnInit(): void {
    this.route.paramMap
      .pipe(
        tap(() => this.isLoading.set(true)),
        filter(param => !!param.get('id')),
        map(param => param.get('id')!),
        filter(id => !isNaN(parseInt(id))),
        map(id => parseInt(id)),
        switchMap(id => this.articleCategorySrv.getArticleCategoryById(id)),
        filter(res => this.apiSrv.ifSuccess(res)),
        map(({ data }) => data),
        takeUntilDestroyed(this._destroyRef),
      )
      .subscribe(res => {
        const { categoryId, categoryName } = res as ArticleCategory;
        this.form.controls.categoryId.setValue(categoryId);
        this.form.controls.categoryName.setValue(categoryName);
        this.isLoading.set(false);
      });
  }

  submit() {
    this.form.markAllAsTouched();
    if (this.form.invalid) {
      return;
    }
    const req = {
      categoryId: this.form.controls.categoryId.value,
      categoryName: this.form.controls.categoryName.value,
      userId: this.userSrv.getUserId(),
    } as UpdateArticleCategoryRequest;
    this.editIsLoading.set(true);
    this.articleCategorySrv
      .updateArticleCategory(req)
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
      .subscribe(() => this.router.navigate(['/setting/article-category/detail']));
  }
}
