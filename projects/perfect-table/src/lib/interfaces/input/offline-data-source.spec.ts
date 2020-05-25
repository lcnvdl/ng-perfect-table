import { OfflineDataSource } from './offline-data-source';
import { LocalColumnDefinition } from './local-column-definition';
import { SortType } from '../../enums/sort-type.enum';

let offlineDataSource: OfflineDataSource<number>;

describe('OfflineDataSource', () => {
  beforeEach(() => {
    class TestColumn extends LocalColumnDefinition<number> {
      constructor() {
        super();
        this.id = "binary";
      }

      getFromRow(row: any): number {
        return row[this.id] % 2;
      }
      compare(a: number, b: number): number {
        return a - b;
      }
    }

    offlineDataSource = new OfflineDataSource<number>([
      new TestColumn()
    ]);

    const rows = [];
    for (let i = 0; i < 10; i++) {
      rows.push({ id: i, binary: i });
    }

    offlineDataSource.rows = rows;
  });

  it('load', async () => {
    const result = await offlineDataSource.load(0, 5).toPromise();
    expect(result.total).toEqual(10);
    expect(result.entities.length).toEqual(5);
  });

  it('sort', async () => {
    let result = await offlineDataSource.load(0, 5, null, { column: "binary", type: SortType.Desc }).toPromise();
    expect(result.total).toEqual(10);
    expect(result.entities.length).toEqual(5);
    console.log(result.entities);
    expect(result.entities.some(m => (m.binary % 2) == 0)).toBeFalse();
    expect(result.entities.some(m => (m.binary % 2) == 1)).toBeTruthy();

    result = await offlineDataSource.load(1, 5, null, { column: "binary", type: SortType.Desc }).toPromise();
    expect(result.total).toEqual(10);
    expect(result.entities.length).toEqual(5);
    expect(result.entities.some(m => (m.binary % 2) == 0)).toBeTruthy();
    expect(result.entities.some(m => (m.binary % 2) == 1)).toBeFalse();
  });

  it('filter', async () => {
    const result = await offlineDataSource.load(0, 5, { binary: 1 }).toPromise();
    expect(result.total).toEqual(5);
    expect(result.entities.length).toEqual(5);
  });
});
