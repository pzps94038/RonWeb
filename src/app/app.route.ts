import { Routes } from '@angular/router';
import { isNotLoginGuard } from './shared/guard/is-not-login.guard';
import { isLoginGuard } from './shared/guard/is-login.guard';
import { seoResolver } from './shared/resolve/seo.resolver';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/blog',
  },
  {
    path: 'login',
    canActivate: [isNotLoginGuard],
    loadComponent: () => import('./login/login.component').then(m => m.LoginComponent),
    data: {
      title: '登入',
      description: '使用此登入頁面進入您的帳戶',
      keywords: '登入',
    },
    resolve: {
      seoResolver,
    },
  },
  {
    path: 'blog',
    loadComponent: () => import('./blog/blog.component').then(m => m.BlogComponent),
    loadChildren: () => import('./blog/blog.route').then(m => m.routes),
    resolve: {
      seoResolver,
    },
  },
  {
    path: 'setting',
    canActivate: [isLoginGuard],
    canActivateChild: [isLoginGuard],
    loadComponent: () => import('./setting/setting.component').then(m => m.SettingComponent),
    loadChildren: () => import('./setting/setting.route').then(m => m.routes),
  },
  {
    path: 'about-me',
    loadComponent: () => import('./about-me/about-me.component').then(m => m.AboutMeComponent),
    data: {
      title: '關於我',
      description:
        '歡迎來到我們的軟體工程師學習心得部落格！在這裡，我們分享軟體工程師的學習心得和實戰經驗。從程式設計到系統架構，我們探索各種技術主題，包括程式語言、開發框架、資料庫和軟體開發方法論。我們的目標是提供有價值的學習資源，協助軟體工程師成長並應對日常挑戰。透過分享學習心得，我們希望能夠啟發和連結軟體工程師社群，一起學習和成長。',
      keywords: '關於我',
    },
    resolve: {
      seoResolver,
    },
  },
  {
    path: '**',
    pathMatch: 'full',
    redirectTo: '/blog',
  },
];
