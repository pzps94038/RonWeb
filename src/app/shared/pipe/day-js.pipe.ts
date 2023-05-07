import { Pipe, PipeTransform } from '@angular/core';
import * as dayjs from 'dayjs';

@Pipe({
  name: 'dayJs',
  standalone: true,
})
export class DayJsPipe implements PipeTransform {
  transform(value: string, format: string): string {
    return dayjs(value).format(format);
  }
}
