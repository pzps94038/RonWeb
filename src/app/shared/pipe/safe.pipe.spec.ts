import { inject, runInInjectionContext } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { DomSanitizer } from '@angular/platform-browser';
import { SafePipe } from './safe.pipe';

describe('SafePipe', () => {
  let pipe: SafePipe;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SafePipe],
    });
    pipe = TestBed.inject(SafePipe);
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('測試HTMl', () => {
    const value = '<p>Hello World</p>';
    const transformedValue = pipe.transform(value, 'html');
    expect(transformedValue).toEqual(pipe.sanitized.bypassSecurityTrustHtml(value));
  });

  it('測試 resourceUrl', () => {
    const value = 'https://example.com/image.jpg';
    const transformedValue = pipe.transform(value, 'resourceUrl');
    expect(transformedValue).toEqual(pipe.sanitized.bypassSecurityTrustResourceUrl(value));
  });

  it('測試 script', () => {
    const value = 'alert("Hello World");';
    const transformedValue = pipe.transform(value, 'script');
    expect(transformedValue).toEqual(pipe.sanitized.bypassSecurityTrustScript(value));
  });

  it('測試 style', () => {
    const value = 'color: red;';
    const transformedValue = pipe.transform(value, 'style');
    expect(transformedValue).toEqual(pipe.sanitized.bypassSecurityTrustStyle(value));
  });

  it('測試 url', () => {
    const value = 'https://example.com';
    const transformedValue = pipe.transform(value, 'url');
    expect(transformedValue).toEqual(pipe.sanitized.bypassSecurityTrustUrl(value));
  });
});
