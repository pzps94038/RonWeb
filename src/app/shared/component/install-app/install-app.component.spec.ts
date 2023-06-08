import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { InstallAppComponent } from './install-app.component';

describe('InstallAppComponent', () => {
  let component: InstallAppComponent;
  let fixture: ComponentFixture<InstallAppComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [InstallAppComponent],
    });
    fixture = TestBed.createComponent(InstallAppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('測試偵測pwa', fakeAsync(() => {
    spyOnProperty(
      window.matchMedia('(display-mode: standalone)'),
      'matches',
      'get',
    ).and.returnValue(false);
    const mockNavigator = {
      serviceWorker: true,
    };
    const mockWindow = {
      PushManager: true,
    };
    Object.defineProperty(window.navigator, 'serviceWorker', {
      value: mockNavigator.serviceWorker,
    });
    Object.defineProperty(window, 'PushManager', {
      value: mockWindow.PushManager,
    });
    window.dispatchEvent(new Event('beforeinstallprompt'));
    tick();
    expect(component.show()).toBe(true);
  }));

  it('測試安裝pwa', fakeAsync(async () => {
    component.show.set(true);
    component.deferredPrompt = {
      prompt: () => undefined,
      userChoice: new Promise(resolve =>
        resolve({
          outcome: 'accepted',
        }),
      ),
    };
    await component.install();
    tick();
    expect(component.show()).toBe(false);
  }));
});
