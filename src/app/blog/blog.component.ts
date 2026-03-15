import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterOutlet } from '@angular/router';
import { ArticleCategoryComponent } from './shared/component/article-category/article-category.component';
import { FooterComponent } from '../shared/component/footer/footer.component';
import { ArticleLabelComponent } from './shared/component/article-label/article-label.component';
import { ValidService } from '../shared/service/valid.service';

/**
 * 部落格主版面元件
 * 提供搜尋功能、側邊分類/標籤列表，及文章內容的 router-outlet。
 */
@Component({
  selector: 'app-blog',
  standalone: true,
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss'],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterOutlet,
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

  /**
   * 提交搜尋表單，導向搜尋結果頁
   */
  submit() {
    this.form.markAllAsTouched();
    if (this.form.invalid) {
      return;
    }
    const keyword = this.form.controls.keyword.value;
    this.router.navigate(['blog', 'search', keyword]);
  }
}
