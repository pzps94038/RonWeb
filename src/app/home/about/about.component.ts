import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgTypedComponent } from 'src/app/shared/components/ng-typed/ng-typed.component';
import { TypedOptions } from 'typed.js';
import {
  AnimationPathConfig,
  NgLottieComponent,
} from 'src/app/shared/components/ng-lottie/ng-lottie.component';
import { HeaderComponent } from '../header/header.component';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule, NgTypedComponent, NgLottieComponent, HeaderComponent],
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
})
export class AboutComponent {
  typedOptions: TypedOptions = {
    strings: [
      '喜愛撰寫程式碼</br>持續精進開發技術</br>保持自我學習的熱情</br>執行從零到有的後台系統</br>構想多種錯誤情況處理',
    ],
    loop: true,
    typeSpeed: 100,
    backSpeed: 30,
  };

  astronotOptions: AnimationPathConfig = {
    path: 'assets/lottie/astronot.json',
  };

  moonOptions: AnimationPathConfig = {
    path: 'assets/lottie/moon.json',
  };
}
