import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideClientHydration } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { routes } from './app.route';
import { provideHttpClient, withInterceptors, withRequestsMadeViaParent } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [
    // 調整zone.js 偵測
    provideZoneChangeDetection({ eventCoalescing: true }),
    // httpcline
    provideHttpClient(
      // 懶加載攔截器
      // withRequestsMadeViaParent(),
      // 攔截器
      withInterceptors([
        (req, next) => {
           return next(req);
         },
       ])
    ),
    // 路由
    provideRouter(routes)
  ]
};
