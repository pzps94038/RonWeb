import { Routes } from '@angular/router';

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
  },
  {
    path: 'edit',
    loadComponent: () =>
      import('./article-edit/article-edit.component').then(m => m.ArticleEditComponent),
  },
  {
    path: 'create',
    loadComponent: () =>
      import('./article-create/article-create.component').then(m => m.ArticleCreateComponent),
  },
  {
    path: '**',
    pathMatch: 'full',
    redirectTo: '',
  },
];
