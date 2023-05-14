import { DeviceService } from './../../service/device.service';
import {
  AfterViewInit,
  Component,
  DestroyRef,
  ElementRef,
  Inject,
  OnDestroy,
  OnInit,
  PLATFORM_ID,
  Renderer2,
  ViewChild,
  inject,
  signal,
} from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { filter, fromEvent } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { SharedService } from '../../service/shared.service';
export type Option = {
  name: string;
  value: string;
};
export type Options = Option[];
@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements AfterViewInit, OnDestroy {
  @ViewChild('header') header?: ElementRef<HTMLElement>;
  @ViewChild('mobile') mobile?: ElementRef<HTMLElement>;
  render = inject(Renderer2);
  sharedSrv = inject(SharedService);
  device = inject(DeviceService);
  isLogin = this.sharedSrv.isLogin;
  links: Options = [
    {
      name: '首頁',
      value: '/blog',
    },
    {
      name: '關於我',
      value: '/about-me',
    },
  ];
  mobileToggle: boolean = false;
  private _observers: IntersectionObserver[] = [];
  private _destroyRef = inject(DestroyRef);

  ngOnDestroy() {
    for (const observer of this._observers) {
      observer.disconnect();
    }
  }

  ngAfterViewInit() {
    const header = this.header?.nativeElement;
    const mobile = this.mobile?.nativeElement;
    if (header && mobile && this.device.isClient) {
      const observer = new IntersectionObserver(([{ isIntersecting, target }]) => {
        // 離開焦點
        if (!isIntersecting) {
          this.render.addClass(target, 'fixed');
          this.render.removeClass(target, 'absolute');
        }
      });
      observer.observe(header);
      this._observers.push(observer);
      fromEvent(window, 'scroll')
        .pipe(
          filter(() => !!!window.scrollY),
          takeUntilDestroyed(this._destroyRef),
        )
        .subscribe(() => {
          this.render.addClass(header, 'absolute');
          this.render.removeClass(header, 'fixed');
        });
    }
  }
}
