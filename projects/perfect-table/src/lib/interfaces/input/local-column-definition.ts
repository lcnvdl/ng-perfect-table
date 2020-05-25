import { ColumnDefinition } from './column-definition';

export abstract class LocalColumnDefinition<T> extends ColumnDefinition {
  abstract getFromRow(row: any): T;
  abstract compare(a: T, b: T): number;
}