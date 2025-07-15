import { Injectable, inject } from '@angular/core';
import { DialogService } from '@ngneat/dialog';
import { LightboxComponent } from '../component/lightbox/lightbox.component';
import { LightboxData } from '../model/lightbox.model';

@Injectable({
  providedIn: 'root'
})
export class LightboxService {
  private dialogService = inject(DialogService);

  /**
   * Open lightbox with images
   * @param images Array of image URLs
   * @param currentIndex Current image index to display
   */
  open(images: string[], currentIndex: number = 0) {
    const data: LightboxData = {
      images,
      currentIndex
    };

    return this.dialogService.open(LightboxComponent, {
      data,
      enableClose: true,
      closeButton: false,
      backdrop: false
    });
  }

  /**
   * Open lightbox with single image
   * @param imageUrl Single image URL
   */
  openSingle(imageUrl: string) {
    return this.open([imageUrl], 0);
  }
}