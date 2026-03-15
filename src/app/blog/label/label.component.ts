import { Component, DestroyRef, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router } from '@angular/router';
import { combineLatest, filter, finalize } from 'rxjs';
import { Category } from 'src/app/shared/api/article-category/article-category.model';
import { ErrorComponent } from '../../shared/component/error/error.component';
import { PaginationComponent } from '../../shared/component/pagination/pagination.component';
import { LoadingCardComponent } from '../shared/component/loading-card/loading-card.component';
import { LoadingKeywordComponent } from '../shared/component/loading-keyword/loading-keyword.component';
import { ArticleCardComponent } from '../shared/component/article-card/article-card.component';
import { ArticleLabel } from 'src/app/shared/api/article-label/article-label.model';
import { CodeBlockHighlightService } from 'src/app/shared/service/code-block-highlight.service';
import { PostIndexItem, StaticContentService } from 'src/app/shared/service/static-content.service';

/**
 * 標籤搜尋元件
 * 依據標籤 ID 篩選並顯示文章列表。
 */
@Component({
  selector: 'app-label',
  standalone: true,
  templateUrl: './label.component.html',
  styleUrls: ['./label.component.scss'],
  imports: [
    CommonModule,
    ErrorComponent,
    PaginationComponent,
    LoadingCardComponent,
    LoadingKeywordComponent,
    ArticleCardComponent,
  ],
})
export class LabelComponent {
  route = inject(ActivatedRoute);
  router = inject(Router);
  contentSrv = inject(StaticContentService);
  codeBlockSrv = inject(CodeBlockHighlightService);
  label = signal('');
  labelId = signal<number | undefined>(undefined);
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
        this.labelId.set(id);
        const page = queryParam.get('page');
        const num = page ? parseInt(page) : 1;
        this.page.set(isNaN(num) ? 1 : num);
        this.searchLabel(id, this.page());
      });
  }

  /**
   * 依標籤 ID 搜尋文章
   * @param id - 標籤 ID
   * @param page - 頁碼
   */
  searchLabel(id: number, page?: number) {
    this.isError.set(false);
    this.isLoading.set(true);
    this.contentSrv
      .getArticlesByLabel(id, page)
      .pipe(
        finalize(() => this.isLoading.set(false)),
        takeUntilDestroyed(this._destroyRef),
      )
      .subscribe({
        next: res => {
          this.total.set(res.total);
          this.articles.set(res.items);
          this.label.set(res.keyword);
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
    this.router.navigate(['blog', 'label', this.labelId()], {
      queryParams: { page },
    });
  }
}
