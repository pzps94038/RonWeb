import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DeviceService } from '../../service/device.service';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { heroChevronUp } from '@ng-icons/heroicons/outline';

@Component({
  selector: 'app-go-top',
  standalone: true,
  imports: [CommonModule, NgIconComponent],
  providers: [provideIcons({ heroChevronUp })],
  templateUrl: './go-top.component.html',
  styleUrls: ['./go-top.component.scss'],
})
export class GoTopComponent {
  deviceSrv = inject(DeviceService);

  /**
   * 滾回最上面
   */
  goTop() {
    if (this.deviceSrv.isServer) {
      return;
    }
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }
}
