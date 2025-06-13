import { mergeApplicationConfig, ApplicationConfig } from '@angular/core';
import { provideServerRendering } from '@angular/platform-server';
import { appConfig } from './app.config';
import { provideISR } from '@rx-angular/isr';

const serverConfig: ApplicationConfig = {
  providers: [provideServerRendering(), provideISR()],
};

export const config = mergeApplicationConfig(appConfig, serverConfig);
