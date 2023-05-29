import {
  Component,
  ElementRef,
  inject,
  OnInit,
  AfterViewInit,
  OnDestroy,
  ChangeDetectionStrategy,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationStart, NavigationEnd, Router } from '@angular/router';
import { Subject, filter, takeUntil } from 'rxjs';
import { DeviceService } from '../../service/device.service';
import { toObservable } from '@angular/core/rxjs-interop';
import { ThemeService } from '../../service/theme.service';
@Component({
  selector: 'app-giscus',
  standalone: true,
  imports: [CommonModule],
  template: '',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GiscusComponent implements OnInit, AfterViewInit, OnDestroy {
  deviceSrv = inject(DeviceService);
  themeSrv = inject(ThemeService);
  elementRef = inject(ElementRef<HTMLElement>);
  router = inject(Router);
  darkMode$ = toObservable(this.themeSrv.darkMode);
  private _destroy$ = new Subject<any>();

  ngOnInit(): void {
    this.router.events
      .pipe(
        filter(event => event instanceof NavigationStart),
        takeUntil(this._destroy$),
      )
      .subscribe(() => {
        this.elementRef.nativeElement.innerHTML = '';
      });

    this.router.events
      .pipe(
        filter(event => event instanceof NavigationEnd),
        takeUntil(this._destroy$),
      )
      .subscribe(() => {
        this.generateComment();
      });
  }

  ngAfterViewInit(): void {
    this.generateComment();
  }

  ngOnDestroy(): void {
    this._destroy$.next(null);
    this._destroy$.complete();
  }

  generateComment() {
    if (!this.deviceSrv.isClient) {
      return;
    }
    let scriptTag: HTMLScriptElement | undefined = undefined;
    const element = this.elementRef.nativeElement;
    this.darkMode$.pipe(takeUntil(this._destroy$)).subscribe(darkMode => {
      if (scriptTag) {
        this.elementRef.nativeElement.innerHTML = '';
        scriptTag = document.createElement('script');
      } else {
        scriptTag = document.createElement('script');
      }
      scriptTag.setAttribute('src', 'https://giscus.app/client.js');
      scriptTag.setAttribute('data-repo', 'pzps94038/RonWeb');
      scriptTag.setAttribute('data-repo-id', 'R_kgDOJU7i_Q');
      scriptTag.setAttribute('data-category', 'Announcements');
      scriptTag.setAttribute('data-category-id', 'DIC_kwDOJU7i_c4CWkJZ');
      scriptTag.setAttribute('data-mapping', 'title');
      scriptTag.setAttribute('data-reactions-enabled', '1');
      scriptTag.setAttribute('data-emit-metadata', '0');
      scriptTag.setAttribute('data-theme', darkMode ? 'dark_tritanopia' : 'light_tritanopia');
      scriptTag.setAttribute('data-lang', 'zh-TW');
      scriptTag.setAttribute('data-loading', 'lazy');
      scriptTag.setAttribute('crossorigin', 'anonymous');
      scriptTag.setAttribute('async', '');
      element.appendChild(scriptTag);
    });
  }
}
