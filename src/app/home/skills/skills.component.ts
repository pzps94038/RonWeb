import {
  AfterContentInit,
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  OnDestroy,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import Swiper from 'swiper';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { heroArrowLeftCircle, heroArrowRightCircle, heroBars3 } from '@ng-icons/heroicons/outline';

@Component({
  selector: 'app-skills',
  standalone: true,
  imports: [CommonModule, NgIconComponent],
  providers: [provideIcons({ heroArrowLeftCircle, heroArrowRightCircle })],
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.scss'],
})
export class SkillsComponent implements AfterViewInit, OnDestroy {
  swiper?: Swiper;
  @ViewChild('el') private _el?: ElementRef<HTMLDivElement>;
  constructor(
    private render: Renderer2
  ) {}

  ngAfterViewInit() {
    if (this._el?.nativeElement) {
      const animate = 'animate__fadeIn';
      // 進畫面
      const observer = new IntersectionObserver((entrys)=> {
        for(const entry of entrys) {
          const el = entry.target as Element;
          if(entry.isIntersecting) {
            this.render.addClass(el, 'animate__animated');
            this.render.addClass(el, animate);
          } else {
            let classList: string[] = [];
            el.classList.forEach(a=> classList.push(a));
            // 移除swiper以外的class
            classList = classList.filter(a=> !new RegExp(/^swiper-slide/).test(a));
            for(const ngClass of classList) {
              this.render.removeClass(el, ngClass);
            }
          }
        }
      });
      this.swiper = new Swiper(this._el?.nativeElement, {
        on: {
          slideChange: (e) => {
            const slidesPerView = e.params.slidesPerView as number;
            const start = e.activeIndex;
            const end = e.activeIndex + slidesPerView - 1;
            for(let i = start; i <= end; i++) {
              observer.observe(e.slides[i]);
            }
          },
          destroy: () => observer.disconnect()
        },
        breakpoints: {
          320: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 3,
            spaceBetween: 20,
          },
          1024: {
            slidesPerView: 4,
            spaceBetween: 20,
          },
        },
      });
      const slidesPerView = this.swiper.params.slidesPerView as number;
      const start = this.swiper.activeIndex;
      const end = this.swiper.activeIndex + slidesPerView - 1;
      for(let i = start; i <= end; i++) {
        observer.observe(this.swiper.slides[i]);
      }
    }
  }

  ngOnDestroy() {
    this.swiper?.destroy();
  }
}
