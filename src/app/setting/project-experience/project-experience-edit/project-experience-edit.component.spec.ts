import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { Location } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { ProjectExperienceEditComponent } from './project-experience-edit.component';
import { ApiService } from 'src/app/shared/service/api.service';
import { UserService } from 'src/app/shared/service/user.service';
import { SwalService } from 'src/app/shared/service/swal.service';
import { UploadAdapterService } from 'src/app/shared/service/upload-adapter.service';
import { AdminProjectExperienceService } from 'src/app/shared/api/admin-project-experience/admin-project-experience.service';
import { AdminCodeService } from 'src/app/shared/api/admin-code/admin-code.service';

describe('ProjectExperienceEditComponent', () => {
  let component: ProjectExperienceEditComponent;
  let fixture: ComponentFixture<ProjectExperienceEditComponent>;
  let mockApiService: jasmine.SpyObj<ApiService>;
  let mockUserService: jasmine.SpyObj<UserService>;
  let mockSwalService: jasmine.SpyObj<SwalService>;
  let mockUploadAdapterService: jasmine.SpyObj<UploadAdapterService>;
  let mockProjectExperienceService: jasmine.SpyObj<AdminProjectExperienceService>;
  let mockCodeService: jasmine.SpyObj<AdminCodeService>;
  let mockLocation: jasmine.SpyObj<Location>;
  let mockRouter: jasmine.SpyObj<Router>;
  let mockActivatedRoute: any;

  beforeEach(async () => {
    const apiSpy = jasmine.createSpyObj('ApiService', ['ifSuccess']);
    const userSpy = jasmine.createSpyObj('UserService', ['getUserId']);
    const swalSpy = jasmine.createSpyObj('SwalService', ['alert']);
    const uploadAdapterSpy = jasmine.createSpyObj('UploadAdapterService', ['createProjectExperienceAdapter']);
    const projectExperienceSpy = jasmine.createSpyObj('AdminProjectExperienceService', ['updateProjectExperience', 'getProjectExperience']);
    const codeSpy = jasmine.createSpyObj('AdminCodeService', ['getAdminCode']);
    const locationSpy = jasmine.createSpyObj('Location', ['back']);
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    mockActivatedRoute = {
      params: of({ id: 'test-id' })
    };

    await TestBed.configureTestingModule({
      imports: [
        ProjectExperienceEditComponent,
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
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ProjectExperienceEditComponent);
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
    mockProjectExperienceService.getProjectExperience.and.returnValue(of({
      data: {
        projectExperience: {
          projectExperienceId: 'test-id',
          name: 'Test Project',
          description: 'Test Description',
          contributions: 'Test Contributions',
          projectRoles: [],
          technologyTools: [],
          descriptionFiles: [],
          contributionsFiles: []
        }
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

  it('should have loading states', () => {
    expect(component.isLoading()).toBe(false);
    expect(component.editIsLoading()).toBe(false);
  });

  it('should create upload adapters', () => {
    expect(mockUploadAdapterService.createProjectExperienceAdapter).toHaveBeenCalledTimes(2);
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
});