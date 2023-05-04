import { DeviceService } from './../../service/device.service';
import {
  AfterViewInit,
  Component,
  DestroyRef,
  ElementRef,
  Inject,
  OnDestroy,
  PLATFORM_ID,
  Renderer2,
  ViewChild,
  inject,
} from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { filter, fromEvent } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
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
  constructor(private render: Renderer2, private device: DeviceService) {}

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
          this.render.addClass(target, 'bg-black');
          this.render.removeClass(target, 'bg-transparent');
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
          this.render.addClass(header, 'bg-transparent');
          this.render.removeClass(header, 'bg-black');
          this.render.removeClass(header, 'fixed');
        });
    }
  }
}
