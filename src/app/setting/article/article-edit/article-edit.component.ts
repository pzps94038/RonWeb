import { Component, DestroyRef, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { EditorComponent } from 'src/app/shared/components/form/editor/editor.component';
import { InputComponent } from 'src/app/shared/components/form/input/input.component';
import {
  Options,
  SelectComponent,
  Option,
} from 'src/app/shared/components/form/select/select.component';
import { TextAreaComponent } from 'src/app/shared/components/form/text-area/text-area.component';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { filter, finalize, map, switchMap, tap } from 'rxjs';
import { ArticleCategoryService } from 'src/app/shared/api/article-category/article-category.service';
import {
  CreateArticleRequest,
  UpdateArticleRequest,
} from 'src/app/shared/api/article/article.model';
import { ArticleService } from 'src/app/shared/api/article/article.service';
import { SharedService } from 'src/app/shared/service/shared.service';
import { SwalService, SwalIcon } from 'src/app/shared/service/swal.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ArticleCategorys } from 'src/app/shared/api/article-category/article-category.model';
import { LoadArticleComponent } from '../shared/load-article/load-article.component';

@Component({
  selector: 'app-article-edit',
  standalone: true,
  templateUrl: './article-edit.component.html',
  styleUrls: ['./article-edit.component.scss'],
  imports: [
    CommonModule,
    InputComponent,
    TextAreaComponent,
    EditorComponent,
    ReactiveFormsModule,
    SelectComponent,
    LoadArticleComponent,
  ],
})
export class ArticleEditComponent {
  sharedSrv = inject(SharedService);
  swalSrv = inject(SwalService);
  articleCategorySrv = inject(ArticleCategoryService);
  articleSrv = inject(ArticleService);
  route = inject(ActivatedRoute);
  router = inject(Router);
  isLoading = signal(false);
  editIsLoading = signal(false);
  private _destroyRef = inject(DestroyRef);
  categoryOptions = signal<Options>([]);
  form = new FormGroup({
    articleId: new FormControl('', [Validators.required]),
    articleTitle: new FormControl('', [Validators.required]),
    previewContent: new FormControl('', [Validators.required]),
    content: new FormControl('', [Validators.required]),
    categoryId: new FormControl('', [Validators.required]),
  });

  ngOnInit(): void {
    this.route.paramMap
      .pipe(
        tap(() => this.isLoading.set(true)),
        filter(param => !!param.get('id')),
        map(param => param.get('id')!),
        switchMap(id => this.articleSrv.getArticleById(id)),
        filter(res => this.sharedSrv.ifSuccess(res)),
        map(({ data }) => data),
        tap(({ articleId, articleTitle, previewContent, content, categoryId }) => {
          this.form.get('articleId')?.setValue(articleId);
          this.form.get('articleTitle')?.setValue(articleTitle);
          this.form.get('content')?.setValue(content);
          this.form.get('categoryId')?.setValue(categoryId);
          this.form.get('previewContent')?.setValue(previewContent);
        }),
        switchMap(() => this.articleCategorySrv.getArticleCategory()),
        filter(res => this.sharedSrv.ifSuccess(res, true)),
        map(({ data }) => data),
        map((array: ArticleCategorys) =>
          array.map(({ categoryId, categoryName }) => {
            return {
              value: categoryId,
              text: categoryName,
            } as Option;
          }),
        ),
        takeUntilDestroyed(this._destroyRef),
      )
      .subscribe(options => {
        options = [
          {
            text: '請選擇文章分類',
            value: '',
            disabled: true,
          },
          ...(options as Options),
        ];
        this.categoryOptions.set(options as Options);
        this.isLoading.set(false);
      });
  }

  submit() {
    this.form.markAllAsTouched();
    if (!this.form.valid) {
      return;
    }
    const req = {
      articleId: this.form.get('articleId')!.value,
      articleTitle: this.form.get('articleTitle')!.value,
      previewContent: this.form.get('previewContent')!.value,
      content: this.form.get('content')!.value,
      categoryId: this.form.get('categoryId')!.value,
      userId: this.sharedSrv.getUserId(),
    } as UpdateArticleRequest;
    this.editIsLoading.set(true);
    this.articleSrv
      .updateArticle(req)
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
        this.router.navigate(['/setting/article']);
      });
  }
}
