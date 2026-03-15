import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { BlogComponent } from './blog.component';

describe('BlogComponent - 部落格主版面元件', () => {
  let component: BlogComponent;
  let fixture: ComponentFixture<BlogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BlogComponent, HttpClientTestingModule, RouterTestingModule],
    }).compileComponents();

    fixture = TestBed.createComponent(BlogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('應建立元件', () => {
    expect(component).toBeTruthy();
  });

  it('送出有效搜尋表單', () => {
    const spy = spyOn(component.router, 'navigate');
    component.form.controls['keyword'].setValue('Angular');
    component.submit();
    expect(spy).toHaveBeenCalledWith(['blog', 'search', 'Angular']);
  });

  it('送出無效表單不導航', () => {
    const spy = spyOn(component.router, 'navigate');
    component.form.controls['keyword'].setValue('');
    component.submit();
    expect(spy).not.toHaveBeenCalled();
  });

  it('送出空白字串不導航', () => {
    const spy = spyOn(component.router, 'navigate');
    component.form.controls['keyword'].setValue('   ');
    component.submit();
    expect(spy).not.toHaveBeenCalled();
  });

  it('表單初始狀態 keyword 為空', () => {
    expect(component.form.controls['keyword'].value).toBe('');
  });
});
