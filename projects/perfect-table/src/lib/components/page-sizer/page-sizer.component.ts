import { Component, OnInit, Input } from '@angular/core';
import { PFTComponent } from '../base/ptf-component';
import { DataSourceComponent } from '../data-source/data-source.component';

@Component({
  selector: 'pft-page-sizer',
  templateUrl: './page-sizer.component.html',
  styleUrls: ['./page-sizer.component.css']
})
export class PageSizerComponent extends PFTComponent {
  @Input() options = [5, 10, 15];
  @Input() dataSource: DataSourceComponent;
  @Input() autoHide = false;

  get currentSize() {
    return this.dataSource.pageSize;
  }

  get dsIsEmpty() {
    return this.dataSource.totalPages === 0;
  }

  get isLoading() {
    return this.dataSource.isLoading;
  }

  changeSize(newSize: number) {
    this.dataSource.changePageSize(newSize);
  }
}
