import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./home/home.component').then(m => m.HomeComponent),
  },
  {
    path: 'search',
    loadComponent: () => import('./search/search.component').then(m => m.SearchComponent),
  },
  {
    path: ':id',
    loadComponent: () => import('./article/article.component').then(m => m.ArticleComponent),
  },
];
