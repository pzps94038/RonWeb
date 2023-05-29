import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScrollAnimateDirective } from '../shared/directive/scroll-animate.directive';
import { InputComponent } from '../shared/component/form/input/input.component';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { Router, RouterOutlet } from '@angular/router';
import { ArticleCategoryComponent } from './shared/component/article-category/article-category.component';
import { FooterComponent } from '../shared/component/footer/footer.component';
import { ArticleLabelComponent } from './shared/component/article-label/article-label.component';
import { ValidService } from '../shared/service/valid.service';
@Component({
  selector: 'app-blog',
  standalone: true,
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss'],
  imports: [
    CommonModule,
    ScrollAnimateDirective,
    InputComponent,
    ReactiveFormsModule,
    HttpClientModule,
    RouterOutlet,
    ReactiveFormsModule,
    ArticleCategoryComponent,
    FooterComponent,
    ArticleLabelComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BlogComponent {
  validSrv = inject(ValidService);
  router = inject(Router);
  form = new FormGroup({
    keyword: new FormControl('', [Validators.required, this.validSrv.emptyValidator()]),
  });

  submit() {
    this.form.markAllAsTouched();
    if (this.form.valid) {
      const keyword = this.form.get('keyword')!.value;
      this.router.navigate(['blog', 'search', keyword]);
    }
  }
}
