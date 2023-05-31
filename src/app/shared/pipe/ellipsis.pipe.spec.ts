import { EllipsisPipe } from './ellipsis.pipe';

describe('EllipsisPipe', () => {
  it('create an instance', () => {
    const pipe = new EllipsisPipe();
    expect(pipe).toBeTruthy();
  });

  it('測試短文字截斷功能', () => {
    const pipe = new EllipsisPipe();
    expect(pipe.transform('很短的文字').length).toBe(5);
  });

  it('測試長文字截斷功能', () => {
    const pipe = new EllipsisPipe();
    expect(pipe.transform('很短的文字', 3)).toBe('很短的...');
  });

  it('測試沒文字防呆', () => {
    const pipe = new EllipsisPipe();
    expect(pipe.transform(undefined)).toBe('');
  });
});
