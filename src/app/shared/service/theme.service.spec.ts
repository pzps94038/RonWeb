import { TestBed } from '@angular/core/testing';
import { DeviceService } from './device.service';

import { ThemeService } from './theme.service';

describe('ThemeService', () => {
  let service: ThemeService;
  let mockDeviceService: jasmine.SpyObj<DeviceService>;

  beforeEach(() => {
    const deviceSpy = jasmine.createSpyObj('DeviceService', [], { isServer: false });
    
    TestBed.configureTestingModule({
      providers: [
        { provide: DeviceService, useValue: deviceSpy }
      ]
    });
    
    service = TestBed.inject(ThemeService);
    mockDeviceService = TestBed.inject(DeviceService) as jasmine.SpyObj<DeviceService>;
    
    // Clear localStorage before each test
    localStorage.clear();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should initialize with dark mode default', () => {
    expect(service.darkMode()).toBe(true);
  });

  it('should init dark theme from localStorage', () => {
    spyOn(localStorage, 'getItem').and.returnValue('true');
    service.initTheme();
    
    expect(service.darkMode()).toBe(true);
    expect(document.getElementsByTagName('html')[0].getAttribute('data-theme')).toBe('business');
  });

  it('should init light theme from localStorage', () => {
    spyOn(localStorage, 'getItem').and.returnValue('false');
    service.initTheme();
    
    expect(service.darkMode()).toBe(false);
    expect(document.getElementsByTagName('html')[0].getAttribute('data-theme')).toBe('corporate');
  });

  it('should use default theme when localStorage is empty', () => {
    spyOn(localStorage, 'getItem').and.returnValue(null);
    service.initTheme();
    
    expect(service.darkMode()).toBe(true);
    expect(document.getElementsByTagName('html')[0].getAttribute('data-theme')).toBe('business');
  });

  it('should handle invalid JSON in localStorage', () => {
    spyOn(localStorage, 'getItem').and.returnValue('invalid-json');
    
    expect(() => service.initTheme()).toThrow();
  });

  it('should toggle to dark theme', () => {
    const setItemSpy = spyOn(localStorage, 'setItem');
    
    service.toggleTheme(true);
    
    expect(service.darkMode()).toBe(true);
    expect(document.getElementsByTagName('html')[0].getAttribute('data-theme')).toBe('business');
    expect(setItemSpy).toHaveBeenCalledWith('theme', 'true');
  });

  it('should toggle to light theme', () => {
    const setItemSpy = spyOn(localStorage, 'setItem');
    
    service.toggleTheme(false);
    
    expect(service.darkMode()).toBe(false);
    expect(document.getElementsByTagName('html')[0].getAttribute('data-theme')).toBe('corporate');
    expect(setItemSpy).toHaveBeenCalledWith('theme', 'false');
  });

  it('should not init theme on server', () => {
    Object.defineProperty(mockDeviceService, 'isServer', { value: true });
    
    service.initTheme();
    
    // No DOM operations should happen on server
    expect(service.darkMode()).toBe(true); // Should remain default
  });

  it('should not toggle theme on server', () => {
    Object.defineProperty(mockDeviceService, 'isServer', { value: true });
    const setItemSpy = spyOn(localStorage, 'setItem');
    const initialValue = service.darkMode();
    
    service.toggleTheme(false);
    
    expect(service.darkMode()).toBe(initialValue); // Signal should remain unchanged
    expect(setItemSpy).not.toHaveBeenCalled(); // But localStorage should not be accessed
  });

  it('should handle multiple theme toggles', () => {
    service.toggleTheme(true);
    expect(service.darkMode()).toBe(true);
    
    service.toggleTheme(false);
    expect(service.darkMode()).toBe(false);
    
    service.toggleTheme(true);
    expect(service.darkMode()).toBe(true);
  });
});

describe('Window DarkTheme Test', () => {
  let service: ThemeService;
  
  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ThemeService);
    
    // Mock window.matchMedia
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

  it('should init system dark theme when no localStorage', () => {
    if (service.deviceSrv.isClient) {
      spyOn(localStorage, 'getItem').and.returnValue(null);
      service.initTheme();
      
      expect(service.darkMode()).toBe(true);
      expect(document.getElementsByTagName('html')[0].getAttribute('data-theme')).toBe('business');
    }
  });
});
