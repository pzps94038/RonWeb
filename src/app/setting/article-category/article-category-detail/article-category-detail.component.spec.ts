import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { ArticleCategoryDetailComponent } from './article-category-detail.component';

describe('ArticleCategoryDetailComponent', () => {
  let component: ArticleCategoryDetailComponent;
  let fixture: ComponentFixture<ArticleCategoryDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ArticleCategoryDetailComponent, HttpClientTestingModule, RouterTestingModule],
    });
    fixture = TestBed.createComponent(ArticleCategoryDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
