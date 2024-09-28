import { Injectable, inject } from '@angular/core';
import { UploadAdapter } from '../component/form/editor/editor.component';
import { UploadService } from '../api/upload/upload.service';
import { ApiService } from './api.service';
import { ArticleAdapter, ProjectExperienceAdapter } from './upload-adapter.model';

@Injectable({
  providedIn: 'root',
})
export class UploadAdapterService {
  uploadSrv = inject(UploadService);
  apiSrv = inject(ApiService);

  createArticleAdapter() {
    return new ArticleAdapter(this.uploadSrv, this.apiSrv) as UploadAdapter;
  }

  createProjectExperienceAdapter() {
    return new ProjectExperienceAdapter(this.uploadSrv, this.apiSrv) as UploadAdapter;
  }
}
