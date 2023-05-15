import { Pipe, PipeTransform, inject } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
export type SafeType = 'html' | 'resourceUrl' | 'script' | 'style' | 'url';
@Pipe({
  name: 'safe',
  standalone: true,
})
export class SafePipe implements PipeTransform {
  sanitized = inject(DomSanitizer);
  transform(value: string, type: SafeType): SafeHtml {
    switch (type) {
      case 'html':
        return this.sanitized.bypassSecurityTrustHtml(value);
      case 'resourceUrl':
        return this.sanitized.bypassSecurityTrustResourceUrl(value);
      case 'script':
        return this.sanitized.bypassSecurityTrustScript(value);
      case 'style':
        return this.sanitized.bypassSecurityTrustStyle(value);
      case 'url':
        return this.sanitized.bypassSecurityTrustUrl(value);
    }
  }
}
