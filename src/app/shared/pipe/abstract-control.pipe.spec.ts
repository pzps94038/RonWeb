import { AbstractControlPipe } from './abstract-control.pipe';
import { FormControl } from '@angular/forms';

describe('AbstractControlPipe', () => {
  let pipe: AbstractControlPipe;

  beforeEach(() => {
    pipe = new AbstractControlPipe();
  });

  it('should create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should transform FormControl to AbstractControl', () => {
    const control = new FormControl('test');
    const result = pipe.transform(control);
    expect(result).toBe(control);
  });

  it('should handle null value', () => {
    const result = pipe.transform(null);
    expect(result).toBeNull();
  });

  it('should handle undefined value', () => {
    const result = pipe.transform(undefined);
    expect(result).toBeUndefined();
  });

  it('should work with different FormControl values', () => {
    const control1 = new FormControl('string value');
    const control2 = new FormControl(123);
    const control3 = new FormControl(null);
    
    expect(pipe.transform(control1)).toBe(control1);
    expect(pipe.transform(control2)).toBe(control2);
    expect(pipe.transform(control3)).toBe(control3);
  });
});
