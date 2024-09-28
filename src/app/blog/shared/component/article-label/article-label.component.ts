import { Component, DestroyRef, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { RouterLink } from '@angular/router';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { heroHashtag, heroMinus, heroPlus } from '@ng-icons/heroicons/outline';
import { catchError, finalize } from 'rxjs';
import { ErrorComponent } from 'src/app/shared/component/error/error.component';
import { ArticleLabelService } from 'src/app/shared/api/article-label/article-label.service';
import { ArticleLabels } from 'src/app/shared/api/article-label/article-label.model';
import { ApiService } from 'src/app/shared/service/api.service';

@Component({
  selector: 'app-article-label',
  standalone: true,
  imports: [CommonModule, ErrorComponent, RouterLink, NgIconComponent],
  providers: [provideIcons({ heroHashtag, heroPlus, heroMinus })],
  templateUrl: './article-label.component.html',
  styleUrls: ['./article-label.component.scss'],
})
export class ArticleLabelComponent implements OnInit {
  open = signal(true);
  articleLabelSrv = inject(ArticleLabelService);
  apiSrv = inject(ApiService);
  labels = signal<ArticleLabels>([]);
  isLoading = signal(false);
  isError = signal(false);
  private _destroyRef = inject(DestroyRef);

  ngOnInit() {
    this.getArticleLabel();
  }

  getArticleLabel() {
    this.isLoading.set(true);
    this.isError.set(false);
    this.articleLabelSrv
      .getArticleLabel()
      .pipe(
        finalize(() => this.isLoading.set(false)),
        takeUntilDestroyed(this._destroyRef),
      )
      .subscribe({
        next: res => {
          if (this.apiSrv.ifSuccess(res, false)) {
            const {
              data: { labels },
            } = res;
            this.labels.set(labels);
          } else {
            this.isError.set(true);
          }
        },
        error: err => {
          this.isError.set(true);
        },
      });
  }
}
