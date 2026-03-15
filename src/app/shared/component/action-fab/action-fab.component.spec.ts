import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActionFabComponent } from './action-fab.component';

describe('ActionFabComponent - 浮動操作按鈕元件', () => {
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

  it('應建立元件', () => {
    expect(component).toBeTruthy();
  });
});
