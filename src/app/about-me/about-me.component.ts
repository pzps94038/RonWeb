import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { IntroComponent } from './intro/intro.component';
import { ContactComponent } from './contact/contact.component';
import { HeaderComponent } from '../shared/components/header/header.component';
import { NgTypedComponent } from '../shared/components/ng-typed/ng-typed.component';
import { SkillsComponent } from './skills/skills.component';
import { ExperienceComponent } from './experience/experience.component';

@Component({
  selector: 'app-about-me',
  standalone: true,
  imports: [
    CommonModule,
    IntroComponent,
    SkillsComponent,
    ExperienceComponent,
    ContactComponent,
    NgTypedComponent,
  ],
  templateUrl: './about-me.component.html',
  styleUrls: ['./about-me.component.scss'],
})
export class AboutMeComponent {
  options = {
    strings: ['Web Full-stack Develope'],
    typeSpeed: 100,
    loop: true,
  };
}
