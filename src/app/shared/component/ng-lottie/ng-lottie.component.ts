import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnDestroy,
  ViewChild,
  inject,
  ChangeDetectionStrategy,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import Lottie, { AnimationConfigWithPath, AnimationItem, RendererType } from 'lottie-web';
import { DeviceService } from '../../service/device.service';
export type AnimationPathConfig<T extends RendererType = 'svg'> = Omit<
  AnimationConfigWithPath<T>,
  'container'
>;
export type AnimationDataConfig<T extends RendererType = 'svg'> = Omit<
  AnimationConfigWithPath<T>,
  'container'
>;
@Component({
  selector: 'ng-lottie',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ng-lottie.component.html',
  styleUrls: ['./ng-lottie.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NgLottieComponent implements AfterViewInit, OnDestroy {
  @Input() options!: AnimationPathConfig | AnimationDataConfig;
  @Input() class: string = '';
  @Input() speed?: number;
  @Input() lazyLoading: boolean = true;
  @ViewChild('element') el?: ElementRef<HTMLDivElement>;
  private _isLoading = false;
  private _item?: AnimationItem;
  device = inject(DeviceService);
  ngAfterViewInit() {
    if (this.device.isServer) {
      return;
    }
    if (this.el) {
      if (this.lazyLoading) {
        const observer = new IntersectionObserver(([entry]) => {
          if (!this._isLoading && entry.isIntersecting) {
            this._item = Lottie.loadAnimation({
              ...this.options,
              container: this.el!.nativeElement,
            });
            this._item.setSpeed(this.speed ?? 1);
            this._isLoading = true;
          }
        });
        observer.observe(this.el.nativeElement);
      } else {
        this._item = Lottie.loadAnimation({
          ...this.options,
          container: this.el!.nativeElement,
        });
        this._item.setSpeed(this.speed ?? 1);
        this._isLoading = true;
      }
    }
  }

  ngOnDestroy() {
    this._item?.destroy();
  }
}
