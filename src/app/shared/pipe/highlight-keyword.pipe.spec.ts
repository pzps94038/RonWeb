import { HighlightKeywordPipe } from './highlight-keyword.pipe';

describe('KeywordStylePipe', () => {
  it('create an instance', () => {
    const pipe = new HighlightKeywordPipe();
    expect(pipe).toBeTruthy();
  });
});
