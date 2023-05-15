import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-article',
  standalone: true,
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss'],
  imports: [RouterOutlet],
})
export class ArticleComponent {}
