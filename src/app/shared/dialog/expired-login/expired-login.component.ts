import { ChangeDetectionStrategy, Component, DestroyRef, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Data, Router } from '@angular/router';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { FooterComponent } from '../../component/footer/footer.component';
import { InputComponent } from '../../component/form/input/input.component';
import {
  AnimationPathConfig,
  NgLottieComponent,
} from '../../component/ng-lottie/ng-lottie.component';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { catchError, finalize } from 'rxjs';
import { LoginService } from '../../api/login/login.service';
import { ApiService } from '../../service/api.service';
import { UserService } from '../../service/user.service';
import { DialogRef } from '@ngneat/dialog';
import { heroXMark } from '@ng-icons/heroicons/outline';

@Component({
  selector: 'app-expired-login',
  standalone: true,
  imports: [
    CommonModule,
    InputComponent,
    ReactiveFormsModule,
    FooterComponent,
    NgLottieComponent,
    NgIconComponent,
  ],
  templateUrl: './expired-login.component.html',
  styleUrls: ['./expired-login.component.scss'],
  providers: [provideIcons({ heroXMark })],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExpiredLoginComponent {
  ref: DialogRef<undefined, undefined | boolean> = inject(
    DialogRef<undefined, undefined | boolean>,
  );
  loginSrv = inject(LoginService);
  apiSrv = inject(ApiService);
  userSrv = inject(UserService);
  router = inject(Router);
  loading = signal(false);

  errMsg = signal<string | undefined>(undefined);
  private _destroyRef = inject(DestroyRef);

  form = new FormGroup({
    account: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  });

  options: AnimationPathConfig = {
    path: 'assets/lottie/session-expired.json',
  };

  submit() {
    this.form.markAllAsTouched();
    if (this.form.invalid) {
      return;
    }
    this.loading.set(true);
    this.loginSrv
      .login({
        account: this.form.controls.account.value!,
        password: this.form.controls.password.value!,
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
          this.ref.close(true);
        } else {
          this.errMsg.set(returnMessage);
        }
      });
  }
}
