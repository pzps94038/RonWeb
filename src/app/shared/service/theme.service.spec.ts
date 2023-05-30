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

  it('init System Theme', () => {
    localStorage.removeItem('theme');
    if (service.deviceSrv.isClient) {
      service.initTheme();
      if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        expect(service.darkMode()).toBe(true);
        expect(document.getElementsByTagName('html')[0].getAttribute('data-theme')).toBe(
          'business',
        );
      } else {
        expect(service.darkMode()).toBe(false);
        expect(document.getElementsByTagName('html')[0].getAttribute('data-theme')).toBe(
          'corporate',
        );
      }
    }
  });

  it('init Dark Theme Storage', () => {
    localStorage.setItem('theme', JSON.stringify(true));
    service.initTheme();
    expect(service.darkMode()).toBe(true);
    expect(document.getElementsByTagName('html')[0].getAttribute('data-theme')).toBe('business');
    localStorage.removeItem('theme');
  });

  it('init Light Theme Storage', () => {
    localStorage.setItem('theme', JSON.stringify(false));
    service.initTheme();
    expect(service.darkMode()).toBe(false);
    expect(document.getElementsByTagName('html')[0].getAttribute('data-theme')).toBe('corporate');
    localStorage.removeItem('theme');
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
