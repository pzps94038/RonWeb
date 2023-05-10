import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputComponent } from '../shared/components/form/input/input.component';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FooterComponent } from '../shared/components/footer/footer.component';
import { HeaderComponent } from '../shared/components/header/header.component';
import {
  AnimationPathConfig,
  NgLottieComponent,
} from '../shared/components/ng-lottie/ng-lottie.component';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  imports: [
    CommonModule,
    InputComponent,
    ReactiveFormsModule,
    FooterComponent,
    HeaderComponent,
    NgLottieComponent,
  ],
})
export class LoginComponent {
  form = new FormGroup({
    account: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  });

  loginOptions: AnimationPathConfig = {
    path: 'assets/lottie/login.json',
  };

  submit() {
    this.form.markAllAsTouched();
  }
}
