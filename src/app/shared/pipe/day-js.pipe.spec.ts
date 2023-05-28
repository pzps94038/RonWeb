import { DayJsPipe } from './day-js.pipe';

describe('DayJsPipe', () => {
  it('create an instance', () => {
    const pipe = new DayJsPipe();
    expect(pipe).toBeTruthy();
  });

  it('測試YYYYMMDD格式轉換YYYY/MM/DD', () => {
    const pipe = new DayJsPipe();
    expect(pipe.transform('20221212', 'YYYY/MM/DD')).toBe('2022/12/12');
  });

  it('測試YYYY/MM/DD格式轉換YYYYMMDD', () => {
    const pipe = new DayJsPipe();
    expect(pipe.transform('2022/12/12', 'YYYYMMDD')).toBe('20221212');
  });
});
