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
      import('./code-detail/code-detail.component').then(m => m.CodeDetailComponent),
    data: {
      title: '代碼明細',
    },
    resolve: {
      seoResolver,
    },
  },
  {
    path: 'create',
    loadComponent: () =>
      import('./code-create/code-create.component').then(m => m.CodeCreateComponent),
    data: {
      title: '代碼新增',
    },
    resolve: {
      seoResolver,
    },
  },
  {
    path: 'edit/:id',
    loadComponent: () => import('./code-edit/code-edit.component').then(m => m.CodeEditComponent),
    data: {
      title: '代碼修改',
    },
    resolve: {
      seoResolver,
    },
  },
];
