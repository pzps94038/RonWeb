import { Component, Input, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import * as Editor from './ckeditor';
import { CustomEditor } from './ckeditor';
import { SharedService } from 'src/app/shared/service/shared.service';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-editor',
  standalone: true,
  imports: [CommonModule, CKEditorModule],
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss'],
})
export class EditorComponent {
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
