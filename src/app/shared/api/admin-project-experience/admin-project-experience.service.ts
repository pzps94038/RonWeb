import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import {
  CreateProjectExperienceRequest,
  GetProjectExperienceByIdResponse,
  GetProjectExperienceResponse,
  UpdateProjectExperienceRequest,
} from './admin-project-experience.model';
import { environment } from 'src/environments/environment';
import { BaseMessageResponse } from '../shared/shared.model';

@Injectable({
  providedIn: 'root',
})
export class AdminProjectExperienceService {
  http = inject(HttpClient);

  /**
   * 取得專案經歷列表
   * @param page
   * @returns
   */
  getProjectExperience(page?: number) {
    let params = new HttpParams();
    if (page) {
      params = params.append('page', page);
    }
    return this.http.get<GetProjectExperienceResponse>(
      `${environment.baseUrl}/adminProjectExperience`,
      {
        params,
      },
    );
  }

  /**
   * 取得專案經歷
   * @param id
   * @returns
   */
  getProjectExperienceById(id: number) {
    return this.http.get<GetProjectExperienceByIdResponse>(
      `${environment.baseUrl}/adminProjectExperience/${id}`,
    );
  }

  /**
   * 創建專案經歷
   * @param data
   * @returns
   */
  createProjectExperience(data: CreateProjectExperienceRequest) {
    return this.http.post<BaseMessageResponse>(
      `${environment.baseUrl}/adminProjectExperience`,
      data,
    );
  }

  /**
   * 更新專案經歷
   * @param data
   * @returns
   */
  updateProjectExperience(data: UpdateProjectExperienceRequest) {
    return this.http.patch<BaseMessageResponse>(
      `${environment.baseUrl}/adminProjectExperience/${data.projectExperienceId}`,
      data,
    );
  }

  /**
   * 刪除專案經歷
   * @param id
   * @returns
   */
  deleteProjectExperience(id: number) {
    return this.http.delete<BaseMessageResponse>(
      `${environment.baseUrl}/adminProjectExperience/${id}`,
    );
  }
}
