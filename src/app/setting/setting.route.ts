import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'code-type',
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
    path: 'article-label',
    loadComponent: () =>
      import('./article-label/article-label.component').then(m => m.ArticleLabelComponent),
    loadChildren: () => import('./article-label/article-label.route').then(m => m.routes),
  },
  {
    path: 'code-type',
    loadComponent: () => import('./code-type/code-type.component').then(m => m.CodeTypeComponent),
    loadChildren: () => import('./code-type/code-type.route').then(m => m.routes),
  },
  {
    path: '**',
    pathMatch: 'full',
    redirectTo: '',
  },
];
