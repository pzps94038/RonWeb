import { TestBed } from '@angular/core/testing';
import { PLATFORM_ID } from '@angular/core';
import { DeviceService } from './device.service';

describe('DeviceService', () => {
  let service: DeviceService;

  describe('Client Platform', () => {
    beforeEach(() => {
      TestBed.configureTestingModule({
        providers: [
          { provide: PLATFORM_ID, useValue: 'browser' },
        ],
      });
      service = TestBed.inject(DeviceService);
    });

    it('should be created', () => {
      expect(service).toBeTruthy();
    });

    it('should identify as client platform', () => {
      expect(service.isClient).toBe(true);
      expect(service.isServer).toBe(false);
    });
  });

  describe('Server Platform', () => {
    beforeEach(() => {
      TestBed.configureTestingModule({
        providers: [
          { provide: PLATFORM_ID, useValue: 'server' },
        ],
      });
      service = TestBed.inject(DeviceService);
    });

    it('should be created', () => {
      expect(service).toBeTruthy();
    });

    it('should identify as server platform', () => {
      expect(service.isClient).toBe(false);
      expect(service.isServer).toBe(true);
    });
  });

  describe('Default Platform (Browser)', () => {
    beforeEach(() => {
      TestBed.configureTestingModule({});
      service = TestBed.inject(DeviceService);
    });

    it('should be created', () => {
      expect(service).toBeTruthy();
    });

    it('should default to client platform', () => {
      expect(service.isClient).toBe(true);
      expect(service.isServer).toBe(false);
    });
  });
});
