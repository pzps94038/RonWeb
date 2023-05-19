import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GiscusComponent } from './giscus.component';

describe('GiscusComponent', () => {
  let component: GiscusComponent;
  let fixture: ComponentFixture<GiscusComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [GiscusComponent],
    });
    fixture = TestBed.createComponent(GiscusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
