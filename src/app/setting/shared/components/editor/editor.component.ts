import { Component, Input, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import * as Editor from './ckeditor';
import { CustomEditor } from './ckeditor';
@Component({
  selector: 'app-editor',
  standalone: true,
  imports: [CommonModule, CKEditorModule],
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss'],
})
export class EditorComponent {
  editor = signal<CustomEditor>(Editor as unknown as CustomEditor);
  @Input() uploadUrl?: string;
  config = {
    simpleUpload: {
      // The URL that the images are uploaded to.
      uploadUrl: 'https://ron-web-api.herokuapp.com/api/Upload',

      // Enable the XMLHttpRequest.withCredentials property.
      withCredentials: true,

      // Headers sent along with the XMLHttpRequest to the upload server.
      headers: {
        'X-CSRF-TOKEN': 'CSRF-Token',
        Authorization: 'Bearer <JSON Web Token>',
      },
    },
  };
  constructor() {}
}
