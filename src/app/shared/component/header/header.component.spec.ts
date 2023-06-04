import { RouterTestingModule } from '@angular/router/testing';
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HeaderComponent } from './header.component';
import { delay, of } from 'rxjs';
import { NavigationEnd, NavigationStart } from '@angular/router';

describe('HeaderComponent', () => {
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

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('測試初始化  NavigationStart', fakeAsync(() => {
    spyOnProperty(component.router, 'events').and.returnValue(of(new NavigationStart(1, '')));
    component.ngOnInit();
    tick();
    expect(component.progressLoading()).toBe(true);
  }));

  it('測試初始化  NavigationEnd', fakeAsync(() => {
    component.progressLoading.set(true);
    spyOnProperty(component.router, 'events').and.returnValue(
      of(new NavigationEnd(1, '', '')).pipe(delay(100)),
    );
    component.ngOnInit();
    tick(200);
    expect(component.progressLoading()).toBe(false);
  }));

  it('測試ngAfterViewInit Scroll', fakeAsync(() => {
    spyOnProperty(window, 'scrollY', 'get').and.returnValue(0);
    component.ngAfterViewInit();
    window.dispatchEvent(new Event('scroll'));
    expect(component.header?.nativeElement.classList).toContain('absolute');
  }));
});
