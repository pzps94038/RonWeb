import { Component, Inject, PLATFORM_ID, inject, signal } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { HeaderComponent } from '../shared/components/header/header.component';
import { ScrollAnimateDirective } from '../shared/directive/scroll-animate.directive';
import { InputComponent } from '../shared/components/form/input/input.component';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ArticleLabelService } from '../shared/api/article-label/article-label.service';
import { DeviceService } from '../shared/service/device.service';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { GetArticleLabelResponse } from '../shared/api/article-label/article-label.model';
import { Observable } from 'rxjs';
import { ArticleCategoryComponent } from './article-category/article-category.component';
import { ArticleLabelComponent } from './article-label/article-label.component';

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
    RouterOutlet,
    ReactiveFormsModule,
    ArticleCategoryComponent,
    ArticleLabelComponent,
  ],
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss'],
})
export class BlogComponent {
  device = inject(DeviceService);
  router = inject(Router);
  form = new FormGroup({
    keyword: new FormControl('', [Validators.required]),
  });

  submit() {
    this.form.markAllAsTouched();
    if (this.form.valid) {
      const keyword = this.form.get('keyword')!.value;
      this.router.navigate(['blog/search'], { queryParams: { keyword } });
    }
  }
}
