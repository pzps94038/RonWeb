import { Component } from '@angular/core';
import { IntroComponent } from './intro/intro.component';
import { SkillsComponent } from './skills/skills.component';
import { FooterComponent } from '../shared/component/footer/footer.component';

/**
 * 關於我頁面主元件
 * 整合個人介紹與技能子元件
 */
@Component({
  selector: 'app-about-me',
  standalone: true,
  imports: [IntroComponent, SkillsComponent, FooterComponent],
  templateUrl: './about-me.component.html',
  styleUrls: ['./about-me.component.scss'],
})
export class AboutMeComponent {}
