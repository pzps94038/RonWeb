import { ApplicationConfig, APP_INITIALIZER, importProvidersFrom } from '@angular/core';
import { provideClientHydration } from '@angular/platform-browser';
import { provideRouter, withInMemoryScrolling } from '@angular/router';
import { routes } from './app.route';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { httpInterceptor } from './shared/api/shared/http.interceptor';
import { EllipsisPipe } from './shared/pipe/ellipsis.pipe';
import { UserService } from './shared/service/user.service';

export const appConfig: ApplicationConfig = {
  providers: [
    // httpcline
    provideHttpClient(withInterceptors([httpInterceptor])),
    // 路由
    provideRouter(routes, withInMemoryScrolling({ scrollPositionRestoration: 'top' })),
    provideClientHydration(),
    importProvidersFrom([]),
    EllipsisPipe,
    {
      provide: APP_INITIALIZER,
      useFactory: (userSrv: UserService) => () => {
        const token = userSrv.getToken();
        const isLogin = !!token;
        userSrv.isLogin.set(isLogin);
      },
      deps: [UserService],
      multi: true,
    },
  ],
};
