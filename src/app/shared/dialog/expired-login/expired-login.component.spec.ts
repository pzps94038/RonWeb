import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DialogRef } from '@ngneat/dialog';

import { ExpiredLoginComponent } from './expired-login.component';

describe('ExpiredLoginComponent', () => {
  let component: ExpiredLoginComponent;
  let fixture: ComponentFixture<ExpiredLoginComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ExpiredLoginComponent, HttpClientTestingModule],
      providers: [DialogRef],
    });
    fixture = TestBed.createComponent(ExpiredLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
