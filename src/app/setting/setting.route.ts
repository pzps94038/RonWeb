import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'article',
    pathMatch: 'full',
  },
  {
    path: 'article',
    loadComponent: () => import('./article/article.component').then(m => m.ArticleComponent),
    loadChildren: () => import('./article/article.route').then(m => m.routes),
  },
  {
    path: 'article-category',
    loadComponent: () =>
      import('./article-category/article-category.component').then(m => m.ArticleCategoryComponent),
    loadChildren: () => import('./article-category/article-category.route').then(m => m.routes),
  },
  {
    path: '**',
    pathMatch: 'full',
    redirectTo: '',
  },
];
