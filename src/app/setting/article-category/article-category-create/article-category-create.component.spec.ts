import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticleCategoryCreateComponent } from './article-category-create.component';

describe('ArticleCategoryCreateComponent', () => {
  let component: ArticleCategoryCreateComponent;
  let fixture: ComponentFixture<ArticleCategoryCreateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ArticleCategoryCreateComponent],
    });
    fixture = TestBed.createComponent(ArticleCategoryCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
