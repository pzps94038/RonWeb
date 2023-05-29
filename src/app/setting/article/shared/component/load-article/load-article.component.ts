import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-load-article',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './load-article.component.html',
  styleUrls: ['./load-article.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoadArticleComponent {}
