import { Component, DestroyRef, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { finalize } from 'rxjs';
import { ErrorComponent } from 'src/app/shared/component/error/error.component';
import { CategoryItem } from 'src/app/shared/data/posts-index';
import { RouterLink } from '@angular/router';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { heroFolder } from '@ng-icons/heroicons/outline';
import { StaticContentService } from 'src/app/shared/service/static-content.service';

/**
 * 文章分類側邊欄元件
 * 從靜態 JSON 讀取分類列表並顯示。
 */
@Component({
  selector: 'app-article-category',
  standalone: true,
  imports: [CommonModule, ErrorComponent, RouterLink, NgIconComponent],
  providers: [provideIcons({ heroFolder })],
  templateUrl: './article-category.component.html',
  styleUrls: ['./article-category.component.scss'],
})
export class ArticleCategoryComponent implements OnInit {
  contentSrv = inject(StaticContentService);
  categorys = signal<CategoryItem[]>([]);
  isLoading = signal(false);
  isError = signal(false);
  private _destroyRef = inject(DestroyRef);

  ngOnInit() {
    this.getArticleCategory();
  }

  /**
   * 取得文章分類
   */
  getArticleCategory() {
    this.isLoading.set(true);
    this.isError.set(false);
    this.contentSrv
      .getCategories()
      .pipe(
        finalize(() => this.isLoading.set(false)),
        takeUntilDestroyed(this._destroyRef),
      )
      .subscribe({
        next: categories => {
          this.categorys.set(categories);
        },
        error: () => {
          this.isError.set(true);
        },
      });
  }
}
