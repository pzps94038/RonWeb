import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticleCategoryEditComponent } from './article-category-edit.component';

describe('ArticleCategoryEditComponent', () => {
  let component: ArticleCategoryEditComponent;
  let fixture: ComponentFixture<ArticleCategoryEditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ArticleCategoryEditComponent],
    });
    fixture = TestBed.createComponent(ArticleCategoryEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
