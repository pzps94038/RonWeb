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

describe('Window DarkTheme Test', () => {
  let service: ThemeService;
  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ThemeService);
    // 模擬window.matchMedia
    const matchMediaMock = (query: string) => ({
      matches: true,
      media: query,
      onchange: null,
      addListener: jasmine.createSpy('addListener'),
      removeListener: jasmine.createSpy('removeListener'),
      addEventListener: jasmine.createSpy('addEventListener'),
      removeEventListener: jasmine.createSpy('removeEventListener'),
      dispatchEvent: jasmine.createSpy('dispatchEvent'),
    });

    spyOn(window, 'matchMedia').and.callFake(matchMediaMock);
  });

  it('init System Dark Theme', () => {
    localStorage.removeItem('theme');
    if (service.deviceSrv.isClient) {
      service.initTheme();
      expect(service.darkMode()).toBe(true);
      expect(document.getElementsByTagName('html')[0].getAttribute('data-theme')).toBe('business');
    }
  });
});

describe('Window LightTheme Test', () => {
  let service: ThemeService;
  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ThemeService);
    // 模擬window.matchMedia
    const matchMediaMock = (query: string) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: jasmine.createSpy('addListener'),
      removeListener: jasmine.createSpy('removeListener'),
      addEventListener: jasmine.createSpy('addEventListener'),
      removeEventListener: jasmine.createSpy('removeEventListener'),
      dispatchEvent: jasmine.createSpy('dispatchEvent'),
    });

    spyOn(window, 'matchMedia').and.callFake(matchMediaMock);
  });

  it('init System Light Theme', () => {
    localStorage.removeItem('theme');
    if (service.deviceSrv.isClient) {
      service.initTheme();
      expect(service.darkMode()).toBe(false);
      expect(document.getElementsByTagName('html')[0].getAttribute('data-theme')).toBe('corporate');
      expect(localStorage.getItem('theme')).toBe('false');
    }
  });
});
