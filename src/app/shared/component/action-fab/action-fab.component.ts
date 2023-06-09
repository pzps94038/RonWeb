import { Component, Renderer2, inject, signal, ChangeDetectionStrategy } from '@angular/core';
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
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ActionFabComponent {
  open = signal<boolean>(false);
  render = inject(Renderer2);

  toggleMenu(mode: boolean) {
    this.open.set(mode);
  }
}
