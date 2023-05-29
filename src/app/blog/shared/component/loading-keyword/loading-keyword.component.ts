import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-loading-keyword',
  standalone: true,
  templateUrl: './loading-keyword.component.html',
  styleUrls: ['./loading-keyword.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoadingKeywordComponent {}
