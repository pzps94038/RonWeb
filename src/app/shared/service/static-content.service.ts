import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, of, shareReplay } from 'rxjs';
import { Article } from '../api/article/article.model';
import {
  POSTS_INDEX,
  CATEGORIES,
  LABELS,
  PostIndexItem,
  CategoryItem,
  LabelItem,
} from '../data/posts-index';
import { marked } from 'marked';

/** 分頁結果 */
export type PaginatedResult<T> = {
  total: number;
  items: T[];
};

/** 重新匯出索引型別供外部使用 */
export { PostIndexItem, CategoryItem, LabelItem };

/**
 * 靜態內容服務
 * 文章列表從編譯時嵌入的 TypeScript 常數讀取（零 JSON），
 * 單篇文章直接讀取 .md 檔案並在客戶端解析 frontmatter + Markdown → HTML。
 */
@Injectable({
  providedIn: 'root',
})
export class StaticContentService {
  private http = inject(HttpClient);
  private readonly PAGE_SIZE = 10;
  private articleCache = new Map<string, Observable<Article>>();

  /**
   * 從原始 Markdown 字串中解析 JSON frontmatter
   * @param raw - 原始 .md 檔案內容
   * @returns 解析結果，包含 frontmatter 物件與 Markdown 內容
   */
  private parseFrontmatter(raw: string): { data: Record<string, unknown>; content: string } {
    const match = raw.match(/^---\s*\n([\s\S]*?)\n---\s*\n([\s\S]*)$/);
    if (!match) {
      return { data: {}, content: raw };
    }
    try {
      const data = JSON.parse(match[1]);
      return { data, content: match[2] };
    } catch {
      return { data: {}, content: raw };
    }
  }

  /**
   * 取得分頁文章列表（直接從 TS 常數，無需 HTTP）
   * @param page - 頁碼（從 1 開始）
   * @returns 分頁後的文章列表與總數
   */
  getArticles(page: number = 1): Observable<PaginatedResult<PostIndexItem>> {
    const start = (page - 1) * this.PAGE_SIZE;
    const end = start + this.PAGE_SIZE;
    return of({
      total: POSTS_INDEX.length,
      items: POSTS_INDEX.slice(start, end),
    });
  }

  /**
   * 取得單篇文章完整資料（直接讀取 .md 檔案）
   * @param slug - 文章 slug（從檔名推斷的唯一識別字串）
   * @returns 文章資料的 Observable
   */
  getArticleBySlug(slug: string): Observable<Article> {
    if (!this.articleCache.has(slug)) {
      const article$ = this.http.get(`assets/posts/${slug}.md`, { responseType: 'text' }).pipe(
        map(raw => {
          const { data, content } = this.parseFrontmatter(raw);
          // 將絕對路徑 /assets/ 轉為相對路徑 assets/，讓 <base href> 正確解析
          const htmlContent = (marked(content, { async: false }) as string).replace(
            /src="\/assets\//g,
            'src="assets/',
          );

          // 從索引中取得前後篇資訊
          const indexItem = POSTS_INDEX.find(a => a.slug === slug);

          return {
            slug: slug,
            articleTitle: data['title'] as string,
            categoryId: data['categoryId'] as number,
            categoryName: data['categoryName'] as string,
            labels: (data['labels'] as { labelId: number; labelName: string }[]) || [],
            createDate: data['createDate'] as string,
            references: (data['references'] as string[]) || [],
            content: htmlContent,
            nextArticle: indexItem?.nextArticle,
            prevArticle: indexItem?.prevArticle,
          } as Article;
        }),
        shareReplay(1),
      );
      this.articleCache.set(slug, article$);
    }
    return this.articleCache.get(slug)!;
  }

  /**
   * 取得所有分類（直接從 TS 常數）
   * @returns 分類列表的 Observable
   */
  getCategories(): Observable<CategoryItem[]> {
    return of(CATEGORIES);
  }

  /**
   * 取得所有標籤（直接從 TS 常數）
   * @returns 標籤列表的 Observable
   */
  getLabels(): Observable<LabelItem[]> {
    return of(LABELS);
  }

  /**
   * 依分類 ID 篩選文章
   * @param categoryId - 分類 ID
   * @param page - 頁碼
   * @returns 篩選後的分頁文章與分類名稱
   */
  getArticlesByCategory(
    categoryId: number,
    page: number = 1,
  ): Observable<PaginatedResult<PostIndexItem> & { keyword: string }> {
    const filtered = POSTS_INDEX.filter(a => a.categoryId === categoryId);
    const start = (page - 1) * this.PAGE_SIZE;
    const end = start + this.PAGE_SIZE;
    return of({
      total: filtered.length,
      items: filtered.slice(start, end),
      keyword: filtered.length > 0 ? filtered[0].categoryName : '',
    });
  }

  /**
   * 依標籤 ID 篩選文章
   * @param labelId - 標籤 ID
   * @param page - 頁碼
   * @returns 篩選後的分頁文章與標籤名稱
   */
  getArticlesByLabel(
    labelId: number,
    page: number = 1,
  ): Observable<PaginatedResult<PostIndexItem> & { keyword: string }> {
    const filtered = POSTS_INDEX.filter(a => a.labels.some(l => l.labelId === labelId));
    const start = (page - 1) * this.PAGE_SIZE;
    const end = start + this.PAGE_SIZE;
    const labelName =
      filtered.length > 0
        ? filtered[0].labels.find(l => l.labelId === labelId)?.labelName ?? ''
        : '';
    return of({
      total: filtered.length,
      items: filtered.slice(start, end),
      keyword: labelName,
    });
  }

  /**
   * 關鍵字搜尋文章（從 TS 常數搜尋）
   * @param keyword - 搜尋關鍵字
   * @param page - 頁碼
   * @returns 搜尋結果
   */
  searchArticles(keyword: string, page: number = 1): Observable<PaginatedResult<PostIndexItem>> {
    const lowerKeyword = keyword.toLowerCase();
    const filtered = POSTS_INDEX.filter(
      a =>
        a.articleTitle.toLowerCase().includes(lowerKeyword) ||
        a.previewContent.toLowerCase().includes(lowerKeyword) ||
        a.categoryName.toLowerCase().includes(lowerKeyword) ||
        a.labels.some(l => l.labelName.toLowerCase().includes(lowerKeyword)),
    );
    const start = (page - 1) * this.PAGE_SIZE;
    const end = start + this.PAGE_SIZE;
    return of({
      total: filtered.length,
      items: filtered.slice(start, end),
    });
  }
}
