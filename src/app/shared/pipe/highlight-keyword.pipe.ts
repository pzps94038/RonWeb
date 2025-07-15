import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'highlightKeyword',
  standalone: true,
})
export class HighlightKeywordPipe implements PipeTransform {
  transform(value: string, keyword: string): string {
    // Handle null/undefined values
    if (!value) {
      return value || '';
    }
    
    // Handle empty or null keyword
    if (!keyword) {
      return value;
    }

    var regex = new RegExp(keyword, 'gi'); // 使用 "gi" 标志进行全局和不区分大小写的搜索

    // 将匹配的关键字用 <span> 标签包裹，并设置样式为红色
    value = value.replace(regex, '<span class="text-error">$&</span>');
    return value;
  }
}
