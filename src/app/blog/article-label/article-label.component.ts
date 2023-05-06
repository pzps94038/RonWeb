import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { catchError, finalize } from 'rxjs';
import { ErrorComponent } from 'src/app/shared/components/error/error.component';
import { SharedService } from 'src/app/shared/service/shared.service';
import { ArticleLabelService } from 'src/app/shared/api/article-label/article-label.service';
import { ArticleLabels } from 'src/app/shared/api/article-label/article-label.model';

@Component({
  selector: 'app-article-label',
  standalone: true,
  imports: [CommonModule, ErrorComponent],
  templateUrl: './article-label.component.html',
  styleUrls: ['./article-label.component.scss'],
})
export class ArticleLabelComponent {
  articleCategorySrv = inject(ArticleLabelService);
  sharedSrv = inject(SharedService);
  labels = signal<ArticleLabels>([]);
  isLoading = signal(false);
  isError = signal(false);

  constructor() {
    this.getArticleLabel();
  }

  getArticleLabel() {
    this.isLoading.set(true);
    this.isError.set(false);
    this.articleCategorySrv
      .getArticleLabel()
      .pipe(
        catchError(err => {
          this.isError.set(true);
          throw err;
        }),
        finalize(() => this.isLoading.set(false)),
        takeUntilDestroyed(),
      )
      .subscribe(res => {
        if (this.sharedSrv.ifSuccess(res)) {
          this.labels.set(res.data);
        } else {
          this.isError.set(true);
        }
      });
  }
}
