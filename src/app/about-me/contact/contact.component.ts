import { Component, DestroyRef, inject, signal } from '@angular/core';
import { CommonModule, NgIf } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputComponent } from 'src/app/shared/components/form/input/input.component';
import { TextAreaComponent } from 'src/app/shared/components/form/text-area/text-area.component';
import {
  AnimationPathConfig,
  NgLottieComponent,
} from 'src/app/shared/components/ng-lottie/ng-lottie.component';
import { ScrollAnimateDirective } from 'src/app/shared/directive/scroll-animate.directive';
import { environment } from 'src/environments/environment';
import { ContactUsService } from 'src/app/shared/api/contact-us/contact-us.service';
import { delay, finalize, from, switchMap } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { SwalIcon, SwalService } from 'src/app/shared/service/swal.service';
import { ReturnCode } from 'src/app/shared/api/shared/shared.model';
export type Grecaptcha = {
  ready: (fn: () => any) => any;
  execute: (clicentToken: string, option: { action: string }) => Promise<string>;
};
declare const grecaptcha: Grecaptcha;
@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [
    NgIf,
    ReactiveFormsModule,
    InputComponent,
    TextAreaComponent,
    NgLottieComponent,
    ScrollAnimateDirective,
  ],
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
})
export class ContactComponent {
  contactUs = inject(ContactUsService);
  swal = inject(SwalService);
  loading = signal(false);
  form = new FormGroup({
    subject: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    message: new FormControl('', [Validators.required]),
  });

  contactUsOptions: AnimationPathConfig = {
    path: 'assets/lottie/contact-us.json',
  };

  private _destroyRef = inject(DestroyRef);

  submit() {
    this.form.markAllAsTouched();
    if (this.form.valid) {
      const subject = this.form.get('subject')!.value as string;
      const email = this.form.get('email')!.value as string;
      const message = this.form.get('message')!.value as string;
      this.loading.set(true);
      from(grecaptcha.execute(environment.grecaptchaToken, { action: 'contactUs' }))
        .pipe(
          switchMap(clientToken =>
            this.contactUs.sendContactUsMail({
              subject,
              body: message,
              email,
              clientToken,
            }),
          ),
          takeUntilDestroyed(this._destroyRef),
          finalize(() => this.loading.set(false)),
        )
        .subscribe(({ returnCode, returnMessage }) => {
          if (returnCode === ReturnCode.Success) {
            this.swal.alert({
              title: returnMessage,
              icon: SwalIcon.Success,
            });
          } else {
            this.swal.alert({
              title: returnMessage,
              icon: SwalIcon.Error,
            });
          }
        });
    }
  }
}
