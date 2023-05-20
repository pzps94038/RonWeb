import { Routes } from '@angular/router';
import { titleResolver } from 'src/app/shared/resolve/title.resolver';

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
      titleResolver,
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
      titleResolver,
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
      titleResolver,
    },
  },
  {
    path: '**',
    pathMatch: 'full',
    redirectTo: '',
  },
];
