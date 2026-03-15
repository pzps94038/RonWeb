import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PROJECTS, ProjectItem } from 'src/app/shared/data/posts-index';
import { SafePipe } from 'src/app/shared/pipe/safe.pipe';

/**
 * 專案經歷區塊元件
 * 從 content/projects/*.md 生成的靜態資料呈現專案經歷
 */
@Component({
  selector: 'app-experience',
  standalone: true,
  imports: [CommonModule, SafePipe],
  templateUrl: './experience.component.html',
  styleUrls: ['./experience.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExperienceComponent {
  /** 專案經歷資料（從 .md 檔案生成） */
  projects: ProjectItem[] = PROJECTS;
}
