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
});
