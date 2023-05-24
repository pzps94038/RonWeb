/**
 * @license Copyright (c) 2003-2023, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */
import ClassicEditorBase from '@ckeditor/ckeditor5-editor-classic/src/classiceditor';
import { Essentials } from '@ckeditor/ckeditor5-essentials';
import { UploadAdapter } from '@ckeditor/ckeditor5-adapter-ckfinder';
import { Autoformat } from '@ckeditor/ckeditor5-autoformat';
import {
  Bold,
  Italic,
  Underline,
  Strikethrough,
  Code,
  Subscript,
  Superscript,
} from '@ckeditor/ckeditor5-basic-styles';
import { BlockQuote } from '@ckeditor/ckeditor5-block-quote';
import { CKBox } from '@ckeditor/ckeditor5-ckbox';
import { CKFinder } from '@ckeditor/ckeditor5-ckfinder';
import { EasyImage } from '@ckeditor/ckeditor5-easy-image';
import { Heading } from '@ckeditor/ckeditor5-heading';
import {
  Image,
  ImageCaption,
  ImageStyle,
  ImageToolbar,
  ImageUpload,
  PictureEditing,
  ImageResizeEditing,
  ImageResizeHandles,
} from '@ckeditor/ckeditor5-image';
import { Indent, IndentBlock } from '@ckeditor/ckeditor5-indent';
import { Link } from '@ckeditor/ckeditor5-link';
import { List } from '@ckeditor/ckeditor5-list';
import { MediaEmbed } from '@ckeditor/ckeditor5-media-embed';
import { Paragraph } from '@ckeditor/ckeditor5-paragraph';
import { PasteFromOffice } from '@ckeditor/ckeditor5-paste-from-office';
import { Table, TableToolbar } from '@ckeditor/ckeditor5-table';
import { TextTransformation } from '@ckeditor/ckeditor5-typing';
import { CloudServices } from '@ckeditor/ckeditor5-cloud-services';
import { Alignment } from '@ckeditor/ckeditor5-alignment';
import { CodeBlock } from '@ckeditor/ckeditor5-code-block';
import { Font } from '@ckeditor/ckeditor5-font';
import { HorizontalLine } from '@ckeditor/ckeditor5-horizontal-line';
import { HtmlComment } from '@ckeditor/ckeditor5-html-support';
import { SimpleUploadAdapter } from '@ckeditor/ckeditor5-upload';
import { SourceEditing } from '@ckeditor/ckeditor5-source-editing';
export default class ClassicEditor extends ClassicEditorBase {
  static builtinPlugins: (
    | typeof TextTransformation
    | typeof Essentials
    | typeof SimpleUploadAdapter
    | typeof UploadAdapter
    | typeof Paragraph
    | typeof Heading
    | typeof Autoformat
    | typeof Superscript
    | typeof Subscript
    | typeof Bold
    | typeof Code
    | typeof Italic
    | typeof Strikethrough
    | typeof Underline
    | typeof BlockQuote
    | typeof CloudServices
    | typeof Image
    | typeof ImageCaption
    | typeof ImageStyle
    | typeof ImageToolbar
    | typeof ImageUpload
    | typeof ImageResizeEditing
    | typeof CKBox
    | typeof CKFinder
    | typeof EasyImage
    | typeof Indent
    | typeof IndentBlock
    | typeof Link
    | typeof List
    | typeof MediaEmbed
    | typeof PasteFromOffice
    | typeof Table
    | typeof TableToolbar
    | typeof Alignment
    | typeof CodeBlock
    | typeof Font
    | typeof HorizontalLine
    | typeof HtmlComment
    | typeof SourceEditing
    | typeof ImageResizeHandles
    | typeof PictureEditing
  )[];
  static defaultConfig: {
    codeBlock: {
      languages: {
        language: string;
        label: string;
        class: string;
      }[];
    };
    indentBlock: {
      offset: number;
      unit: string;
    };
    image: {
      toolbar: string[];
    };
    resizeOptions: (
      | {
          name: string;
          value: string;
          label: string;
        }
      | {
          name: string;
          value: null;
          label: string;
        }
    )[];
    fontFamily: {
      supportAllValues: boolean;
    };
    toolbar: {
      items: (
        | string
        | {
            label: string;
            tooltip: string;
            withText: boolean;
            items: string[];
          }
      )[];
    };
    table: {
      contentToolbar: string[];
    };
    language: string;
  };
}

import { type Editor, EditorConfig } from '@ckeditor/ckeditor5-core';
export interface CustomEditor extends ClassicEditor {
  create(
    sourceElementOrData: string | HTMLElement,
    config?: EditorConfig | undefined,
  ): Promise<Editor>;
}
