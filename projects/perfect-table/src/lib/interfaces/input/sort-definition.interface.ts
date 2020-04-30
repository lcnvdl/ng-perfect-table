import { SortType } from './../../enums/sort-type.enum';

export interface ISortDefinition {
  column: string;
  type: SortType;
}