import { Component, DestroyRef, inject, signal } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
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
import { DynamicInputComponent } from 'src/app/shared/component/form/dynamic-input/dynamic-input.component';
import { ArticleCategoryService } from 'src/app/shared/api/article-category/article-category.service';
import { ArticleLabelService } from 'src/app/shared/api/article-label/article-label.service';
import { UploadAdapterService } from 'src/app/shared/service/upload-adapter.service';

@Component({
  selector: 'app-article-edit',
  templateUrl: './article-edit.component.html',
  styleUrls: ['./article-edit.component.scss'],
  standalone: true,
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
    DynamicInputComponent,
  ],
})
export class ArticleEditComponent {
  apiSrv = inject(ApiService);
  userSrv = inject(UserService);
  swalSrv = inject(SwalService);
  articleCategorySrv = inject(ArticleCategoryService);
  articleLabelSrv = inject(ArticleLabelService);
  articleSrv = inject(AdminArticleService);
  uploadAdapterSrv = inject(UploadAdapterService);
  route = inject(ActivatedRoute);
  router = inject(Router);
  location = inject(Location);
  isLoading = signal(false);
  editIsLoading = signal(false);
  files = signal<UploadFiles>([]);
  categoryOptions = signal<Options>([]);
  labelOptions = signal<Options>([]);
  prevFiles = signal<UploadFiles>([]);
  contentFiles = signal<UploadFiles>([]);
  uploadAdapter = this.uploadAdapterSrv.createArticleAdapter();
  form = new FormGroup({
    articleId: new FormControl<undefined | number>(undefined, [Validators.required]),
    articleTitle: new FormControl('', [Validators.required]),
    flag: new FormControl('', [Validators.required]),
    previewContent: new FormControl('', [Validators.required]),
    content: new FormControl('', [Validators.required]),
    categoryId: new FormControl<string | number>('', [Validators.required]),
    labels: new FormControl<number[]>([]),
    references: new FormControl<string[]>([]),
  });
  private _destroyRef = inject(DestroyRef);

  ngOnInit(): void {
    const category$ = this.articleCategorySrv.getArticleCategory().pipe(
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
    const label$ = this.articleLabelSrv.getArticleLabel().pipe(
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
          const {
            articleId,
            articleTitle,
            previewContent,
            content,
            categoryId,
            labels,
            flag,
            references,
          } = data;
          this.form.controls.articleId.setValue(articleId);
          this.form.controls.articleTitle.setValue(articleTitle);
          this.form.controls.content.setValue(content);
          this.form.controls.categoryId.setValue(categoryId);
          this.form.controls.previewContent.setValue(previewContent);
          this.form.controls.flag.setValue(flag);
          const labelVal = labels.map(({ labelId }) => labelId);
          this.form.controls.labels.setValue(labelVal);
          this.form.controls.references.setValue(references);
        }),
        switchMap(() => forkJoin([category$, label$])),
        takeUntilDestroyed(this._destroyRef),
      )
      .subscribe(() => this.isLoading.set(false));
  }

  submit() {
    this.form.markAllAsTouched();
    if (this.form.invalid) {
      return;
    }
    const labelIds = (this.form.controls.labels.value ?? []) as number[];
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
      articleId: this.form.controls.articleId.value,
      articleTitle: this.form.controls.articleTitle.value,
      previewContent: this.form.controls.previewContent.value,
      content: this.form.controls.content.value,
      categoryId: this.form.controls.categoryId.value,
      flag: this.form.controls.flag.value,
      userId: this.userSrv.getUserId(),
      prevFiles: this.prevFiles(),
      contentFiles: this.contentFiles(),
      references: this.form.controls.references.value,
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
      .subscribe(() => this.location.back());
  }

  previewUpload(file: UploadFile) {
    this.prevFiles.update(files => [...files, file]);
  }

  contentUpload(file: UploadFile) {
    this.contentFiles.update(files => [...files, file]);
  }
}
