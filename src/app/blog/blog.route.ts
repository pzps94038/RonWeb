import { Routes } from '@angular/router';
import { titleResolver } from '../shared/resolve/title.resolver';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./home/home.component').then(m => m.HomeComponent),
    data: {
      title: '文章總覽',
    },
    resolve: {
      titleResolver,
    },
  },
  {
    path: 'search/:keyword',
    loadComponent: () => import('./search/search.component').then(m => m.SearchComponent),
    data: {
      title: '關鍵字搜尋',
    },
    resolve: {
      titleResolver,
    },
  },
  {
    path: 'category/:id',
    loadComponent: () => import('./category/category.component').then(m => m.CategoryComponent),
    data: {
      title: '分類搜尋',
    },
    resolve: {
      titleResolver,
    },
  },
  {
    path: 'article/:id',
    loadComponent: () => import('./article/article.component').then(m => m.ArticleComponent),
  },
  {
    path: 'notFound',
    loadComponent: () => import('./not-found/not-found.component').then(m => m.NotFoundComponent),
    data: {
      title: '404 - 頁面未找到',
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
