import { ApplicationConfig, APP_INITIALIZER, importProvidersFrom, isDevMode } from '@angular/core';
import { provideClientHydration } from '@angular/platform-browser';
import { provideRouter, withInMemoryScrolling } from '@angular/router';
import { routes } from './app.route';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { httpInterceptor } from './shared/api/shared/http.interceptor';
import { EllipsisPipe } from './shared/pipe/ellipsis.pipe';
import { UserService } from './shared/service/user.service';
import { ThemeService } from './shared/service/theme.service';
import { provideServiceWorker } from '@angular/service-worker';

export const appConfig: ApplicationConfig = {
  providers: [
    // httpclient && 攔截器
    provideHttpClient(withInterceptors([httpInterceptor])),
    // 路由
    provideRouter(routes, withInMemoryScrolling({ scrollPositionRestoration: 'top' })),
    // 伺服器模式優化，切換Dom不在全部淸除，而是逐步漸進
    provideClientHydration(),
    // 匯入ngModule等等...
    importProvidersFrom([]),
    // 字串截斷... 提供給seo Srv
    EllipsisPipe,
    // App初始化
    {
      provide: APP_INITIALIZER,
      useFactory: (userSrv: UserService, themeSrv: ThemeService) => () => {
        const token = userSrv.getToken();
        const isLogin = !!token;
        userSrv.isLogin.set(isLogin);
        themeSrv.initTheme();
      },
      deps: [UserService, ThemeService],
      multi: true,
    },
    provideServiceWorker('ngsw-worker.js', {
      enabled: !isDevMode(),
      registrationStrategy: 'registerWhenStable:30000',
    }),
  ],
};
