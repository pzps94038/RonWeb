import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Component, DestroyRef, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputComponent } from '../shared/components/form/input/input.component';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FooterComponent } from '../shared/components/footer/footer.component';
import { HeaderComponent } from '../shared/components/header/header.component';
import {
  AnimationPathConfig,
  NgLottieComponent,
} from '../shared/components/ng-lottie/ng-lottie.component';
import { LoginService } from '../shared/api/login/login.service';
import { SharedService } from '../shared/service/shared.service';
import { catchError, finalize } from 'rxjs';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { heroXMark } from '@ng-icons/heroicons/outline';
import { Router } from '@angular/router';

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
    NgIconComponent,
  ],
  providers: [provideIcons({ heroXMark })],
})
export class LoginComponent {
  loginSrv = inject(LoginService);
  sharedSrv = inject(SharedService);
  router = inject(Router);
  loading = signal(false);

  errMsg = signal<string | undefined>(undefined);
  private _destroyRef = inject(DestroyRef);

  get account() {
    return this.form.get('account') as FormControl;
  }

  get password() {
    return this.form.get('password') as FormControl;
  }

  form = new FormGroup({
    account: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  });

  loginOptions: AnimationPathConfig = {
    path: 'assets/lottie/login.json',
  };

  submit() {
    this.form.markAllAsTouched();
    if (this.form.valid) {
      this.loading.set(true);
      this.loginSrv
        .login({
          account: this.account.value,
          password: this.password.value,
        })
        .pipe(
          catchError(err => {
            this.errMsg.set('系統發生錯誤');
            throw err;
          }),
          finalize(() => this.loading.set(false)),
          takeUntilDestroyed(this._destroyRef),
        )
        .subscribe(res => {
          const { returnMessage, data } = res;
          if (this.sharedSrv.ifSuccess(res, false)) {
            const { token, userId } = data;
            this.sharedSrv.setToken(token);
            this.sharedSrv.setUserId(userId);
            this.sharedSrv.isLogin.set(true);
            this.router.navigate(['setting']);
          } else {
            this.errMsg.set(returnMessage);
          }
        });
    }
  }
}
