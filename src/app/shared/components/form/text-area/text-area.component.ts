import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BasicComponent, CONTROL_VALUE_ACCESSOR } from '../base/base.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-text-area',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './text-area.component.html',
  styleUrls: ['./text-area.component.scss'],
  providers: [CONTROL_VALUE_ACCESSOR(TextAreaComponent)],
})
export class TextAreaComponent extends BasicComponent {
  @Input() placeholder: string = '';
  @Input() size: 'xs' | 'sm' | 'md' | 'lg' = 'md';
}
