import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticleLabelCreateComponent } from './article-label-create.component';

describe('ArticleLabelCreateComponent', () => {
  let component: ArticleLabelCreateComponent;
  let fixture: ComponentFixture<ArticleLabelCreateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ArticleLabelCreateComponent, HttpClientTestingModule],
    });
    fixture = TestBed.createComponent(ArticleLabelCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
