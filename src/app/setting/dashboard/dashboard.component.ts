import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  PLATFORM_ID,
  inject,
  signal,
} from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { finalize } from 'rxjs';
import { BaseChartDirective } from 'ng2-charts';
import { ChartConfiguration } from 'chart.js';
import { DashboardService } from 'src/app/shared/api/dashboard/dashboard.service';
import { DashboardData } from 'src/app/shared/api/dashboard/dashboard.model';
import { ApiService } from 'src/app/shared/service/api.service';
import { ErrorComponent } from 'src/app/shared/component/error/error.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, BaseChartDirective, ErrorComponent],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardComponent {
  private dashboardSrv = inject(DashboardService);
  private apiSrv = inject(ApiService);
  private _destroyRef = inject(DestroyRef);
  private platformId = inject(PLATFORM_ID);

  /** 是否為瀏覽器環境 */
  isBrowser = isPlatformBrowser(this.platformId);

  isLoading = signal(false);
  isError = signal(false);
  dashboardData = signal<DashboardData | undefined>(undefined);

  /** 折線圖：文章發佈趨勢資料 */
  trendChartData: ChartConfiguration<'line'>['data'] = {
    labels: [],
    datasets: [],
  };

  /** 折線圖選項 */
  chartOptions: ChartConfiguration<'line'>['options'] = {
    responsive: true,
    plugins: {
      legend: { display: true },
    },
  };

  /** 環形圖：分類分佈資料 */
  categoryChartData: ChartConfiguration<'doughnut'>['data'] = {
    labels: [],
    datasets: [],
  };

  /** 環形圖選項 */
  doughnutOptions: ChartConfiguration<'doughnut'>['options'] = {
    responsive: true,
    plugins: {
      legend: { position: 'bottom' },
    },
  };

  ngOnInit() {
    this.loadDashboard();
  }

  /**
   * 載入儀表板資料並轉換圖表資料
   */
  private loadDashboard() {
    this.isError.set(false);
    this.isLoading.set(true);
    this.dashboardSrv
      .getDashboard()
      .pipe(
        finalize(() => this.isLoading.set(false)),
        takeUntilDestroyed(this._destroyRef),
      )
      .subscribe({
        next: res => {
          if (this.apiSrv.ifSuccess(res, false)) {
            this.dashboardData.set(res.data);
            this.buildTrendChart(res.data);
            this.buildCategoryChart(res.data);
          } else {
            this.isError.set(true);
          }
        },
        error: () => {
          this.isError.set(true);
        },
      });
  }

  /**
   * 將 monthlyArticleTrend 轉換為折線圖資料
   * @param data 儀表板資料
   */
  private buildTrendChart(data: DashboardData) {
    const trend = data.monthlyArticleTrend;
    this.trendChartData = {
      labels: trend.map(t => `${t.year}/${t.month}`),
      datasets: [
        {
          label: '文章數',
          data: trend.map(t => t.count),
          borderColor: '#3b82f6',
          backgroundColor: 'rgba(59, 130, 246, 0.1)',
          fill: true,
          tension: 0.3,
        },
      ],
    };
  }

  /**
   * 將 categoryDistribution 轉換為環形圖資料
   * @param data 儀表板資料
   */
  private buildCategoryChart(data: DashboardData) {
    const dist = data.categoryDistribution;
    this.categoryChartData = {
      labels: dist.map(d => d.categoryName),
      datasets: [
        {
          data: dist.map(d => d.articleCount),
          backgroundColor: [
            '#3b82f6',
            '#ef4444',
            '#10b981',
            '#f59e0b',
            '#8b5cf6',
            '#ec4899',
            '#06b6d4',
            '#84cc16',
            '#f97316',
            '#6366f1',
          ],
        },
      ],
    };
  }
}
