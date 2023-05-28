import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { ArticleCategoryCreateComponent } from './article-category-create.component';

describe('ArticleCategoryCreateComponent', () => {
  let component: ArticleCategoryCreateComponent;
  let fixture: ComponentFixture<ArticleCategoryCreateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ArticleCategoryCreateComponent, HttpClientTestingModule, RouterTestingModule],
    });
    fixture = TestBed.createComponent(ArticleCategoryCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
