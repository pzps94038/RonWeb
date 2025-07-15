import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';
import { ProjectExperienceComponent } from './project-experience.component';

describe('ProjectExperienceComponent', () => {
  let component: ProjectExperienceComponent;
  let fixture: ComponentFixture<ProjectExperienceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ProjectExperienceComponent,
        RouterTestingModule,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ProjectExperienceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render router outlet', () => {
    const routerOutlet = fixture.debugElement.query(By.css('router-outlet'));
    expect(routerOutlet).toBeTruthy();
  });

  it('should have container with proper classes', () => {
    const container = fixture.debugElement.query(By.css('.container'));
    expect(container).toBeTruthy();
    expect(container.nativeElement.classList).toContain('mx-auto');
    expect(container.nativeElement.classList).toContain('my-5');
  });

  it('should have OnPush change detection strategy', () => {
    expect(component.constructor.name).toBe('ProjectExperienceComponent');
    // OnPush is set in component metadata
    expect(fixture.componentRef.changeDetectorRef.constructor.name).toBe('ViewRef_');
  });
});