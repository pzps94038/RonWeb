import { Routes } from '@angular/router';
import { isNotLoginGuard } from './shared/guard/is-not-login.guard';
import { isLoginGuard } from './shared/guard/is-login.guard';
import { titleResolver } from './shared/resolve/title.resolver';

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
    },
    resolve: {
      titleResolver,
    },
  },
  {
    path: 'blog',
    loadComponent: () => import('./blog/blog.component').then(m => m.BlogComponent),
    loadChildren: () => import('./blog/blog.route').then(m => m.routes),
    resolve: {
      titleResolver,
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
    },
    resolve: {
      titleResolver,
    },
  },
  {
    path: '**',
    pathMatch: 'full',
    redirectTo: '/blog',
  },
];
