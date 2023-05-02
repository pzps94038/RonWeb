import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./blog/blog.component').then(m => m.BlogComponent),
  },
  {
    path: 'about-me',
    loadComponent: () => import('./about-me/about-me.component').then(m => m.AboutMeComponent),
  },
  {
    path: '**',
    pathMatch: 'full',
    redirectTo: '',
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      initialNavigation: 'enabledBlocking',
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
