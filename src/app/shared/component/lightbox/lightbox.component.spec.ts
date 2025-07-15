import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DialogRef } from '@ngneat/dialog';
import { LightboxComponent, LightboxData } from './lightbox.component';

describe('LightboxComponent', () => {
  let component: LightboxComponent;
  let fixture: ComponentFixture<LightboxComponent>;
  let mockDialogRef: jasmine.SpyObj<DialogRef<LightboxData>>;

  beforeEach(() => {
    const spy = jasmine.createSpyObj('DialogRef', ['close']);
    spy.data = {
      images: ['image1.jpg', 'image2.jpg'],
      currentIndex: 0
    };

    TestBed.configureTestingModule({
      imports: [LightboxComponent],
      providers: [
        { provide: DialogRef, useValue: spy }
      ]
    });

    fixture = TestBed.createComponent(LightboxComponent);
    component = fixture.componentInstance;
    mockDialogRef = TestBed.inject(DialogRef) as jasmine.SpyObj<DialogRef<LightboxData>>;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with data from DialogRef', () => {
    component.ngOnInit();
    expect(component.images()).toEqual(['image1.jpg', 'image2.jpg']);
    expect(component.currentIndex()).toBe(0);
  });

  it('should close when close() is called', () => {
    component.close();
    expect(mockDialogRef.close).toHaveBeenCalled();
  });

  it('should navigate to next image', () => {
    component.ngOnInit();
    component.next();
    expect(component.currentIndex()).toBe(1);
  });

  it('should navigate to previous image', () => {
    component.ngOnInit();
    component.currentIndex.set(1);
    component.previous();
    expect(component.currentIndex()).toBe(0);
  });

  it('should wrap to last image when going previous from first', () => {
    component.ngOnInit();
    component.previous();
    expect(component.currentIndex()).toBe(1);
  });

  it('should wrap to first image when going next from last', () => {
    component.ngOnInit();
    component.currentIndex.set(1);
    component.next();
    expect(component.currentIndex()).toBe(0);
  });
});