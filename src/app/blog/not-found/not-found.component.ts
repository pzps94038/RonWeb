import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  NgLottieComponent,
  AnimationPathConfig,
} from 'src/app/shared/component/ng-lottie/ng-lottie.component';

@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [CommonModule, NgLottieComponent],
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NotFoundComponent {
  notFoundOptions: AnimationPathConfig = {
    path: 'assets/lottie/page-not-found-error-404.json',
  };
}
