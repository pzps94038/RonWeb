import { Component, Input, OnInit } from '@angular/core';
import { BasicComponent, CONTROL_VALUE_ACCESSOR } from '../base/base.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-toggle',
  templateUrl: './toggle.component.html',
  styleUrls: ['./toggle.component.scss'],
  imports: [CommonModule, FormsModule],
  providers: [CONTROL_VALUE_ACCESSOR(ToggleComponent)],
})
export class ToggleComponent extends BasicComponent<boolean> {
  @Input() size: 'xs' | 'sm' | 'md' | 'lg' = 'md';
  protected override val = false;

  override writeValue(val: string) {
    this.val = val === 'Y';
  }

  protected override change() {
    if (this.onChange && this.onTouched) {
      this.onChange(this.val ? 'Y' : 'N');
      this.onTouched();
    }
  }
}
