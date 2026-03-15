import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { GetProjectExperienceListResponse } from './project-experience.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ProjectExperienceService {
  http = inject(HttpClient);

  /**
   * 取得公開的專案經歷列表
   * @returns Observable<GetProjectExperienceListResponse> 專案經歷列表回應
   */
  getProjectExperiences() {
    return this.http.get<GetProjectExperienceListResponse>(
      `${environment.baseUrl}/projectExperience`,
    );
  }
}
