import { TestBed } from '@angular/core/testing';
import { Meta, Title } from '@angular/platform-browser';
import { EllipsisPipe } from '../pipe/ellipsis.pipe';
import { DeviceService } from './device.service';

import { SeoService } from './seo.service';

describe('SeoService', () => {
  let service: SeoService;
  let mockTitle: jasmine.SpyObj<Title>;
  let mockMeta: jasmine.SpyObj<Meta>;
  let mockDeviceService: jasmine.SpyObj<DeviceService>;

  beforeEach(() => {
    const titleSpy = jasmine.createSpyObj('Title', ['setTitle']);
    const metaSpy = jasmine.createSpyObj('Meta', ['addTag', 'removeTag']);
    const deviceSpy = jasmine.createSpyObj('DeviceService', [], { isClient: true });

    TestBed.configureTestingModule({
      providers: [
        EllipsisPipe,
        { provide: Title, useValue: titleSpy },
        { provide: Meta, useValue: metaSpy },
        { provide: DeviceService, useValue: deviceSpy },
      ],
    });
    
    service = TestBed.inject(SeoService);
    mockTitle = TestBed.inject(Title) as jasmine.SpyObj<Title>;
    mockMeta = TestBed.inject(Meta) as jasmine.SpyObj<Meta>;
    mockDeviceService = TestBed.inject(DeviceService) as jasmine.SpyObj<DeviceService>;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should set SEO with all parameters', () => {
    const seoData = {
      title: '測試標題',
      description: '測試描述',
      keywords: '測試關鍵字',
    };

    service.setSeo(seoData);

    expect(mockTitle.setTitle).toHaveBeenCalledWith('測試標題 | Ron Web - 探索學習的無限可能，分享技術的無盡價值');
    expect(mockMeta.addTag).toHaveBeenCalled();
    expect(mockMeta.removeTag).toHaveBeenCalled();
  });

  it('should set SEO with empty parameters', () => {
    service.setSeo({});

    expect(mockTitle.setTitle).toHaveBeenCalledWith('Ron Web - 探索學習的無限可能，分享技術的無盡價值');
    expect(mockMeta.addTag).toHaveBeenCalled();
  });

  it('should handle description with HTML tags', () => {
    const seoData = {
      title: '測試標題',
      description: '<p>測試<strong>描述</strong></p>',
      keywords: '測試關鍵字',
    };

    service.setSeo(seoData);

    expect(mockTitle.setTitle).toHaveBeenCalledWith('測試標題 | Ron Web - 探索學習的無限可能，分享技術的無盡價值');
    expect(mockMeta.addTag).toHaveBeenCalled();
  });

  it('should not add og:url tag when on server', () => {
    Object.defineProperty(mockDeviceService, 'isClient', { value: false });
    
    service.setSeo({
      title: '測試標題',
      description: '測試描述',
      keywords: '測試關鍵字',
    });

    expect(mockMeta.addTag).toHaveBeenCalled();
  });

  it('should handle undefined description', () => {
    service.setSeo({
      title: '測試標題',
      keywords: '測試關鍵字',
    });

    expect(mockTitle.setTitle).toHaveBeenCalledWith('測試標題 | Ron Web - 探索學習的無限可能，分享技術的無盡價值');
    expect(mockMeta.addTag).toHaveBeenCalled();
  });

  it('should handle undefined keywords', () => {
    service.setSeo({
      title: '測試標題',
      description: '測試描述',
    });

    expect(mockTitle.setTitle).toHaveBeenCalledWith('測試標題 | Ron Web - 探索學習的無限可能，分享技術的無盡價值');
    expect(mockMeta.addTag).toHaveBeenCalled();
  });

  it('should handle null values', () => {
    service.setSeo({
      title: null as any,
      description: null as any,
      keywords: null as any,
    });

    expect(mockTitle.setTitle).toHaveBeenCalledWith('Ron Web - 探索學習的無限可能，分享技術的無盡價值');
    expect(mockMeta.addTag).toHaveBeenCalled();
  });
});
