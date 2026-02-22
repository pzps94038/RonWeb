import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  OnDestroy,
  Renderer2,
  ViewChild,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import Swiper from 'swiper';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { heroArrowLeftCircle, heroArrowRightCircle } from '@ng-icons/heroicons/outline';
import { DeviceService } from 'src/app/shared/service/device.service';
import { ScrollAnimateDirective } from 'src/app/shared/directive/scroll-animate.directive';

@Component({
  selector: 'app-skills',
  standalone: true,
  imports: [CommonModule, NgIconComponent, ScrollAnimateDirective],
  providers: [provideIcons({ heroArrowLeftCircle, heroArrowRightCircle })],
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.scss'],
})
export class SkillsComponent implements AfterViewInit, OnDestroy {
  swiper = signal<Swiper | undefined>(undefined);
  @ViewChild('el') private _el?: ElementRef<HTMLDivElement>;
  constructor(private device: DeviceService, private cdr: ChangeDetectorRef) {}

  ngAfterViewInit() {
    if (this.device.isServer) {
      return;
    }
    if (this._el?.nativeElement) {
      const swiper = new Swiper(this._el?.nativeElement, {
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
      this.swiper.set(swiper);
      this.cdr.detectChanges();
    }
  }

  ngOnDestroy() {
    this.swiper()?.destroy();
  }
}
