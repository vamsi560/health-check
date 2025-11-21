import { Component, computed, input, output } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';

export interface TableColumn {
  key: string;
  label: string;
}

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [MatTableModule, MatSortModule, MatPaginatorModule],
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent<T extends Record<string, unknown>> {
  // Inputs converted to signal-based inputs for reactive, typed access.
  columns = input.required<TableColumn[]>();
  data = input.required<T[]>();
  pageSize = input(10);
  pageSizeOptions = input([5, 10, 25, 50]);
  showPaginator = input(true);
  showSort = input(true);
  ariaLabel = input<string | null>(null);
  rowClick = output<T>();

  protected readonly dataSourceSignal = computed(() => {
    const d = this.data();
    return d ? [...d] : [];
  });
  protected readonly columnsSignal = computed(() => {
    const cols = this.columns();
    return cols ? [...cols] : [];
  });
  protected readonly displayedColumnsSignal = computed(() => {
    const cols = this.columns();
    return cols ? cols.map(c => c.key) : [];
  });
  protected readonly showPaginatorSignal = computed(() => this.showPaginator());
  protected readonly tableData = computed(() => this.dataSourceSignal());

  onRowClick(row: T) {
    this.rowClick.emit(row);
  }
}
