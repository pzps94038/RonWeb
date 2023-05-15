import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-article-category',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './article-category.component.html',
  styleUrls: ['./article-category.component.scss'],
})
export class ArticleCategoryComponent {}
