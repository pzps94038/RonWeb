import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'blog',
    loadComponent: () => import('./blog/blog.component').then(m => m.BlogComponent),
    loadChildren: () => import('./blog/blog.route').then(m => m.routes),
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
