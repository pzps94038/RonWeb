import { Injectable } from '@angular/core';
import { Observable, from, filter } from 'rxjs';
import Swal, { SweetAlertResult } from 'sweetalert2';
export enum SwalIcon {
  Success = 'success',
  Error = 'error',
  Warning = 'warning',
  Info = 'info',
  Question = 'question',
}
export interface SwalModel {
  title?: string; // 顯示標題
  text?: string; // 顯示內容文字
  icon?: SwalIcon; // icon種類 'success' | 'error' | 'warning' | 'info' | 'question'
  showCancelButton?: boolean; // 顯示取消按鈕
  confirmButtonText?: string; //確認按鈕文字
  cancelButtonText?: string; // 取消按鈕文字
}
@Injectable({
  providedIn: 'root',
})
export class SwalService {
  alert<T>(options: SwalModel): Observable<SweetAlertResult<T>> {
    const config = {
      title: options.title,
      text: options.text,
      icon: options.icon ?? SwalIcon.Error,
      showCancelButton: options.showCancelButton ?? false,
      confirmButtonText: options.confirmButtonText ?? '確定',
      cancelButtonText: options.cancelButtonText ?? '取消',
      heightAuto: false,
    };
    return from(Swal.fire(config));
  }

  confirm(options: SwalModel): Observable<SweetAlertResult<boolean>> {
    const config = {
      title: options.title,
      text: options.text,
      icon: options.icon ?? SwalIcon.Question,
      showCancelButton: options.showCancelButton ?? true,
      confirmButtonText: options.confirmButtonText ?? '確定',
      cancelButtonText: options.cancelButtonText ?? '取消',
      heightAuto: false,
    };
    return from(Swal.fire(config));
  }
}
