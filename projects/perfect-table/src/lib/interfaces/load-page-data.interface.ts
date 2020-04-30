import { ILoadPageResult } from './load-page-result.interface';

export interface ILoadPageData {
    error?: any;
    success: boolean;
    data?: ILoadPageResult;
}