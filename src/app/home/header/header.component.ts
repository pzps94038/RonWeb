import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subject, debounceTime, filter, fromEvent, takeUntil } from 'rxjs';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { heroBars3 } from '@ng-icons/heroicons/outline';
@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, NgIconComponent],
  providers: [provideIcons({ heroBars3 })],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements AfterViewInit, OnDestroy {
  @ViewChild('header') header?: ElementRef<HTMLElement>;
  @ViewChild('mobile') mobile?: ElementRef<HTMLElement>;
  mobileToggle: boolean = false;
  private _destroy$ = new Subject<any>();
  constructor(private render: Renderer2) {}

  ngOnDestroy(): void {
    this._destroy$.next(null);
    this._destroy$.complete();
  }

  /**
   * 滾到特定元素
   */
  scrollToElement(id: string) {
    const dom = document.getElementById(id) as HTMLElement | undefined;
    dom?.scrollIntoView({ behavior: 'smooth' });
  }

  /**
   * 滾動最上面
   */
  goToTop() {
    window.scroll({ top: 0, behavior: 'smooth' });
  }

  /**
   * 手機滾動最上面
   */
  mobileGoToTop() {
    window.scroll({ top: 0, behavior: 'smooth' });
    this.mobileToggle = false;
  }

  mobileScrollToElement(id: string) {
    const dom = document.getElementById(id) as HTMLElement | undefined;
    dom?.scrollIntoView({ behavior: 'smooth' });
    this.mobileToggle = false;
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
