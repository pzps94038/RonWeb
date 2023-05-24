import { TestBed } from '@angular/core/testing';

import { CodeBlockHighlightService } from './code-block-highlight.service';

describe('CodeBlockHighlightService', () => {
  let service: CodeBlockHighlightService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CodeBlockHighlightService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
