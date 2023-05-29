import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BasicComponent, CONTROL_VALUE_ACCESSOR } from '../base/base.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule } from '@angular/forms';
import { Options } from '../select/select.component';

@Component({
  selector: 'app-multiple-select',
  standalone: true,
  imports: [CommonModule, NgSelectModule, FormsModule],
  templateUrl: './multiple-select.component.html',
  styleUrls: ['./multiple-select.component.scss'],
  providers: [CONTROL_VALUE_ACCESSOR(MultipleSelectComponent)],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MultipleSelectComponent extends BasicComponent {
  @Input() options: Options = [];
  @Input() placeholder: string = '';
}
