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
    path: 'label/:id',
    loadComponent: () => import('./label/label.component').then(m => m.LabelComponent),
  },
  {
    path: 'category/:id',
    loadComponent: () => import('./category/category.component').then(m => m.CategoryComponent),
  },
  {
    path: 'article/:id',
    loadComponent: () => import('./article/article.component').then(m => m.ArticleComponent),
  },
  {
    path: 'notFound',
    loadComponent: () => import('./not-found/not-found.component').then(m => m.NotFoundComponent),
  },
  {
    path: '**',
    pathMatch: 'full',
    redirectTo: '',
  },
];
