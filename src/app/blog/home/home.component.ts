import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArticleCardComponent } from '../shared/components/article-card/article-card.component';
import { PaginationComponent } from 'src/app/shared/components/pagination/pagination.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, ArticleCardComponent, PaginationComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  goToArticle() {
    console.warn('show');
  }
}
