import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadingKeywordComponent } from './loading-keyword.component';

describe('LoadingKeywordComponent', () => {
  let component: LoadingKeywordComponent;
  let fixture: ComponentFixture<LoadingKeywordComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [LoadingKeywordComponent],
    });
    fixture = TestBed.createComponent(LoadingKeywordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
