import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BasicComponent, CONTROL_VALUE_ACCESSOR } from '../base/base.component';
import { FormsModule } from '@angular/forms';
export type Option = {
  disabled?: boolean;
  text: string;
  value: any;
};
export type Options = Option[];
@Component({
  selector: 'app-select',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss'],
  providers: [CONTROL_VALUE_ACCESSOR(SelectComponent)],
})
export class SelectComponent extends BasicComponent {
  @Input() options: Options = [];
  @Input() size: 'xs' | 'sm' | 'md' | 'lg' = 'md';
}
