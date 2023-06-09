import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GoTopComponent } from './go-top.component';

describe('GoTopComponent', () => {
  let component: GoTopComponent;
  let fixture: ComponentFixture<GoTopComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [GoTopComponent],
    });
    fixture = TestBed.createComponent(GoTopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('滾動呼叫', () => {
    const spy = spyOn(window, 'scrollTo');
    component.goTop();
    expect(spy).toHaveBeenCalled();
  });
});
