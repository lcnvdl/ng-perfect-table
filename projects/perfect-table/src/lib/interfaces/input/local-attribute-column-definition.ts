import { LocalColumnDefinition } from './local-column-definition';

export class LocalAttributeColumnDefinition<T> extends LocalColumnDefinition<T> {
  constructor(private attributeName: string, private customSorting: any = null) {
    super();
  }

  getFromRow(row: any): T {
    return row[this.attributeName];
  }

  compare(a: T, b: T): number {
    if (this.customSorting) {
      return this.customSorting(a, b);
    }

    if (typeof a === "string") {
      return (<string>a).localeCompare(<any>b);
    }
    else {
      return +a - +b;
    }
  }
}