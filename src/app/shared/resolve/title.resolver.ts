import { inject } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ResolveFn } from '@angular/router';
import { SharedService } from '../service/shared.service';

export const titleResolver: ResolveFn<boolean> = (route, state) => {
  let title = route.data?.['title'] as string | undefined;
  const sharedSrv = inject(SharedService);
  sharedSrv.setTitle(title);
  return true;
};
