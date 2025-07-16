import { EllipsisPipe } from './../../shared/pipe/ellipsis.pipe';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticleComponent } from './article.component';

describe('ArticleComponent', () => {
  let component: ArticleComponent;
  let fixture: ComponentFixture<ArticleComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ArticleComponent, HttpClientTestingModule, RouterTestingModule],
      providers: [EllipsisPipe],
    });
    fixture = TestBed.createComponent(ArticleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should setup lightbox for images in .ck-content', () => {
    // Mock the server check to return false (client side)
    spyOnProperty(component.deviceSrv, 'isServer', 'get').and.returnValue(false);
    
    // Create a mock image element
    const mockImg = document.createElement('img');
    mockImg.src = 'test.jpg';
    mockImg.alt = 'Test image';
    
    // Create a mock container with .ck-content class
    const mockContainer = document.createElement('div');
    mockContainer.className = 'ck-content';
    mockContainer.appendChild(mockImg);
    
    // Add to component's element
    component.el.nativeElement.appendChild(mockContainer);
    
    // Spy on lightbox.open method
    spyOn(component.lightbox, 'open');
    
    // Call setupImageLightbox
    component['setupImageLightbox']();
    
    // Simulate clicking the image
    mockImg.click();
    
    // Verify lightbox was called with the full URL (DOM resolves relative URLs)
    expect(component.lightbox.open).toHaveBeenCalledWith([{
      src: mockImg.src, // This will be the full URL
      caption: 'Test image',
      thumb: mockImg.src
    }], 0);
  });
});
