import { Component, DestroyRef, inject, signal } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { EditorComponent } from 'src/app/shared/component/form/editor/editor.component';
import { InputComponent } from 'src/app/shared/component/form/input/input.component';
import {
  Options,
  SelectComponent,
  Option,
} from 'src/app/shared/component/form/select/select.component';
import { TextAreaComponent } from 'src/app/shared/component/form/text-area/text-area.component';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { filter, finalize, forkJoin, map, switchMap, tap } from 'rxjs';
import { SwalService, SwalIcon } from 'src/app/shared/service/swal.service';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadProjectExperienceComponent } from '../shared/component/load-project-experience/load-project-experience.component';
import { UploadFile, UploadFiles } from 'src/app/shared/api/upload/upload.model';
import { MultipleSelectComponent } from 'src/app/shared/component/form/multiple-select/multiple-select.component';
import { ApiService } from 'src/app/shared/service/api.service';
import { UserService } from 'src/app/shared/service/user.service';
import { ToggleComponent } from 'src/app/shared/component/form/toggle/toggle.component';
import { DynamicInputComponent } from 'src/app/shared/component/form/dynamic-input/dynamic-input.component';
import { UploadAdapterService } from 'src/app/shared/service/upload-adapter.service';
import { AdminCodeService } from 'src/app/shared/api/admin-code/admin-code.service';
import { AdminProjectExperienceService } from 'src/app/shared/api/admin-project-experience/admin-project-experience.service';
import { CodeEnum, SelectItem } from 'src/app/shared/api/shared/shared.model';
import { UpdateProjectExperienceRequest } from 'src/app/shared/api/admin-project-experience/admin-project-experience.model';

@Component({
  selector: 'app-project-experience-edit',
  templateUrl: './project-experience-edit.component.html',
  styleUrls: ['./project-experience-edit.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    InputComponent,
    TextAreaComponent,
    EditorComponent,
    ReactiveFormsModule,
    SelectComponent,
    LoadProjectExperienceComponent,
    MultipleSelectComponent,
    ToggleComponent,
    DynamicInputComponent,
  ],
})
export class ProjectExperienceEditComponent {
  apiSrv = inject(ApiService);
  userSrv = inject(UserService);
  swalSrv = inject(SwalService);
  projectExperienceSrv = inject(AdminProjectExperienceService);
  codeSrv = inject(AdminCodeService);
  uploadAdapterSrv = inject(UploadAdapterService);
  route = inject(ActivatedRoute);
  router = inject(Router);
  location = inject(Location);
  isLoading = signal(false);
  editIsLoading = signal(false);
  files = signal<UploadFiles>([]);
  projectRoleOptions = signal<Options>([]);
  technologyToolOptions = signal<Options>([]);
  descriptionFiles = signal<UploadFiles>([]);
  contributionsFiles = signal<UploadFiles>([]);
  uploadAdapter = this.uploadAdapterSrv.createProjectExperienceAdapter();
  form = new FormGroup({
    projectExperienceId: new FormControl<undefined | number>(undefined, [Validators.required]),
    name: new FormControl('', [Validators.required]),
    projectRoles: new FormControl<string[]>([], [Validators.required]),
    technologyTools: new FormControl<string[]>([], [Validators.required]),
    description: new FormControl('', [Validators.required]),
    contributions: new FormControl('', [Validators.required]),
  });
  private _destroyRef = inject(DestroyRef);

  ngOnInit(): void {
    const projectRole$ = this.codeSrv.getAdminCode(CodeEnum.ProjectRole).pipe(
      filter(res => this.apiSrv.ifSuccess(res)),
      map(({ data: { codes } }) => codes),
      map(array =>
        array.map(code => {
          return {
            value: code.codeId,
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
            value: code.codeId,
            text: code.codeName,
          } as Option;
        }),
      ),
      tap(options => this.technologyToolOptions.set(options)),
    );
    this.route.paramMap
      .pipe(
        tap(() => this.isLoading.set(true)),
        filter(param => !!param.get('id')),
        map(param => param.get('id')!),
        switchMap(id => this.projectExperienceSrv.getProjectExperienceById(parseInt(id))),
        filter(res => this.apiSrv.ifSuccess(res)),
        map(({ data }) => data),
        tap(data => {
          const {
            projectExperienceId,
            name,
            projectRoles,
            technologyTools,
            description,
            contributions,
          } = data;
          this.form.controls.projectExperienceId.setValue(projectExperienceId);
          this.form.controls.name.setValue(name);
          this;
          const projectRoleVal = projectRoles.map(({ value }) => value);
          this.form.controls.projectRoles.setValue(projectRoleVal);
          const technologyToolVal = technologyTools.map(({ value }) => value);
          this.form.controls.technologyTools.setValue(technologyToolVal);
          this.form.controls.description.setValue(description);
          this.form.controls.contributions.setValue(contributions);
        }),
        switchMap(() => forkJoin([projectRole$, technologyTool$])),
        takeUntilDestroyed(this._destroyRef),
      )
      .subscribe(() => this.isLoading.set(false));
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
      projectExperienceId: this.form.controls.projectExperienceId.value,
      name: this.form.controls.name.value,
      description: this.form.controls.description.value,
      contributions: this.form.controls.contributions.value,
      projectRoles,
      technologyTools,
      descriptionFiles: this.descriptionFiles(),
      contributionsFiles: this.contributionsFiles(),
      userId: this.userSrv.getUserId(),
    } as UpdateProjectExperienceRequest;
    this.editIsLoading.set(true);
    this.projectExperienceSrv
      .updateProjectExperience(req)
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
      .subscribe(() => this.location.back());
  }

  descriptionUpload(file: UploadFile) {
    this.descriptionFiles.update(files => [...files, file]);
  }

  contributionsUpload(file: UploadFile) {
    this.contributionsFiles.update(files => [...files, file]);
  }
}
