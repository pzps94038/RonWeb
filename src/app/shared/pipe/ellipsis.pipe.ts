import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'ellipsis',
  standalone: true,
})
export class EllipsisPipe implements PipeTransform {
  transform(value?: string, ellipsisLen?: number): string | undefined {
    if (!ellipsisLen) {
      ellipsisLen = 150;
    }
    if ((value?.length ?? 0) >= ellipsisLen) {
      return value?.substring(0, ellipsisLen).concat('...');
    }
    return value;
  }
}
