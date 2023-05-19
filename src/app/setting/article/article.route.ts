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
      import('./article-detail/article-detail.component').then(m => m.ArticleDetailComponent),
    data: {
      title: '文章明細',
    },
    resolve: {
      titleResolver,
    },
  },
  {
    path: 'edit/:id',
    loadComponent: () =>
      import('./article-edit/article-edit.component').then(m => m.ArticleEditComponent),
    data: {
      title: '文章編輯',
    },
    resolve: {
      titleResolver,
    },
  },
  {
    path: 'create',
    loadComponent: () =>
      import('./article-create/article-create.component').then(m => m.ArticleCreateComponent),
    data: {
      title: '文章新增',
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
