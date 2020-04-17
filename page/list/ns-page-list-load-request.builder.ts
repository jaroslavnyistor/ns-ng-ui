import { OrderDirection } from '../../../utils/order/order-direction';

export interface NsPageListLoadRequestBuilder {
   paging(pageIndex: number, pageSize: number): this;
   order(orderBy: string, orderDirection: OrderDirection): this;
   search(value: string): this;
}
