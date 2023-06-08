import { Component, ElementRef, Renderer2, ViewChild, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToggleModeComponent } from '../toggle-mode/toggle-mode.component';
import { GoTopComponent } from '../go-top/go-top.component';
import { InstallAppComponent } from '../install-app/install-app.component';

@Component({
  selector: 'app-action-fab',
  standalone: true,
  templateUrl: './action-fab.component.html',
  styleUrls: ['./action-fab.component.scss'],
  imports: [CommonModule, ToggleModeComponent, GoTopComponent, InstallAppComponent],
})
export class ActionFabComponent {
  open = false;
  render = inject(Renderer2);
  toggleMenu() {
    this.open = !this.open;
  }
}
