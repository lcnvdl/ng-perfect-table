import { NgModule } from '@angular/core';
import { PerfectTableComponent } from './perfect-table.component';
import { DataSourceComponent } from './components/data-source/data-source.component';
import { DataTableComponent } from './components/data-table/data-table.component';
import { PaginatorComponent } from './components/paginator/paginator.component';
import { CommonModule } from '@angular/common';
import { PageSizerComponent } from './components/page-sizer/page-sizer.component';

@NgModule({
  declarations: [
    PerfectTableComponent,
    DataSourceComponent,
    DataTableComponent,
    PaginatorComponent,
    PageSizerComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    PerfectTableComponent,
    DataSourceComponent,
    DataTableComponent,
    PaginatorComponent,
    PageSizerComponent
  ]
})
export class PerfectTableModule {
}
