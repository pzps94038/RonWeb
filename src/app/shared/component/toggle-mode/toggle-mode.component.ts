import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { heroMoon, heroSun } from '@ng-icons/heroicons/outline';
import { ThemeService } from '../../service/theme.service';

@Component({
  selector: 'app-toggle-mode',
  standalone: true,
  imports: [CommonModule, NgIconComponent],
  providers: [provideIcons({ heroMoon, heroSun })],
  templateUrl: './toggle-mode.component.html',
  styleUrls: ['./toggle-mode.component.scss'],
})
export class ToggleModeComponent implements OnInit {
  themeSrv = inject(ThemeService);
  dark = signal(false);

  ngOnInit(): void {
    this.dark.set(this.themeSrv.darkMode());
  }

  toggleTheme() {
    this.dark.set(!this.dark());
    this.themeSrv.toggleTheme(this.dark());
  }
}
