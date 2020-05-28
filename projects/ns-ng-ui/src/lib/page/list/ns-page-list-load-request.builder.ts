import { OrderDirection } from 'ns-js-utils';

export interface NsPageListLoadRequestBuilder {
   paging(pageIndex: number, pageSize: number): this;

   order(orderBy: string, orderDirection: OrderDirection): this;

   search(value: string): this;
}
