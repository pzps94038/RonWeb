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

  it('應包含三個專案經歷', () => {
    expect(component.projects.length).toBe(3);
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
