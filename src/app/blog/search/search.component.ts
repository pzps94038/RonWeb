import { Component, DestroyRef, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
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
  router = inject(Router);
  keyword = signal<string | undefined>(undefined);
  private _destroyRef = inject(DestroyRef);

  ngOnInit(): void {
    this.route.queryParams
      .pipe(
        map(params => params['keyword'] as string | undefined),
        takeUntilDestroyed(this._destroyRef),
      )
      .subscribe(keyword => {
        if (!!!keyword) {
          this.router.navigate(['/blog']);
          return;
        }
        this.keyword.set(keyword);
      });
  }
}
