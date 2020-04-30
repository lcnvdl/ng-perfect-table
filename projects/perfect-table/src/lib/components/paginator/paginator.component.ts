import { Component, OnInit, Input } from '@angular/core';
import { DataSourceComponent } from '../data-source/data-source.component';
import { PFTComponent } from '../base/ptf-component';

@Component({
  selector: 'pft-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.css']
})
export class PaginatorComponent extends PFTComponent implements OnInit {
  @Input() strLast = "Last";
  @Input() strNext = "Next";
  @Input() strFirst = "First";
  @Input() strPrevious = "Previous";
  @Input() showRelativeNavigationButtons = true;
  @Input() showAbsoluteNavigationButtons = true;

  @Input() dataSource: DataSourceComponent;
  @Input() visiblePages = 5;

  ngOnInit(): void {
  }

  get isLoading() {
    return this.dataSource.isLoading;
  }

  get current() {
    return this.dataSource.currentPage;
  }

  get total() {
    return this.dataSource.totalPages;
  }

  get hasPreviousPage() {
    return this.dataSource.currentPage > 0;
  }

  get hasNextPage() {
    return this.dataSource.currentPage < this.dataSource.totalPages - 1;
  }

  get pages() {
    let list = [];
    if (this.visiblePages >= this.dataSource.totalPages) {
      for (let i = 0; i < this.dataSource.totalPages; i++) {
        list.push(i);
      }
    }
    else {
      list.push(this.current);

      let i = 1;

      while (list.length < this.visiblePages) {
        let p = this.current - i;
        let n = this.current + i;

        if (p >= 0) {
          list.unshift(p);
        }

        if (n < this.total) {
          list.push(n);
        }

        i++;
      }

    }
    return list;
  }

  goTo(page) {
    this.dataSource.changePage(page);
  }

  goToNext() {
    this.goTo(this.current + 1);
  }

  goToPrevious() {
    this.goTo(this.current - 1);
  }

  goToFirst() {
    this.goTo(0);
  }

  goToLast() {
    this.goTo(this.total - 1);
  }
}

