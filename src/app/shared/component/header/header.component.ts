import { DeviceService } from '../../service/device.service';
import {
  AfterViewInit,
  Component,
  DestroyRef,
  ElementRef,
  OnDestroy,
  OnInit,
  Renderer2,
  ViewChild,
  inject,
  signal,
  ChangeDetectionStrategy,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { delay, filter, fromEvent, tap } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { NavigationEnd, NavigationStart, Router, RouterModule } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { UserService } from '../../service/user.service';
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
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('header') header?: ElementRef<HTMLElement>;
  @ViewChild('mobile') mobile?: ElementRef<HTMLElement>;
  render = inject(Renderer2);
  userSrv = inject(UserService);
  device = inject(DeviceService);
  router = inject(Router);
  isLogin = this.userSrv.isLogin;
  progressLoading = signal(false);
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

  ngOnInit() {
    this.router.events
      .pipe(
        filter(event => event instanceof NavigationStart),
        takeUntilDestroyed(this._destroyRef),
      )
      .subscribe(() => {
        this.progressLoading.set(true);
      });
    this.router.events
      .pipe(
        filter(event => event instanceof NavigationEnd),
        takeUntilDestroyed(this._destroyRef),
      )
      .subscribe(() => {
        this.progressLoading.set(false);
      });
  }

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
