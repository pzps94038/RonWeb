import { Injectable, inject, ChangeDetectorRef } from '@angular/core';
import hljs from 'highlight.js';
declare const window: any;
@Injectable({
  providedIn: 'root',
})
export class CodeBlockHighlightService {
  highlightAllBlock(el?: Element) {
    setTimeout(() => {
      (el ?? document)
        .querySelectorAll('pre code')
        .forEach((block: Element) => this.highlightBlock(block as HTMLElement));
      const options = {
        loadDelay: 0,
        copyIconClass: 'fa-solid fa-copy',
        // // CSS class(es) used to render the done icon.
        checkIconClass: 'fa fa-check text-success',
        onBeforeTextCopied: function (text: any, codeElement: any) {
          return text;
        },
      };
      window.highlightJsBadge(options);
    });
  }

  highlightBlock(block: HTMLElement) {
    hljs.highlightBlock(block);
  }
}
