import { ColumnDefinition } from './../../interfaces/input/column-definition';
import { DataSourceInputStub } from './../../../testing/stubs/data-source-input.stub';
import { DataSourceComponent } from './../data-source/data-source.component';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DataTableComponent } from './data-table.component';
import { By } from '@angular/platform-browser';

describe('DataTableComponent', () => {
  let dataSource: DataSourceComponent;
  let dataSourceFixture: ComponentFixture<DataSourceComponent>;
  let component: DataTableComponent;
  let fixture: ComponentFixture<DataTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DataTableComponent, DataSourceComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    dataSourceFixture = TestBed.createComponent(DataSourceComponent);
    dataSource = dataSourceFixture.componentInstance;
    dataSource.dataSourceInput = new DataSourceInputStub();
    dataSourceFixture.detectChanges();

    const column1 = new ColumnDefinition();
    column1.sortable = true;
    column1.id = "col1";

    const column2 = new ColumnDefinition();
    column2.sortable = false;
    column2.id = "col2";

    fixture = TestBed.createComponent(DataTableComponent);
    component = fixture.componentInstance;
    component.dataSource = dataSource;
    component.table = { columns: [column1, column2] };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create a table', () => {
    expect(fixture.elementRef.nativeElement.innerHTML.indexOf("<table")).not.toEqual(-1);
  });

  it('should create the columns', () => {
    expect(fixture.elementRef.nativeElement.innerHTML.indexOf("data-column-id=\"col1")).not.toEqual(-1);
    expect(fixture.elementRef.nativeElement.innerHTML.indexOf("data-column-id=\"col2")).not.toEqual(-1);
  });

  it('css should work fine', () => {
    component.pftClass = "table table-dark";
    fixture.detectChanges();

    const table = fixture.debugElement.query(By.css('.sortable'));
    expect(table).toBeDefined();
    expect(table.classes.table).toBeTruthy();
    expect(table.classes['table-dark']).toBeTruthy();
  });
});
