import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ScrollAnimateDirective } from './scroll-animate.directive';

@Component({
  template: ` <div scrollAnimate="animate__fadeIn"></div> `,
})
class HostComponent {}

describe('ScrollAnimateDirective', () => {
  let fixture: ComponentFixture<HostComponent>;
  let component: HostComponent;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HostComponent],
      imports: [ScrollAnimateDirective],
    }).compileComponents();
    fixture = TestBed.createComponent(HostComponent);
    fixture.detectChanges();
  });

  it('should create an instance', () => {
    component = TestBed.createComponent(HostComponent).componentInstance;
    expect(component).toBeTruthy();
  });
});
