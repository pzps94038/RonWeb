import { ApplicationConfig } from '@angular/core';
import { provideClientHydration } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { routes } from './app.route';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { httpInterceptor } from './shared/api/shared/http.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    // httpcline
    provideHttpClient(withInterceptors([httpInterceptor])),
    // 路由
    provideRouter(routes),
    provideClientHydration(),
  ],
};
