import { RouterTestingModule } from '@angular/router/testing';
import { TestBed, ComponentFixture } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { HeaderComponent } from './shared/component/header/header.component';
import { ActionFabComponent } from './shared/component/action-fab/action-fab.component';
import { Component } from '@angular/core';
import { By } from '@angular/platform-browser';

@Component({
  selector: 'app-header',
  template: '<div>Header</div>',
  standalone: true,
})
class MockHeaderComponent {}

@Component({
  selector: 'app-action-fab',
  template: '<div>Action Fab</div>',
  standalone: true,
})
class MockActionFabComponent {}

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let component: AppComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
    })
    .overrideComponent(AppComponent, {
      remove: {
        imports: [HeaderComponent, ActionFabComponent],
      },
      add: {
        imports: [MockHeaderComponent, MockActionFabComponent],
      },
    });
    
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('should render header component', () => {
    fixture.detectChanges();
    const headerElement = fixture.debugElement.query(By.css('app-header'));
    expect(headerElement).toBeTruthy();
  });

  it('should render router outlet', () => {
    fixture.detectChanges();
    const routerOutletElement = fixture.debugElement.query(By.css('router-outlet'));
    expect(routerOutletElement).toBeTruthy();
  });

  it('should render action fab component', () => {
    fixture.detectChanges();
    const actionFabElement = fixture.debugElement.query(By.css('app-action-fab'));
    expect(actionFabElement).toBeTruthy();
  });

  it('should have proper component structure', () => {
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('app-header')).toBeTruthy();
    expect(compiled.querySelector('router-outlet')).toBeTruthy();
    expect(compiled.querySelector('app-action-fab')).toBeTruthy();
  });
});
