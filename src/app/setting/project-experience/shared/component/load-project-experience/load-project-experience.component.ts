import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-load-project-experience',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './load-project-experience.component.html',
  styleUrls: ['./load-project-experience.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoadProjectExperienceComponent {}
