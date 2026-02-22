import { mergeApplicationConfig, ApplicationConfig } from '@angular/core';
import { provideServerRendering } from '@angular/platform-server';
import { appConfig } from './app.config';
import { provideISR, isrHttpInterceptors } from '@rx-angular/isr';
import { provideHttpClient, withInterceptors } from '@angular/common/http';

const serverConfig: ApplicationConfig = {
  providers: [
    provideServerRendering(),
    provideISR(),
    provideHttpClient(withInterceptors(isrHttpInterceptors)),
  ],
};

export const config = mergeApplicationConfig(appConfig, serverConfig);
