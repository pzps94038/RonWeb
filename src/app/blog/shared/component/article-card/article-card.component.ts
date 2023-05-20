import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DayJsPipe } from 'src/app/shared/pipe/day-js.pipe';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { heroCalendarDays, heroFolder, heroHashtag, heroTag } from '@ng-icons/heroicons/outline';
import {
  ArticleCategory,
  Category,
  Categorys,
} from 'src/app/shared/api/article-category/article-category.model';
import { SafePipe } from 'src/app/shared/pipe/safe.pipe';
import { ArticleLabel, ArticleLabels } from 'src/app/shared/api/article-label/article-label.model';
@Component({
  selector: 'app-article-card',
  standalone: true,
  imports: [CommonModule, DayJsPipe, NgIconComponent, SafePipe],
  providers: [provideIcons({ heroCalendarDays, heroHashtag, heroTag, heroFolder })],
  templateUrl: './article-card.component.html',
  styleUrls: ['./article-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ArticleCardComponent {
  @Input({ required: true }) title!: string;
  @Input({ required: true }) date!: string;
  @Input({ required: true }) category!: Category;
  @Input() labels: ArticleLabels = [];
  @Input({ required: true }) previewContent!: string;
  @Output('showMore') showMore = new EventEmitter<boolean>();
  @Output('category') clickCategory = new EventEmitter<Category>();
  @Output('label') clickLabel = new EventEmitter<ArticleLabel>();
}
