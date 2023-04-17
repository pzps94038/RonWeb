import { Component, Inject, Input, OnInit, Type, forwardRef } from '@angular/core';
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR, NgControl } from '@angular/forms';
import { Injector } from '@angular/core';
export const CONTROL_VALUE_ACCESSOR = (component: Type<any>) => {
  return {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => component),
    multi: true,
  };
};
@Component({
  standalone: true,
  selector: 'app-basic-input',
  template: '',
})
export abstract class BasicComponent implements ControlValueAccessor, OnInit {
  @Input() labelName?: string;
  @Input() class: string = '';
  protected val = '';
  // 用來接收 setDisabledState 的狀態
  protected disabled = false;

  // 用來接收 registerOnChange 和 onTouched 傳入的方法
  protected onChange?: (value: any) => {};
  protected onTouched?: () => {};
  control: NgControl | undefined;
  constructor(@Inject(Injector) public injector: Injector) {}

  ngOnInit(): void {
    this.control = this.injector.get(NgControl);
  }
  // 以下是 ControlValueAccessor 需實做的方法
  writeValue(val: any): void {
    this.val = val;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  protected change() {
    if (this.onChange && this.onTouched) {
      this.onChange(this.val);
      this.onTouched();
    }
  }
}
