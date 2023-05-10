import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../shared/components/header/header.component';
import { ScrollAnimateDirective } from '../shared/directive/scroll-animate.directive';
import { InputComponent } from '../shared/components/form/input/input.component';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { DeviceService } from '../shared/service/device.service';
import { Router, RouterOutlet } from '@angular/router';
import { ArticleCategoryComponent } from './shared/components/article-category/article-category.component';
import { FooterComponent } from '../shared/components/footer/footer.component';

@Component({
  selector: 'app-blog',
  standalone: true,
  imports: [
    HeaderComponent,
    CommonModule,
    ScrollAnimateDirective,
    InputComponent,
    ReactiveFormsModule,
    HttpClientModule,
    RouterOutlet,
    ReactiveFormsModule,
    ArticleCategoryComponent,
    FooterComponent,
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
      this.router.navigate(['blog', 'search', keyword]);
    }
  }
}
