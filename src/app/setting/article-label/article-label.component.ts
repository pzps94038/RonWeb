import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-article-label',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './article-label.component.html',
  styleUrls: ['./article-label.component.scss'],
})
export class ArticleLabelComponent {}
