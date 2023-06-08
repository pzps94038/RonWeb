import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DeviceService } from '../../service/device.service';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { heroArrowDownTray } from '@ng-icons/heroicons/outline';

@Component({
  selector: 'app-install-app',
  standalone: true,
  imports: [CommonModule, NgIconComponent],
  providers: [provideIcons({ heroArrowDownTray })],
  templateUrl: './install-app.component.html',
  styleUrls: ['./install-app.component.scss'],
})
export class InstallAppComponent implements OnInit {
  show = false;
  deferredPrompt?: any;
  deviceSrv = inject(DeviceService);

  ngOnInit() {
    if (this.deviceSrv.isClient) {
      if (window.matchMedia('(display-mode: standalone)').matches) {
        // 用户已安装 PWA
      } else {
        // 用户未安装 PWA
        if ('serviceWorker' in navigator && 'PushManager' in window) {
          // 支持安装 PWA
          window.addEventListener('beforeinstallprompt', event => {
            event.preventDefault();
            this.deferredPrompt = event;
            this.show = true;
          });
        } else {
          // 不支持安装 PWA
        }
      }
    }
  }

  async install() {
    if (this.deviceSrv.isClient) {
      if (this.deferredPrompt) {
        // 觸發安装
        this.deferredPrompt.prompt();
        // 用户的安装选择
        const { outcome } = await this.deferredPrompt.userChoice;
        if (outcome === 'accepted') {
          // 用户已接受安装
          this.deferredPrompt = null;
          this.show = false;
        } else {
          // 用户拒绝安装
        }
      }
    }
  }
}
