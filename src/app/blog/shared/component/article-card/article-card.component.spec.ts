import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticleCardComponent } from './article-card.component';

describe('ArticleCardComponent', () => {
  let component: ArticleCardComponent;
  let fixture: ComponentFixture<ArticleCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ArticleCardComponent],
    });
    fixture = TestBed.createComponent(ArticleCardComponent);
    component = fixture.componentInstance;
    component.title = 'title';
    component.category = {
      categoryId: 1,
      categoryName: 'CategoryName',
    };
    component.date = '2023-05-08T13:22:00.124Z';
    component.previewContent = 'previewContent';
    component.labels = [
      {
        labelId: 2,
        labelName: '標籤2',
        createDate: '2023-05-08T13:22:00.124Z',
      },
    ];
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
