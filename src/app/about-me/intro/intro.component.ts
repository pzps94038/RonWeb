import { ScrollAnimateDirective } from '../../shared/directive/scroll-animate.directive';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgTypedComponent } from 'src/app/shared/components/ng-typed/ng-typed.component';
import { TypedOptions } from 'typed.js';
import {
  AnimationPathConfig,
  NgLottieComponent,
} from 'src/app/shared/components/ng-lottie/ng-lottie.component';
import { HeaderComponent } from '../../shared/components/header/header.component';

@Component({
  selector: 'app-intro',
  standalone: true,
  imports: [
    CommonModule,
    NgTypedComponent,
    NgLottieComponent,
    HeaderComponent,
    ScrollAnimateDirective,
  ],
  templateUrl: './intro.component.html',
  styleUrls: ['./intro.component.scss'],
})
export class IntroComponent {
  typedOptions: TypedOptions = {
    strings: ['Full-Stack Developer'],
    loop: true,
    typeSpeed: 100,
    backSpeed: 30,
  };

  astronotOptions: AnimationPathConfig = {
    path: 'assets/lottie/astronot.json',
  };
}
