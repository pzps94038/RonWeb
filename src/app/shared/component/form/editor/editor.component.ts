import { Component, DestroyRef, EventEmitter, Input, Output, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import * as editor from './ckeditor';
import { CustomEditor } from './ckeditor';
import { SharedService } from 'src/app/shared/service/shared.service';
import { BasicComponent, CONTROL_VALUE_ACCESSOR } from '../base/base.component';
import { FormsModule } from '@angular/forms';
import { type Editor } from '@ckeditor/ckeditor5-core';
import { UploadService } from 'src/app/shared/api/upload/upload.service';
import { Subject, catchError, filter, map, take } from 'rxjs';
import { UploadFile } from 'src/app/shared/api/upload/upload.model';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
@Component({
  selector: 'app-editor',
  standalone: true,
  imports: [CommonModule, CKEditorModule, FormsModule],
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss'],
  providers: [CONTROL_VALUE_ACCESSOR(EditorComponent)],
})
export class EditorComponent extends BasicComponent {
  editor = signal<CustomEditor>(editor as unknown as CustomEditor);
  uploadSrv = inject(UploadService);
  sharedSrv = inject(SharedService);
  @Input() uploadUrl?: string;
  @Output('upload') upload = new EventEmitter<UploadFile>();
  private _destroyRef = inject(DestroyRef);

  onReady(editor: Editor) {
    editor.plugins.get('FileRepository').createUploadAdapter = loader => {
      const adapter = new UploadAdapter(this.uploadSrv, this.sharedSrv, loader);
      adapter.file.pipe(takeUntilDestroyed(this._destroyRef)).subscribe(file => {
        this.upload.emit(file);
      });
      return adapter;
    };
  }
}
export class UploadAdapter {
  // 當前上傳完成檔案
  file = new Subject<UploadFile>();
  constructor(
    private uploadSrv: UploadService,
    private sharedSrv: SharedService,
    private loader: any,
  ) {}

  upload() {
    return this.loader.file.then(
      (file: any) =>
        new Promise((resolve, reject) => {
          const formData = new FormData();
          formData.append('file', file);
          this.uploadSrv
            .upload(formData)
            .pipe(
              take(1),
              filter(res => {
                if (this.sharedSrv.ifSuccess(res)) {
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
