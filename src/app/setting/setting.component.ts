import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from '../shared/component/footer/footer.component';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-setting',
  standalone: true,
  imports: [CommonModule, FooterComponent, RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.scss'],
})
export class SettingComponent {}
