import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { ToggleModeComponent } from './shared/component/toggle-mode/toggle-mode.component';
import { HeaderComponent } from './shared/component/header/header.component';
import { ActionFabComponent } from './shared/component/action-fab/action-fab.component';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  imports: [CommonModule, RouterOutlet, ToggleModeComponent, HeaderComponent, ActionFabComponent],
})
export class AppComponent {}
