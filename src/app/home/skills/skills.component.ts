import {
  AfterContentInit,
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  ViewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import Swiper from 'swiper';

@Component({
  selector: 'app-skills',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.scss'],
})
export class SkillsComponent implements AfterViewInit {
  private _swiper?: Swiper;
  @ViewChild('swiper') private _el?: ElementRef<HTMLDivElement>;
  constructor(private cdr: ChangeDetectorRef) {}

  ngAfterViewInit() {
    if (this._el?.nativeElement) {
      this._swiper = new Swiper(this._el?.nativeElement, {
        pagination: {
          el: '.swiper-pagination',
        },
        navigation: true,
        slidesPerView: 1,
        breakpoints: {
          768: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          1024: {
            slidesPerView: 4,
            spaceBetween: 20,
          },
        },
      });
    }
  }
}
