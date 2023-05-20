import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticleLabelEditComponent } from './article-label-edit.component';

describe('ArticleLabelEditComponent', () => {
  let component: ArticleLabelEditComponent;
  let fixture: ComponentFixture<ArticleLabelEditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ArticleLabelEditComponent],
    });
    fixture = TestBed.createComponent(ArticleLabelEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
