import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisqusComponent } from './disqus.component';

describe('DisqusComponent', () => {
  let component: DisqusComponent;
  let fixture: ComponentFixture<DisqusComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [DisqusComponent],
    });
    fixture = TestBed.createComponent(DisqusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
