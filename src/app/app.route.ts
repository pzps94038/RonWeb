import { Routes } from '@angular/router';
import { isNotLoginGuard } from './shared/guard/is-not-login.guard';
import { isLoginGuard } from './shared/guard/is-login.guard';

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
  },
  {
    path: 'blog',
    loadComponent: () => import('./blog/blog.component').then(m => m.BlogComponent),
    loadChildren: () => import('./blog/blog.route').then(m => m.routes),
  },
  {
    path: 'setting',
    canActivate: [isLoginGuard],
    loadComponent: () => import('./setting/setting.component').then(m => m.SettingComponent),
  },
  {
    path: 'about-me',
    loadComponent: () => import('./about-me/about-me.component').then(m => m.AboutMeComponent),
  },
  {
    path: '**',
    pathMatch: 'full',
    redirectTo: '/blog',
  },
];
