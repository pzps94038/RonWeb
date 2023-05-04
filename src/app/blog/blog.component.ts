import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../shared/components/header/header.component';
import { ScrollAnimateDirective } from '../shared/directive/scroll-animate.directive';
import { InputComponent } from '../shared/components/form/input/input.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ArticleLabelService } from '../shared/api/article-label/article-label.service';

@Component({
  selector: 'app-blog',
  standalone: true,
  imports: [
    CommonModule,
    HeaderComponent,
    ScrollAnimateDirective,
    InputComponent,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss'],
})
export class BlogComponent {
  constructor(private http: ArticleLabelService) {
    this.http.getArticleLabel().subscribe(res => console.warn(res));
  }
}
