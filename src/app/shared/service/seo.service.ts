import { Injectable, Renderer2, inject } from '@angular/core';
import { Meta, MetaDefinition, Title } from '@angular/platform-browser';
import { EllipsisPipe } from '../pipe/ellipsis.pipe';
import { DeviceService } from './device.service';

export type Seo = {
  title?: string;
  description?: string;
  keywords?: string;
};

@Injectable({
  providedIn: 'root',
})
export class SeoService {
  titleSrv = inject(Title);
  ellipsisPipe = inject(EllipsisPipe);
  meta = inject(Meta);
  deviceSrv = inject(DeviceService);

  /**
   * 設定Seo設定
   * @param title
   */
  setSeo({ title, description, keywords }: Seo) {
    const siteName = 'Ron Web - 探索學習的無限可能，分享技術的無盡價值';

    if (title) {
      title = title.concat(' | ', siteName);
    } else {
      title = siteName;
    }
    description = description ?? '';
    // 使用正則表達式將HTML標籤移除
    description = description.replace(/<[^>]+>/g, '');
    const tags: MetaDefinition[] = [
      { name: 'keywords', content: keywords ?? '' },
      { name: 'description', content: this.ellipsisPipe.transform(description) },
      { property: 'og:type', content: 'website' },
      { property: 'og:title', content: title },
      { property: 'og:site_name', content: siteName },
      { property: 'og:description', content: this.ellipsisPipe.transform(description) },
      { property: 'og:locale', content: 'zh-tw' },
      { name: 'og:image', content: 'assets/images/logo.jpg' },
      { name: 'twitter:card', content: 'summary' },
      { name: 'twitter:title', content: title },
      { name: 'twitter:description', content: this.ellipsisPipe.transform(description) },
    ];
    if (this.deviceSrv.isClient) {
      tags.push({
        property: 'og:url',
        content: window.location.href,
      });
    }

    tags.forEach(tag => {
      this.meta.removeTag(`name="${tag.name}"`);
      this.meta.removeTag(`property="${tag.property}"`);
      this.meta.addTag(tag);
    });

    this.titleSrv.setTitle(title);
  }
}
