import { FormsModule, NgControl, ReactiveFormsModule } from '@angular/forms';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MultipleSelectComponent } from './multiple-select.component';

describe('MultipleSelectComponent', () => {
  let component: MultipleSelectComponent;
  let fixture: ComponentFixture<MultipleSelectComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [MultipleSelectComponent, FormsModule],
      providers: [NgControl],
    });
    fixture = TestBed.createComponent(MultipleSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
