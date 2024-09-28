import {
  Component,
  DestroyRef,
  EventEmitter,
  Input,
  Output,
  inject,
  signal,
  ChangeDetectionStrategy,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import * as editor from './ckeditor';
import { CustomEditor } from './ckeditor';
import { BasicComponent, CONTROL_VALUE_ACCESSOR } from '../base/base.component';
import { FormsModule } from '@angular/forms';
import { type Editor } from '@ckeditor/ckeditor5-core';
import { UploadService } from 'src/app/shared/api/upload/upload.service';
import { Subject, catchError, filter, map, take } from 'rxjs';
import { UploadFile } from 'src/app/shared/api/upload/upload.model';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ApiService } from 'src/app/shared/service/api.service';
export interface UploadAdapter {
  loader: any;
  file: Subject<UploadFile>;
  upload: () => Promise<any>;
}

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
  apiSrv = inject(ApiService);
  @Input({ required: true }) adapter!: UploadAdapter;
  @Output('upload') upload = new EventEmitter<UploadFile>();
  private _destroyRef = inject(DestroyRef);

  onReady(editor: Editor) {
    const self = this;
    editor.plugins.get('FileRepository').createUploadAdapter = loader => {
      const adapter = self.adapter;
      adapter.loader = loader;
      adapter.file.pipe(takeUntilDestroyed(this._destroyRef)).subscribe(file => {
        this.upload.emit(file);
      });
      return adapter;
    };
  }
}
