import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProjectExperienceDetailComponent } from './project-experience-detail.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ParamMap, ActivatedRoute } from '@angular/router';
import { of, Observable } from 'rxjs';

describe('ProjectExperienceDetailComponent', () => {
  let component: ProjectExperienceDetailComponent;
  let fixture: ComponentFixture<ProjectExperienceDetailComponent>;
  const fakePage = 'NAN';
  const fakeId = '1';
  const paramMap = of({
    get: (key: string) => fakeId,
  }) as Observable<ParamMap>;
  const queryParamMap = of({
    get: (key: string) => fakePage,
  }) as Observable<ParamMap>;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ProjectExperienceDetailComponent, HttpClientTestingModule],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            paramMap,
            queryParamMap,
          } as ActivatedRoute,
        },
      ],
    });
    fixture = TestBed.createComponent(ProjectExperienceDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
