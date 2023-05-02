import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScrollAnimateDirective } from 'src/app/shared/directive/scroll-animate.directive';

@Component({
  selector: 'app-experience',
  standalone: true,
  imports: [CommonModule, ScrollAnimateDirective],
  templateUrl: './experience.component.html',
  styleUrls: ['./experience.component.scss'],
})
export class ExperienceComponent {}
