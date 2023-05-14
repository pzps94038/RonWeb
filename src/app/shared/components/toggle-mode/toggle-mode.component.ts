import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { heroMoon, heroSun } from '@ng-icons/heroicons/outline';
import { SharedService } from '../../service/shared.service';

@Component({
  selector: 'app-toggle-mode',
  standalone: true,
  imports: [CommonModule, NgIconComponent],
  providers: [provideIcons({ heroMoon, heroSun })],
  templateUrl: './toggle-mode.component.html',
  styleUrls: ['./toggle-mode.component.scss'],
})
export class ToggleModeComponent implements OnInit {
  sharedSrv = inject(SharedService);
  dark = signal(false);

  ngOnInit(): void {
    this.dark.set(this.sharedSrv.darkMode());
  }

  toggleTheme() {
    this.dark.set(!this.dark());
    this.sharedSrv.toggleTheme(this.dark());
  }
}
