import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgTypedComponent } from './ng-typed.component';

describe('NgTypedComponent', () => {
  let component: NgTypedComponent;
  let fixture: ComponentFixture<NgTypedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NgTypedComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(NgTypedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
