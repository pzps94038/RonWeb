import { Routes } from '@angular/router';
import { seoResolver } from '../shared/resolve/seo.resolver';
import { RevalidateTime } from '../shared/model/revalidate-time.model';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./home/home.component').then(m => m.HomeComponent),
    data: {
      description:
        '歡迎來到我們的文章總覽頁面！這裡收錄了我們部落格的所有文章，涵蓋了各種技術主題和學習心得。你可以瀏覽不同的文章，擴展你的知識和尋找你感興趣的內容。無論你是初學者還是有經驗的專業人士，這個文章總覽頁面將幫助你快速找到我們的所有寶貴資源，並輕鬆探索你想要了解的主題。立即開始你的探索之旅吧！',
      keywords: '文章總覽',
      revalidate: RevalidateTime.EVERY_5_MINUTES,
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
      description:
        '用我們的關鍵字搜尋功能，輕鬆找到你感興趣的內容！只需輸入你想要尋找的關鍵字，我們將快速找到與關鍵字相關的文章。這是一個方便且高效的方式，幫助你定位到你所需的資訊。不論是尋找特定的程式語言教學、開發框架應用案例還是最新的技術趨勢，關鍵字搜尋將幫助你快速獲得結果。立即嘗試使用我們的關鍵字搜尋，深入探索你感興趣的主題！',
      keywords: '關鍵字搜尋',
      revalidate: RevalidateTime.NONE,
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
      description:
        '使用我們的分類搜尋功能，輕鬆瀏覽相關主題的文章！我們將我們的文章按照不同的技術主題和內容類別進行分類，方便你尋找特定領域的資訊。不論是軟體開發方法論、系統架構設計還是資料庫最佳實踐，分類搜尋將幫助你快速定位到你所需的資源。瀏覽我們的分類頁面，探索不同的技術主題，深入了解各個領域的最新趨勢和知識！',
      keywords: '分類搜尋',
      revalidate: RevalidateTime.EVERY_HOUR,
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
      description:
        '通過我們的標籤搜尋功能，快速找到與特定標籤相關的文章！我們將我們的文章添加了多個標籤，以便更好地組織和分類內容。無論你對哪個特定主題感興趣，只需點擊相應的標籤，即可立即瀏覽相關的文章。這是一個方便的方法，讓你專注於你感興趣的特定主題或領域。瀏覽我們的標籤頁面，探索各個標籤下的文章集合，深入瞭解你感興趣的內容！',
      keywords: '標籤搜尋',
      revalidate: RevalidateTime.EVERY_HOUR,
    },
    resolve: {
      seoResolver,
    },
  },
  {
    path: 'article/:id',
    data: {
      revalidate: RevalidateTime.DAILY,
    },
    loadComponent: () => import('./article/article.component').then(m => m.ArticleComponent),
  },
  {
    path: 'notFound',
    loadComponent: () => import('./not-found/not-found.component').then(m => m.NotFoundComponent),
    data: {
      title: '404 - 頁面未找到',
      description:
        '抱歉，我們無法找到你要訪問的頁面。請檢查網址是否正確，或返回主頁繼續瀏覽其他內容。',
      keywords: '404 - 頁面未找到',
      revalidate: RevalidateTime.DAILY,
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
