import { NgModule } from '@angular/core';
import { PerfectTableComponent } from './perfect-table.component';
import { DataSourceComponent } from './components/data-source/data-source.component';
import { DataTableComponent } from './components/data-table/data-table.component';
import { PaginatorComponent } from './components/paginator/paginator.component';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    PerfectTableComponent,
    DataSourceComponent,
    DataTableComponent,
    PaginatorComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    PerfectTableComponent,
    DataSourceComponent,
    DataTableComponent,
    PaginatorComponent
  ]
})
export class PerfectTableModule {
}
