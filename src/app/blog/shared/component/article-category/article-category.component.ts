import {
  Component,
  DestroyRef,
  OnInit,
  TransferState,
  inject,
  makeStateKey,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArticleCategoryService } from 'src/app/shared/api/article-category/article-category.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { catchError, filter, finalize, map, Observable, of, tap } from 'rxjs';
import { ErrorComponent } from 'src/app/shared/component/error/error.component';
import { ArticleCategorys } from 'src/app/shared/api/article-category/article-category.model';
import { RouterLink } from '@angular/router';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { heroFolder, heroMinus, heroPlus } from '@ng-icons/heroicons/outline';
import { ApiService } from 'src/app/shared/service/api.service';
import { FormsModule } from '@angular/forms';
import { TransferStateKey } from 'src/app/shared/model/transfer-state-key.model';

@Component({
  selector: 'app-article-category',
  standalone: true,
  imports: [CommonModule, ErrorComponent, RouterLink, NgIconComponent, FormsModule],
  providers: [provideIcons({ heroFolder, heroPlus, heroMinus })],
  templateUrl: './article-category.component.html',
  styleUrls: ['./article-category.component.scss'],
})
export class ArticleCategoryComponent implements OnInit {
  stateKey = makeStateKey<ArticleCategorys>(TransferStateKey.ArticleCategory);
  open = signal(true);
  articleCategorySrv = inject(ArticleCategoryService);
  apiSrv = inject(ApiService);
  transferState = inject(TransferState);
  categorys$?: Observable<ArticleCategorys>;
  isLoading = signal(false);
  isError = signal(false);

  ngOnInit() {
    const category = this.transferState.get(this.stateKey, undefined);
    if (category) {
      this.categorys$ = of(category);
      this.isError.set(false);
      this.isLoading.set(false);
    } else {
      this.categorys$ = this.getArticleCategory();
    }
  }

  /**
   * 取得文章分類
   */
  getArticleCategory() {
    this.isLoading.set(true);
    this.isError.set(false);
    return this.articleCategorySrv.getArticleCategory().pipe(
      filter(res => {
        if (this.apiSrv.ifSuccess(res, false)) {
          return true;
        } else {
          this.isError.set(true);
          return false;
        }
      }),
      catchError(err => {
        this.isError.set(true);
        throw err;
      }),
      map(({ data }) => data),
      map(({ categorys }) => categorys),
      tap(categorys => this.transferState.set(this.stateKey, categorys)),
      tap(() => this.isLoading.set(true)),
    );
  }
}
