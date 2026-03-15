import {
  Component,
  DestroyRef,
  OnInit,
  inject,
  signal,
  ChangeDetectionStrategy,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationEnd, NavigationStart, Router, RouterModule } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { filter } from 'rxjs';

/**
 * 導航連結項目
 */
export type NavLink = {
  name: string;
  value: string;
};

/**
 * 頂部導航列元件
 * 提供簡潔的開發者風格導航，Warm Amber 色系固定深色主題。
 */
@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent implements OnInit {
  router = inject(Router);
  progressLoading = signal(false);
  mobileMenuOpen = signal(false);
  links: NavLink[] = [
    { name: '文章', value: '/blog' },
    { name: '關於我', value: '/about-me' },
  ];
  private _destroyRef = inject(DestroyRef);

  ngOnInit() {
    this.router.events
      .pipe(
        filter(event => event instanceof NavigationStart),
        takeUntilDestroyed(this._destroyRef),
      )
      .subscribe(() => {
        this.progressLoading.set(true);
        this.mobileMenuOpen.set(false);
      });
    this.router.events
      .pipe(
        filter(event => event instanceof NavigationEnd),
        takeUntilDestroyed(this._destroyRef),
      )
      .subscribe(() => {
        this.progressLoading.set(false);
      });
  }

  /**
   * 切換行動裝置選單
   */
  toggleMobileMenu() {
    this.mobileMenuOpen.set(!this.mobileMenuOpen());
  }
}
