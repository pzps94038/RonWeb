import { Directive, ElementRef, Input, OnDestroy, OnInit, Renderer2 } from '@angular/core';
export type Repeat = string | number | 'infinite';
export type Delay = number;
export type Speed = 'slow' | 'slower' | 'fast' | 'faster';
@Directive({
  selector: '[scrollAnimate]',
  standalone: true
})
export class ScrollAnimateDirective implements OnInit, OnDestroy {
  @Input() scrollAnimate!: string;
  @Input() delay?: Delay;
  @Input() repeat?: Repeat;
  @Input() speed?: Speed;
  @Input() once = false;
  private _isLoading = false;
  private _observer = new IntersectionObserver(([entry])=> {
    const el = entry.target as Element;
    if(this.once) {
      if(entry.isIntersecting && !this._isLoading) {
        this.addClass(el);
        this._isLoading = true;
      }
    } else {
      if(entry.isIntersecting) {
        this.addClass(el);
        this._isLoading = true;
      } else {
        this.removeClass(el);
        this._isLoading = false;
      }
    }
  });

  constructor(
    private el: ElementRef<Element>,
    private render: Renderer2
  ){ }

  ngOnInit() {
    if(this.el.nativeElement) {
      this._observer.observe(this.el.nativeElement);
    }
  }

  ngOnDestroy() {
    this._observer.disconnect();
  }

  /**
   * 添加class
   * @param el
   */
  addClass(el: Element) {
    this.render.addClass(el, 'animate__animated');
    if(this.delay) {
      this.render.addClass(el, `animate__delay-${this.delay}s`);
    }
    if(this.speed) {
      this.render.addClass(el, `animate__${this.speed}`);
    }
    if(this.repeat) {
      this.render.addClass(el, `animate__repeat-${this.repeat}`);
    }
    this.render.addClass(el, this.scrollAnimate);
    this._isLoading = true;
  }

  /**
   * 移除class
   * @param el
   */
  removeClass(el: Element) {
    this.render.removeClass(el, 'animate__animated');
    if(this.delay) {
      this.render.removeClass(el, `animate__delay-${this.delay}s`);
    }
    if(this.speed) {
      this.render.removeClass(el, `animate__${this.speed}`);
    }
    if(this.repeat) {
      this.render.removeClass(el, `animate__repeat-${this.repeat}`);
    }
    this.render.removeClass(el, this.scrollAnimate);
    this._isLoading = false;
  }
}
