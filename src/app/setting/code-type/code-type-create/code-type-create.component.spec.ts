import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CodeTypeCreateComponent } from './code-type-create.component';

describe('CodeTypeCreateComponent', () => {
  let component: CodeTypeCreateComponent;
  let fixture: ComponentFixture<CodeTypeCreateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CodeTypeCreateComponent, HttpClientTestingModule],
    });
    fixture = TestBed.createComponent(CodeTypeCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
