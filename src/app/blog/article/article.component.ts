import { Component, DestroyRef, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArticleService } from 'src/app/shared/api/article/article.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { tap, filter, map, switchMap, delay, catchError, finalize } from 'rxjs';
import { ArticleCategorys } from 'src/app/shared/api/article-category/article-category.model';
import { Options } from 'src/app/shared/component/header/header.component';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ReturnCode } from 'src/app/shared/api/shared/shared.model';
import { SharedService } from 'src/app/shared/service/shared.service';
import { Article } from 'src/app/shared/api/article/article.model';
import { ErrorComponent } from '../../shared/component/error/error.component';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { heroCalendarDays, heroHashtag, heroTag } from '@ng-icons/heroicons/outline';
import { DayJsPipe } from '../../shared/pipe/day-js.pipe';
import { SafePipe } from '../../shared/pipe/safe.pipe';
import { DisqusComponent } from '../../shared/component/disqus/disqus.component';
import { environment } from 'src/environments/environment';
import { GiscusComponent } from '../../shared/component/giscus/giscus.component';

@Component({
  selector: 'app-article',
  standalone: true,
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss'],
  providers: [provideIcons({ heroCalendarDays, heroHashtag, heroTag })],
  imports: [
    CommonModule,
    ErrorComponent,
    NgIconComponent,
    DayJsPipe,
    RouterLink,
    SafePipe,
    DisqusComponent,
    GiscusComponent,
  ],
})
export class ArticleComponent {
  articleSrv = inject(ArticleService);
  route = inject(ActivatedRoute);
  sharedSrv = inject(SharedService);
  router = inject(Router);
  articleId = signal<string>('');
  article = signal<Article | undefined>(undefined);
  isLoading = signal(false);
  isError = signal(false);
  private _destroyRef = inject(DestroyRef);

  ngOnInit(): void {
    this.route.paramMap
      .pipe(
        filter(param => !!param.get('id')),
        map(param => param.get('id')!),
        tap(id => this.articleId.set(id)),
        takeUntilDestroyed(this._destroyRef),
      )
      .subscribe(id => this.getArticleById(id));
  }

  getArticleById(id: string) {
    this.articleSrv
      .getArticleById(id)
      .pipe(
        tap(() => this.isLoading.set(true)),
        catchError(err => {
          this.isError.set(true);
          throw err;
        }),
        finalize(() => this.isLoading.set(false)),
        takeUntilDestroyed(this._destroyRef),
      )
      .subscribe(res => {
        if (this.sharedSrv.ifSuccess(res, false)) {
          const { data } = res;
          const { articleTitle } = data;
          this.sharedSrv.setTitle(articleTitle);
          this.article.set(data);
          this.updateArticleViews(id);
        } else if (res.returnCode === ReturnCode.NotFound) {
          this.router.navigate(['blog', 'notFound']);
        } else {
          this.isError.set(true);
        }
      });
  }

  updateArticleViews(id: string) {
    this.articleSrv.updateArticleViews(id).pipe(takeUntilDestroyed(this._destroyRef)).subscribe();
  }
}
