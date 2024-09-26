import { Component, Input, OnDestroy } from '@angular/core';
import { BasicComponent, CONTROL_VALUE_ACCESSOR } from '../base/base.component';
import { CommonModule } from '@angular/common';
import {
  AbstractControl,
  FormArray,
  FormControl,
  FormGroup,
  FormsModule,
  NgControl,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { heroMinus, heroPlus } from '@ng-icons/heroicons/outline';
import { Subject, takeUntil, tap } from 'rxjs';
import { AbstractControlPipe } from 'src/app/shared/pipe/abstract-control.pipe';

@Component({
  selector: 'app-dynamic-input',
  standalone: true,
  imports: [CommonModule, FormsModule, NgIconComponent, ReactiveFormsModule, AbstractControlPipe],
  providers: [CONTROL_VALUE_ACCESSOR(DynamicInputComponent), provideIcons({ heroPlus, heroMinus })],
  templateUrl: './dynamic-input.component.html',
  styleUrls: ['./dynamic-input.component.scss'],
})
export class DynamicInputComponent extends BasicComponent<string[]> implements OnDestroy {
  @Input() type: string = 'text';
  @Input() placeholder: string = '';
  @Input() size: 'xs' | 'sm' | 'md' | 'lg' = 'md';
  @Input() inputmode: string = 'text';
  protected form = new FormGroup({
    array: new FormArray([]),
  });
  get array() {
    return this.form.controls['array'] as unknown as FormArray;
  }
  protected _destroy$ = new Subject<any>();

  override ngOnInit(): void {
    this.ngControl = this.injector.get(NgControl);
    this.array.valueChanges
      .pipe(takeUntil(this._destroy$))
      .subscribe(() => this.onChange?.(this.array.value));
  }

  ngOnDestroy(): void {
    this._destroy$.next(null);
    this._destroy$.complete();
  }

  override writeValue(val: any): void {
    const array = val ?? [];
    this.val = val;
    for (const value of array) {
      this.array.push(
        new FormControl(
          {
            value,
            disabled: this.disabled,
          },
          [Validators.required],
        ),
      );
    }
  }

  override registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  override registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  override setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  protected override change() {
    if (this.onChange && this.onTouched) {
      this.onChange(this.array.value);
      this.onTouched();
    }
  }

  /**
   * 新增row
   */
  addRow() {
    this.array.push(
      new FormControl(
        {
          value: '',
          disabled: this.disabled,
        },
        [Validators.required],
      ),
    );
  }

  /**
   * 移除row
   * @param idx
   */
  removeRow(idx: number) {
    this.array.removeAt(idx);
  }
}
