import { OrderDirection } from 'nikisoft-utils';

export interface NsPageListState {
  pageIndex?: number;
  pageSize?: number;
  orderBy?: string;
  orderDirection?: OrderDirection;
  searchValue?: string;
}
