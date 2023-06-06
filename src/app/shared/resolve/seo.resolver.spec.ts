import { TestBed } from '@angular/core/testing';
import { ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from '@angular/router';

import { seoResolver } from './seo.resolver';
import { SeoService } from '../service/seo.service';
import { EllipsisPipe } from '../pipe/ellipsis.pipe';

describe('seoResolver', () => {
  const executeResolver: ResolveFn<boolean> = (route, state) =>
    TestBed.runInInjectionContext(() => seoResolver(route, state));

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EllipsisPipe],
    });
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });

  it('測試Seo設置 有呼叫', () => {
    const seoSrv = TestBed.inject(SeoService);
    const spy = spyOn(seoSrv, 'setSeo');
    executeResolver(new ActivatedRouteSnapshot(), {} as any);
    expect(spy).toHaveBeenCalled();
  });
});
