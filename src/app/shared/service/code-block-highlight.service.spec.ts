import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import { CodeBlockHighlightService } from './code-block-highlight.service';
declare const window: any;

describe('CodeBlockHighlightService', () => {
  let service: CodeBlockHighlightService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CodeBlockHighlightService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('測試 highlightAllBlock', fakeAsync(() => {
    const pre = document.createElement('pre');
    const code = document.createElement('code');
    code.classList.add('language-csharp');
    pre.appendChild(code);
    document.body.appendChild(pre);
    const spyJsBadge = spyOn(window, 'highlightJsBadge');
    service.highlightAllBlock();
    tick();
    expect(spyJsBadge).toHaveBeenCalled();
    expect(code.classList.contains('hljs')).toBe(true);
  }));
});
