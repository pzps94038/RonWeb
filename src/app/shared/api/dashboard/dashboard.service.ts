import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { GetDashboardResponse } from './dashboard.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  http = inject(HttpClient);

  /**
   * 取得儀表板統計資料
   * @returns Observable<GetDashboardResponse> 儀表板統計資料回應
   */
  getDashboard() {
    return this.http.get<GetDashboardResponse>(`${environment.baseUrl}/dashboard`);
  }
}
