import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgLottieComponent } from './ng-lottie.component';

describe('NgLottieComponent', () => {
  let component: NgLottieComponent;
  let fixture: ComponentFixture<NgLottieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NgLottieComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(NgLottieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
