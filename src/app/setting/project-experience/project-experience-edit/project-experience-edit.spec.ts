import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProjectExperienceEditComponent } from './project-experience-edit.component';

describe('ProjectExperienceEditComponent', () => {
  let component: ProjectExperienceEditComponent;
  let fixture: ComponentFixture<ProjectExperienceEditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ProjectExperienceEditComponent],
    });
    fixture = TestBed.createComponent(ProjectExperienceEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
