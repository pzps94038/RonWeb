import { Component, Input, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import * as Editor from './ckeditor';
import { CustomEditor } from './ckeditor';
import { SharedService } from 'src/app/shared/service/shared.service';
import { environment } from 'src/environments/environment';
import { BasicComponent, CONTROL_VALUE_ACCESSOR } from '../base/base.component';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-editor',
  standalone: true,
  imports: [CommonModule, CKEditorModule, FormsModule],
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss'],
  providers: [CONTROL_VALUE_ACCESSOR(EditorComponent)],
})
export class EditorComponent extends BasicComponent {
  editor = signal<CustomEditor>(Editor as unknown as CustomEditor);
  sharedSrv = inject(SharedService);
  @Input() uploadUrl?: string;
  config = {
    simpleUpload: {
      uploadUrl: `${environment.baseUrl}/api/upload`,
      withCredentials: true,
      headers: {
        'X-CSRF-TOKEN': 'CSRF-Token',
        Authorization: `Bearer ${this.sharedSrv.getToken()?.accessToken ?? ''}`,
      },
    },
  };
}
