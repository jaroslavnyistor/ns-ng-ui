import { OrderDirection } from 'nikisoft-utils';

export interface NsPageListLoadRequestBuilder {
  paging(pageIndex: number, pageSize: number): this;

  order(orderBy: string, orderDirection: OrderDirection): this;

  search(value: string): this;
}
