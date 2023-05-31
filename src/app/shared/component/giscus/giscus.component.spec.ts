import { ThemeService } from './../../service/theme.service';
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { GiscusComponent } from './giscus.component';
import { NavigationEnd, NavigationStart } from '@angular/router';
import { of } from 'rxjs';
import { signal } from '@angular/core';

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

  it('測試 Init NavigationStart', fakeAsync(() => {
    component.elementRef.nativeElement.innerHTML = '';
    spyOnProperty(component.router, 'events', 'get').and.returnValue(
      of(new NavigationStart(1, '')),
    );
    component.ngOnInit();
    tick();
    expect(component.elementRef.nativeElement.innerHTML).toBe('');
  }));

  it('測試 Init NavigationEnd', fakeAsync(() => {
    component.elementRef.nativeElement.innerHTML = '';
    spyOnProperty(component.router, 'events', 'get').and.returnValue(
      of(new NavigationEnd(1, '', '')),
    );
    component.ngOnInit();
    tick();
    expect(component.elementRef.nativeElement.querySelector('script')).toBeTruthy();
  }));

  it('測試 Server Mode 阻擋', fakeAsync(() => {
    component.elementRef.nativeElement.innerHTML = '';
    spyOnProperty(component.deviceSrv, 'isClient', 'get').and.returnValue(false);
    component.generateComment();
    tick();
    expect(component.elementRef.nativeElement.querySelector('script')).toBe(null);
  }));
});

describe('GiscusComponent DarkMode', () => {
  let component: GiscusComponent;
  let fixture: ComponentFixture<GiscusComponent>;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [GiscusComponent],
      providers: [
        {
          provide: ThemeService,
          useFactory: () => {
            return {
              darkMode: signal(true),
            };
          },
        },
      ],
    });
    fixture = TestBed.createComponent(GiscusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  it('測試 DarkComment', fakeAsync(() => {
    component.elementRef.nativeElement.innerHTML = '';
    component.generateComment();
    tick();
    expect(component.elementRef.nativeElement.querySelector('script')).toBeTruthy();
    component.darkMode$.subscribe(isDarkMode => expect(isDarkMode).toBe(true));
  }));
});
