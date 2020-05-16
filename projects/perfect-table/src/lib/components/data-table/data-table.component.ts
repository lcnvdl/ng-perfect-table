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

  get finalCssClasses() {
    let css = this.pftClass || "";

    if (!this.entities || this.entities.length === 0) {
      css = css + " empty";
    }

    if (this.sortable) {
      css = css + " sortable";
    }

    if (this.isLoading) {
      css = css + " loading";
    }

    return css.trim();
  }

  getFinalColumnCssClasses(column: ColumnDefinition) {
    const cssClasses = [...column.classes];

    if (column.sortable) {
      //  TODO  Maybe we should remove cursor-pointer, and let the user to choose the cursor by overriding sortable class.
      cssClasses.push("cursor-pointer");
      cssClasses.push("sortable");

      if (this.isUnsorted(column)) {
        cssClasses.push("s-non");
      }
      else if (this.isSortingAsc(column)) {
        cssClasses.push("s-asc");
      }
      else {
        cssClasses.push("s-des");
      }
    }
    else {
      cssClasses.push("s-non");
    }

    return cssClasses.join(" ");
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
    if (!this.dataSource.isLoading && column.sortable) {
      await this.dataSource.toggleSorting(column.id);
    }
  }
}
