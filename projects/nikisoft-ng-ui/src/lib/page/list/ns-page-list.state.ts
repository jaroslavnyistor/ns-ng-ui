import { OrderDirection } from 'ns-js-utils';

export interface NsPageListState {
  pageIndex?: number;
  pageSize?: number;
  orderBy?: string;
  orderDirection?: OrderDirection;
  searchValue?: string;
}
