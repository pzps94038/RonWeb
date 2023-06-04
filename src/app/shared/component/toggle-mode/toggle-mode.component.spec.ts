import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToggleModeComponent } from './toggle-mode.component';

describe('ToggleModeComponent', () => {
  let component: ToggleModeComponent;
  let fixture: ComponentFixture<ToggleModeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ToggleModeComponent],
    });
    fixture = TestBed.createComponent(ToggleModeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('測試切換dark模式', () => {
    const spy = spyOn(component.themeSrv, 'toggleTheme');
    const initDark = component.dark();
    component.toggleTheme();
    expect(component.dark()).toBe(!initDark);
    expect(spy).toHaveBeenCalledWith(!initDark);
  });
});
