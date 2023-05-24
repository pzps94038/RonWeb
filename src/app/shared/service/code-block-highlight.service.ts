import { Injectable, inject, ChangeDetectorRef } from '@angular/core';
import hljs from 'highlight.js';
@Injectable({
  providedIn: 'root',
})
export class CodeBlockHighlightService {
  highlightAllBlock(el?: Element) {
    setTimeout(() => {
      (el ?? document)
        .querySelectorAll('pre code')
        .forEach((block: Element) => this.highlightBlock(block as HTMLElement));
    });
  }

  highlightBlock(block: HTMLElement) {
    hljs.highlightBlock(block);
  }
}
