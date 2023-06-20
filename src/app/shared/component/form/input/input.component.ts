import { FormsModule } from '@angular/forms';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BasicComponent, CONTROL_VALUE_ACCESSOR } from '../base/base.component';

@Component({
  selector: 'app-input',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
  providers: [CONTROL_VALUE_ACCESSOR(InputComponent)],
})
export class InputComponent extends BasicComponent {
  @Input() type: string = 'text';
  @Input() placeholder: string = '';
  @Input() size: 'xs' | 'sm' | 'md' | 'lg' = 'md';
  @Input() inputmode: string = 'text';
}
