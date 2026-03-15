import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GoTopComponent } from '../go-top/go-top.component';

/**
 * 浮動操作按鈕元件
 * 固定於畫面右下角，提供回到頂部功能。
 */
@Component({
  selector: 'app-action-fab',
  standalone: true,
  templateUrl: './action-fab.component.html',
  styleUrls: ['./action-fab.component.scss'],
  imports: [CommonModule, GoTopComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ActionFabComponent {}
