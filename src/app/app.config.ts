import { ApplicationConfig } from '@angular/core';
import { provideRouter, withInMemoryScrolling } from '@angular/router';
import { routes } from './app.route';
import { provideHttpClient } from '@angular/common/http';
import { EllipsisPipe } from './shared/pipe/ellipsis.pipe';

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(),
    provideRouter(routes, withInMemoryScrolling({ scrollPositionRestoration: 'top' })),
    EllipsisPipe,
  ],
};
