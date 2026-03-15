import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Component, DestroyRef, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArticleCardComponent } from '../shared/component/article-card/article-card.component';
import { PaginationComponent } from 'src/app/shared/component/pagination/pagination.component';
import { finalize } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { Category } from 'src/app/shared/api/article-category/article-category.model';
import { ErrorComponent } from 'src/app/shared/component/error/error.component';
import { LoadingCardComponent } from '../shared/component/loading-card/loading-card.component';
import { PostIndexItem, StaticContentService } from 'src/app/shared/service/static-content.service';
import { CodeBlockHighlightService } from 'src/app/shared/service/code-block-highlight.service';

/**
 * 首頁元件
 * 顯示分頁文章列表，資料來源為預編譯的靜態 JSON。
 */
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    ArticleCardComponent,
    PaginationComponent,
    ErrorComponent,
    LoadingCardComponent,
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  contentSrv = inject(StaticContentService);
  route = inject(ActivatedRoute);
  router = inject(Router);
  codeBlockSrv = inject(CodeBlockHighlightService);
  total = signal(0);
  articles = signal<PostIndexItem[]>([]);
  isLoading = signal(false);
  isError = signal(false);
  page = signal(1);
  private _destroyRef = inject(DestroyRef);

  ngOnInit() {
    this.route.queryParamMap.pipe(takeUntilDestroyed(this._destroyRef)).subscribe(params => {
      const page = params.get('page');
      const num = page ? parseInt(page) : 1;
      this.page.set(isNaN(num) ? 1 : num);
      this.getArticles(this.page());
    });
  }

  /**
   * 取得文章列表
   * @param page - 頁碼
   */
  getArticles(page: number = 1) {
    this.isError.set(false);
    this.isLoading.set(true);
    this.contentSrv
      .getArticles(page)
      .pipe(
        finalize(() => this.isLoading.set(false)),
        takeUntilDestroyed(this._destroyRef),
      )
      .subscribe({
        next: res => {
          this.total.set(res.total);
          this.articles.set(res.items);
          this.codeBlockSrv.highlightAllBlock();
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

  /**
   * 導向分類頁
   * @param category - 分類物件
   */
  navigateCategory({ categoryId }: Category) {
    this.router.navigateByUrl(`/blog/category/${categoryId}`);
  }

  /**
   * 導向標籤頁
   * @param label - 標籤物件
   */
  navigateLabel({ labelId }: { labelId: number }) {
    this.router.navigateByUrl(`/blog/label/${labelId}`);
  }

  /**
   * 分頁切換
   * @param page - 目標頁碼
   */
  paginationChange(page: number) {
    this.router.navigate(['/blog'], {
      queryParams: { page },
    });
  }
}
