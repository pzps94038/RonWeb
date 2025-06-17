import { Injectable, inject, ChangeDetectorRef } from '@angular/core';
import hljs from 'highlight.js';
import { DeviceService } from './device.service';
declare const window: any;
@Injectable({
  providedIn: 'root',
})
export class CodeBlockHighlightService {
  constructor(private deviceSrv: DeviceService) {}

  /**
   * 代碼高亮
   * @param el
   * @returns
   */
  highlightAllBlock(el?: Element) {
    if (this.deviceSrv.isServer) {
      return;
    }
    setTimeout(() => {
      (el ?? document)
        .querySelectorAll('pre code')
        .forEach((block: Element) => this.highlightBlock(block as HTMLElement));
      const options = {
        loadDelay: 0,
        copyIconClass: 'fa-solid fa-copy',
        // // CSS class(es) used to render the done icon.
        checkIconClass: 'fa fa-check text-success',
      };
      window.highlightJsBadge(options);
    });
  }

  highlightBlock(block: HTMLElement) {
    hljs.highlightBlock(block);
  }
}
