import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProjectExperienceDetailComponent } from './project-experience-detail.component';

describe('ProjectExperienceDetailComponent', () => {
  let component: ProjectExperienceDetailComponent;
  let fixture: ComponentFixture<ProjectExperienceDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ProjectExperienceDetailComponent],
    });
    fixture = TestBed.createComponent(ProjectExperienceDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
