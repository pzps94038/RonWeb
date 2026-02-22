import { Pipe, PipeTransform } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Pipe({
  name: 'abstractControl',
  standalone: true,
})
export class AbstractControlPipe implements PipeTransform {
  transform(control: any): AbstractControl {
    return control as AbstractControl;
  }
}
