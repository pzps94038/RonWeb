import { TestBed } from '@angular/core/testing';
import { DialogService } from '@ngneat/dialog';
import { LightboxService } from './lightbox.service';

describe('LightboxService', () => {
  let service: LightboxService;
  let mockDialogService: jasmine.SpyObj<DialogService>;

  beforeEach(() => {
    const spy = jasmine.createSpyObj('DialogService', ['open']);

    TestBed.configureTestingModule({
      providers: [
        { provide: DialogService, useValue: spy }
      ]
    });

    service = TestBed.inject(LightboxService);
    mockDialogService = TestBed.inject(DialogService) as jasmine.SpyObj<DialogService>;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should open lightbox with multiple images', () => {
    const images = ['image1.jpg', 'image2.jpg'];
    const currentIndex = 1;

    service.open(images, currentIndex);

    expect(mockDialogService.open).toHaveBeenCalledWith(jasmine.any(Function), {
      data: { images, currentIndex },
      enableClose: true,
      closeButton: false,
      backdrop: false
    });
  });

  it('should open lightbox with single image', () => {
    const imageUrl = 'single-image.jpg';

    service.openSingle(imageUrl);

    expect(mockDialogService.open).toHaveBeenCalledWith(jasmine.any(Function), {
      data: { images: [imageUrl], currentIndex: 0 },
      enableClose: true,
      closeButton: false,
      backdrop: false
    });
  });
});