import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../shared/components/header/header.component';
import {
  AnimationPathConfig,
  NgLottieComponent,
} from '../shared/components/ng-lottie/ng-lottie.component';
import { NgTypedComponent } from '../shared/components/ng-typed/ng-typed.component';
import { ScrollAnimateDirective } from '../shared/directive/scroll-animate.directive';
import { TypedOptions } from 'typed.js';
import { InputComponent } from '../shared/components/form/input/input.component';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-blog',
  standalone: true,
  imports: [
    CommonModule,
    HeaderComponent,
    ScrollAnimateDirective,
    InputComponent,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss'],
})
export class BlogComponent {
  constructor(private http: HttpClient) {
    this.http
      .get('https://ron-web-api.herokuapp.com/api/a0rticleLabel')
      .subscribe(res => console.warn(res));
  }
}
