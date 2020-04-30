import { Observable } from 'rxjs';
import { ILoadPageResult } from '../load-page-result.interface';
import { ISortDefinition } from './sort-definition.interface';

export interface IDataSourceInput {
    load(page: number, count: number, filters?: any, sorting?: ISortDefinition[]): Observable<ILoadPageResult>;
}