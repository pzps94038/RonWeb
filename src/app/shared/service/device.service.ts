import { isPlatformBrowser, isPlatformServer } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DeviceService {
  constructor(@Inject(PLATFORM_ID) private platformId: string) {}
  get isClient() {
    return isPlatformBrowser(this.platformId);
  }

  get isServer() {
    return isPlatformServer(this.platformId);
  }
}
