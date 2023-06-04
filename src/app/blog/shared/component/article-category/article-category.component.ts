import { Component, DestroyRef, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArticleCategoryService } from 'src/app/shared/api/article-category/article-category.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { catchError, finalize } from 'rxjs';
import { ErrorComponent } from 'src/app/shared/component/error/error.component';
import { ArticleCategorys } from 'src/app/shared/api/article-category/article-category.model';
import { RouterLink } from '@angular/router';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { heroFolder, heroMinus, heroPlus } from '@ng-icons/heroicons/outline';
import { ApiService } from 'src/app/shared/service/api.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-article-category',
  standalone: true,
  imports: [CommonModule, ErrorComponent, RouterLink, NgIconComponent, FormsModule],
  providers: [provideIcons({ heroFolder, heroPlus, heroMinus })],
  templateUrl: './article-category.component.html',
  styleUrls: ['./article-category.component.scss'],
})
export class ArticleCategoryComponent implements OnInit {
  open = signal(true);
  articleCategorySrv = inject(ArticleCategoryService);
  apiSrv = inject(ApiService);
  categorys = signal<ArticleCategorys>([]);
  isLoading = signal(false);
  isError = signal(false);
  private _destroyRef = inject(DestroyRef);

  ngOnInit() {
    this.getArticleCategory();
  }

  getArticleCategory(cache: boolean = true) {
    this.isLoading.set(true);
    this.isError.set(false);
    this.articleCategorySrv
      .getArticleCategory(undefined, cache)
      .pipe(
        finalize(() => this.isLoading.set(false)),
        takeUntilDestroyed(this._destroyRef),
      )
      .subscribe({
        next: res => {
          if (this.apiSrv.ifSuccess(res, false)) {
            const {
              data: { categorys },
            } = res;
            this.categorys.set(categorys);
          } else {
            this.isError.set(true);
          }
        },
        error: () => {
          this.isError.set(true);
        },
      });
  }
}
