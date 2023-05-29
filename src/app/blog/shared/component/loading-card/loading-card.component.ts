import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-loading-card',
  standalone: true,
  templateUrl: './loading-card.component.html',
  styleUrls: ['./loading-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoadingCardComponent {}
