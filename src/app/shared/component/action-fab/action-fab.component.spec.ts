import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActionFabComponent } from './action-fab.component';
import { By } from '@angular/platform-browser';

describe('ActionFabComponent', () => {
  let component: ActionFabComponent;
  let fixture: ComponentFixture<ActionFabComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ActionFabComponent],
    });
    fixture = TestBed.createComponent(ActionFabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('測試展開', () => {
    component.toggleMenu(true);
    const el = fixture.debugElement.query(By.css('.floatingMenu')).nativeElement as Element;
    fixture.detectChanges();
    expect(el.classList.contains('open')).toBe(true);
  });

  it('測試關閉', () => {
    component.toggleMenu(false);
    const el = fixture.debugElement.query(By.css('.floatingMenu')).nativeElement as Element;
    fixture.detectChanges();
    expect(el.classList.contains('close')).toBe(true);
  });
});
