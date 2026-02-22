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
    spyOn(localStorage, 'getItem').and.returnValue('true');
    service.initTheme();
    expect(service.darkMode()).toBe(true);
    expect(document.getElementsByTagName('html')[0].getAttribute('data-theme')).toBe('business');
  });

  it('init Light Theme Storage', () => {
    spyOn(localStorage, 'getItem').and.returnValue('false');
    service.initTheme();
    expect(service.darkMode()).toBe(false);
    expect(document.getElementsByTagName('html')[0].getAttribute('data-theme')).toBe('corporate');
  });

  it('toggle Theme Dark', () => {
    service.toggleTheme(true);
    spyOn(localStorage, 'setItem');
    expect(service.darkMode()).toBe(true);
    expect(document.getElementsByTagName('html')[0].getAttribute('data-theme')).toBe('business');
  });

  it('toggle Theme Light', () => {
    service.toggleTheme(false);
    spyOn(localStorage, 'setItem');
    expect(service.darkMode()).toBe(false);
    expect(document.getElementsByTagName('html')[0].getAttribute('data-theme')).toBe('corporate');
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
    if (service.deviceSrv.isClient) {
      spyOn(localStorage, 'getItem').and.returnValue(null);
      service.initTheme();
      expect(service.darkMode()).toBe(true);
      expect(document.getElementsByTagName('html')[0].getAttribute('data-theme')).toBe('business');
    }
  });
});
