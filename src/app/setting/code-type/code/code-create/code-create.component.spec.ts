import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CodeCreateComponent } from './code-create.component';

describe('CodeCreateComponent', () => {
  let component: CodeCreateComponent;
  let fixture: ComponentFixture<CodeCreateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CodeCreateComponent, HttpClientTestingModule],
    });
    fixture = TestBed.createComponent(CodeCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
