import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  Inject,
  Input,
  OnInit,
  Type,
  forwardRef,
} from '@angular/core';
import {
  AbstractControl,
  ControlValueAccessor,
  FormsModule,
  NG_VALUE_ACCESSOR,
  NgControl,
} from '@angular/forms';
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
export abstract class BasicComponent<T = string>
  implements ControlValueAccessor, OnInit, AfterViewInit
{
  @Input() labelName?: string;
  @Input() labelClass: string = '';
  @Input() class: string = '';
  @Input() showErrorMsg: boolean = true;
  protected val?: T;
  // 用來接收 setDisabledState 的狀態
  protected disabled = false;

  // 用來接收 registerOnChange 和 onTouched 傳入的方法
  protected onChange?: (value: any) => {};
  protected onTouched?: () => {};
  ngControl: NgControl | undefined;
  control: AbstractControl | null | undefined;
  constructor(@Inject(Injector) public injector: Injector, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.ngControl = this.injector.get(NgControl);
  }

  ngAfterViewInit(): void {
    this.control = this.ngControl?.control;
    this.cdr.detectChanges();
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
