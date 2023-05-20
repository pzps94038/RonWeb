import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticleLabelComponent } from './article-label.component';

describe('ArticleLabelComponent', () => {
  let component: ArticleLabelComponent;
  let fixture: ComponentFixture<ArticleLabelComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ArticleLabelComponent],
    });
    fixture = TestBed.createComponent(ArticleLabelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
