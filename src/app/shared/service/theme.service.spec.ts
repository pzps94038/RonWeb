import { TestBed } from '@angular/core/testing';

import { ThemeService } from './theme.service';

describe('ThemeService', () => {
  let service: ThemeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ThemeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('toggle Theme Dark', () => {
    service.toggleTheme(true);
    expect(service.darkMode()).toBe(true);
    expect(document.getElementsByTagName('html')[0].getAttribute('data-theme')).toBe('business');
    expect(localStorage.getItem('theme')).toBe('true');
  });

  it('toggle Theme Light', () => {
    service.toggleTheme(false);
    expect(service.darkMode()).toBe(false);
    expect(document.getElementsByTagName('html')[0].getAttribute('data-theme')).toBe('corporate');
    expect(localStorage.getItem('theme')).toBe('false');
  });
});
