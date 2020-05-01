import { ILoadPageResult, IDataSourceInput, ISortDefinition, SortType } from '../../public-api';
import { Observable, of } from 'rxjs';

export class DataSourceInputStub implements IDataSourceInput {
  load(page: number, count: number, filters?: any, sort?: ISortDefinition[]): Observable<ILoadPageResult> {
    const result: ILoadPageResult = {
      total: 25,
      entities: this.getEntities(page, count, filters, sort)
    };

    return of(result);
  }

  private getEntities(page, count, filters, sort?: ISortDefinition[]): any[] {
    const list = [];
    const from = page * count;
    const to = (page + 1) * count;

    for (let i = 0; i < 25; i++) {
      list.push({ id: i, name: "ABC" });
    }

    if (sort && sort.filter(m => m.type !== SortType.None).length > 0) {
      const s = sort.find(m => m.type !== SortType.None);
      list.sort((a, b) => {
        if (s.type == SortType.Asc) {
          return a[s.column] - b[s.column];
        }
        else {
          return b[s.column] - a[s.column];
        }
      });
    }

    const finalList = [];

    for (let i = 0; i < 25; i++) {
      if (i >= from && i < to) {
        finalList.push(list[i]);
      }
    }

    return finalList;
  }
}
