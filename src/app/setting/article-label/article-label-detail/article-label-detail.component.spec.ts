import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticleLabelDetailComponent } from './article-label-detail.component';

describe('ArticleLabelDetailComponent', () => {
  let component: ArticleLabelDetailComponent;
  let fixture: ComponentFixture<ArticleLabelDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ArticleLabelDetailComponent],
    });
    fixture = TestBed.createComponent(ArticleLabelDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
