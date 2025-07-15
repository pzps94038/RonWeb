import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogRef } from '@ngneat/dialog';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { heroXMark, heroChevronLeft, heroChevronRight } from '@ng-icons/heroicons/outline';
import { LightboxData } from '../../model/lightbox.model';

@Component({
  selector: 'app-lightbox',
  standalone: true,
  imports: [CommonModule, NgIconComponent],
  providers: [provideIcons({ heroXMark, heroChevronLeft, heroChevronRight })],
  template: `
    <div class="fixed inset-0 bg-black/80 flex items-center justify-center z-50" 
         (click)="closeOnBackdrop($event)">
      <div class="relative max-w-7xl max-h-[90vh] w-full h-full flex items-center justify-center p-4">
        <!-- Close button -->
        <button
          class="absolute top-4 right-4 z-10 bg-black/50 hover:bg-black/70 rounded-full p-3 text-white transition-colors"
          (click)="close()"
          title="關閉">
          <ng-icon name="heroXMark" size="24" />
        </button>

        <!-- Previous button -->
        <button
          *ngIf="images().length > 1"
          class="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 bg-black/50 hover:bg-black/70 rounded-full p-3 text-white transition-colors"
          (click)="previous()"
          title="上一張">
          <ng-icon name="heroChevronLeft" size="24" />
        </button>

        <!-- Next button -->
        <button
          *ngIf="images().length > 1"
          class="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 bg-black/50 hover:bg-black/70 rounded-full p-3 text-white transition-colors"
          (click)="next()"
          title="下一張">
          <ng-icon name="heroChevronRight" size="24" />
        </button>

        <!-- Image -->
        <img
          [src]="currentImage()"
          [alt]="'圖片 ' + (currentIndex() + 1)"
          class="max-w-full max-h-full object-contain"
          (click)="$event.stopPropagation()"
        />

        <!-- Image counter -->
        <div
          *ngIf="images().length > 1"
          class="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/50 text-white px-4 py-2 rounded-full text-sm">
          {{ currentIndex() + 1 }} / {{ images().length }}
        </div>
      </div>
    </div>
  `,
  styles: [`
    :host {
      display: block;
    }
  `]
})
export class LightboxComponent {
  private ref = inject(DialogRef<LightboxData>);
  
  images = signal<string[]>([]);
  currentIndex = signal(0);
  
  ngOnInit() {
    const data = this.ref.data;
    if (data) {
      this.images.set(data.images);
      this.currentIndex.set(data.currentIndex);
    }

    // Add keyboard event listeners
    document.addEventListener('keydown', this.handleKeydown.bind(this));
  }

  ngOnDestroy() {
    // Remove keyboard event listeners
    document.removeEventListener('keydown', this.handleKeydown.bind(this));
  }

  currentImage() {
    return this.images()[this.currentIndex()];
  }

  close() {
    this.ref.close();
  }

  previous() {
    const newIndex = this.currentIndex() - 1;
    if (newIndex >= 0) {
      this.currentIndex.set(newIndex);
    } else {
      this.currentIndex.set(this.images().length - 1);
    }
  }

  next() {
    const newIndex = this.currentIndex() + 1;
    if (newIndex < this.images().length) {
      this.currentIndex.set(newIndex);
    } else {
      this.currentIndex.set(0);
    }
  }

  closeOnBackdrop(event: Event) {
    if (event.target === event.currentTarget) {
      this.close();
    }
  }

  private handleKeydown(event: KeyboardEvent) {
    switch (event.key) {
      case 'Escape':
        this.close();
        break;
      case 'ArrowLeft':
        this.previous();
        break;
      case 'ArrowRight':
        this.next();
        break;
    }
  }
}