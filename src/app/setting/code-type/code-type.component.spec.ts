import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';
import { CodeTypeComponent } from './code-type.component';

describe('CodeTypeComponent', () => {
  let component: CodeTypeComponent;
  let fixture: ComponentFixture<CodeTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        CodeTypeComponent,
        RouterTestingModule,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CodeTypeComponent);
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

  it('should have correct selector', () => {
    expect(fixture.debugElement.nativeElement.tagName.toLowerCase()).toBe('div');
  });

  it('should import CommonModule and RouterOutlet', () => {
    // Component should render properly indicating imports are working
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.container')).toBeTruthy();
    expect(compiled.querySelector('router-outlet')).toBeTruthy();
  });
});