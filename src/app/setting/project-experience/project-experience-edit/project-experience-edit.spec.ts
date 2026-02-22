import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProjectExperienceEditComponent } from './project-experience-edit.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { of, Observable } from 'rxjs';

describe('ProjectExperienceEditComponent', () => {
  let component: ProjectExperienceEditComponent;
  let fixture: ComponentFixture<ProjectExperienceEditComponent>;
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
      imports: [ProjectExperienceEditComponent, HttpClientTestingModule],
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
    fixture = TestBed.createComponent(ProjectExperienceEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
