import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticleLabelEditComponent } from './article-label-edit.component';

describe('ArticleLabelEditComponent', () => {
  let component: ArticleLabelEditComponent;
  let fixture: ComponentFixture<ArticleLabelEditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ArticleLabelEditComponent, HttpClientTestingModule, RouterTestingModule],
    });
    fixture = TestBed.createComponent(ArticleLabelEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
