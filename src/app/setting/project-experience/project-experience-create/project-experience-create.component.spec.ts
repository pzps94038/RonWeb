import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { of } from 'rxjs';

import { ProjectExperienceCreateComponent } from './project-experience-create.component';
import { ApiService } from 'src/app/shared/service/api.service';
import { UserService } from 'src/app/shared/service/user.service';
import { SwalService } from 'src/app/shared/service/swal.service';
import { UploadAdapterService } from 'src/app/shared/service/upload-adapter.service';
import { AdminProjectExperienceService } from 'src/app/shared/api/admin-project-experience/admin-project-experience.service';
import { AdminCodeService } from 'src/app/shared/api/admin-code/admin-code.service';

describe('ProjectExperienceCreateComponent', () => {
  let component: ProjectExperienceCreateComponent;
  let fixture: ComponentFixture<ProjectExperienceCreateComponent>;
  let mockApiService: jasmine.SpyObj<ApiService>;
  let mockUserService: jasmine.SpyObj<UserService>;
  let mockSwalService: jasmine.SpyObj<SwalService>;
  let mockUploadAdapterService: jasmine.SpyObj<UploadAdapterService>;
  let mockProjectExperienceService: jasmine.SpyObj<AdminProjectExperienceService>;
  let mockCodeService: jasmine.SpyObj<AdminCodeService>;
  let mockLocation: jasmine.SpyObj<Location>;
  let mockRouter: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    const apiSpy = jasmine.createSpyObj('ApiService', ['ifSuccess']);
    const userSpy = jasmine.createSpyObj('UserService', ['getUserId']);
    const swalSpy = jasmine.createSpyObj('SwalService', ['alert']);
    const uploadAdapterSpy = jasmine.createSpyObj('UploadAdapterService', ['createProjectExperienceAdapter']);
    const projectExperienceSpy = jasmine.createSpyObj('AdminProjectExperienceService', ['createProjectExperience']);
    const codeSpy = jasmine.createSpyObj('AdminCodeService', ['getAdminCode']);
    const locationSpy = jasmine.createSpyObj('Location', ['back']);
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      imports: [
        ProjectExperienceCreateComponent,
        ReactiveFormsModule,
      ],
      providers: [
        { provide: ApiService, useValue: apiSpy },
        { provide: UserService, useValue: userSpy },
        { provide: SwalService, useValue: swalSpy },
        { provide: UploadAdapterService, useValue: uploadAdapterSpy },
        { provide: AdminProjectExperienceService, useValue: projectExperienceSpy },
        { provide: AdminCodeService, useValue: codeSpy },
        { provide: Location, useValue: locationSpy },
        { provide: Router, useValue: routerSpy },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ProjectExperienceCreateComponent);
    component = fixture.componentInstance;
    mockApiService = TestBed.inject(ApiService) as jasmine.SpyObj<ApiService>;
    mockUserService = TestBed.inject(UserService) as jasmine.SpyObj<UserService>;
    mockSwalService = TestBed.inject(SwalService) as jasmine.SpyObj<SwalService>;
    mockUploadAdapterService = TestBed.inject(UploadAdapterService) as jasmine.SpyObj<UploadAdapterService>;
    mockProjectExperienceService = TestBed.inject(AdminProjectExperienceService) as jasmine.SpyObj<AdminProjectExperienceService>;
    mockCodeService = TestBed.inject(AdminCodeService) as jasmine.SpyObj<AdminCodeService>;
    mockLocation = TestBed.inject(Location) as jasmine.SpyObj<Location>;
    mockRouter = TestBed.inject(Router) as jasmine.SpyObj<Router>;

    // Setup default mocks
    mockApiService.ifSuccess.and.returnValue(true);
    mockUserService.getUserId.and.returnValue(123);
    mockUploadAdapterService.createProjectExperienceAdapter.and.returnValue({} as any);
    mockCodeService.getAdminCode.and.returnValue(of({
      data: {
        codes: [
          { codeId: '1', codeName: 'Test Code 1' },
          { codeId: '2', codeName: 'Test Code 2' }
        ]
      }
    } as any));
    mockSwalService.alert.and.returnValue(of({ isConfirmed: true } as any));
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form with default values', () => {
    expect(component.form.get('name')?.value).toBe('');
    expect(component.form.get('projectRoles')?.value).toEqual([]);
    expect(component.form.get('technologyTools')?.value).toEqual([]);
    expect(component.form.get('description')?.value).toBe('');
    expect(component.form.get('contributions')?.value).toBe('');
  });

  it('should load project roles and technology tools on init', () => {
    component.ngOnInit();

    expect(mockCodeService.getAdminCode).toHaveBeenCalledTimes(2);
    expect(component.projectRoleOptions()).toEqual([
      { value: '1', text: 'Test Code 1' },
      { value: '2', text: 'Test Code 2' }
    ]);
    expect(component.technologyToolOptions()).toEqual([
      { value: '1', text: 'Test Code 1' },
      { value: '2', text: 'Test Code 2' }
    ]);
  });

  it('should not submit when form is invalid', () => {
    component.submit();

    expect(mockProjectExperienceService.createProjectExperience).not.toHaveBeenCalled();
    expect(component.form.touched).toBeTruthy();
  });

  it('should submit when form is valid', () => {
    // Setup form with valid values
    (component.form.controls.name as any).setValue('Test Project');
    (component.form.controls.description as any).setValue('Test Description');
    (component.form.controls.contributions as any).setValue('Test Contributions');
    (component.form.controls.projectRoles as any).setValue(['1']);
    (component.form.controls.technologyTools as any).setValue(['2']);

    // Setup options
    component.projectRoleOptions.set([{ value: '1', text: 'Test Role' }]);
    component.technologyToolOptions.set([{ value: '2', text: 'Test Tool' }]);

    mockProjectExperienceService.createProjectExperience.and.returnValue(of({
      returnMessage: 'Created successfully'
    } as any));

    component.submit();

    expect(mockProjectExperienceService.createProjectExperience).toHaveBeenCalled();
    expect(mockUserService.getUserId).toHaveBeenCalled();
  });

  it('should handle description file upload', () => {
    const mockFile = { name: 'test.jpg', url: 'test-url' } as any;
    
    component.descriptionUpload(mockFile);

    expect(component.descriptionFiles()).toContain(mockFile);
  });

  it('should handle contributions file upload', () => {
    const mockFile = { name: 'test.jpg', url: 'test-url' } as any;
    
    component.contributionsUpload(mockFile);

    expect(component.contributionsFiles()).toContain(mockFile);
  });

  it('should set loading states correctly', () => {
    expect(component.isLoading()).toBe(false);
    expect(component.createIsLoading()).toBe(false);
  });

  it('should create upload adapters', () => {
    expect(mockUploadAdapterService.createProjectExperienceAdapter).toHaveBeenCalledTimes(2);
  });
});