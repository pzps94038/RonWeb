import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { SeoService } from '../service/seo.service';

export const seoResolver: ResolveFn<boolean> = (route, state) => {
  const seoSrv = inject(SeoService);
  seoSrv.setSeo(route.data);
  return true;
};
