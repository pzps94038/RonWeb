import { Routes } from '@angular/router';
import { seoResolver } from 'src/app/shared/resolve/seo.resolver';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'detail',
    pathMatch: 'full',
  },
  {
    path: 'detail',
    loadComponent: () =>
      import('./article-category-detail/article-category-detail.component').then(
        m => m.ArticleCategoryDetailComponent,
      ),
    data: {
      title: '分類明細',
    },
    resolve: {
      seoResolver,
    },
  },
  {
    path: 'edit/:id',
    loadComponent: () =>
      import('./article-category-edit/article-category-edit.component').then(
        m => m.ArticleCategoryEditComponent,
      ),
    data: {
      title: '分類編輯',
    },
    resolve: {
      seoResolver,
    },
  },
  {
    path: 'create',
    loadComponent: () =>
      import('./article-category-create/article-category-create.component').then(
        m => m.ArticleCategoryCreateComponent,
      ),
    data: {
      title: '分類新增',
    },
    resolve: {
      seoResolver,
    },
  },
  {
    path: '**',
    pathMatch: 'full',
    redirectTo: '',
  },
];
