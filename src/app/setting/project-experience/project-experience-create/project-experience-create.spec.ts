import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProjectExperienceCreateComponent } from './project-experience-create.component';

describe('ProjectExperienceCreateComponent', () => {
  let component: ProjectExperienceCreateComponent;
  let fixture: ComponentFixture<ProjectExperienceCreateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ProjectExperienceCreateComponent],
    });
    fixture = TestBed.createComponent(ProjectExperienceCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
