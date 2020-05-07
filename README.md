# Perfect Table for Angular 9

## License
This software is provided free of charge and without restriction under the [MIT License](LICENSE)

## Live demo
[Live demo (Stackblitz)](https://stackblitz.com/github/lcnvdl/ng-perfect-table-samples)
 
[Demo project (Github)](https://github.com/lcnvdl/perfect-table-samples)

## Installation
```bash
npm i --save ng-perfect-table
```
## Features
- Data abstraction (dataSource)
- Client/Server side Pagination & Sorting
- Integrated Pager
- Light codebase / No external dependencies

## Getting started
Import PerfectTableModule to your app.module
```ts
import { PerfectTableModule } from "ng-perfect-table";
```

Example "app.module.ts"
```ts
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { PerfectTableModule } from "ng-perfect-table";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    PerfectTableModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
  //  ...
}
```
