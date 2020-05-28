import { OrderDirection } from '../../../utils/order/order-direction';

export interface NsPageListState {
   pageIndex?: number;
   pageSize?: number;
   orderBy?: string;
   orderDirection?: OrderDirection;
   searchValue?: string;
}
