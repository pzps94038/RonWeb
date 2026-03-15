import { Component, DestroyRef, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { RouterLink } from '@angular/router';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { heroHashtag } from '@ng-icons/heroicons/outline';
import { finalize } from 'rxjs';
import { ErrorComponent } from 'src/app/shared/component/error/error.component';
import { LabelItem } from 'src/app/shared/data/posts-index';
import { StaticContentService } from 'src/app/shared/service/static-content.service';

/**
 * 文章標籤側邊欄元件（標籤雲）
 * 從靜態 JSON 讀取標籤列表並顯示。
 */
@Component({
  selector: 'app-article-label',
  standalone: true,
  imports: [CommonModule, ErrorComponent, RouterLink, NgIconComponent],
  providers: [provideIcons({ heroHashtag })],
  templateUrl: './article-label.component.html',
  styleUrls: ['./article-label.component.scss'],
})
export class ArticleLabelComponent implements OnInit {
  contentSrv = inject(StaticContentService);
  labels = signal<LabelItem[]>([]);
  isLoading = signal(false);
  isError = signal(false);
  private _destroyRef = inject(DestroyRef);

  ngOnInit() {
    this.getArticleLabel();
  }

  /**
   * 取得文章標籤
   */
  getArticleLabel() {
    this.isLoading.set(true);
    this.isError.set(false);
    this.contentSrv
      .getLabels()
      .pipe(
        finalize(() => this.isLoading.set(false)),
        takeUntilDestroyed(this._destroyRef),
      )
      .subscribe({
        next: labels => {
          this.labels.set(labels);
        },
        error: () => {
          this.isError.set(true);
        },
      });
  }
}
