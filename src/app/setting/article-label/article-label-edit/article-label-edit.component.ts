import { UpdateArticleLabelRequest } from './../../../shared/api/article-label/article-label.model';
import { Component, DestroyRef, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputComponent } from 'src/app/shared/component/form/input/input.component';
import { ActivatedRoute, Router } from '@angular/router';
import { SwalIcon, SwalService } from 'src/app/shared/service/swal.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { tap, filter, map, switchMap, finalize } from 'rxjs';
import { ArticleLabelService } from 'src/app/shared/api/article-label/article-label.service';
import { ArticleLabel } from 'src/app/shared/api/article-label/article-label.model';
import { ApiService } from 'src/app/shared/service/api.service';
import { UserService } from 'src/app/shared/service/user.service';
import { AdminArticleLabelService } from 'src/app/shared/api/admin-article-label/admin-article-label.service';

@Component({
  selector: 'app-article-label-edit',
  standalone: true,
  imports: [CommonModule, InputComponent, ReactiveFormsModule],
  templateUrl: './article-label-edit.component.html',
  styleUrls: ['./article-label-edit.component.scss'],
})
export class ArticleLabelEditComponent implements OnInit {
  apiSrv = inject(ApiService);
  userSrv = inject(UserService);
  swalSrv = inject(SwalService);
  articleLabelSrv = inject(AdminArticleLabelService);
  route = inject(ActivatedRoute);
  router = inject(Router);
  isLoading = signal(false);
  editIsLoading = signal(false);
  isError = signal(false);
  private _destroyRef = inject(DestroyRef);
  form = new FormGroup({
    labelId: new FormControl<undefined | number>(undefined, [Validators.required]),
    labelName: new FormControl('', [Validators.required]),
  });

  ngOnInit(): void {
    this.route.paramMap
      .pipe(
        tap(() => this.isLoading.set(true)),
        filter(param => !!param.get('id')),
        map(param => param.get('id')!),
        filter(id => !isNaN(parseInt(id))),
        map(id => parseInt(id)),
        switchMap(id => this.articleLabelSrv.getArticleLabelById(id)),
        filter(res => this.apiSrv.ifSuccess(res)),
        map(({ data }) => data),
        takeUntilDestroyed(this._destroyRef),
      )
      .subscribe(res => {
        const { labelId, labelName } = res as ArticleLabel;
        this.form.controls.labelId.setValue(labelId);
        this.form.controls.labelName.setValue(labelName);
        this.isLoading.set(false);
      });
  }

  submit() {
    this.form.markAllAsTouched();
    if (this.form.invalid) {
      return;
    }
    const req = {
      labelId: this.form.controls.labelId.value,
      labelName: this.form.controls.labelName.value,
      userId: this.userSrv.getUserId(),
    } as UpdateArticleLabelRequest;
    this.editIsLoading.set(true);
    this.articleLabelSrv
      .updateArticleLabel(req)
      .pipe(
        filter(res => this.apiSrv.ifSuccess(res, true)),
        switchMap(({ returnMessage }) =>
          this.swalSrv.alert({
            icon: SwalIcon.Success,
            text: returnMessage,
          }),
        ),
        finalize(() => this.editIsLoading.set(false)),
        takeUntilDestroyed(this._destroyRef),
      )
      .subscribe(() => this.router.navigate(['/setting/article-label']));
  }
}
