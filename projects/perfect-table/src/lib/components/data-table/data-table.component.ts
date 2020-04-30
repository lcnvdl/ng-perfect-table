import { ColumnDefinition } from './../../interfaces/input/column-definition';
import { Component, OnInit, Input } from '@angular/core';
import { DataSourceComponent } from '../data-source/data-source.component';
import { ITableInput } from '../../interfaces/input/table-input.interface';
import { SortType } from '../../enums/sort-type.enum';
import { PFTComponent } from '../base/ptf-component';

@Component({
  selector: 'pft-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.css']
})
export class DataTableComponent extends PFTComponent implements OnInit {

  @Input() table: ITableInput;
  @Input() sortable = true;
  @Input() dataSource: DataSourceComponent;

  ngOnInit() {
  }

  get isLoading() {
    return this.dataSource && this.dataSource.isLoading;
  }

  get entities() {
    return this.dataSource.entities;
  }

  get finalCssClass() {
    let css = this.pftClass || "";

    if (this.sortable) {
      css = css + " sortable";
    }

    if (this.isLoading) {
      css = css + " loading";
    }

    return css.trim();
  }

  isSortingAsc(column: ColumnDefinition) {
    return this.dataSource.sorting.some(m => m.column === column.id && m.type === SortType.Asc);
  }

  isUnsorted(column: ColumnDefinition) {
    return !this.isSortingAsc(column) && !this.isSortingDesc(column);
  }

  isSortingDesc(column: ColumnDefinition) {
    return this.dataSource.sorting.some(m => m.column === column.id && m.type === SortType.Desc);
  }

  async sort(column: ColumnDefinition) {
    if (!this.dataSource.isLoading) {
      await this.dataSource.toggleSorting(column.id);
    }
  }
}
