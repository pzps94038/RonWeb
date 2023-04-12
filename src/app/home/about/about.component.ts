import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgTypedComponent } from 'src/app/shared/components/ng-typed/ng-typed.component';
import { TypedOptions } from 'typed.js';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule, NgTypedComponent],
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
})
export class AboutComponent {
  options: TypedOptions = {
    strings: [
      '喜愛撰寫程式碼</br>持續精進開發技術</br>擁有持續集成和持續交付的實作概念',
      '保持自我學習的熱情</br>執行從零到有的後台系統</br>構想多種錯誤情況處理',
    ],
    loop: true,
    typeSpeed: 50,
    backSpeed: 30,
  };
}
