import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CodeTypeEditComponent } from './code-type-edit.component';

describe('CodeTypeEditComponent', () => {
  let component: CodeTypeEditComponent;
  let fixture: ComponentFixture<CodeTypeEditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CodeTypeEditComponent, HttpClientTestingModule, RouterTestingModule],
    });
    fixture = TestBed.createComponent(CodeTypeEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
