import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticleLabelDetailComponent } from './article-label-detail.component';

describe('ArticleLabelDetailComponent', () => {
  let component: ArticleLabelDetailComponent;
  let fixture: ComponentFixture<ArticleLabelDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ArticleLabelDetailComponent, HttpClientTestingModule, RouterTestingModule],
    });
    fixture = TestBed.createComponent(ArticleLabelDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
