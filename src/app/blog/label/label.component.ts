import { Component, DestroyRef, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs';
import { PaginationComponent } from 'src/app/shared/components/pagination/pagination.component';

@Component({
  selector: 'app-label',
  standalone: true,
  imports: [CommonModule, PaginationComponent],
  templateUrl: './label.component.html',
  styleUrls: ['./label.component.scss'],
})
export class LabelComponent implements OnInit {
  route = inject(ActivatedRoute);
  router = inject(Router);
  label = signal<string | undefined>(undefined);
  private _destroyRef = inject(DestroyRef);
  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
  }
}
