import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router, ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { ProjectExperienceDetailComponent } from './project-experience-detail.component';
import { ApiService } from 'src/app/shared/service/api.service';
import { SwalService } from 'src/app/shared/service/swal.service';
import { AdminProjectExperienceService } from 'src/app/shared/api/admin-project-experience/admin-project-experience.service';

describe('ProjectExperienceDetailComponent', () => {
  let component: ProjectExperienceDetailComponent;
  let fixture: ComponentFixture<ProjectExperienceDetailComponent>;
  let mockApiService: jasmine.SpyObj<ApiService>;
  let mockSwalService: jasmine.SpyObj<SwalService>;
  let mockProjectExperienceService: jasmine.SpyObj<AdminProjectExperienceService>;
  let mockRouter: jasmine.SpyObj<Router>;
  let mockActivatedRoute: any;

  beforeEach(async () => {
    const apiSpy = jasmine.createSpyObj('ApiService', ['ifSuccess']);
    const swalSpy = jasmine.createSpyObj('SwalService', ['alert', 'confirm']);
    const projectExperienceSpy = jasmine.createSpyObj('AdminProjectExperienceService', ['getProjectExperience', 'deleteProjectExperience']);
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    mockActivatedRoute = {
      params: of({ id: 'test-id' }),
      queryParams: of({ page: 1 })
    };

    await TestBed.configureTestingModule({
      imports: [
        ProjectExperienceDetailComponent,
      ],
      providers: [
        { provide: ApiService, useValue: apiSpy },
        { provide: SwalService, useValue: swalSpy },
        { provide: AdminProjectExperienceService, useValue: projectExperienceSpy },
        { provide: Router, useValue: routerSpy },
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ProjectExperienceDetailComponent);
    component = fixture.componentInstance;
    mockApiService = TestBed.inject(ApiService) as jasmine.SpyObj<ApiService>;
    mockSwalService = TestBed.inject(SwalService) as jasmine.SpyObj<SwalService>;
    mockProjectExperienceService = TestBed.inject(AdminProjectExperienceService) as jasmine.SpyObj<AdminProjectExperienceService>;
    mockRouter = TestBed.inject(Router) as jasmine.SpyObj<Router>;

    // Setup default mocks
    mockApiService.ifSuccess.and.returnValue(true);
    mockProjectExperienceService.getProjectExperience.and.returnValue(of({
      data: {
        projectExperiences: [
          {
            projectExperienceId: 1,
            name: 'Test Project 1',
            description: 'Test Description 1',
            contributions: 'Test Contributions 1',
            projectRoles: [],
            technologyTools: [],
            descriptionFiles: [],
            contributionsFiles: []
          }
        ],
        total: 1
      }
    } as any));
    mockSwalService.alert.and.returnValue(of({ isConfirmed: true } as any));
    mockSwalService.confirm.and.returnValue(of({ isConfirmed: true } as any));
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with default values', () => {
    expect(component.total()).toBe(0);
    expect(component.projectExperiences()).toEqual([]);
    expect(component.isLoading()).toBe(false);
    expect(component.isError()).toBe(false);
    expect(component.page()).toBe(1);
  });

  it('should load project experiences', () => {
    component.getProjectExperience(1);

    expect(mockProjectExperienceService.getProjectExperience).toHaveBeenCalledWith(1);
    expect(component.total()).toBe(1);
    expect(component.projectExperiences().length).toBe(1);
  });

  it('should handle loading states', () => {
    expect(component.isLoading()).toBe(false);
    
    component.getProjectExperience(1);
    
    expect(mockProjectExperienceService.getProjectExperience).toHaveBeenCalled();
  });

  it('should handle error states', () => {
    mockApiService.ifSuccess.and.returnValue(false);
    
    component.getProjectExperience(1);
    
    expect(component.isError()).toBe(true);
  });

  it('should handle page changes', () => {
    component.paginationChange(2);
    
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/setting/project-experience/detail'], { queryParams: { page: 2 } });
  });

  it('should handle delete project experience', () => {
    mockProjectExperienceService.deleteProjectExperience.and.returnValue(of({
      returnMessage: 'Deleted successfully'
    } as any));

    component.deleteProjectExperience(1);

    expect(mockSwalService.confirm).toHaveBeenCalled();
    expect(mockProjectExperienceService.deleteProjectExperience).toHaveBeenCalledWith(1);
  });
});