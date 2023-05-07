import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'ellipsis',
  standalone: true,
})
export class EllipsisPipe implements PipeTransform {
  transform(value: string, ellipsisLen: number = 150): string {
    if (value.length >= ellipsisLen) {
      return value.substring(0, ellipsisLen).concat('...');
    }
    return value;
  }
}
