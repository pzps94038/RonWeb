import { Component, DestroyRef, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { EditorComponent } from 'src/app/shared/component/form/editor/editor.component';
import { InputComponent } from 'src/app/shared/component/form/input/input.component';
import {
  Options,
  SelectComponent,
  Option,
} from 'src/app/shared/component/form/select/select.component';
import { TextAreaComponent } from 'src/app/shared/component/form/text-area/text-area.component';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { filter, finalize, forkJoin, map, switchMap, tap } from 'rxjs';
import { SwalService, SwalIcon } from 'src/app/shared/service/swal.service';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadArticleComponent } from '../shared/component/load-article/load-article.component';
import { UploadFile, UploadFiles } from 'src/app/shared/api/upload/upload.model';
import { MultipleSelectComponent } from 'src/app/shared/component/form/multiple-select/multiple-select.component';
import { ArticleLabel } from 'src/app/shared/api/article-label/article-label.model';
import { ApiService } from 'src/app/shared/service/api.service';
import { UserService } from 'src/app/shared/service/user.service';
import { AdminArticleService } from 'src/app/shared/api/admin-article/admin-article.service';
import { UpdateArticleRequest } from 'src/app/shared/api/admin-article/admin-article.model';
import { AdminArticleLabelService } from 'src/app/shared/api/admin-article-label/admin-article-label.service';
import { AdminArticleCategoryService } from 'src/app/shared/api/admin-category/admin-article-category.service';
import { ToggleComponent } from 'src/app/shared/component/form/toggle/toggle.component';

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
    MultipleSelectComponent,
    ToggleComponent,
  ],
})
export class ArticleEditComponent {
  apiSrv = inject(ApiService);
  userSrv = inject(UserService);
  swalSrv = inject(SwalService);
  articleCategorySrv = inject(AdminArticleCategoryService);
  articleLabelSrv = inject(AdminArticleLabelService);
  articleSrv = inject(AdminArticleService);
  route = inject(ActivatedRoute);
  router = inject(Router);
  isLoading = signal(false);
  editIsLoading = signal(false);
  files = signal<UploadFiles>([]);
  categoryOptions = signal<Options>([]);
  labelOptions = signal<Options>([]);
  prevFiles = signal<UploadFiles>([]);
  contentFiles = signal<UploadFiles>([]);
  form = new FormGroup({
    articleId: new FormControl<undefined | number>(undefined, [Validators.required]),
    articleTitle: new FormControl('', [Validators.required]),
    flag: new FormControl('', [Validators.required]),
    previewContent: new FormControl('', [Validators.required, Validators.maxLength(500)]),
    content: new FormControl('', [Validators.required]),
    categoryId: new FormControl<string | number>('', [Validators.required]),
    labels: new FormControl<number[]>([], [Validators.required]),
  });
  private _destroyRef = inject(DestroyRef);

  ngOnInit(): void {
    const category$ = this.articleCategorySrv.getArticleCategory(undefined).pipe(
      filter(res => this.apiSrv.ifSuccess(res)),
      map(({ data: { categorys } }) => categorys),
      map(array =>
        array.map(({ categoryId, categoryName }) => {
          return {
            value: categoryId,
            text: categoryName,
          } as Option;
        }),
      ),
      tap(options => {
        options = [
          {
            text: '請選擇文章分類',
            value: '',
            disabled: true,
          },
          ...options,
        ];
        this.categoryOptions.set(options);
      }),
    );
    const label$ = this.articleLabelSrv.getArticleLabel(undefined).pipe(
      filter(res => this.apiSrv.ifSuccess(res)),
      map(({ data: { labels } }) => labels),
      map(array =>
        array.map(label => {
          return {
            value: label.labelId,
            text: label.labelName,
          } as Option;
        }),
      ),
      tap(options => this.labelOptions.set(options)),
    );
    this.route.paramMap
      .pipe(
        tap(() => this.isLoading.set(true)),
        filter(param => !!param.get('id')),
        map(param => param.get('id')!),
        switchMap(id => this.articleSrv.getArticleById(parseInt(id))),
        filter(res => this.apiSrv.ifSuccess(res)),
        map(({ data }) => data),
        tap(data => {
          const { articleId, articleTitle, previewContent, content, categoryId, labels, flag } =
            data;
          this.form.get('articleId')?.setValue(articleId);
          this.form.get('articleTitle')?.setValue(articleTitle);
          this.form.get('content')?.setValue(content);
          this.form.get('categoryId')?.setValue(categoryId);
          this.form.get('previewContent')?.setValue(previewContent);
          this.form.get('flag')?.setValue(flag);
          const labelVal = labels.map(({ labelId }) => labelId);
          this.form.get('labels')?.setValue(labelVal);
        }),
        switchMap(() => forkJoin([category$, label$])),
        takeUntilDestroyed(this._destroyRef),
      )
      .subscribe(() => this.isLoading.set(false));
  }

  submit() {
    this.form.markAllAsTouched();
    if (!this.form.valid) {
      return;
    }
    const labelIds = (this.form.get('labels')?.value ?? []) as number[];
    const labels = this.labelOptions()
      .filter(a => labelIds.includes(a.value))
      .map(
        a =>
          ({
            labelId: a.value,
            labelName: a.text,
          } as ArticleLabel),
      );
    const req = {
      articleId: this.form.get('articleId')!.value,
      articleTitle: this.form.get('articleTitle')!.value,
      previewContent: this.form.get('previewContent')!.value,
      content: this.form.get('content')!.value,
      categoryId: this.form.get('categoryId')!.value,
      flag: this.form.get('flag')!.value,
      userId: this.userSrv.getUserId(),
      prevFiles: this.prevFiles(),
      contentFiles: this.contentFiles(),
      labels,
    } as UpdateArticleRequest;
    this.editIsLoading.set(true);
    this.articleSrv
      .updateArticle(req)
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
      .subscribe(() => {
        this.router.navigate(['/setting/article']);
      });
  }

  previewUpload(file: UploadFile) {
    this.prevFiles.update(files => [...files, file]);
  }

  contentUpload(file: UploadFile) {
    this.contentFiles.update(files => [...files, file]);
  }
}
