import { Component, DestroyRef, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputComponent } from 'src/app/shared/components/form/input/input.component';
import { TextAreaComponent } from 'src/app/shared/components/form/text-area/text-area.component';
import { EditorComponent } from 'src/app/shared/components/form/editor/editor.component';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { SharedService } from 'src/app/shared/service/shared.service';
import { SwalIcon, SwalService } from 'src/app/shared/service/swal.service';
import { ArticleCategoryService } from 'src/app/shared/api/article-category/article-category.service';
import {
  Option,
  Options,
  SelectComponent,
} from 'src/app/shared/components/form/select/select.component';
import { filter, finalize, map, switchMap } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ArticleService } from 'src/app/shared/api/article/article.service';
import { CreateArticleRequest } from 'src/app/shared/api/article/article.model';
import { Router } from '@angular/router';
import { LoadArticleComponent } from '../shared/load-article/load-article.component';

@Component({
  selector: 'app-article-create',
  standalone: true,
  templateUrl: './article-create.component.html',
  styleUrls: ['./article-create.component.scss'],
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
export class ArticleCreateComponent implements OnInit {
  sharedSrv = inject(SharedService);
  swalSrv = inject(SwalService);
  articleCategorySrv = inject(ArticleCategoryService);
  articleSrv = inject(ArticleService);
  router = inject(Router);
  isLoading = signal(false);
  createIsLoading = signal(false);
  private _destroyRef = inject(DestroyRef);
  categoryOptions = signal<Options>([]);
  form = new FormGroup({
    articleTitle: new FormControl('', [Validators.required]),
    previewContent: new FormControl('', [Validators.required]),
    content: new FormControl('', [Validators.required]),
    categoryId: new FormControl('', [Validators.required]),
  });

  ngOnInit(): void {
    this.isLoading.set(true);
    this.articleCategorySrv
      .getArticleCategory()
      .pipe(
        filter(res => this.sharedSrv.ifSuccess(res)),
        map(({ data }) => data),
        map(array =>
          array.map(({ categoryId, categoryName }) => {
            return {
              value: categoryId,
              text: categoryName,
            } as Option;
          }),
        ),
        finalize(() => this.isLoading.set(false)),
        takeUntilDestroyed(this._destroyRef),
      )
      .subscribe(options => {
        options = [
          {
            text: '請選擇文章分類',
            value: '',
            disabled: true,
          },
          ...options,
        ];
        this.categoryOptions.set(options);
      });
  }

  submit() {
    this.form.markAllAsTouched();
    if (!this.form.valid) {
      return;
    }
    const req = {
      articleTitle: this.form.get('articleTitle')!.value,
      previewContent: this.form.get('previewContent')!.value,
      content: this.form.get('content')!.value,
      categoryId: this.form.get('categoryId')!.value,
      userId: this.sharedSrv.getUserId(),
    } as CreateArticleRequest;
    this.createIsLoading.set(true);
    this.articleSrv
      .createArticle(req)
      .pipe(
        filter(res => this.sharedSrv.ifSuccess(res)),
        switchMap(({ returnMessage }) =>
          this.swalSrv.alert({
            icon: SwalIcon.Success,
            text: returnMessage,
          }),
        ),
        finalize(() => this.createIsLoading.set(false)),
        takeUntilDestroyed(this._destroyRef),
      )
      .subscribe(() => {
        this.router.navigate(['/setting/article']);
      });
  }
}
