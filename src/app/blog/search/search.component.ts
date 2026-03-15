import { Component, DestroyRef, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { catchError, combineLatest, filter, finalize } from 'rxjs';
import { Category } from 'src/app/shared/api/article-category/article-category.model';
import { ErrorComponent } from 'src/app/shared/component/error/error.component';
import { PaginationComponent } from 'src/app/shared/component/pagination/pagination.component';
import { ArticleCardComponent } from '../shared/component/article-card/article-card.component';
import { LoadingCardComponent } from '../shared/component/loading-card/loading-card.component';
import { LoadingKeywordComponent } from '../shared/component/loading-keyword/loading-keyword.component';
import { ArticleLabel } from 'src/app/shared/api/article-label/article-label.model';
import { CodeBlockHighlightService } from 'src/app/shared/service/code-block-highlight.service';
import { PostIndexItem, StaticContentService } from 'src/app/shared/service/static-content.service';

/**
 * 搜尋結果元件
 * 使用客戶端全文搜尋，依關鍵字篩選文章。
 */
@Component({
  selector: 'app-search',
  standalone: true,
  imports: [
    CommonModule,
    PaginationComponent,
    ArticleCardComponent,
    ErrorComponent,
    LoadingCardComponent,
    LoadingKeywordComponent,
  ],
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit {
  route = inject(ActivatedRoute);
  router = inject(Router);
  contentSrv = inject(StaticContentService);
  codeBlockSrv = inject(CodeBlockHighlightService);
  keyword = signal('');
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
          if (!!params.get('keyword')) {
            return true;
          } else {
            this.router.navigate(['blog']);
            return false;
          }
        }),
        takeUntilDestroyed(this._destroyRef),
      )
      .subscribe(([params, queryParam]) => {
        const keyword = params.get('keyword') as string;
        this.keyword.set(keyword.trim());
        const page = queryParam.get('page');
        const num = page ? parseInt(page) : 1;
        this.page.set(isNaN(num) ? 1 : num);
        this.searchKeyword(this.keyword(), this.page());
      });
  }

  /**
   * 以關鍵字搜尋文章
   * @param keyword - 搜尋關鍵字
   * @param page - 頁碼
   */
  searchKeyword(keyword: string, page?: number) {
    this.isError.set(false);
    this.isLoading.set(true);
    this.contentSrv
      .searchArticles(keyword, page)
      .pipe(
        catchError(err => {
          this.isError.set(true);
          throw err;
        }),
        finalize(() => this.isLoading.set(false)),
        takeUntilDestroyed(this._destroyRef),
      )
      .subscribe(res => {
        this.total.set(res.total);
        this.articles.set(res.items);
        this.codeBlockSrv.highlightAllBlock();
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
    this.router.navigate(['blog', 'search', this.keyword()], {
      queryParams: { page },
    });
  }
}
