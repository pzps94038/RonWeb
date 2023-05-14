import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../shared/components/header/header.component';
import { FooterComponent } from '../shared/components/footer/footer.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-setting',
  standalone: true,
  imports: [CommonModule, HeaderComponent, FooterComponent, RouterOutlet],
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.scss'],
})
export class SettingComponent {}
