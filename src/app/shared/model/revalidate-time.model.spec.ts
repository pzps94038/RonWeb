import { RevalidateTime } from './revalidate-time.model';

describe('RevalidateTime', () => {
  it('should have correct values for each enum member', () => {
    expect(RevalidateTime.NONE).toBe(0);
    expect(RevalidateTime.FAST).toBe(10);
    expect(RevalidateTime.EVERY_MINUTE).toBe(60);
    expect(RevalidateTime.EVERY_5_MINUTES).toBe(300);
    expect(RevalidateTime.EVERY_HOUR).toBe(3600);
    expect(RevalidateTime.DAILY).toBe(86400);
  });

  it('should have proper ordering for cache durations', () => {
    expect(RevalidateTime.NONE).toBeLessThan(RevalidateTime.FAST);
    expect(RevalidateTime.FAST).toBeLessThan(RevalidateTime.EVERY_MINUTE);
    expect(RevalidateTime.EVERY_MINUTE).toBeLessThan(RevalidateTime.EVERY_5_MINUTES);
    expect(RevalidateTime.EVERY_5_MINUTES).toBeLessThan(RevalidateTime.EVERY_HOUR);
    expect(RevalidateTime.EVERY_HOUR).toBeLessThan(RevalidateTime.DAILY);
  });

  it('should have valid time calculations', () => {
    expect(RevalidateTime.EVERY_MINUTE).toBe(60); // 1 minute
    expect(RevalidateTime.EVERY_5_MINUTES).toBe(5 * 60); // 5 minutes
    expect(RevalidateTime.EVERY_HOUR).toBe(60 * 60); // 1 hour
    expect(RevalidateTime.DAILY).toBe(24 * 60 * 60); // 1 day
  });
});