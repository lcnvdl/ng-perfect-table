import { ISortDefinition } from './../../interfaces/input/sort-definition.interface';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { IDataSourceInput } from '../../interfaces/input/data-source-input.interface';
import { IPageChangeRequestData } from '../../interfaces/page-change-request-data.interface';
import { IPageChangeData } from '../../interfaces/events/page-change-data.interface';
import { ILoadPageData } from '../../interfaces/load-page-data.interface';
import { SortType } from '../../enums/sort-type.enum';

@Component({
  selector: 'pft-data-source',
  templateUrl: './data-source.component.html',
  styleUrls: ['./data-source.component.css']
})
export class DataSourceComponent implements OnInit {

  private _loading = false;
  private _entities = [];
  private _total = 0;
  private _currentPage = 0;
  private _sort = {};

  @Input() multiColumnSorting = false;
  @Input() threeStateSorting = false;
  @Input() pageSize = 15;
  @Input() filters = null;
  @Input() autoLoad = true;
  @Input() dataSourceInput: IDataSourceInput;

  @Output() onLoadStart = new EventEmitter<any>();
  @Output() onLoadFinish = new EventEmitter<ILoadPageData>();
  @Output() onPageChangeStart = new EventEmitter<IPageChangeRequestData>();
  @Output() onPageChangeFinish = new EventEmitter<IPageChangeData>();

  constructor() {
  }

  ngOnInit(): void {
    if (this.autoLoad) {
      this.load();
    }
  }

  get currentPage() {
    return this._currentPage;
  }

  get totalPages() {
    return Math.ceil(this.total / this.pageSize);
  }

  @Input()
  set currentPage(value: number) {
    this.changePage(value);
  }

  get isLoading() {
    return this._loading;
  }

  get entities() {
    return this._entities;
  }

  get sorting(): ISortDefinition[] {
    return Object.keys(this._sort).map(k => (<ISortDefinition>{ column: k, type: this._sort[k] }));
  }

  get total() {
    return this._total;
  }

  load(nextPage?: number): Promise<ILoadPageData> {
    return new Promise<ILoadPageData>((resolve, reject) => {
      this.onLoadStart.emit();
      this._loading = true;

      if (!this.dataSourceInput) {
        console.warn("DataSourceInput is required.");
        return;
      }

      const targetPage = (nextPage === undefined || nextPage === null || nextPage < 0) ? this.currentPage : nextPage;

      this.dataSourceInput.load(targetPage, this.pageSize, this.filters, this.sorting)
        .subscribe(result => {
          this._loading = false;
          this._entities = result.entities;
          this._currentPage = targetPage;
          if (result.total) {
            this._total = result.total;
          }
          this.onLoadFinish.emit({ success: true, data: result, error: null });
          resolve({ success: true, data: result, error: null });
        }, err => {
          console.error(err);
          this._loading = false;
          this.onLoadFinish.emit({ error: err, success: false, data: null });
          reject(err);
        });
    });
  }

  changePage(newPage: number) {
    const currentPage = this._currentPage;
    this.onPageChangeStart.emit({ currentPage, newPage });
    this.load(newPage).then(result => {
      this.onPageChangeFinish.emit({ currentPage, newPage, entities: result.data.entities });
    }, _ => {
      //  Nothing for now
    });
  }

  async reload() {
    await this.load();
  }

  getSorting(column: string): SortType {
    if (!this._sort[column]) {
      return SortType.None;
    }

    return this._sort[column];
  }

  async toggleSorting(column: string) {
    switch (this.getSorting(column)) {
      case SortType.Asc:
        await this.addSort(column, SortType.Desc);
        break;
      case SortType.Desc:
        await this.addSort(column, this.threeStateSorting ? SortType.None : SortType.Asc);
        break;
      default:
        await this.addSort(column, SortType.Asc);
        break;
    }
  }

  async addSort(column: string, type: SortType) {
    if (!this.multiColumnSorting) {
      this._sort = {};
    }

    this._sort[column] = type;
    await this.reload();
  }

  async clearColumnSort(column: string) {
    delete this._sort[column];
    await this.reload();
  }

  async clearSort() {
    this._sort = {};
    await this.reload();
  }
}
