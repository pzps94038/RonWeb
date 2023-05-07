import { Component, DestroyRef, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { PaginationComponent } from 'src/app/shared/components/pagination/pagination.component';

@Component({
  selector: 'app-category',
  standalone: true,
  imports: [CommonModule, PaginationComponent],
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss'],
})
export class CategoryComponent implements OnInit {
  route = inject(ActivatedRoute);
  router = inject(Router);
  category = signal<string | undefined>(undefined);
  private _destroyRef = inject(DestroyRef);
  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
  }
}
