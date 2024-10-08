import { Component, DestroyRef, OnInit, inject, signal } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { InputComponent } from 'src/app/shared/component/form/input/input.component';
import { TextAreaComponent } from 'src/app/shared/component/form/text-area/text-area.component';
import { EditorComponent } from 'src/app/shared/component/form/editor/editor.component';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { SwalIcon, SwalService } from 'src/app/shared/service/swal.service';
import {
  Option,
  Options,
  SelectComponent,
} from 'src/app/shared/component/form/select/select.component';
import { filter, finalize, forkJoin, map, switchMap, tap } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Router } from '@angular/router';
import { LoadArticleComponent } from '../shared/component/load-article/load-article.component';
import { UploadFile, UploadFiles } from 'src/app/shared/api/upload/upload.model';
import { MultipleSelectComponent } from 'src/app/shared/component/form/multiple-select/multiple-select.component';
import { ArticleLabel } from 'src/app/shared/api/article-label/article-label.model';
import { ApiService } from 'src/app/shared/service/api.service';
import { UserService } from 'src/app/shared/service/user.service';
import { AdminArticleService } from 'src/app/shared/api/admin-article/admin-article.service';
import { CreateArticleRequest } from 'src/app/shared/api/admin-article/admin-article.model';
import { AdminArticleCategoryService } from 'src/app/shared/api/admin-category/admin-article-category.service';
import { AdminArticleLabelService } from 'src/app/shared/api/admin-article-label/admin-article-label.service';
import { ToggleComponent } from 'src/app/shared/component/form/toggle/toggle.component';
import { DynamicInputComponent } from 'src/app/shared/component/form/dynamic-input/dynamic-input.component';
import { ArticleLabelService } from 'src/app/shared/api/article-label/article-label.service';
import { ArticleCategoryService } from 'src/app/shared/api/article-category/article-category.service';
import { UploadAdapterService } from 'src/app/shared/service/upload-adapter.service';

@Component({
  selector: 'app-article-create',
  templateUrl: './article-create.component.html',
  styleUrls: ['./article-create.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    InputComponent,
    TextAreaComponent,
    EditorComponent,
    ReactiveFormsModule,
    SelectComponent,
    MultipleSelectComponent,
    LoadArticleComponent,
    ToggleComponent,
    DynamicInputComponent,
  ],
})
export class ArticleCreateComponent implements OnInit {
  apiSrv = inject(ApiService);
  userSrv = inject(UserService);
  swalSrv = inject(SwalService);
  articleCategorySrv = inject(ArticleCategoryService);
  articleLabelSrv = inject(ArticleLabelService);
  articleSrv = inject(AdminArticleService);
  uploadAdapterSrv = inject(UploadAdapterService);
  router = inject(Router);
  location = inject(Location);
  isLoading = signal(false);
  createIsLoading = signal(false);
  categoryOptions = signal<Options>([]);
  labelOptions = signal<Options>([]);
  prevFiles = signal<UploadFiles>([]);
  contentFiles = signal<UploadFiles>([]);
  previewContentUploadAdapter = this.uploadAdapterSrv.createArticleAdapter();
  contentUploadAdapter = this.uploadAdapterSrv.createArticleAdapter();
  form = new FormGroup({
    articleTitle: new FormControl('', [Validators.required]),
    labels: new FormControl([], []),
    flag: new FormControl('Y', [Validators.required]),
    previewContent: new FormControl('', [Validators.required]),
    content: new FormControl('', [Validators.required]),
    categoryId: new FormControl<number | string>('', [Validators.required]),
    references: new FormControl<string[]>([]),
  });
  private _destroyRef = inject(DestroyRef);

  ngOnInit(): void {
    this.isLoading.set(true);
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
    forkJoin([category$, label$])
      .pipe(
        finalize(() => this.isLoading.set(false)),
        takeUntilDestroyed(this._destroyRef),
      )
      .subscribe();
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
      articleTitle: this.form.controls.articleTitle.value,
      previewContent: this.form.controls.previewContent.value,
      content: this.form.controls.content.value,
      categoryId: this.form.controls.categoryId.value,
      flag: this.form.controls.flag.value,
      userId: this.userSrv.getUserId(),
      prevFiles: this.prevFiles(),
      contentFiles: this.contentFiles(),
      labels,
      references: this.form.controls.references.value,
    } as CreateArticleRequest;
    this.createIsLoading.set(true);
    this.articleSrv
      .createArticle(req)
      .pipe(
        filter(res => this.apiSrv.ifSuccess(res)),
        switchMap(({ returnMessage }) =>
          this.swalSrv.alert({
            icon: SwalIcon.Success,
            text: returnMessage,
          }),
        ),
        finalize(() => this.createIsLoading.set(false)),
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
