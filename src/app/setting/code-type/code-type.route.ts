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
      import('./code-type-detail/code-type-detail.component').then(m => m.CodeTypeDetailComponent),
    data: {
      title: '代碼類型明細',
    },
    resolve: {
      seoResolver,
    },
  },
  {
    path: 'edit/:id',
    loadComponent: () =>
      import('./code-type-edit/code-type-edit.component').then(m => m.CodeTypeEditComponent),
    data: {
      title: '代碼類型編輯',
    },
    resolve: {
      seoResolver,
    },
  },
  {
    path: 'create',
    loadComponent: () =>
      import('./code-type-create/code-type-create.component').then(m => m.CodeTypeCreateComponent),
    data: {
      title: '代碼類型明細新增',
    },
    resolve: {
      seoResolver,
    },
  },
  {
    path: ':code-type-id',
    loadChildren: () => import('./code/code.route').then(m => m.routes),
  },
];
