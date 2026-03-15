import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Component, DestroyRef, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { PaginationComponent } from 'src/app/shared/component/pagination/pagination.component';
import { combineLatest, filter, finalize } from 'rxjs';
import { Category } from 'src/app/shared/api/article-category/article-category.model';
import { ErrorComponent } from 'src/app/shared/component/error/error.component';
import { ArticleCardComponent } from '../shared/component/article-card/article-card.component';
import { LoadingCardComponent } from '../shared/component/loading-card/loading-card.component';
import { LoadingKeywordComponent } from '../shared/component/loading-keyword/loading-keyword.component';
import { ArticleLabel } from 'src/app/shared/api/article-label/article-label.model';
import { CodeBlockHighlightService } from 'src/app/shared/service/code-block-highlight.service';
import { PostIndexItem, StaticContentService } from 'src/app/shared/service/static-content.service';

/**
 * 分類搜尋元件
 * 依據分類 ID 篩選並顯示文章列表。
 */
@Component({
  selector: 'app-category',
  standalone: true,
  imports: [
    CommonModule,
    PaginationComponent,
    ArticleCardComponent,
    ErrorComponent,
    LoadingKeywordComponent,
    LoadingCardComponent,
  ],
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss'],
})
export class CategoryComponent implements OnInit {
  route = inject(ActivatedRoute);
  router = inject(Router);
  contentSrv = inject(StaticContentService);
  codeBlockSrv = inject(CodeBlockHighlightService);
  category = signal('');
  categoryId = signal<number | undefined>(undefined);
  total = signal(0);
  articles = signal<PostIndexItem[]>([]);
  isLoading = signal(false);
  isError = signal(false);
  page = signal(1);
  private _destroyRef = inject(DestroyRef);

  ngOnInit(): void {
    combineLatest([this.route.paramMap, this.route.queryParamMap])
      .pipe(
        filter(([params]) => {
          if (!!params.get('id') && !isNaN(parseInt(params.get('id')!))) {
            return true;
          } else {
            this.router.navigate(['blog']);
            return false;
          }
        }),
        takeUntilDestroyed(this._destroyRef),
      )
      .subscribe(([params, queryParam]) => {
        const id = parseInt(params.get('id')!);
        this.categoryId.set(id);
        const page = queryParam.get('page');
        const num = page ? parseInt(page) : 1;
        this.page.set(isNaN(num) ? 1 : num);
        this.searchCategory(id, this.page());
      });
  }

  /**
   * 依分類 ID 搜尋文章
   * @param id - 分類 ID
   * @param page - 頁碼
   */
  searchCategory(id: number, page?: number) {
    this.isError.set(false);
    this.isLoading.set(true);
    this.contentSrv
      .getArticlesByCategory(id, page)
      .pipe(
        finalize(() => this.isLoading.set(false)),
        takeUntilDestroyed(this._destroyRef),
      )
      .subscribe({
        next: res => {
          this.total.set(res.total);
          this.articles.set(res.items);
          this.category.set(res.keyword);
          this.codeBlockSrv.highlightAllBlock();
          if (res.total === 0) {
            this.router.navigate(['blog', 'notFound']);
          }
        },
        error: () => {
          this.isError.set(true);
        },
      });
  }

  /**
   * 導向文章詳情頁
   * @param slug - 文章 slug
   */
  showMore(slug: string) {
    this.router.navigateByUrl(`/blog/article/${slug}`);
  }

  navigateCategory({ categoryId }: Category) {
    this.router.navigateByUrl(`/blog/category/${categoryId}`);
  }

  navigateLabel({ labelId }: { labelId: number }) {
    this.router.navigateByUrl(`/blog/label/${labelId}`);
  }

  paginationChange(page: number) {
    this.router.navigate(['blog', 'category', this.categoryId()], {
      queryParams: { page },
    });
  }
}
