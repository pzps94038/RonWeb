import { Subject, take, filter, map, catchError } from 'rxjs';
import { UploadFile } from '../api/upload/upload.model';
import { UploadService } from '../api/upload/upload.service';
import { UploadAdapter } from '../component/form/editor/editor.component';
import { ApiService } from './api.service';

export class ArticleAdapter implements UploadAdapter {
  // 當前上傳完成檔案
  file = new Subject<UploadFile>();
  loader: any;
  constructor(private uploadSrv: UploadService, private apiSrv: ApiService) {}

  upload() {
    return this.loader.file.then(
      (file: any) =>
        new Promise((resolve, reject) => {
          const formData = new FormData();
          formData.append('file', file);
          this.uploadSrv
            .uploadArticleFile(formData)
            .pipe(
              take(1),
              filter(res => {
                if (this.apiSrv.ifSuccess(res)) {
                  return true;
                } else {
                  reject(res.returnMessage);
                  return false;
                }
              }),
              map(({ data }) => data),
              catchError(err => {
                reject(err);
                throw err;
              }),
            )
            .subscribe(data => {
              this.file.next(data);
              const { url } = data;
              resolve({ default: url });
            });
        }),
    );
  }
}

export class ProjectExperienceAdapter implements UploadAdapter {
  // 當前上傳完成檔案
  file = new Subject<UploadFile>();
  loader: any;
  constructor(private uploadSrv: UploadService, private apiSrv: ApiService) {}

  upload() {
    return this.loader.file.then(
      (file: any) =>
        new Promise((resolve, reject) => {
          const formData = new FormData();
          formData.append('file', file);
          this.uploadSrv
            .uploadProjectExperienceFile(formData)
            .pipe(
              take(1),
              filter(res => {
                if (this.apiSrv.ifSuccess(res)) {
                  return true;
                } else {
                  reject(res.returnMessage);
                  return false;
                }
              }),
              map(({ data }) => data),
              catchError(err => {
                reject(err);
                throw err;
              }),
            )
            .subscribe(data => {
              this.file.next(data);
              const { url } = data;
              resolve({ default: url });
            });
        }),
    );
  }
}
