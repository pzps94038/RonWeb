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
      import('./article-category-detail/article-category-detail.component').then(
        m => m.ArticleCategoryDetailComponent,
      ),
  },
  {
    path: 'edit',
    loadComponent: () =>
      import('./article-category-edit/article-category-edit.component').then(
        m => m.ArticleCategoryEditComponent,
      ),
  },
  {
    path: 'create',
    loadComponent: () =>
      import('./article-category-create/article-category-create.component').then(
        m => m.ArticleCategoryCreateComponent,
      ),
  },
  {
    path: '**',
    pathMatch: 'full',
    redirectTo: '',
  },
];
