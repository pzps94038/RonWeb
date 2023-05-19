import { Component, DestroyRef, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { tap, filter, map, switchMap, finalize } from 'rxjs';
import {
  ArticleCategorys,
  UpdateArticleCategoryRequest,
} from 'src/app/shared/api/article-category/article-category.model';
import { ArticleCategoryService } from 'src/app/shared/api/article-category/article-category.service';
import { UpdateArticleRequest } from 'src/app/shared/api/article/article.model';
import { ArticleService } from 'src/app/shared/api/article/article.service';
import { Options } from 'src/app/shared/component/header/header.component';
import { SharedService } from 'src/app/shared/service/shared.service';
import { SwalService, SwalIcon } from 'src/app/shared/service/swal.service';
import { InputComponent } from '../../../shared/component/form/input/input.component';

@Component({
  selector: 'app-article-category-edit',
  standalone: true,
  templateUrl: './article-category-edit.component.html',
  styleUrls: ['./article-category-edit.component.scss'],
  imports: [CommonModule, InputComponent, ReactiveFormsModule],
})
export class ArticleCategoryEditComponent {
  sharedSrv = inject(SharedService);
  swalSrv = inject(SwalService);
  articleCategorySrv = inject(ArticleCategoryService);
  route = inject(ActivatedRoute);
  router = inject(Router);
  isLoading = signal(false);
  editIsLoading = signal(false);
  isError = signal(false);
  private _destroyRef = inject(DestroyRef);
  form = new FormGroup({
    categoryId: new FormControl('', [Validators.required]),
    categoryName: new FormControl('', [Validators.required]),
  });

  ngOnInit(): void {
    this.route.paramMap
      .pipe(
        tap(() => this.isLoading.set(true)),
        filter(param => !!param.get('id')),
        map(param => param.get('id')!),
        switchMap(id => this.articleCategorySrv.getArticleCategoryById(id)),
        filter(res => this.sharedSrv.ifSuccess(res)),
        map(({ data }) => data),
        tap(({ categoryId, categoryName }) => {
          this.form.get<string>('articleId')?.setValue(categoryId);
          this.form.get<string>('categoryName')?.setValue(categoryName);
        }),
        takeUntilDestroyed(this._destroyRef),
      )
      .subscribe(({ categoryId, categoryName }) => {
        this.form.get<string>('articleId')?.setValue(categoryId);
        this.form.get<string>('categoryName')?.setValue(categoryName);
        this.isLoading.set(false);
      });
  }

  submit() {
    this.form.markAllAsTouched();
    if (!this.form.valid) {
      return;
    }
    const req = {
      categoryId: this.form.get('categoryId')!.value,
      categoryName: this.form.get('categoryName')!.value,
      userId: this.sharedSrv.getUserId(),
    } as UpdateArticleCategoryRequest;
    this.editIsLoading.set(true);
    this.articleCategorySrv
      .updateArticleCategory(req)
      .pipe(
        filter(res => this.sharedSrv.ifSuccess(res, true)),
        switchMap(({ returnMessage }) =>
          this.swalSrv.alert({
            icon: SwalIcon.Success,
            text: returnMessage,
          }),
        ),
        finalize(() => this.editIsLoading.set(false)),
        takeUntilDestroyed(this._destroyRef),
      )
      .subscribe(() => {
        this.router.navigate(['/setting/article-category']);
      });
  }
}
