import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { CodeTypeDetailComponent } from './code-type-detail.component';
import { ParamMap, ActivatedRoute } from '@angular/router';
import { of, Observable, throwError } from 'rxjs';

describe('CodeTypeDetailComponent', () => {
  let component: CodeTypeDetailComponent;
  let fixture: ComponentFixture<CodeTypeDetailComponent>;
  const fakePage = '1';
  const queryParamMap = of({
    get: (key: string) => fakePage,
  }) as Observable<ParamMap>;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CodeTypeDetailComponent, HttpClientTestingModule, RouterTestingModule],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            queryParamMap,
          } as ActivatedRoute,
        },
      ],
    });
    fixture = TestBed.createComponent(CodeTypeDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
