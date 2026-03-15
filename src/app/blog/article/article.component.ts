import { Component, DestroyRef, inject, signal, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { tap, filter, map, catchError, fromEvent, throttleTime } from 'rxjs';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Article } from 'src/app/shared/api/article/article.model';
import { ErrorComponent } from '../../shared/component/error/error.component';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { heroCalendarDays, heroFolder, heroHashtag } from '@ng-icons/heroicons/outline';
import { DayJsPipe } from '../../shared/pipe/day-js.pipe';
import { SafePipe } from '../../shared/pipe/safe.pipe';
import { GiscusComponent } from '../../shared/component/giscus/giscus.component';
import { SeoService } from 'src/app/shared/service/seo.service';
import { CodeBlockHighlightService } from 'src/app/shared/service/code-block-highlight.service';
import { DeviceService } from 'src/app/shared/service/device.service';
import { StaticContentService } from 'src/app/shared/service/static-content.service';
import { POSTS_INDEX } from 'src/app/shared/data/posts-index';

/**
 * 文章詳情元件
 * 顯示單篇文章的完整內容，包含目錄、閱讀進度、上下篇導航與留言板。
 */
@Component({
  selector: 'app-article',
  standalone: true,
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss'],
  providers: [
    provideIcons({
      heroCalendarDays,
      heroHashtag,
      heroFolder,
    }),
  ],
  imports: [
    CommonModule,
    ErrorComponent,
    NgIconComponent,
    DayJsPipe,
    RouterLink,
    SafePipe,
    GiscusComponent,
  ],
})
export class ArticleComponent {
  contentSrv = inject(StaticContentService);
  route = inject(ActivatedRoute);
  seoSrv = inject(SeoService);
  deviceSrv = inject(DeviceService);
  codeBlockSrv = inject(CodeBlockHighlightService);
  el = inject(ElementRef);
  router = inject(Router);
  articleSlug = signal<string | undefined>(undefined);
  article = signal<Article | undefined>(undefined);
  isLoading = signal(false);
  isError = signal(false);
  readingProgress = signal(0);
  tocItems = signal<{ id: string; text: string; level: number; index: number }[]>([]);
  tocOpen = signal(false);
  activeTocId = signal('');
  private _destroyRef = inject(DestroyRef);

  ngOnInit(): void {
    this.route.paramMap
      .pipe(
        filter(param => !!param.get('slug')),
        map(param => param.get('slug')!),
        tap(slug => this.articleSlug.set(slug)),
        takeUntilDestroyed(this._destroyRef),
      )
      .subscribe(slug => this.getArticleBySlug(slug));
    if (this.deviceSrv.isServer) {
      return;
    }
    fromEvent(window, 'scroll')
      .pipe(
        throttleTime(16, undefined, { leading: true, trailing: true }),
        takeUntilDestroyed(this._destroyRef),
      )
      .subscribe(() => {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        this.readingProgress.set(docHeight > 0 ? Math.round((scrollTop / docHeight) * 100) : 0);
        this.updateActiveToc();
      });
  }

  /**
   * 取得文章資料
   * @param slug - 文章 slug
   */
  getArticleBySlug(slug: string) {
    this.isLoading.set(true);
    this.isError.set(false);
    this.contentSrv
      .getArticleBySlug(slug)
      .pipe(
        catchError(err => {
          this.isError.set(true);
          this.isLoading.set(false);
          throw err;
        }),
        takeUntilDestroyed(this._destroyRef),
      )
      .subscribe(article => {
        // SEO description 從索引的摘要取得
        const indexItem = POSTS_INDEX.find(a => a.slug === article.slug);
        this.seoSrv.setSeo({
          description: indexItem?.previewContent ?? article.articleTitle,
          title: article.articleTitle,
          keywords: article.articleTitle,
        });
        this.article.set(article);
        this.isLoading.set(false);
        this.codeBlockSrv.highlightAllBlock();
        // 在下一個 tick 解析目錄
        setTimeout(() => this.buildToc(), 0);
      });
  }

  /**
   * 建立文章目錄（Table of Contents）
   * 從已渲染的文章 HTML 中解析標題元素。
   */
  buildToc() {
    if (this.deviceSrv.isServer) return;
    const contentEl = this.el.nativeElement.querySelector('.article-content');
    if (!contentEl) return;
    const headings = contentEl.querySelectorAll('h1, h2, h3, h4');
    const items: { id: string; text: string; level: number; index: number }[] = [];
    let counter = 0;
    headings.forEach((heading: HTMLElement) => {
      counter++;
      const id = `heading-${counter}`;
      heading.setAttribute('id', id);
      items.push({
        id,
        text: heading.textContent?.trim() ?? '',
        level: parseInt(heading.tagName.charAt(1)),
        index: counter,
      });
    });
    this.tocItems.set(items);
  }

  /**
   * 捲動至指定的目錄項目
   * @param id - 目標元素的 ID
   */
  scrollToHeading(id: string) {
    if (this.deviceSrv.isServer) return;
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  /**
   * 根據滾動位置更新當前活躍的 TOC 項目
   * 找出最接近視窗頂部的標題元素
   */
  private updateActiveToc() {
    const items = this.tocItems();
    if (items.length === 0) return;
    const offset = 100; // header 高度補償
    let activeId = items[0]?.id || '';
    for (const item of items) {
      const el = document.getElementById(item.id);
      if (el && el.getBoundingClientRect().top <= offset) {
        activeId = item.id;
      }
    }
    this.activeTocId.set(activeId);
  }
}
