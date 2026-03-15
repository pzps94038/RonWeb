import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticleCardComponent } from './article-card.component';

describe('ArticleCardComponent - 文章卡片元件', () => {
  let component: ArticleCardComponent;
  let fixture: ComponentFixture<ArticleCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ArticleCardComponent],
    });
    fixture = TestBed.createComponent(ArticleCardComponent);
    component = fixture.componentInstance;
    component.title = '測試標題';
    component.category = { categoryId: 1, categoryName: '前端' };
    component.date = '2024-01-01T00:00:00.000Z';
    component.previewContent = '<p>預覽內容</p>';
    component.labels = [
      { labelId: 1, labelName: 'Angular' },
      { labelId: 2, labelName: 'TypeScript' },
    ];
    fixture.detectChanges();
  });

  it('應建立元件', () => {
    expect(component).toBeTruthy();
  });

  it('正確設定輸入屬性', () => {
    expect(component.title).toBe('測試標題');
    expect(component.category.categoryName).toBe('前端');
    expect(component.labels.length).toBe(2);
    expect(component.previewContent).toBe('<p>預覽內容</p>');
  });

  it('showMore 事件觸發', () => {
    spyOn(component.showMore, 'emit');
    component.showMore.emit(true);
    expect(component.showMore.emit).toHaveBeenCalledWith(true);
  });

  it('clickCategory 事件觸發', () => {
    spyOn(component.clickCategory, 'emit');
    component.clickCategory.emit({ categoryId: 1, categoryName: '前端' });
    expect(component.clickCategory.emit).toHaveBeenCalled();
  });

  it('clickLabel 事件觸發', () => {
    spyOn(component.clickLabel, 'emit');
    component.clickLabel.emit({ labelId: 1, labelName: 'Angular' });
    expect(component.clickLabel.emit).toHaveBeenCalled();
  });

  it('highlightKeyword 預設為 false', () => {
    expect(component.highlightKeyword).toBe(false);
  });

  it('keyword 預設為空字串', () => {
    expect(component.keyword).toBe('');
  });
});
