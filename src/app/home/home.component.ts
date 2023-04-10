import { HeaderComponent } from './../shared/components/header/header.component';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BannerComponent } from '../shared/components/banner/banner.component';
import { AboutComponent } from '../shared/components/about/about.component';
import { ServicesComponent } from '../shared/components/services/services.component';
import { WorkComponent } from '../shared/components/work/work.component';
import { ContactComponent } from '../shared/components/contact/contact.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    HeaderComponent,
    BannerComponent,
    AboutComponent,
    ServicesComponent,
    WorkComponent,
    ContactComponent,
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {}
