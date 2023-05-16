import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadArticleComponent } from './load-article.component';

describe('LoadArticleComponent', () => {
  let component: LoadArticleComponent;
  let fixture: ComponentFixture<LoadArticleComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [LoadArticleComponent],
    });
    fixture = TestBed.createComponent(LoadArticleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
