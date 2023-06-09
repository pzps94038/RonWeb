import { Routes } from '@angular/router';
import { seoResolver } from 'src/app/shared/resolve/seo.resolver';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'detail',
    pathMatch: 'full',
  },
  {
    path: 'detail',
    loadComponent: () =>
      import('./article-label-detail/article-label-detail.component').then(
        m => m.ArticleLabelDetailComponent,
      ),
    data: {
      title: '標籤明細',
    },
    resolve: {
      seoResolver,
    },
  },
  {
    path: 'edit/:id',
    loadComponent: () =>
      import('./article-label-edit/article-label-edit.component').then(
        m => m.ArticleLabelEditComponent,
      ),
    data: {
      title: '標籤編輯',
    },
    resolve: {
      seoResolver,
    },
  },
  {
    path: 'create',
    loadComponent: () =>
      import('./article-label-create/article-label-create.component').then(
        m => m.ArticleLabelCreateComponent,
      ),
    data: {
      title: '標籤新增',
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
