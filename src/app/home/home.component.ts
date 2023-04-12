import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { HeaderComponent } from './header/header.component';
import { ServicesComponent } from './services/services.component';
import { WorkComponent } from './work/work.component';
import { NgTypedComponent } from '../shared/components/ng-typed/ng-typed.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    HeaderComponent,
    AboutComponent,
    ServicesComponent,
    WorkComponent,
    ContactComponent,
    NgTypedComponent,
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  options = {
    strings: ['Web Full-stack Develope'],
    typeSpeed: 100,
    loop: true,
  };
}
