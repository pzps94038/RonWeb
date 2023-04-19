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
export class SkillsComponent implements AfterViewInit {
  swiper?: Swiper;
  @ViewChild('el') private _el?: ElementRef<HTMLDivElement>;
  constructor(private cdr: ChangeDetectorRef) {}

  ngAfterViewInit() {
    if (this._el?.nativeElement) {
      this.swiper = new Swiper(this._el?.nativeElement, {
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
    }
  }
}
