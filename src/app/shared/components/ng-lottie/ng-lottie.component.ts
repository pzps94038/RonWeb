import { AfterViewInit, Component, ElementRef, Input, OnDestroy, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import Lottie, { AnimationConfigWithPath, AnimationItem, RendererType } from 'lottie-web';
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
})
export class NgLottieComponent implements AfterViewInit, OnDestroy {
  @Input() options!: AnimationPathConfig | AnimationDataConfig;
  @Input() class: string = '';
  @Input() speed?: number;
  @ViewChild('element') el?: ElementRef<HTMLDivElement>;
  private _item?: AnimationItem;

  ngAfterViewInit() {
    if (this.el) {
      this._item = Lottie.loadAnimation({
        ...this.options,
        container: this.el.nativeElement,
      });
      this._item.setSpeed(this.speed ?? 1);
    }
  }

  ngOnDestroy() {
    this._item?.destroy();
  }
}
