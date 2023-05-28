import { FormControl } from '@angular/forms';
import { TestBed } from '@angular/core/testing';

import { ValidService } from './valid.service';

describe('ValidService', () => {
  let service: ValidService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ValidService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('是有空格的空字串', () => {
    expect(new FormControl(' ', [service.emptyValidator()]).valid).toBe(false);
  });

  it('有正常輸入文字', () => {
    expect(new FormControl('Search', [service.emptyValidator()]).valid).toBe(true);
  });
});
