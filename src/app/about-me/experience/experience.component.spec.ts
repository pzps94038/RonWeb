import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExperienceComponent } from './experience.component';

describe('ExperienceComponent', () => {
  let component: ExperienceComponent;
  let fixture: ComponentFixture<ExperienceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExperienceComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ExperienceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('projects 應為陣列', () => {
    expect(Array.isArray(component.projects)).toBeTrue();
  });

  it('每個專案經歷應包含必要欄位', () => {
    for (const project of component.projects) {
      expect(project.name).toBeTruthy();
      expect(project.role).toBeTruthy();
      expect(project.period).toBeTruthy();
      expect(project.description).toBeTruthy();
      expect(project.techs.length).toBeGreaterThan(0);
    }
  });
});
