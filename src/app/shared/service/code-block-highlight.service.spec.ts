import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import { CodeBlockHighlightService } from './code-block-highlight.service';
import { DeviceService } from './device.service';
import hljs from 'highlight.js';
declare const window: any;

describe('CodeBlockHighlightService', () => {
  let service: CodeBlockHighlightService;
  let mockDeviceService: jasmine.SpyObj<DeviceService>;

  beforeEach(() => {
    const deviceSpy = jasmine.createSpyObj('DeviceService', [], { isServer: false });
    
    TestBed.configureTestingModule({
      providers: [
        { provide: DeviceService, useValue: deviceSpy }
      ]
    });
    
    service = TestBed.inject(CodeBlockHighlightService);
    mockDeviceService = TestBed.inject(DeviceService) as jasmine.SpyObj<DeviceService>;
    
    // Mock window.highlightJsBadge
    window.highlightJsBadge = jasmine.createSpy('highlightJsBadge');
    
    // Mock hljs.highlightBlock
    spyOn(hljs, 'highlightBlock');
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should highlight all blocks', fakeAsync(() => {
    const pre = document.createElement('pre');
    const code = document.createElement('code');
    code.classList.add('language-csharp');
    pre.appendChild(code);
    document.body.appendChild(pre);
    
    service.highlightAllBlock();
    tick();
    
    expect(window.highlightJsBadge).toHaveBeenCalledWith({
      loadDelay: 0,
      copyIconClass: 'fa-solid fa-copy',
      checkIconClass: 'fa fa-check text-success',
    });
  }));

  it('should highlight specific element', fakeAsync(() => {
    const container = document.createElement('div');
    const pre = document.createElement('pre');
    const code = document.createElement('code');
    code.classList.add('language-javascript');
    pre.appendChild(code);
    container.appendChild(pre);
    
    service.highlightAllBlock(container);
    tick();
    
    expect(window.highlightJsBadge).toHaveBeenCalled();
  }));

  it('should not highlight when on server', () => {
    Object.defineProperty(mockDeviceService, 'isServer', { value: true });
    
    service.highlightAllBlock();
    
    expect(window.highlightJsBadge).not.toHaveBeenCalled();
  });

  it('should highlight individual block', () => {
    const codeBlock = document.createElement('code');
    codeBlock.textContent = 'console.log("Hello World");';
    
    service.highlightBlock(codeBlock);
    
    expect(hljs.highlightBlock).toHaveBeenCalledWith(codeBlock);
  });

  it('should handle empty code blocks', fakeAsync(() => {
    service.highlightAllBlock();
    tick();
    
    expect(window.highlightJsBadge).toHaveBeenCalled();
  }));
});
