import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
  inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { DayJsPipe } from 'src/app/shared/pipe/day-js.pipe';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import {
  heroCalendarDays,
  heroEllipsisVertical,
  heroFolder,
  heroHashtag,
  heroPencilSquare,
  heroTag,
} from '@ng-icons/heroicons/outline';
import { Category } from 'src/app/shared/api/article-category/article-category.model';
import { SafePipe } from 'src/app/shared/pipe/safe.pipe';
import { ArticleLabel, ArticleLabels } from 'src/app/shared/api/article-label/article-label.model';
import { HighlightKeywordPipe } from 'src/app/shared/pipe/highlight-keyword.pipe';
import { UserService } from 'src/app/shared/service/user.service';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-article-card',
  standalone: true,
  imports: [CommonModule, DayJsPipe, NgIconComponent, SafePipe, HighlightKeywordPipe, RouterLink],
  providers: [
    provideIcons({
      heroCalendarDays,
      heroHashtag,
      heroTag,
      heroFolder,
      heroPencilSquare,
      heroEllipsisVertical,
    }),
  ],
  templateUrl: './article-card.component.html',
  styleUrls: ['./article-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ArticleCardComponent {
  userSrv = inject(UserService);
  isLogin = this.userSrv.isLogin;
  @Input({ required: true }) articleId!: number;
  @Input({ required: true }) title!: string;
  @Input({ required: true }) date!: string;
  @Input({ required: true }) category!: Category;
  @Input() labels: ArticleLabels = [];
  @Input({ required: true }) previewContent!: string;
  @Input() highlightKeyword = false;
  @Input() keyword = '';
  @Output('showMore') showMore = new EventEmitter<boolean>();
  @Output('category') clickCategory = new EventEmitter<Category>();
  @Output('label') clickLabel = new EventEmitter<ArticleLabel>();
}
