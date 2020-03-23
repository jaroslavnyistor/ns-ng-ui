import { OrderDirection } from '../../../../../utils/order/order-direction';
import { NsIcon } from '../../../../icon/ns-icon.enum';

export interface NsPageListToolbarOrderBase {
   title: string;
   field: string;
}

export interface NsPageListToolbarOrderOption extends NsPageListToolbarOrderBase {
   directions: OrderDirection[];
   isActive?: boolean;
}

export interface NsPageListToolbarOrderItem extends NsPageListToolbarOrderBase {
   directions: NsPageListToolbarOrderItemDirection[];
}

export interface NsPageListToolbarOrderItemDirection {
   id: number;
   text: string;
   item: NsPageListToolbarOrderItem;
   direction: OrderDirection;
   icon: NsIcon;
   isActive: boolean;
}
