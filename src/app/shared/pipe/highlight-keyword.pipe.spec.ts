import { HighlightKeywordPipe } from './highlight-keyword.pipe';

describe('KeywordStylePipe', () => {
  it('create an instance', () => {
    const pipe = new HighlightKeywordPipe();
    expect(pipe).toBeTruthy();
  });

  it('測試文字被高亮', () => {
    const pipe = new HighlightKeywordPipe();
    expect(pipe.transform('有個文字', '文字')).toContain('text-error');
  });

  it('測試文字沒被高亮', () => {
    const pipe = new HighlightKeywordPipe();
    expect(pipe.transform('有個文字', '無相關的關鍵字')).toBe('有個文字');
  });
});
