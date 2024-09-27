import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CodeCreateComponent } from './code-create.component';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { of, Observable } from 'rxjs';

describe('CodeCreateComponent', () => {
  let component: CodeCreateComponent;
  let fixture: ComponentFixture<CodeCreateComponent>;
  const paramMap = of({
    get: (key: string) => 'code-type-id',
  }) as Observable<ParamMap>;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CodeCreateComponent, HttpClientTestingModule],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            paramMap,
          } as ActivatedRoute,
        },
      ],
    });
    fixture = TestBed.createComponent(CodeCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
