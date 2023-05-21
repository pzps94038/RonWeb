import { Component, DestroyRef, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputComponent } from 'src/app/shared/component/form/input/input.component';
import { SwalIcon, SwalService } from 'src/app/shared/service/swal.service';
import { Router } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { filter, switchMap, finalize } from 'rxjs';
import { ArticleLabelService } from 'src/app/shared/api/article-label/article-label.service';
import { CreateArticleLabelRequest } from 'src/app/shared/api/article-label/article-label.model';
import { ApiService } from 'src/app/shared/service/api.service';
import { UserService } from 'src/app/shared/service/user.service';

@Component({
  selector: 'app-article-label-create',
  standalone: true,
  imports: [CommonModule, InputComponent, ReactiveFormsModule],
  templateUrl: './article-label-create.component.html',
  styleUrls: ['./article-label-create.component.scss'],
})
export class ArticleLabelCreateComponent {
  apiSrv = inject(ApiService);
  userSrv = inject(UserService);
  swalSrv = inject(SwalService);
  articleLabelSrv = inject(ArticleLabelService);
  router = inject(Router);
  isLoading = signal(false);
  private _destroyRef = inject(DestroyRef);
  form = new FormGroup({
    labelName: new FormControl('', [Validators.required]),
  });

  submit() {
    this.form.markAllAsTouched();
    if (!this.form.valid) {
      return;
    }
    const req = {
      labelName: this.form.get('labelName')!.value,
      userId: this.userSrv.getUserId(),
    } as CreateArticleLabelRequest;
    this.isLoading.set(true);
    this.articleLabelSrv
      .createArticleLabel(req)
      .pipe(
        filter(res => this.apiSrv.ifSuccess(res)),
        switchMap(({ returnMessage }) =>
          this.swalSrv.alert({
            icon: SwalIcon.Success,
            text: returnMessage,
          }),
        ),
        finalize(() => this.isLoading.set(false)),
        takeUntilDestroyed(this._destroyRef),
      )
      .subscribe(() => {
        this.router.navigate(['/setting/article-label']);
      });
  }
}
