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
      import('./project-experience-detail/project-experience-detail.component').then(
        m => m.ProjectExperienceDetailComponent,
      ),
    data: {
      title: '專案經歷明細',
    },
    resolve: {
      seoResolver,
    },
  },
  {
    path: 'edit/:id',
    loadComponent: () =>
      import('./project-experience-edit/project-experience-edit.component').then(
        m => m.ProjectExperienceEditComponent,
      ),
    data: {
      title: '專案經歷編輯',
    },
    resolve: {
      seoResolver,
    },
  },
  {
    path: 'create',
    loadComponent: () =>
      import('./project-experience-create/project-experience-create.component').then(
        m => m.ProjectExperienceCreateComponent,
      ),
    data: {
      title: '專案經歷新增',
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
