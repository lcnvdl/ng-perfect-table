import { IDataSourceInput } from './data-source-input.interface';
import { ISortDefinition } from './sort-definition.interface';
import { ILoadPageResult } from '../load-page-result.interface';
import { Observable, of } from 'rxjs';
import { LocalColumnDefinition } from './local-column-definition';
import { SortType } from '../../enums/sort-type.enum';

export class OfflineDataSource<T> implements IDataSourceInput {
  rows: any[] = [];

  constructor(protected columns: LocalColumnDefinition<T>[]) {
  }

  load(page: number, count: number, filters?: any, sorting?: ISortDefinition[] | ISortDefinition): Observable<ILoadPageResult> {
    let entities = this.rows;

    if (filters) {
      entities = this.applyFilters(entities, filters);
    }

    const total = entities.length;

    if (sorting) {
      if (Array.isArray(sorting) && sorting.length > 0) {
        entities = this.applySorting(entities, sorting[0]);
      }
      else {
        entities = this.applySorting(entities, sorting as ISortDefinition);
      }
    }

    entities = this.paginate(entities, page, count);

    return of({
      total,
      entities
    });
  }

  protected applySorting(rows: any[], sorting: ISortDefinition) {
    const sorted = rows.map(m => m);
    sorted.sort((rowA, rowB) => {
      const column = this.columns.find(m => m.id == sorting.column);
      if (!column) {
        console.warn(`The column ${sorting.column} doesn't exists`);
        return 0;
      }

      const a = column.getFromRow(rowA);
      const b = column.getFromRow(rowB);

      let compare = column.compare(a, b);
      if (sorting.type == SortType.Desc) {
        compare = -compare;
      }

      return compare;
    });

    return sorted;
  }

  protected applyFilters(rows: any[], filters: any) {
    return rows.filter(row => {
      const nope = Object.keys(filters).some(key => this.columns.find(c => c.id == key).getFromRow(row) != filters[key]);
      return !nope;
    });
  }

  private paginate(rows: any[], page: number, count: number) {
    const from = page * count;
    const to = (page + 1) * count;
    const reducedList = [];

    for (let i = 0; i < rows.length; i++) {
      if (i >= from && i < to) {
        reducedList.push(rows[i]);
      }
    }

    return reducedList;
  }
}