import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { ParamMap, ActivatedRoute } from '@angular/router';
import { of, Observable, throwError } from 'rxjs';
import { CodeDetailComponent } from './code-detail.component';

describe('CodeDetailComponent', () => {
  let component: CodeDetailComponent;
  let fixture: ComponentFixture<CodeDetailComponent>;
  const fakePage = '1';
  const queryParamMap = of({
    get: (key: string) => fakePage,
  }) as Observable<ParamMap>;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CodeDetailComponent, HttpClientTestingModule, RouterTestingModule],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            queryParamMap,
          } as ActivatedRoute,
        },
      ],
    });
    fixture = TestBed.createComponent(CodeDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
