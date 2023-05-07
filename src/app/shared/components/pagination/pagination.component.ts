import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
  computed,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-pagination',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss'],
})
export class PaginationComponent implements OnChanges {
  @Input('currentPage') curPage? = 1;
  @Input('pageSize') size = 10;
  @Input('total') total = 0;
  @Output('change') pageChange = new EventEmitter<number>();
  currentPage = signal(1);
  pageSize = signal(10);
  totalItems = signal(0);
  totalPages = computed(() => {
    return Math.ceil(this.totalItems() / this.pageSize());
  });
  maxVisiblePages = signal(5);
  startPage = computed(() => {
    const midPoint = Math.ceil(this.maxVisiblePages() / 2);
    return Math.max(
      1,
      Math.min(this.currentPage() - midPoint + 1, this.totalPages() - this.maxVisiblePages() + 1),
    );
  });

  endPage = computed(() => {
    return Math.min(this.startPage() + this.maxVisiblePages() - 1, this.totalPages());
  });

  visiblePages = computed(() => {
    const pages = [];
    for (let i = this.startPage(); i <= this.endPage(); i++) {
      pages.push(i);
    }
    return pages;
  });

  ngOnChanges(changes: SimpleChanges): void {
    if (changes?.['size'] && changes?.['size'].currentValue !== changes?.['size'].previousValue) {
      const pageSize = changes?.['size'].currentValue;
      this.pageSize.set(pageSize);
    }
    if (
      changes?.['curPage'] &&
      changes?.['curPage'].currentValue !== changes?.['curPage'].previousValue
    ) {
      const curPage = changes?.['curPage'].currentValue ?? 1;
      this.currentPage.set(curPage);
    }
    if (
      changes?.['total'] &&
      changes?.['total'].currentValue !== changes?.['total'].previousValue
    ) {
      const total = changes?.['total'].currentValue;
      this.totalItems.set(total);
    }
  }

  firstPage(): void {
    if (this.currentPage() > 1) {
      this.goToPage(1);
    }
  }

  prevPage(): void {
    if (this.currentPage() > 1) {
      this.goToPage(this.currentPage() - 1);
    }
  }

  nextPage(): void {
    if (this.currentPage() < this.totalPages()) {
      this.goToPage(this.currentPage() + 1);
    }
  }

  lastPage(): void {
    if (this.currentPage() < this.totalPages()) {
      this.goToPage(this.totalPages());
    }
  }

  goToPage(pageNumber: number): void {
    if (this.currentPage() !== pageNumber) {
      this.currentPage.set(pageNumber);
      this.pageChange.emit(this.currentPage());
    }
  }
}
