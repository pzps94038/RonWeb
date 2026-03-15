import { Routes } from '@angular/router';
import { seoResolver } from '../shared/resolve/seo.resolver';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./home/home.component').then(m => m.HomeComponent),
    data: {
      description:
        '歡迎來到我們的文章總覽頁面！這裡收錄了我們部落格的所有文章，涵蓋了各種技術主題和學習心得。你可以瀏覽不同的文章，擴展你的知識和尋找你感興趣的內容。',
      keywords: '文章總覽',
    },
    resolve: {
      seoResolver,
    },
  },
  {
    path: 'search/:keyword',
    loadComponent: () => import('./search/search.component').then(m => m.SearchComponent),
    data: {
      title: '關鍵字搜尋',
      description: '用我們的關鍵字搜尋功能，輕鬆找到你感興趣的內容！',
      keywords: '關鍵字搜尋',
    },
    resolve: {
      seoResolver,
    },
  },
  {
    path: 'category/:id',
    loadComponent: () => import('./category/category.component').then(m => m.CategoryComponent),
    data: {
      title: '分類搜尋',
      description: '使用我們的分類搜尋功能，輕鬆瀏覽相關主題的文章！',
      keywords: '分類搜尋',
    },
    resolve: {
      seoResolver,
    },
  },
  {
    path: 'label/:id',
    loadComponent: () => import('./label/label.component').then(m => m.LabelComponent),
    data: {
      title: '標籤搜尋',
      description: '通過我們的標籤搜尋功能，快速找到與特定標籤相關的文章！',
      keywords: '標籤搜尋',
    },
    resolve: {
      seoResolver,
    },
  },
  {
    path: 'article/:slug',
    loadComponent: () => import('./article/article.component').then(m => m.ArticleComponent),
  },
  {
    path: 'notFound',
    loadComponent: () => import('./not-found/not-found.component').then(m => m.NotFoundComponent),
    data: {
      title: '404 - 頁面未找到',
      description: '抱歉，我們無法找到你要訪問的頁面。',
      keywords: '404',
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
