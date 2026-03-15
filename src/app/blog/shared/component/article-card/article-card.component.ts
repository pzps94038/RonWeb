import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DayJsPipe } from 'src/app/shared/pipe/day-js.pipe';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { heroCalendarDays, heroFolder, heroHashtag } from '@ng-icons/heroicons/outline';
import { Category } from 'src/app/shared/api/article-category/article-category.model';
import { SafePipe } from 'src/app/shared/pipe/safe.pipe';
import { HighlightKeywordPipe } from 'src/app/shared/pipe/highlight-keyword.pipe';

/**
 * 文章卡片元件
 * 顯示文章摘要資訊，包含標題、日期、分類、標籤及預覽內容。
 */
@Component({
  selector: 'app-article-card',
  standalone: true,
  imports: [CommonModule, DayJsPipe, NgIconComponent, SafePipe, HighlightKeywordPipe],
  providers: [
    provideIcons({
      heroCalendarDays,
      heroHashtag,
      heroFolder,
    }),
  ],
  templateUrl: './article-card.component.html',
  styleUrls: ['./article-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ArticleCardComponent {
  @Input({ required: true }) title!: string;
  @Input({ required: true }) date!: string;
  @Input({ required: true }) category!: Category;
  @Input() labels: { labelId: number; labelName: string }[] = [];
  @Input({ required: true }) previewContent!: string;
  @Input() highlightKeyword = false;
  @Input() keyword = '';
  @Output('showMore') showMore = new EventEmitter<boolean>();
  @Output('category') clickCategory = new EventEmitter<Category>();
  @Output('label') clickLabel = new EventEmitter<{ labelId: number; labelName: string }>();
}
