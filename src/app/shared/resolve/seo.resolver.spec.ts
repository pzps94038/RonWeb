import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { seoResolver } from './seo.resolver';

describe('seoResolver', () => {
  const executeResolver: ResolveFn<boolean> = (route, state) =>
    TestBed.runInInjectionContext(() => seoResolver(route, state));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
