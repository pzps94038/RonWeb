import { Routes } from '@angular/router';
import { titleResolver } from 'src/app/shared/resolve/title.resolver';

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
      titleResolver,
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
      titleResolver,
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
      titleResolver,
    },
  },
  {
    path: '**',
    pathMatch: 'full',
    redirectTo: '',
  },
];
