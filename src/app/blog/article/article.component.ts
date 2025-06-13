import {
  Component,
  DestroyRef,
  inject,
  signal,
  ChangeDetectorRef,
  AfterViewInit,
  ElementRef,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArticleService } from 'src/app/shared/api/article/article.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { tap, filter, map, catchError, finalize, fromEvent } from 'rxjs';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ReturnCode } from 'src/app/shared/api/shared/shared.model';
import { Article } from 'src/app/shared/api/article/article.model';
import { ErrorComponent } from '../../shared/component/error/error.component';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import {
  heroCalendarDays,
  heroEllipsisVertical,
  heroFolder,
  heroHashtag,
  heroPencilSquare,
  heroTag,
} from '@ng-icons/heroicons/outline';
import { DayJsPipe } from '../../shared/pipe/day-js.pipe';
import { SafePipe } from '../../shared/pipe/safe.pipe';
import { DisqusComponent } from '../../shared/component/disqus/disqus.component';
import { GiscusComponent } from '../../shared/component/giscus/giscus.component';
import { ApiService } from 'src/app/shared/service/api.service';
import { SeoService } from 'src/app/shared/service/seo.service';
import { CodeBlockHighlightService } from 'src/app/shared/service/code-block-highlight.service';
import { featherMaximize2, featherMaximize } from '@ng-icons/feather-icons';
import { UserService } from 'src/app/shared/service/user.service';
import { DeviceService } from 'src/app/shared/service/device.service';
@Component({
  selector: 'app-article',
  standalone: true,
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss'],
  providers: [
    provideIcons({
      heroCalendarDays,
      heroHashtag,
      heroTag,
      heroFolder,
      featherMaximize2,
      featherMaximize,
      heroPencilSquare,
      heroEllipsisVertical,
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
  articleSrv = inject(ArticleService);
  route = inject(ActivatedRoute);
  apiSrv = inject(ApiService);
  seoSrv = inject(SeoService);
  deviceSrv = inject(DeviceService);
  codeBlockSrv = inject(CodeBlockHighlightService);
  el = inject(ElementRef);
  router = inject(Router);
  userSrv = inject(UserService);
  isLogin = this.userSrv.isLogin;
  articleId = signal<number | undefined>(undefined);
  article = signal<Article | undefined>(undefined);
  isLoading = signal(false);
  isError = signal(false);
  isFullscreen = signal(false);
  private _destroyRef = inject(DestroyRef);

  ngOnInit(): void {
    this.route.paramMap
      .pipe(
        filter(param => !!param.get('id')),
        map(param => param.get('id')!),
        map(id => parseInt(id)),
        tap(id => this.articleId.set(id)),
        takeUntilDestroyed(this._destroyRef),
      )
      .subscribe(id => this.getArticleById(id));
    if (this.deviceSrv.isServer) {
      return;
    }
    fromEvent(document, 'fullscreenchange')
      .pipe(takeUntilDestroyed(this._destroyRef))
      .subscribe(() => this.isFullscreen.set(!!document.fullscreenElement));
  }

  /**
   * 取得文章
   * @param id
   * @param cache
   */
  getArticleById(id: number, cache: boolean = true) {
    this.articleSrv
      .getArticleById(id, cache)
      .pipe(
        tap(() => this.isLoading.set(true)),
        catchError(err => {
          this.isError.set(true);
          this.isLoading.set(false);
          throw err;
        }),
        takeUntilDestroyed(this._destroyRef),
      )
      .subscribe(res => {
        if (this.apiSrv.ifSuccess(res, false)) {
          const { data } = res;
          const { articleTitle, previewContent } = data;
          this.seoSrv.setSeo({
            description: previewContent,
            title: articleTitle,
            keywords: articleTitle,
          });
          this.article.set(data);
          this.updateArticleViews(id);
          this.codeBlockSrv.highlightAllBlock();
        } else if (res.returnCode === ReturnCode.NotFound) {
          this.router.navigate(['blog', 'notFound']);
        } else {
          this.isError.set(true);
        }
        this.isLoading.set(false);
      });
  }

  /**
   * 更新文章瀏覽次數
   * @param id
   */
  updateArticleViews(id: number) {
    this.articleSrv.updateArticleViews(id).pipe(takeUntilDestroyed(this._destroyRef)).subscribe();
  }

  /**
   * 切換全螢幕模式
   */
  toggleFullscreenMode() {
    if (this.deviceSrv.isServer) {
      return;
    }
    if (document.fullscreenElement) {
      document.exitFullscreen();
      this.el.nativeElement?.style?.removeProperty('overflow');
    } else {
      this.el.nativeElement?.requestFullscreen();
      if (this.el.nativeElement?.style) {
        this.el.nativeElement.style.overflow = 'auto';
      }
    }
  }
}
