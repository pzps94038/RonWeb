import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArticleCategoryService } from 'src/app/shared/api/article-category/article-category.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { catchError, finalize } from 'rxjs';
import { SharedService } from 'src/app/shared/service/shared.service';
import { ErrorComponent } from 'src/app/shared/components/error/error.component';
import { ArticleCategorys } from 'src/app/shared/api/article-category/article-category.model';

@Component({
  selector: 'app-article-category',
  standalone: true,
  imports: [CommonModule, ErrorComponent],
  templateUrl: './article-category.component.html',
  styleUrls: ['./article-category.component.scss'],
})
export class ArticleCategoryComponent {
  articleCategorySrv = inject(ArticleCategoryService);
  sharedSrv = inject(SharedService);
  categorys = signal<ArticleCategorys>([]);
  isLoading = signal(false);
  isError = signal(false);
  constructor() {
    this.getArticleCategory();
  }

  getArticleCategory() {
    this.isLoading.set(true);
    this.isError.set(false);
    this.articleCategorySrv
      .getArticleCategory()
      .pipe(
        catchError(err => {
          this.isError.set(true);
          throw err;
        }),
        finalize(() => this.isLoading.set(false)),
        takeUntilDestroyed(),
      )
      .subscribe(res => {
        if (this.sharedSrv.ifSuccess(res)) {
          this.categorys.set(res.data);
        } else {
          this.isError.set(true);
        }
      });
  }
}
