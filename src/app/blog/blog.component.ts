import { Component, Inject, PLATFORM_ID, inject, signal } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { HeaderComponent } from '../shared/components/header/header.component';
import { ScrollAnimateDirective } from '../shared/directive/scroll-animate.directive';
import { InputComponent } from '../shared/components/form/input/input.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ArticleLabelService } from '../shared/api/article-label/article-label.service';
import { DeviceService } from '../shared/service/device.service';
import { RouterModule } from '@angular/router';
import { GetArticleLabelResponse } from '../shared/api/article-label/article-label.model';
import { Observable } from 'rxjs';

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
    RouterModule,
  ],
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss'],
})
export class BlogComponent {
  articleLabel = inject(ArticleLabelService);
  device = inject(DeviceService);
  data = signal<Observable<GetArticleLabelResponse>>(this.articleLabel.getArticleLabel());
  constructor() {}
}
