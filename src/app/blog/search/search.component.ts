import { Component, DestroyRef, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit {
  route = inject(ActivatedRoute);
  private _destroyRef = inject(DestroyRef);
  ngOnInit(): void {
    this.route.queryParams
      .pipe(
        map(params => params['keyword']),
        takeUntilDestroyed(this._destroyRef),
      )
      .subscribe(params => {
        console.warn(params);
      });
  }
}
