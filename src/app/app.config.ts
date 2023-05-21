import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideClientHydration } from '@angular/platform-browser';
import { provideRouter, withInMemoryScrolling } from '@angular/router';
import { routes } from './app.route';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { httpInterceptor } from './shared/api/shared/http.interceptor';
import { EllipsisPipe } from './shared/pipe/ellipsis.pipe';

export const appConfig: ApplicationConfig = {
  providers: [
    // httpcline
    provideHttpClient(withInterceptors([httpInterceptor])),
    // 路由
    provideRouter(routes, withInMemoryScrolling({ scrollPositionRestoration: 'top' })),
    provideClientHydration(),
    importProvidersFrom([]),
    EllipsisPipe,
  ],
};
