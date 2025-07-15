import { HighlightKeywordPipe } from './highlight-keyword.pipe';

describe('HighlightKeywordPipe', () => {
  let pipe: HighlightKeywordPipe;

  beforeEach(() => {
    pipe = new HighlightKeywordPipe();
  });

  it('should create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should highlight matching text', () => {
    const result = pipe.transform('有個文字', '文字');
    expect(result).toContain('<span class="text-error">文字</span>');
  });

  it('should not highlight when no match', () => {
    const result = pipe.transform('有個文字', '無相關的關鍵字');
    expect(result).toBe('有個文字');
  });

  it('should handle empty string value', () => {
    const result = pipe.transform('', '文字');
    expect(result).toBe('');
  });

  it('should handle empty keyword', () => {
    const result = pipe.transform('有個文字', '');
    expect(result).toBe('有個文字');
  });

  it('should handle case insensitive matching', () => {
    const result = pipe.transform('Hello World', 'hello');
    expect(result).toContain('<span class="text-error">Hello</span>');
  });

  it('should handle multiple occurrences', () => {
    const result = pipe.transform('test test test', 'test');
    const matches = result.match(/<span class="text-error">test<\/span>/g);
    expect(matches).toBeTruthy();
    expect(matches!.length).toBe(3);
  });

  it('should handle regex special characters by escaping them', () => {
    const result = pipe.transform('test (bracket)', '\\(bracket\\)');
    expect(result).toContain('<span class="text-error">(bracket)</span>');
  });

  it('should handle null or undefined values gracefully', () => {
    expect(pipe.transform(null as any, 'test')).toBe('');
    expect(pipe.transform(undefined as any, 'test')).toBe('');
  });
});
