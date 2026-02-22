import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoadProjectExperienceComponent } from './load-project-experience.component';

describe('LoadProjectExperienceComponent', () => {
  let component: LoadProjectExperienceComponent;
  let fixture: ComponentFixture<LoadProjectExperienceComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [LoadProjectExperienceComponent],
    });
    fixture = TestBed.createComponent(LoadProjectExperienceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
