import { RouterTestingModule } from '@angular/router/testing';
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HeaderComponent } from './header.component';
import { delay, of } from 'rxjs';
import { NavigationEnd, NavigationStart } from '@angular/router';

describe('HeaderComponent - 導航列元件', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeaderComponent, RouterTestingModule],
    }).compileComponents();

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('應建立元件', () => {
    expect(component).toBeTruthy();
  });

  it('導航列包含正確連結', () => {
    expect(component.links.length).toBe(2);
    expect(component.links[0].name).toBe('文章');
    expect(component.links[1].name).toBe('關於我');
  });

  it('NavigationStart 時顯示載入進度', fakeAsync(() => {
    spyOnProperty(component.router, 'events').and.returnValue(of(new NavigationStart(1, '')));
    component.ngOnInit();
    tick();
    expect(component.progressLoading()).toBe(true);
  }));

  it('NavigationEnd 時隱藏載入進度', fakeAsync(() => {
    component.progressLoading.set(true);
    spyOnProperty(component.router, 'events').and.returnValue(
      of(new NavigationEnd(1, '', '')).pipe(delay(100)),
    );
    component.ngOnInit();
    tick(200);
    expect(component.progressLoading()).toBe(false);
  }));

  it('toggleMobileMenu 切換選單狀態', () => {
    expect(component.mobileMenuOpen()).toBe(false);
    component.toggleMobileMenu();
    expect(component.mobileMenuOpen()).toBe(true);
    component.toggleMobileMenu();
    expect(component.mobileMenuOpen()).toBe(false);
  });

  it('toggleTheme 切換主題', () => {
    const spy = spyOn(component.themeSrv, 'toggleTheme');
    const currentDarkMode = component.themeSrv.darkMode();
    component.toggleTheme();
    expect(spy).toHaveBeenCalledWith(!currentDarkMode);
  });

  it('NavigationStart 時關閉行動選單', fakeAsync(() => {
    component.mobileMenuOpen.set(true);
    spyOnProperty(component.router, 'events').and.returnValue(of(new NavigationStart(1, '')));
    component.ngOnInit();
    tick();
    expect(component.mobileMenuOpen()).toBe(false);
  }));
});
