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

    fixture = TestBed.createComponent(DataTableComponent);
    component = fixture.componentInstance;
    component.dataSource = dataSource;
    component.table = { columns: [] };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create a table', () => {
    expect(fixture.elementRef.nativeElement.innerHTML.indexOf("<table")).not.toEqual(-1);
  });

  it('css should work fine', () => {
    component.pftClass = "table table-dark";
    fixture.detectChanges();

    const table = fixture.debugElement.query(By.css('.sortable'));
    expect(table).toBeDefined();
    expect(table.classes['table']).toBeTruthy();
    expect(table.classes['table-dark']).toBeTruthy();
  });
});
