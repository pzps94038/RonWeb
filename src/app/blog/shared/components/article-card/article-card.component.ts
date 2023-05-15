import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DayJsPipe } from 'src/app/shared/pipe/day-js.pipe';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { heroCalendarDays, heroHashtag, heroTag } from '@ng-icons/heroicons/outline';
import { ArticleCategory } from 'src/app/shared/api/article-category/article-category.model';
import { SafePipe } from 'src/app/shared/pipe/safe.pipe';

@Component({
  selector: 'app-article-card',
  standalone: true,
  imports: [CommonModule, DayJsPipe, NgIconComponent, SafePipe],
  providers: [provideIcons({ heroCalendarDays, heroHashtag, heroTag })],
  templateUrl: './article-card.component.html',
  styleUrls: ['./article-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ArticleCardComponent {
  @Input({ required: true }) title!: string;
  @Input({ required: true }) date!: string;
  @Input({ required: true }) category!: ArticleCategory;
  @Input({ required: true }) previewContent!: string;
  @Output('showMore') showMore = new EventEmitter<boolean>();
  @Output('category') clickCategory = new EventEmitter<ArticleCategory>();
}
