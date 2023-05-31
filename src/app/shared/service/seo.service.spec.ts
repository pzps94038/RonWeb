import { TestBed } from '@angular/core/testing';
import { EllipsisPipe } from '../pipe/ellipsis.pipe';

import { SeoService } from './seo.service';

describe('SeoService', () => {
  let service: SeoService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EllipsisPipe],
    });
    service = TestBed.inject(SeoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('設置SEO', () => {
    service.setSeo({
      title: '測試標題',
      description: '測試描述',
      keywords: '測試關鍵字',
    });
    expect(document.title).toBe('測試標題 | Ron Web - 探索學習的無限可能，分享技術的無盡價值');
    expect((document.querySelector('meta[name="description"]')! as HTMLMetaElement).content).toBe(
      '測試描述',
    );
    expect((document.querySelector('meta[name="keywords"]')! as HTMLMetaElement).content).toBe(
      '測試關鍵字',
    );
  });

  it('設置SEO全空', () => {
    service.setSeo({});
    expect(document.title).toBe('Ron Web - 探索學習的無限可能，分享技術的無盡價值');
    expect((document.querySelector('meta[name="description"]')! as HTMLMetaElement).content).toBe(
      '',
    );
    expect((document.querySelector('meta[name="keywords"]')! as HTMLMetaElement).content).toBe('');
  });
});
