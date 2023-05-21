import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Component, DestroyRef, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputComponent } from '../shared/component/form/input/input.component';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FooterComponent } from '../shared/component/footer/footer.component';
import { HeaderComponent } from '../shared/component/header/header.component';
import {
  AnimationPathConfig,
  NgLottieComponent,
} from '../shared/component/ng-lottie/ng-lottie.component';
import { LoginService } from '../shared/api/login/login.service';
import { catchError, finalize } from 'rxjs';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { heroXMark } from '@ng-icons/heroicons/outline';
import { Router } from '@angular/router';
import { ApiService } from '../shared/service/api.service';
import { UserService } from '../shared/service/user.service';

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
  apiSrv = inject(ApiService);
  userSrv = inject(UserService);
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
          if (this.apiSrv.ifSuccess(res, false)) {
            const { token, userId } = data;
            this.userSrv.setToken(token);
            this.userSrv.setUserId(userId);
            this.userSrv.isLogin.set(true);
            this.router.navigate(['setting']);
          } else {
            this.errMsg.set(returnMessage);
          }
        });
    }
  }
}
