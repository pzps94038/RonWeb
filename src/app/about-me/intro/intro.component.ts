import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { featherGithub } from '@ng-icons/feather-icons';

/**
 * 個人介紹區塊元件
 * 顯示開發者名稱、身份、簡短自我介紹及 GitHub 連結
 */
@Component({
  selector: 'app-intro',
  standalone: true,
  imports: [NgIconComponent],
  providers: [provideIcons({ featherGithub })],
  templateUrl: './intro.component.html',
  styleUrls: ['./intro.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IntroComponent {}
