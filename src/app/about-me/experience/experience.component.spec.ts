import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { of, throwError } from 'rxjs';

import { ExperienceComponent } from './experience.component';
import { ProjectExperienceService } from 'src/app/shared/api/project-experience/project-experience.service';
import { ApiService } from 'src/app/shared/service/api.service';
import { ReturnCode } from 'src/app/shared/api/shared/shared.model';
import {
  GetProjectExperienceListResponse,
  ProjectExperienceItem,
} from 'src/app/shared/api/project-experience/project-experience.model';

describe('ExperienceComponent', () => {
  let component: ExperienceComponent;
  let fixture: ComponentFixture<ExperienceComponent>;
  let projectExperienceSrvSpy: jasmine.SpyObj<ProjectExperienceService>;
  let apiSrvSpy: jasmine.SpyObj<ApiService>;

  const mockItems: ProjectExperienceItem[] = [
    {
      projectExperienceId: 1,
      name: '測試專案',
      description: '測試描述',
      contributions: '貢獻內容',
      projectRoles: [{ text: '前端', value: 'frontend' }],
      technologyTools: [{ text: 'Angular', value: 'angular' }],
      createDate: '2026-01-01',
    },
  ];

  const mockSuccessResponse: GetProjectExperienceListResponse = {
    returnCode: ReturnCode.Success,
    returnMessage: '',
    data: {
      total: 1,
      projectExperiences: mockItems,
    },
  };

  beforeEach(async () => {
    projectExperienceSrvSpy = jasmine.createSpyObj('ProjectExperienceService', [
      'getProjectExperiences',
    ]);
    apiSrvSpy = jasmine.createSpyObj('ApiService', ['ifSuccess']);

    await TestBed.configureTestingModule({
      imports: [ExperienceComponent],
      providers: [
        { provide: ProjectExperienceService, useValue: projectExperienceSrvSpy },
        { provide: ApiService, useValue: apiSrvSpy },
      ],
    }).compileComponents();
  });

  function createComponent() {
    fixture = TestBed.createComponent(ExperienceComponent);
    component = fixture.componentInstance;
  }

  it('should create', () => {
    projectExperienceSrvSpy.getProjectExperiences.and.returnValue(of(mockSuccessResponse));
    apiSrvSpy.ifSuccess.and.returnValue(true);
    createComponent();
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('API 成功回傳後 projectExperiences signal 正確設定', fakeAsync(() => {
    projectExperienceSrvSpy.getProjectExperiences.and.returnValue(of(mockSuccessResponse));
    apiSrvSpy.ifSuccess.and.returnValue(true);
    createComponent();
    fixture.detectChanges();
    tick();
    expect(component.projectExperiences()).toEqual(mockItems);
    expect(component.isLoading()).toBeFalse();
    expect(component.isError()).toBeFalse();
  }));

  it('API 回傳失敗時 isError 為 true', fakeAsync(() => {
    projectExperienceSrvSpy.getProjectExperiences.and.returnValue(of(mockSuccessResponse));
    apiSrvSpy.ifSuccess.and.returnValue(false);
    createComponent();
    fixture.detectChanges();
    tick();
    expect(component.isError()).toBeTrue();
    expect(component.isLoading()).toBeFalse();
  }));

  it('API 發生錯誤時 isError 為 true', fakeAsync(() => {
    projectExperienceSrvSpy.getProjectExperiences.and.returnValue(
      throwError(() => new Error('Network error')),
    );
    createComponent();
    fixture.detectChanges();
    tick();
    expect(component.isError()).toBeTrue();
    expect(component.isLoading()).toBeFalse();
  }));
});
