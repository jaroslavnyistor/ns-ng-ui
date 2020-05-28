import { OrderDirection } from 'ns-js-utils';
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

export function buildPageListOrderOption(title: string, field: string, isActive = false): NsPageListToolbarOrderOption {
  return {
    title,
    field,
    directions: [OrderDirection.Asc, OrderDirection.Desc],
    isActive,
  };
}
