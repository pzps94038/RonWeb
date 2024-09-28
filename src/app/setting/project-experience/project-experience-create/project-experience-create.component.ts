import { CommonModule, Location } from '@angular/common';
import { Component, DestroyRef, inject, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { DynamicInputComponent } from 'src/app/shared/component/form/dynamic-input/dynamic-input.component';
import { EditorComponent } from 'src/app/shared/component/form/editor/editor.component';
import { InputComponent } from 'src/app/shared/component/form/input/input.component';
import { MultipleSelectComponent } from 'src/app/shared/component/form/multiple-select/multiple-select.component';
import {
  Option,
  Options,
  SelectComponent,
} from 'src/app/shared/component/form/select/select.component';
import { TextAreaComponent } from 'src/app/shared/component/form/text-area/text-area.component';
import { ToggleComponent } from 'src/app/shared/component/form/toggle/toggle.component';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { filter, map, tap, forkJoin, finalize, switchMap } from 'rxjs';
import { UploadFiles, UploadFile } from 'src/app/shared/api/upload/upload.model';
import { ApiService } from 'src/app/shared/service/api.service';
import { SwalService, SwalIcon } from 'src/app/shared/service/swal.service';
import { UserService } from 'src/app/shared/service/user.service';
import { Router } from '@angular/router';
import { AdminCodeService } from 'src/app/shared/api/admin-code/admin-code.service';
import { CodeEnum, SelectItem } from 'src/app/shared/api/shared/shared.model';
import { UploadAdapterService } from 'src/app/shared/service/upload-adapter.service';
import { AdminProjectExperienceService } from 'src/app/shared/api/admin-project-experience/admin-project-experience.service';
import { CreateProjectExperienceRequest } from 'src/app/shared/api/admin-project-experience/admin-project-experience.model';
import { LoadProjectExperienceComponent } from '../shared/component/load-project-experience/load-project-experience.component';

@Component({
  selector: 'app-project-experience-create',
  templateUrl: './project-experience-create.component.html',
  styleUrls: ['./project-experience-create.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    InputComponent,
    TextAreaComponent,
    EditorComponent,
    ReactiveFormsModule,
    SelectComponent,
    MultipleSelectComponent,
    LoadProjectExperienceComponent,
    ToggleComponent,
    DynamicInputComponent,
  ],
})
export class ProjectExperienceCreateComponent {
  apiSrv = inject(ApiService);
  userSrv = inject(UserService);
  swalSrv = inject(SwalService);
  uploadAdapterSrv = inject(UploadAdapterService);
  projectExperienceSrv = inject(AdminProjectExperienceService);
  codeSrv = inject(AdminCodeService);
  router = inject(Router);
  location = inject(Location);
  isLoading = signal(false);
  createIsLoading = signal(false);
  projectRoleOptions = signal<Options>([]);
  technologyToolOptions = signal<Options>([]);
  descriptionFiles = signal<UploadFiles>([]);
  contributionsFiles = signal<UploadFiles>([]);
  uploadAdapter = this.uploadAdapterSrv.createProjectExperienceAdapter();
  form = new FormGroup({
    name: new FormControl('', [Validators.required]),
    projectRoles: new FormControl([], [Validators.required]),
    technologyTools: new FormControl([], [Validators.required]),
    description: new FormControl('', [Validators.required]),
    contributions: new FormControl('', [Validators.required]),
  });
  private _destroyRef = inject(DestroyRef);

  ngOnInit(): void {
    this.isLoading.set(true);
    const projectRole$ = this.codeSrv.getAdminCode(CodeEnum.ProjectRole).pipe(
      filter(res => this.apiSrv.ifSuccess(res)),
      map(({ data: { codes } }) => codes),
      map(array =>
        array.map(code => {
          return {
            value: code.id,
            text: code.codeName,
          } as Option;
        }),
      ),
      tap(options => this.projectRoleOptions.set(options)),
    );
    const technologyTool$ = this.codeSrv.getAdminCode(CodeEnum.TechnologyTool).pipe(
      filter(res => this.apiSrv.ifSuccess(res)),
      map(({ data: { codes } }) => codes),
      map(array =>
        array.map(code => {
          return {
            value: code.id,
            text: code.codeName,
          } as Option;
        }),
      ),
      tap(options => this.technologyToolOptions.set(options)),
    );
    forkJoin([projectRole$, technologyTool$])
      .pipe(
        finalize(() => this.isLoading.set(false)),
        takeUntilDestroyed(this._destroyRef),
      )
      .subscribe();
  }

  submit() {
    this.form.markAllAsTouched();
    if (this.form.invalid) {
      return;
    }
    const projectRolesIds = (this.form.controls.projectRoles.value ?? []) as string[];
    const projectRoles = this.projectRoleOptions()
      .filter(a => projectRolesIds.includes(a.value))
      .map(a => {
        return {
          text: a.text,
          value: a.value,
        } as SelectItem<string>;
      });
    const technologyToolsIds = (this.form.controls.technologyTools.value ?? []) as string[];
    const technologyTools = this.technologyToolOptions()
      .filter(a => technologyToolsIds.includes(a.value))
      .map(a => {
        return {
          text: a.text,
          value: a.value,
        } as SelectItem<string>;
      });
    const req = {
      name: this.form.controls.name.value,
      description: this.form.controls.description.value,
      contributions: this.form.controls.contributions.value,
      projectRoles,
      technologyTools,
      descriptionFiles: this.descriptionFiles(),
      contributionsFiles: this.contributionsFiles(),
      userId: this.userSrv.getUserId(),
    } as CreateProjectExperienceRequest;
    this.createIsLoading.set(true);
    this.projectExperienceSrv
      .createProjectExperience(req)
      .pipe(
        filter(res => this.apiSrv.ifSuccess(res)),
        switchMap(({ returnMessage }) =>
          this.swalSrv.alert({
            icon: SwalIcon.Success,
            text: returnMessage,
          }),
        ),
        finalize(() => this.createIsLoading.set(false)),
        takeUntilDestroyed(this._destroyRef),
      )
      .subscribe(() => this.location.back());
  }

  descriptionUpload(file: UploadFile) {
    this.descriptionFiles.update(files => [...files, file]);
  }

  contributionsUpload(file: UploadFile) {
    this.contributionsFiles.update(files => [...files, file]);
  }
}
