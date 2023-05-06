import { Component, EventEmitter, Output } from '@angular/core';
import { AnimationPathConfig, NgLottieComponent } from '../ng-lottie/ng-lottie.component';

@Component({
  selector: 'app-error',
  standalone: true,
  imports: [NgLottieComponent],
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.scss'],
})
export class ErrorComponent {
  errorOptions: AnimationPathConfig = {
    path: 'assets/lottie/error-404.json',
  };
  @Output('refresh') refreshEmitter = new EventEmitter<boolean>();
}
