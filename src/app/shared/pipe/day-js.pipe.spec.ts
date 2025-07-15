import { DayJsPipe } from './day-js.pipe';
import * as dayjs from 'dayjs';

describe('DayJsPipe', () => {
  let pipe: DayJsPipe;

  beforeEach(() => {
    pipe = new DayJsPipe();
  });

  it('should create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should transform YYYYMMDD format to YYYY/MM/DD', () => {
    const result = pipe.transform('20221212', 'YYYY/MM/DD');
    expect(result).toBe('2022/12/12');
  });

  it('should transform YYYY/MM/DD format to YYYYMMDD', () => {
    const result = pipe.transform('2022/12/12', 'YYYYMMDD');
    expect(result).toBe('20221212');
  });

  it('should handle different date formats', () => {
    const result = pipe.transform('2022-12-12', 'MM/DD/YYYY');
    expect(result).toBe('12/12/2022');
  });

  it('should handle time formatting', () => {
    const result = pipe.transform('2022-12-12 14:30:00', 'HH:mm:ss');
    expect(result).toBe('14:30:00');
  });

  it('should handle full datetime formatting', () => {
    const result = pipe.transform('2022-12-12T14:30:00', 'YYYY-MM-DD HH:mm:ss');
    expect(result).toBe('2022-12-12 14:30:00');
  });

  it('should handle ISO date strings', () => {
    const isoDate = '2022-12-12T14:30:00.000Z';
    const result = pipe.transform(isoDate, 'YYYY-MM-DD');
    expect(result).toBe('2022-12-12');
  });

  it('should handle invalid date strings', () => {
    const result = pipe.transform('invalid-date', 'YYYY-MM-DD');
    expect(result).toBe('Invalid Date');
  });

  it('should handle empty string input', () => {
    const result = pipe.transform('', 'YYYY-MM-DD');
    expect(result).toBe('Invalid Date');
  });

  it('should handle null input', () => {
    const result = pipe.transform(null as any, 'YYYY-MM-DD');
    expect(result).toBe('Invalid Date');
  });

  it('should handle undefined input', () => {
    const result = pipe.transform(undefined as any, 'YYYY-MM-DD');
    // dayjs(undefined) returns current date, not invalid date
    expect(result).toMatch(/\d{4}-\d{2}-\d{2}/);
  });
});
