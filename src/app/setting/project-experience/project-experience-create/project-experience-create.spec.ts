import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProjectExperienceCreateComponent } from './project-experience-create.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('ProjectExperienceCreateComponent', () => {
  let component: ProjectExperienceCreateComponent;
  let fixture: ComponentFixture<ProjectExperienceCreateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ProjectExperienceCreateComponent, HttpClientTestingModule],
    });
    fixture = TestBed.createComponent(ProjectExperienceCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
