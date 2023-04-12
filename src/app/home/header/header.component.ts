import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  /**
   * 滾到特定元素
   */
  scrollToElement(id: string) {
    const dom = document.getElementById(id) as HTMLDivElement | undefined;
    dom?.scrollIntoView({ behavior: 'smooth' });
  }

  /**
   * 滾動最上面
   */
  goToTop() {
    window.scroll({ top: 0, behavior: 'smooth' });
  }
}
