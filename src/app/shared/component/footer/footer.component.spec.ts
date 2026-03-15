import { ComponentFixture, TestBed } from '@angular/core/testing';
import * as dayjs from 'dayjs';

import { FooterComponent } from './footer.component';

describe('FooterComponent - 頁尾元件', () => {
  let component: FooterComponent;
  let fixture: ComponentFixture<FooterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [FooterComponent],
    });
    fixture = TestBed.createComponent(FooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('應建立元件', () => {
    expect(component).toBeTruthy();
  });

  it('顯示當前年份', () => {
    expect(component.year()).toBe(dayjs().format('YYYY'));
  });
});
