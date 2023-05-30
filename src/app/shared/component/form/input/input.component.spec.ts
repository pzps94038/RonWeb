import {
  FormControl,
  FormGroup,
  FormsModule,
  NgControl,
  ReactiveFormsModule,
} from '@angular/forms';
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { InputComponent } from './input.component';
import { Component, DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

@Component({
  template: `
    <form [formGroup]="form">
      <app-input formControlName="test" />
    </form>
  `,
})
class HostComponent {
  form = new FormGroup({
    test: new FormControl(),
  });
}

describe('InputComponent', () => {
  let hostComponent: HostComponent;
  let hostFixture: ComponentFixture<HostComponent>;
  let componentDebugElement: DebugElement;
  let componentInstance: InputComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HostComponent],
      imports: [InputComponent, FormsModule, ReactiveFormsModule],
      providers: [NgControl],
    }).compileComponents();

    hostFixture = TestBed.createComponent(HostComponent);
    hostComponent = hostFixture.componentInstance;
    hostFixture.detectChanges();
    // Find the child component DebugElement using a CSS selector
    componentDebugElement = hostFixture.debugElement.query(By.directive(InputComponent));
    // Get the component instance from the DebugElement
    componentInstance = componentDebugElement.componentInstance;
  });

  it('should create', () => {
    expect(componentInstance).toBeTruthy();
  });

  it('input 值改變', fakeAsync(() => {
    const val = 'Test';
    const input = componentDebugElement.query(By.css('input')).nativeElement;
    input.value = val;
    input.dispatchEvent(new Event('input'));
    tick();
    expect(hostComponent.form.controls['test'].value).toBe(val);
  }));
});
