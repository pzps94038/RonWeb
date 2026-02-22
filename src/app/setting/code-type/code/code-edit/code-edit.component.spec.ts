import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CodeEditComponent } from './code-edit.component';

describe('CodeEditComponent', () => {
  let component: CodeEditComponent;
  let fixture: ComponentFixture<CodeEditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CodeEditComponent, HttpClientTestingModule, RouterTestingModule],
    });
    fixture = TestBed.createComponent(CodeEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
