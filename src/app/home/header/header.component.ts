import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subject, filter, fromEvent, takeUntil } from 'rxjs';
import { FormsModule } from '@angular/forms';
export type Option = {
  name: string;
  value: string;
};
export type Options = Option[];
@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements AfterViewInit, OnDestroy {
  @ViewChild('header') header?: ElementRef<HTMLElement>;
  @ViewChild('mobile') mobile?: ElementRef<HTMLElement>;
  links: Options = [
    {
      name: '首頁',
      value: 'about',
    },
    {
      name: '技能',
      value: 'skills',
    },
    {
      name: '專案經歷',
      value: 'experience',
    },
    {
      name: '聯絡我們',
      value: 'contact',
    },
  ];
  mobileToggle: boolean = false;
  private _observers: IntersectionObserver[] = [];
  private _destroy$ = new Subject<any>();
  constructor(private render: Renderer2) {}

  ngOnDestroy() {
    for (const observer of this._observers) {
      observer.disconnect();
    }
    this._destroy$.next(null);
    this._destroy$.complete();
  }

  /**
   * 滾到特定元素
   */
  scrollToElement(id: string, toggle?: boolean) {
    const dom = document.getElementById(id) as HTMLElement | undefined;
    dom?.scrollIntoView({ behavior: 'smooth' });
    if (toggle !== undefined) {
      this.mobileToggle = toggle;
    }
  }

  ngAfterViewInit() {
    const header = this.header?.nativeElement;
    const mobile = this.mobile?.nativeElement;
    if (header && mobile) {
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
          takeUntil(this._destroy$),
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