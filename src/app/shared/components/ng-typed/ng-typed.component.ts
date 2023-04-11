import { AfterViewInit, Component, ElementRef, Input, OnDestroy, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import Typed, { TypedOptions } from 'typed.js';
@Component({
  selector: 'ng-typed',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ng-typed.component.html',
  styleUrls: ['./ng-typed.component.scss'],
})
export class NgTypedComponent implements AfterViewInit, OnDestroy {
  @Input() options!: TypedOptions;
  @ViewChild('element') el?: ElementRef<HTMLSpanElement>;
  private _typed?: Typed;

  ngAfterViewInit() {
    this._typed = new Typed(this.el?.nativeElement, this.options);
  }

  ngOnDestroy() {
    this._typed?.destroy();
  }
}
