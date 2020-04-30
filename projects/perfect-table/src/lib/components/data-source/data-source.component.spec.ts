import { DataSourceInputStub } from './../../../testing/stubs/data-source-input.stub';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DataSourceComponent } from './data-source.component';
import { SortType } from '../../enums/sort-type.enum';

describe('DataSourceComponent', () => {
  let component: DataSourceComponent;
  let fixture: ComponentFixture<DataSourceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DataSourceComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DataSourceComponent);
    component = fixture.componentInstance;
    component.autoLoad = false;
    component.dataSourceInput = new DataSourceInputStub();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe("#load", () => {
    beforeEach(async () => {
      await component.load();
      fixture.detectChanges();
    });

    it('should store the total pages', () => {
      expect(component.totalPages).toEqual(2);
    });
  });

  describe("#sorting", () => {
    beforeEach(async () => {
      await component.load();
      fixture.detectChanges();
    });

    it('should sort ascending', async () => {
      await component.addSort("id", SortType.Asc);
      expect(component.entities[0].id).toEqual(0);
    });

    it('should sort descending', async () => {
      await component.addSort("id", SortType.Desc);
      expect(component.entities[0].id).toEqual(24);
    });
  });
});
