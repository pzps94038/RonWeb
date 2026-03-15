import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SimpleChange } from '@angular/core';

import { PaginationComponent } from './pagination.component';

describe('PaginationComponent - 分頁元件', () => {
  let component: PaginationComponent;
  let fixture: ComponentFixture<PaginationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [PaginationComponent],
    });
    fixture = TestBed.createComponent(PaginationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('應建立元件', () => {
    expect(component).toBeTruthy();
  });

  it('正確計算總頁數', () => {
    component.ngOnChanges({
      total: new SimpleChange(0, 25, true),
    });
    expect(component.totalPages()).toBe(3);
  });

  it('ngOnChanges 更新 pageSize', () => {
    component.ngOnChanges({
      size: new SimpleChange(10, 5, true),
    });
    expect(component.pageSize()).toBe(5);
  });

  it('ngOnChanges 更新 currentPage', () => {
    component.ngOnChanges({
      curPage: new SimpleChange(1, 3, true),
    });
    expect(component.currentPage()).toBe(3);
  });

  it('curPage 為 undefined 時預設為 1', () => {
    component.ngOnChanges({
      curPage: new SimpleChange(1, undefined, true),
    });
    expect(component.currentPage()).toBe(1);
  });

  it('goToPage 發送 pageChange 事件', () => {
    spyOn(component.pageChange, 'emit');
    component.ngOnChanges({
      total: new SimpleChange(0, 50, true),
    });
    component.goToPage(3);
    expect(component.currentPage()).toBe(3);
    expect(component.pageChange.emit).toHaveBeenCalledWith(3);
  });

  it('goToPage 同一頁不重複發送', () => {
    spyOn(component.pageChange, 'emit');
    component.goToPage(1);
    expect(component.pageChange.emit).not.toHaveBeenCalled();
  });

  it('firstPage 從第3頁跳到第1頁', () => {
    spyOn(component.pageChange, 'emit');
    component.ngOnChanges({
      total: new SimpleChange(0, 50, true),
      curPage: new SimpleChange(1, 3, true),
    });
    component.firstPage();
    expect(component.currentPage()).toBe(1);
    expect(component.pageChange.emit).toHaveBeenCalledWith(1);
  });

  it('firstPage 已在第1頁時不動作', () => {
    spyOn(component.pageChange, 'emit');
    component.firstPage();
    expect(component.pageChange.emit).not.toHaveBeenCalled();
  });

  it('prevPage 向前一頁', () => {
    spyOn(component.pageChange, 'emit');
    component.ngOnChanges({
      total: new SimpleChange(0, 50, true),
      curPage: new SimpleChange(1, 3, true),
    });
    component.prevPage();
    expect(component.currentPage()).toBe(2);
  });

  it('prevPage 第1頁時不動作', () => {
    spyOn(component.pageChange, 'emit');
    component.prevPage();
    expect(component.pageChange.emit).not.toHaveBeenCalled();
  });

  it('nextPage 向後一頁', () => {
    spyOn(component.pageChange, 'emit');
    component.ngOnChanges({
      total: new SimpleChange(0, 50, true),
      curPage: new SimpleChange(1, 1, true),
    });
    component.nextPage();
    expect(component.currentPage()).toBe(2);
  });

  it('nextPage 最後一頁時不動作', () => {
    spyOn(component.pageChange, 'emit');
    component.ngOnChanges({
      total: new SimpleChange(0, 10, true),
    });
    component.nextPage();
    expect(component.pageChange.emit).not.toHaveBeenCalled();
  });

  it('lastPage 跳到最後一頁', () => {
    spyOn(component.pageChange, 'emit');
    component.ngOnChanges({
      total: new SimpleChange(0, 50, true),
    });
    component.lastPage();
    expect(component.currentPage()).toBe(5);
  });

  it('lastPage 已在最後一頁時不動作', () => {
    spyOn(component.pageChange, 'emit');
    component.ngOnChanges({
      total: new SimpleChange(0, 10, true),
    });
    // 只有1頁，currentPage = 1 = totalPages
    component.lastPage();
    expect(component.pageChange.emit).not.toHaveBeenCalled();
  });

  it('visiblePages 正確計算可見頁碼', () => {
    component.ngOnChanges({
      total: new SimpleChange(0, 100, true),
      curPage: new SimpleChange(1, 5, true),
    });
    const pages = component.visiblePages();
    expect(pages.length).toBeLessThanOrEqual(5);
    expect(pages).toContain(5);
  });
});
