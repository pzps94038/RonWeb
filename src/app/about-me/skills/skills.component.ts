import { ChangeDetectionStrategy, Component } from '@angular/core';

/**
 * 技能分類資料介面
 */
interface SkillCategory {
  /** 分類名稱 */
  category: string;
  /** 該分類下的技能列表 */
  items: string[];
}

/**
 * 技能展示區塊元件
 * 以分類網格方式呈現開發者的技術技能
 */
@Component({
  selector: 'app-skills',
  standalone: true,
  imports: [],
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SkillsComponent {
  /** 技能分類靜態資料 */
  skillCategories: SkillCategory[] = [
    {
      category: '前端',
      items: ['Angular', 'TypeScript', 'JavaScript', 'HTML5', 'CSS3', 'RxJS', 'TailwindCSS'],
    },
    {
      category: '後端',
      items: ['C#', '.NET Core', 'Node.js'],
    },
    {
      category: '資料庫',
      items: ['SQL Server', 'MySQL', 'PostgreSQL', 'Redis'],
    },
    {
      category: 'DevOps',
      items: ['Docker', 'Git', 'GitHub Actions', 'Nginx', 'IIS'],
    },
    {
      category: '雲端',
      items: ['AWS EC2'],
    },
  ];
}
