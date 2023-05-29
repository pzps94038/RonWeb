import { ChangeDetectionStrategy, Component, DestroyRef, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { RouterLink } from '@angular/router';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { heroHashtag } from '@ng-icons/heroicons/outline';
import { catchError, finalize } from 'rxjs';
import { ErrorComponent } from 'src/app/shared/component/error/error.component';
import { ArticleLabelService } from 'src/app/shared/api/article-label/article-label.service';
import { ArticleLabels } from 'src/app/shared/api/article-label/article-label.model';
import { ApiService } from 'src/app/shared/service/api.service';

@Component({
  selector: 'app-article-label',
  standalone: true,
  imports: [CommonModule, ErrorComponent, RouterLink, NgIconComponent],
  providers: [provideIcons({ heroHashtag })],
  templateUrl: './article-label.component.html',
  styleUrls: ['./article-label.component.scss'],
})
export class ArticleLabelComponent {
  articleLabelSrv = inject(ArticleLabelService);
  apiSrv = inject(ApiService);
  labels = signal<ArticleLabels>([]);
  isLoading = signal(false);
  isError = signal(false);
  private _destroyRef = inject(DestroyRef);
  constructor() {
    this.getArticleLabel();
  }

  getArticleLabel(cache: boolean = true) {
    this.isLoading.set(true);
    this.isError.set(false);
    this.articleLabelSrv
      .getArticleLabel(undefined, cache)
      .pipe(
        catchError(err => {
          this.isError.set(true);
          throw err;
        }),
        finalize(() => this.isLoading.set(false)),
        takeUntilDestroyed(this._destroyRef),
      )
      .subscribe(res => {
        if (this.apiSrv.ifSuccess(res, false)) {
          const {
            data: { labels },
          } = res;
          this.labels.set(labels);
        } else {
          this.isError.set(true);
        }
      });
  }
}
