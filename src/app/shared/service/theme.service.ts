import { Injectable, inject, signal } from '@angular/core';
import { DeviceService } from './device.service';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  deviceSrv = inject(DeviceService);
  darkMode = signal(false);

  initTheme() {
    if (this.deviceSrv.isClient) {
      const theme = localStorage.getItem('theme');
      if (theme) {
        this.toggleTheme(JSON.parse(theme) as boolean);
      } else {
        this.toggleTheme(this.darkMode());
      }
    }
  }

  /**
   * 切換模式
   * @param darkMode
   */
  toggleTheme(darkMode: boolean) {
    this.darkMode.set(darkMode);
    const html = document.getElementsByTagName('html')[0];
    if (darkMode) {
      html.setAttribute('data-theme', 'business');
      localStorage.setItem('theme', JSON.stringify(true));
    } else {
      html.setAttribute('data-theme', 'corporate');
      localStorage.setItem('theme', JSON.stringify(false));
    }
  }
}
